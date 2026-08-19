import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const centres = await prisma.examinationCentre.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(centres);
  } catch (error) {
    console.error("Failed to fetch centres:", error);

    return NextResponse.json(
      { error: "Failed to fetch centres" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const state = String(body.state ?? "").trim();
    const city = String(body.city ?? "").trim();

    if (!name || !state || !city) {
      return NextResponse.json(
        { error: "Name, state and city are required" },
        { status: 400 },
      );
    }

    const code = String(body.code ?? name)
      .trim()
      .toUpperCase();

    const centre = await prisma.examinationCentre.create({
      data: {
        code: code || name,
        name,
        state,
        city,
        address: body.address?.trim() || null,
        capacity: typeof body.capacity === "number" ? body.capacity : null,
      },
    });

    return NextResponse.json(centre, { status: 201 });
  } catch (error) {
    console.error("Failed to create centre:", error);

    return NextResponse.json(
      { error: "Failed to create centre" },
      { status: 500 },
    );
  }
}
