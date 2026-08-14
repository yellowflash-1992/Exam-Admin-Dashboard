import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// for getting something in the database
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const examinationId = Number(id);

    if (!Number.isInteger(examinationId)) {
      return NextResponse.json(
        { error: "Invalid examination ID" },
        { status: 400 }
      );
    }

    const examination = await prisma.examination.findUnique({
      where: {
        id: examinationId,
      },
    });

    if (!examination) {
      return NextResponse.json(
        { error: "Examination not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(examination);
  } catch (error) {
    console.error("Failed to fetch examination:", error);

    return NextResponse.json(
      { error: "Failed to fetch examination" },
      { status: 500 }
    );
  }
}

//for creating something in the database
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.code || !body.status) {
      return NextResponse.json(
        {
          error: "name, code, and status are required",
        },
        { status: 400 }
      );
    }

    const examination = await prisma.examination.create({
      data: {
        name: body.name,
        code: body.code,
        status: body.status,
        date: body.date ? new Date(body.date) : null,
        dateLabel: body.dateLabel ?? null,
        description: body.description ?? null,
      },
    });

    return NextResponse.json(examination, { status: 201 });
  } catch (error) {
    console.error("Failed to create examination:", error);

    return NextResponse.json(
      {
        error: "Failed to create examination",
      },
      { status: 500 }
    );
  }
}

//for updating something in the database
export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const examinationId = Number(id);

    if (!Number.isInteger(examinationId)) {
      return NextResponse.json(
        { error: "Invalid examination ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const examination = await prisma.examination.update({
      where: {
        id: examinationId,
      },
      data: {
        ...(body.name !== undefined && {
          name: body.name,
        }),

        ...(body.code !== undefined && {
          code: body.code,
        }),

        ...(body.status !== undefined && {
          status: body.status,
        }),

        ...(body.date !== undefined && {
          date: body.date ? new Date(body.date) : null,
        }),

        ...(body.dateLabel !== undefined && {
          dateLabel: body.dateLabel,
        }),

        ...(body.description !== undefined && {
          description: body.description,
        }),
      },
    });

    return NextResponse.json(examination);
  } catch (error) {
    console.error("Failed to update examination:", error);

    return NextResponse.json(
      {
        error: "Failed to update examination",
      },
      { status: 500 }
    );
  }
}

//for deleting something in the databse
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const examinationId = Number(id);

    if (Number.isNaN(examinationId)) {
      return NextResponse.json(
        { error: "Invalid examination ID" },
        { status: 400 }
      );
    }

    const examination = await prisma.examination.delete({
      where: {
        id: examinationId,
      },
    });

    return NextResponse.json(examination);
  } catch (error) {
    console.error("Failed to delete examination:", error);

    return NextResponse.json(
      { error: "Examination not found" },
      { status: 404 }
    );
  }
}