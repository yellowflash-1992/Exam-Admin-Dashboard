import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
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
    console.error("Current user fetch error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
