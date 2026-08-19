"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ResultInput = {
  id?: number;
  candidateId?: number | null;
  examinationId?: number | null;
  score?: number | null;
  grade?: string | null;
  status?: string | null;
  publishedAt?: string | null;
};

export async function getResults() {
  try {
    const results = await prisma.result.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        candidate: true,
        examination: true,
      },
    });

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error("Error fetching results:", error);

    return {
      success: false,
      error: "Failed to fetch results.",
    };
  }
}

export async function getResultById(id: number) {
  try {
    const result = await prisma.result.findUnique({
      where: { id },
      include: {
        candidate: true,
        examination: true,
      },
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error fetching result:", error);

    return {
      success: false,
      error: "Failed to fetch result.",
    };
  }
}

export async function saveResult(input: ResultInput) {
  try {
    const candidateId = input.candidateId;
    const examinationId = input.examinationId;

    if (!candidateId || !examinationId) {
      return {
        success: false,
        error: "Candidate and examination are required.",
      };
    }

    const payload = {
      candidateId,
      examinationId,
      score: typeof input.score === "number" ? input.score : null,
      grade: input.grade?.trim() || null,
      status: input.status?.trim() || "pending",
      publishedAt: input.publishedAt ? new Date(input.publishedAt) : null,
    };

    const existing = input.id
      ? await prisma.result.findUnique({
          where: { id: input.id },
        })
      : null;

    const result = existing
      ? await prisma.result.update({
          where: { id: input.id! },
          data: payload,
        })
      : await prisma.result.upsert({
          where: {
            candidateId_examinationId: {
              candidateId,
              examinationId,
            },
          },
          update: payload,
          create: payload,
        });

    revalidatePath("/results");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error saving result:", error);

    return {
      success: false,
      error: "Failed to save result.",
    };
  }
}

export async function deleteResult(id: number) {
  try {
    const result = await prisma.result.delete({
      where: { id },
    });

    revalidatePath("/results");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error deleting result:", error);

    return {
      success: false,
      error: "Failed to delete result.",
    };
  }
}
