import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function getNextExaminationId() {
  const latest = await prisma.examination.findFirst({
    orderBy: { id: "desc" },
    select: { id: true },
  });

  return (latest?.id ?? 0) + 1;
}

export async function GET() {
  try {
    const examinations = await prisma.examination.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(examinations);
  } catch (error) {
    console.error("Failed to fetch examinations:", error);

    return NextResponse.json(
      { error: "Failed to fetch examinations" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!(await getCurrentUser())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const code = String(body.code ?? name)
      .trim()
      .toUpperCase();
    const status = String(body.status ?? "Upcoming").trim();
    const date = body.date ? new Date(body.date) : null;

    if (!name || !code || !status) {
      return NextResponse.json(
        {
          error: "Name, code and status are required",
        },
        { status: 400 },
      );
    }

    if (date && Number.isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Exam date is invalid" },
        { status: 400 },
      );
    }

    const existing = await prisma.examination.findFirst({
      where: { OR: [{ name }, { code }] },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An examination with that name or code already exists." },
        { status: 409 },
      );
    }

    const nextExaminationId = await getNextExaminationId();
    const examination = await prisma.examination.create({
      data: {
        id: nextExaminationId,
        name,
        code,
        status,
        date,
        dateLabel: body.dateLabel ? String(body.dateLabel).trim() : null,
        description: body.description ? String(body.description).trim() : null,
      },
    });

    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"Examination"', 'id'), ${nextExaminationId}, true);`,
    );

    return NextResponse.json(examination, { status: 201 });
  } catch (error) {
    console.error("Failed to create examination:", error);

    return NextResponse.json(
      { error: "Failed to create examination" },
      { status: 500 },
    );
  }
}
