import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const centreId = Number(id);

    if (!Number.isInteger(centreId)) {
      return NextResponse.json({ error: "Invalid centre ID" }, { status: 400 });
    }

    const centre = await prisma.examinationCentre.findUnique({
      where: { id: centreId },
      include: {
        registrations: {
          include: {
            candidate: true,
            examination: true,
          },
        },
      },
    });

    if (!centre) {
      return NextResponse.json({ error: "Centre not found" }, { status: 404 });
    }

    return NextResponse.json(centre);
  } catch (error) {
    console.error("Failed to fetch centre:", error);

    return NextResponse.json(
      { error: "Failed to fetch centre" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const centreId = Number(id);

    if (!Number.isInteger(centreId)) {
      return NextResponse.json({ error: "Invalid centre ID" }, { status: 400 });
    }

    const body = await request.json();

    const centre = await prisma.examinationCentre.update({
      where: { id: centreId },
      data: {
        ...(body.code !== undefined && {
          code: String(body.code).trim().toUpperCase(),
        }),
        ...(body.name !== undefined && { name: String(body.name).trim() }),
        ...(body.state !== undefined && { state: String(body.state).trim() }),
        ...(body.city !== undefined && { city: String(body.city).trim() }),
        ...(body.address !== undefined && {
          address: body.address?.trim() || null,
        }),
        ...(body.capacity !== undefined && {
          capacity: typeof body.capacity === "number" ? body.capacity : null,
        }),
      },
    });

    return NextResponse.json(centre);
  } catch (error) {
    console.error("Failed to update centre:", error);

    return NextResponse.json(
      { error: "Failed to update centre" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const centreId = Number(id);

    if (!Number.isInteger(centreId)) {
      return NextResponse.json({ error: "Invalid centre ID" }, { status: 400 });
    }

    const centre = await prisma.examinationCentre.delete({
      where: { id: centreId },
    });

    return NextResponse.json(centre);
  } catch (error) {
    console.error("Failed to delete centre:", error);

    return NextResponse.json({ error: "Centre not found" }, { status: 404 });
  }
}
