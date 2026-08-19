import { NextResponse } from "next/server";

import {
  ensureDefaultAdminUser,
  hashPassword,
  setSession,
  verifyPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mode = String(body.mode ?? "login").toLowerCase();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const email = String(body.email ?? "").trim();
    const fullName = String(body.fullName ?? "").trim();

    if (mode === "signup") {
      if (!username || !password || !email || !fullName) {
        return NextResponse.json(
          { error: "Username, full name, email, and password are required." },
          { status: 400 },
        );
      }

      const existing = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existing) {
        return NextResponse.json(
          { error: "A user with that username or email already exists." },
          { status: 409 },
        );
      }

      const user = await prisma.user.create({
        data: {
          username,
          email,
          fullName,
          role: "user",
          passwordHash: hashPassword(password),
          theme: "dark",
          notifications: true,
          emailAlerts: true,
        },
      });

      await setSession(user.id);

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
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 },
      );
    }

    const admin = await ensureDefaultAdminUser();

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email: username }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 },
      );
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 },
      );
    }

    await setSession(user.id);

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
      isDefaultAdmin: user.id === admin.id,
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete("exam_admin_session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
