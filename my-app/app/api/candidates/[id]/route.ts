import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const candidateId = Number(id);

    if (!Number.isInteger(candidateId)) {
      return NextResponse.json(
        { error: "Invalid candidate ID" },
        { status: 400 },
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
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

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(candidate);
  } catch (error) {
    console.error("Failed to fetch candidate:", error);

    return NextResponse.json(
      { error: "Failed to fetch candidate" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const candidateId = Number(id);

    if (!Number.isInteger(candidateId)) {
      return NextResponse.json(
        { error: "Invalid candidate ID" },
        { status: 400 },
      );
    }

    const body = await request.json();

    const candidate = await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        ...(body.firstName !== undefined && {
          firstName: String(body.firstName).trim(),
        }),
        ...(body.middleName !== undefined && {
          middleName: body.middleName?.trim() || null,
        }),
        ...(body.lastName !== undefined && {
          lastName: String(body.lastName).trim(),
        }),
        ...(body.email !== undefined && { email: body.email?.trim() || null }),
        ...(body.phone !== undefined && { phone: body.phone?.trim() || null }),
        ...(body.dateOfBirth !== undefined && {
          dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        }),
        ...(body.gender !== undefined && {
          gender: body.gender?.trim() || null,
        }),
        ...(body.state !== undefined && { state: body.state?.trim() || null }),
      },
    });

    return NextResponse.json(candidate);
  } catch (error) {
    console.error("Failed to update candidate:", error);

    return NextResponse.json(
      { error: "Failed to update candidate" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const candidateId = Number(id);

    if (!Number.isInteger(candidateId)) {
      return NextResponse.json(
        { error: "Invalid candidate ID" },
        { status: 400 },
      );
    }

    const candidate = await prisma.candidate.delete({
      where: { id: candidateId },
    });

    return NextResponse.json(candidate);
  } catch (error) {
    console.error("Failed to delete candidate:", error);

    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }
}
