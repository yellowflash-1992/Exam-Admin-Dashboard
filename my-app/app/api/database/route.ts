import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [
      candidateCount,
      examinationCount,
      centreCount,
      registrationCount,
      resultCount,
    ] = await Promise.all([
      prisma.candidate.count(),
      prisma.examination.count(),
      prisma.examinationCentre.count(),
      prisma.examinationRegistration.count(),
      prisma.result.count(),
    ]);

    return NextResponse.json({
      candidates: candidateCount,
      examinations: examinationCount,
      centres: centreCount,
      registrations: registrationCount,
      results: resultCount,
    });
  } catch (error) {
    console.error("Failed to inspect database:", error);

    return NextResponse.json(
      { error: "Failed to inspect database" },
      { status: 500 },
    );
  }
}