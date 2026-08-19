// app/actions/exams.ts

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type ExaminationInput = {
  id?: number;
  name: string;
  code?: string;
  status?: string;
  description?: string | null;
  dateLabel?: string | null;
  date?: string | null;
};

export async function getExaminations() {
  try {
    const examinations = await prisma.examination.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        registrations: {
          include: {
            candidate: true,
            centre: true,
          },
        },
        results: {
          include: {
            candidate: true,
          },
        },
      },
    });

    return {
      success: true,
      data: examinations,
    };
  } catch (error) {
    console.error("Error fetching examinations:", error);

    return {
      success: false,
      error: "Failed to fetch examinations.",
    };
  }
}

export async function getExaminationById(id: number) {
  try {
    const exam = await prisma.examination.findUnique({
      where: { id },
      include: {
        registrations: {
          include: {
            candidate: true,
            centre: true,
          },
        },
        results: {
          include: {
            candidate: true,
          },
        },
      },
    });

    return {
      success: true,
      data: exam,
    };
  } catch (error) {
    console.error("Error fetching examination:", error);

    return {
      success: false,
      error: "Failed to fetch examination.",
    };
  }
}

export async function saveExamination(input: ExaminationInput) {
  try {
    const name = input.name?.trim();
    const code = (input.code ?? input.name ?? "").trim().toUpperCase();

    if (!name) {
      return {
        success: false,
        error: "Examination name is required.",
      };
    }

    const payload = {
      name,
      code: code || name,
      status: input.status || "Upcoming",
      description: input.description || null,
      dateLabel: input.dateLabel || null,
      date: input.date ? new Date(input.date) : null,
    };

    const exam = await prisma.examination.upsert({
      where: { code: payload.code },
      update: payload,
      create: payload,
    });

    revalidatePath("/examinations");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: exam,
    };
  } catch (error) {
    console.error("Error saving examination:", error);

    return {
      success: false,
      error: "Failed to save examination.",
    };
  }
}