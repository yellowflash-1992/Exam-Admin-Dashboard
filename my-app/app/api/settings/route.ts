import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        theme: user.theme,
        notifications: user.notifications,
        emailAlerts: user.emailAlerts,
      },
    });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        theme: body.theme === "light" ? "light" : "dark",
        notifications:
          typeof body.notifications === "boolean"
            ? body.notifications
            : user.notifications,
        emailAlerts:
          typeof body.emailAlerts === "boolean"
            ? body.emailAlerts
            : user.emailAlerts,
      },
    });

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        theme: updatedUser.theme,
        notifications: updatedUser.notifications,
        emailAlerts: updatedUser.emailAlerts,
      },
    });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 },
    );
  }
}
