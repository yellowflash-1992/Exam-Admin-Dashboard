import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const examinations = await prisma.examination.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(examinations);
  } catch (error) {
    console.error("Failed to fetch examinations:", error);

    return NextResponse.json(
      { error: "Failed to fetch examinations" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, code, status, date, dateLabel, description } = body;

    if (!name || !code || !status) {
      return NextResponse.json(
        {
          error: "Name, code and status are required",
        },
        { status: 400 }
      );
    }

    const examination = await prisma.examination.create({
      data: {
        name,
        code,
        status,
        date: date ? new Date(date) : null,
        dateLabel: dateLabel || null,
        description: description || null,
      },
    });

    return NextResponse.json(examination, { status: 201 });
  } catch (error) {
    console.error("Failed to create examination:", error);

    return NextResponse.json(
      { error: "Failed to create examination" },
      { status: 500 }
    );
  }
}