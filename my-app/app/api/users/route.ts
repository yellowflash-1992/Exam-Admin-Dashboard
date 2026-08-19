import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const current = await getCurrentUser();

    if (!current) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true,
        theme: true,
        notifications: true,
        emailAlerts: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Users fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 },
    );
  }
}
