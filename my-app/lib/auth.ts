import crypto from "node:crypto";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

export const AUTH_COOKIE_NAME = "exam_admin_session";

export function hashPassword(password: string) {
  return crypto
    .pbkdf2Sync(
      password,
      process.env.AUTH_SALT || "exam-admin-dashboard",
      120000,
      64,
      "sha512",
    )
    .toString("hex");
}

export function verifyPassword(password: string, hash: string) {
  return hashPassword(password) === hash;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const userId = Number(sessionId);

  if (!Number.isInteger(userId)) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return null;
  }

  return user;
}

export async function setSession(userId: number) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, String(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function ensureDefaultAdminUser() {
  const adminUsername = "admin";
  const adminEmail = "admin@waec.gov.ng";

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ username: adminUsername }, { email: adminEmail }],
    },
  });

  if (existing) {
    return existing;
  }

  return prisma.user.create({
    data: {
      username: adminUsername,
      email: adminEmail,
      fullName: "WAEC Administrator",
      role: "admin",
      passwordHash: hashPassword("admin"),
      theme: "dark",
      notifications: true,
      emailAlerts: true,
    },
  });
}
