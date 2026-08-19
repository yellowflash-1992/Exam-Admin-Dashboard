import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function getNextCandidateId() {
  const lastCandidate = await prisma.candidate.findFirst({
    orderBy: { id: "desc" },
    select: { id: true },
  });

  return (lastCandidate?.id ?? 0) + 1;
}

export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        registrations: {
          include: {
            examination: true,
            centre: true,
          },
        },
        results: {
          include: {
            examination: true,
          },
        },
      },
    });

    return NextResponse.json(candidates);
  } catch (error) {
    console.error("Failed to fetch candidates:", error);

    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const candidateNo = String(body.candidateNo ?? "").trim();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 },
      );
    }

    const nextCandidateId = await getNextCandidateId();

    const candidate = await prisma.candidate.create({
      data: {
        id: nextCandidateId,
        candidateNo: candidateNo || `CAND-${Date.now()}`,
        firstName,
        middleName:
          typeof body.middleName === "string"
            ? body.middleName.trim() || null
            : null,
        lastName,
        email:
          typeof body.email === "string" ? body.email.trim() || null : null,
        phone:
          typeof body.phone === "string" ? body.phone.trim() || null : null,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        gender:
          typeof body.gender === "string" ? body.gender.trim() || null : null,
        state:
          typeof body.state === "string" ? body.state.trim() || null : null,
      },
    });

    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"Candidate"', 'id'), ${nextCandidateId}, true);`,
    );

    return NextResponse.json(candidate, { status: 201 });
  } catch (error) {
    console.error("Failed to create candidate:", error);

    return NextResponse.json(
      { error: "Failed to create candidate" },
      { status: 500 },
    );
  }
}
