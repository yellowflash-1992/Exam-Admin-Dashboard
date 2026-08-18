import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await prisma.result.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to fetch results:", error);

    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 },
    );
  }
}
