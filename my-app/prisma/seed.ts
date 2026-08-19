// prisma/seed.ts

import { prisma } from "../lib/prisma";
import { examinations } from "../lib/data/examinations";
import { candidates } from "../lib/data/candidates";
import { centres } from "../lib/data/centres";
import { results } from "../lib/data/results";

const examinationMap = new Map<string, number>();
const candidateMap = new Map<string, number>();
const centreMap = new Map<string, number>();

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) {
    return { firstName: "", middleName: null, lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], middleName: null, lastName: "" };
  }

  if (parts.length === 2) {
    return { firstName: parts[0], middleName: null, lastName: parts[1] };
  }

  return {
    firstName: parts[0],
    middleName: parts.slice(1, -1).join(" ") || null,
    lastName: parts[parts.length - 1],
  };
}

function normaliseDate(value: string | Date | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

async function main() {
  console.log("Starting database seed...");

  await prisma.result.deleteMany();
  await prisma.examinationRegistration.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.examinationCentre.deleteMany();
  await prisma.examination.deleteMany();

  console.log("Cleared previous data.");

  for (const exam of examinations) {
    const created = await prisma.examination.upsert({
      where: { code: exam.name },
      update: {
        name: exam.name,
        status: exam.status,
        description: exam.description,
        dateLabel: exam.dateLabel,
        date: normaliseDate(exam.date),
      },
      create: {
        id: exam.id,
        name: exam.name,
        code: exam.name,
        status: exam.status,
        description: exam.description,
        dateLabel: exam.dateLabel,
        date: normaliseDate(exam.date),
      },
    });

    examinationMap.set(exam.name, created.id);
  }

  console.log("Inserted examinations.");

  for (const centre of centres) {
    const code = `CTR-${String(centre.id).padStart(4, "0")}`;
    const city = centre.address?.split(",")[0]?.trim() || centre.state;

    const created = await prisma.examinationCentre.upsert({
      where: { code },
      update: {
        name: centre.name,
        state: centre.state,
        city,
        address: centre.address,
        capacity: centre.capacity,
      },
      create: {
        id: centre.id,
        code,
        name: centre.name,
        state: centre.state,
        city,
        address: centre.address,
        capacity: centre.capacity,
      },
    });

    centreMap.set(centre.name, created.id);
  }

  console.log("Inserted centres.");

  for (const candidate of candidates) {
    const { firstName, middleName, lastName } = splitFullName(candidate.name);
    const candidateNo = `CAND-${String(candidate.id).padStart(5, "0")}`;

    const createdCandidate = await prisma.candidate.upsert({
      where: { candidateNo },
      update: {
        firstName,
        middleName,
        lastName,
        state: candidate.state,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: `+234${String(candidate.id).padStart(9, "0")}`,
      },
      create: {
        id: candidate.id,
        candidateNo,
        firstName,
        middleName,
        lastName,
        state: candidate.state,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: `+234${String(candidate.id).padStart(9, "0")}`,
      },
    });

    candidateMap.set(candidate.name, createdCandidate.id);

    const examId = examinationMap.get(candidate.exam);
    if (!examId) continue;

    const centreMatch =
      centres.find((centre) => centre.state === candidate.state) ??
      centres.find((centre) => centre.id === 1) ??
      centres[0];

    const centreId = centreMap.get(centreMatch?.name ?? "");

    await prisma.examinationRegistration.upsert({
      where: {
        candidateId_examinationId: {
          candidateId: createdCandidate.id,
          examinationId: examId,
        },
      },
      update: {
        centreId: centreId ?? null,
        status:
          candidate.status === "Passed"
            ? "verified"
            : candidate.status === "Failed"
              ? "failed"
              : "registered",
        registrationNo: `REG-${String(createdCandidate.id).padStart(6, "0")}`,
      },
      create: {
        candidateId: createdCandidate.id,
        examinationId: examId,
        centreId: centreId ?? null,
        status:
          candidate.status === "Passed"
            ? "verified"
            : candidate.status === "Failed"
              ? "failed"
              : "registered",
        registrationNo: `REG-${String(createdCandidate.id).padStart(6, "0")}`,
      },
    });
  }

  console.log("Inserted candidates and registrations.");

  for (const item of results) {
    const candidateId = candidateMap.get(item.candidate);
    const examId = examinationMap.get(item.exam);

    if (!candidateId || !examId) {
      console.log(`Skipping result for ${item.candidate} / ${item.exam}`);
      continue;
    }

    const status =
      item.status === "Verified"
        ? "verified"
        : item.status === "Rejected"
          ? "rejected"
          : "pending";

    await prisma.result.upsert({
      where: {
        candidateId_examinationId: {
          candidateId,
          examinationId: examId,
        },
      },
      update: {
        score: Number(item.score),
        grade: item.grade,
        status,
        publishedAt: normaliseDate(item.date),
      },
      create: {
        candidateId,
        examinationId: examId,
        score: Number(item.score),
        grade: item.grade,
        status,
        publishedAt: normaliseDate(item.date),
      },
    });
  }

  console.log("Inserted results.");

  console.log("Seeding complete.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });