"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CandidateInput = {
  id?: number;
  candidateNo?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  state?: string | null;
};

export async function getCandidates() {
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

    return {
      success: true,
      data: candidates,
    };
  } catch (error) {
    console.error("Error fetching candidates:", error);

    return {
      success: false,
      error: "Failed to fetch candidates.",
    };
  }
}

export async function getCandidateById(id: number) {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id },
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

    return {
      success: true,
      data: candidate,
    };
  } catch (error) {
    console.error("Error fetching candidate:", error);

    return {
      success: false,
      error: "Failed to fetch candidate.",
    };
  }
}

export async function saveCandidate(input: CandidateInput) {
  try {
    const firstName = input.firstName?.trim();
    const lastName = input.lastName?.trim();
    const candidateNo = (input.candidateNo ?? "").trim();

    if (!firstName || !lastName) {
      return {
        success: false,
        error: "Candidate first name and last name are required.",
      };
    }

    const payload = {
      candidateNo: candidateNo || `CAND-${Date.now()}`,
      firstName,
      middleName: input.middleName?.trim() || null,
      lastName,
      email: input.email?.trim() || null,
      phone: input.phone?.trim() || null,
      dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
      gender: input.gender?.trim() || null,
      state: input.state?.trim() || null,
    };

    const existing = input.id
      ? await prisma.candidate.findUnique({
          where: { id: input.id },
        })
      : null;

    const candidate = existing
      ? await prisma.candidate.update({
          where: { id: input.id! },
          data: payload,
        })
      : await prisma.candidate.upsert({
          where: { candidateNo: payload.candidateNo },
          update: payload,
          create: payload,
        });

    revalidatePath("/candidates");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: candidate,
    };
  } catch (error) {
    console.error("Error saving candidate:", error);

    return {
      success: false,
      error: "Failed to save candidate.",
    };
  }
}

export async function deleteCandidate(id: number) {
  try {
    const candidate = await prisma.candidate.delete({
      where: { id },
    });

    revalidatePath("/candidates");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: candidate,
    };
  } catch (error) {
    console.error("Error deleting candidate:", error);

    return {
      success: false,
      error: "Failed to delete candidate.",
    };
  }
}
