import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await prisma.result.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        candidate: true,
        examination: true,
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to fetch results:", error);

    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 },
    );
  }
}

function parseCsvRow(row: string) {
  const values: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < row.length; index += 1) {
    const character = row[index];
    const next = row[index + 1];

    if (character === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      values.push(value.trim());
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value.trim());
  return values;
}

function parseCsv(csv: string) {
  const rows = csv
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean);
  if (rows.length < 2) return [];

  const headers = parseCsvRow(rows[0]).map((header) =>
    header.replace(/^\uFEFF/, "").toLowerCase(),
  );

  return rows.slice(1).map((row) => {
    const values = parseCsvRow(row);
    return Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? ""]),
    );
  });
}

async function getNextResultId() {
  const latest = await prisma.result.findFirst({
    orderBy: { id: "desc" },
    select: { id: true },
  });

  return (latest?.id ?? 0) + 1;
}

export async function POST(request: Request) {
  try {
    if (!(await getCurrentUser())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await request.json()
      : parseCsv(await request.text());
    const rows = Array.isArray(body) ? body : body?.rows;

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: "The upload contains no result rows." },
        { status: 400 },
      );
    }

    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const [index, row] of rows.entries()) {
      const candidateNo = String(row.candidateNo ?? row.candidate ?? "").trim();
      const examinationKey = String(
        row.examinationCode ?? row.examination ?? row.exam ?? "",
      ).trim();
      const score = Number(row.score);

      if (
        !candidateNo ||
        !examinationKey ||
        !Number.isFinite(score) ||
        score < 0 ||
        score > 100
      ) {
        skipped += 1;
        errors.push(
          `Row ${index + 2}: candidateNo, examinationCode and a score from 0 to 100 are required.`,
        );
        continue;
      }

      const candidate = Number.isInteger(Number(candidateNo))
        ? await prisma.candidate.findFirst({
            where: { OR: [{ id: Number(candidateNo) }, { candidateNo }] },
          })
        : await prisma.candidate.findUnique({ where: { candidateNo } });
      const examination = await prisma.examination.findFirst({
        where: {
          OR: [
            { code: examinationKey.toUpperCase() },
            { name: examinationKey },
          ],
        },
      });

      if (!candidate || !examination) {
        skipped += 1;
        errors.push(
          `Row ${index + 2}: candidate or examination was not found.`,
        );
        continue;
      }

      const status = String(row.status ?? "pending")
        .trim()
        .toLowerCase();
      const validStatus = ["pending", "verified", "rejected"].includes(status)
        ? status
        : "pending";
      const publishedAt = row.publishedAt
        ? new Date(String(row.publishedAt))
        : null;

      const existingResult = await prisma.result.findUnique({
        where: {
          candidateId_examinationId: {
            candidateId: candidate.id,
            examinationId: examination.id,
          },
        },
        select: { id: true },
      });
      const nextResultId = existingResult?.id ?? (await getNextResultId());

      await prisma.result.upsert({
        where: {
          candidateId_examinationId: {
            candidateId: candidate.id,
            examinationId: examination.id,
          },
        },
        update: {
          score,
          grade: row.grade ? String(row.grade).trim() : null,
          status: validStatus,
          publishedAt:
            publishedAt && !Number.isNaN(publishedAt.getTime())
              ? publishedAt
              : null,
        },
        create: {
          id: nextResultId,
          candidateId: candidate.id,
          examinationId: examination.id,
          score,
          grade: row.grade ? String(row.grade).trim() : null,
          status: validStatus,
          publishedAt:
            publishedAt && !Number.isNaN(publishedAt.getTime())
              ? publishedAt
              : null,
        },
      });
      if (!existingResult) {
        await prisma.$executeRawUnsafe(
          `SELECT setval(pg_get_serial_sequence('"Result"', 'id'), ${nextResultId}, true);`,
        );
      }
      imported += 1;
    }

    revalidatePath("/results");
    revalidatePath("/dashboard");

    return NextResponse.json({ imported, skipped, errors });
  } catch (error) {
    console.error("Failed to upload results:", error);
    return NextResponse.json(
      { error: "Failed to upload results" },
      { status: 500 },
    );
  }
}
