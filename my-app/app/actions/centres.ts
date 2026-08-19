"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CentreInput = {
  id?: number;
  code?: string | null;
  name?: string | null;
  state?: string | null;
  city?: string | null;
  address?: string | null;
  capacity?: number | null;
  latitude?: number | null;
  longitude?: number | null;
};

export async function getCentres() {
  try {
    const centres = await prisma.examinationCentre.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        registrations: {
          include: {
            candidate: true,
            examination: true,
          },
        },
      },
    });

    return {
      success: true,
      data: centres,
    };
  } catch (error) {
    console.error("Error fetching centres:", error);

    return {
      success: false,
      error: "Failed to fetch centres.",
    };
  }
}

export async function getCentreById(id: number) {
  try {
    const centre = await prisma.examinationCentre.findUnique({
      where: { id },
      include: {
        registrations: {
          include: {
            candidate: true,
            examination: true,
          },
        },
      },
    });

    return {
      success: true,
      data: centre,
    };
  } catch (error) {
    console.error("Error fetching centre:", error);

    return {
      success: false,
      error: "Failed to fetch centre.",
    };
  }
}

export async function saveCentre(input: CentreInput) {
  try {
    const name = input.name?.trim();
    const state = input.state?.trim();
    const city = input.city?.trim();

    if (!name || !state || !city) {
      return {
        success: false,
        error: "Centre name, state, and city are required.",
      };
    }

    const code = (input.code ?? name).trim().toUpperCase();

    const payload = {
      code: code || name,
      name,
      state,
      city,
      address: input.address?.trim() || null,
      capacity: typeof input.capacity === "number" ? input.capacity : null,
      latitude: typeof input.latitude === "number" ? input.latitude : null,
      longitude: typeof input.longitude === "number" ? input.longitude : null,
    };

    const centre = input.id
      ? await prisma.examinationCentre.update({
          where: { id: input.id },
          data: payload,
        })
      : await prisma.examinationCentre.upsert({
          where: { code: payload.code },
          update: payload,
          create: payload,
        });

    revalidatePath("/centres");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: centre,
    };
  } catch (error) {
    console.error("Error saving centre:", error);

    return {
      success: false,
      error: "Failed to save centre.",
    };
  }
}

export async function deleteCentre(id: number) {
  try {
    const centre = await prisma.examinationCentre.delete({
      where: { id },
    });

    revalidatePath("/centres");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: centre,
    };
  } catch (error) {
    console.error("Error deleting centre:", error);

    return {
      success: false,
      error: "Failed to delete centre.",
    };
  }
}
