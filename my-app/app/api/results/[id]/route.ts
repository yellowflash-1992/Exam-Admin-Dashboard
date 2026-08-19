import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const resultId = Number(id);

    if (!Number.isInteger(resultId)) {
      return NextResponse.json({ error: "Invalid result ID" }, { status: 400 });
    }

    const result = await prisma.result.findUnique({
      where: { id: resultId },
      include: {
        candidate: true,
        examination: true,
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch result:", error);

    return NextResponse.json(
      { error: "Failed to fetch result" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const resultId = Number(id);

    if (!Number.isInteger(resultId)) {
      return NextResponse.json({ error: "Invalid result ID" }, { status: 400 });
    }

    const body = await request.json();

    const result = await prisma.result.update({
      where: { id: resultId },
      data: {
        ...(body.score !== undefined && {
          score: typeof body.score === "number" ? body.score : null,
        }),
        ...(body.grade !== undefined && { grade: body.grade?.trim() || null }),
        ...(body.status !== undefined && {
          status: String(body.status).trim() || "pending",
        }),
        ...(body.publishedAt !== undefined && {
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        }),
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to update result:", error);

    return NextResponse.json(
      { error: "Failed to update result" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const resultId = Number(id);

    if (!Number.isInteger(resultId)) {
      return NextResponse.json({ error: "Invalid result ID" }, { status: 400 });
    }

    const result = await prisma.result.delete({
      where: { id: resultId },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to delete result:", error);

    return NextResponse.json({ error: "Result not found" }, { status: 404 });
  }
}
