"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ContentType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { defaultSettings } from "@/lib/defaults";
import { clearAdminSession, isAdminSessionValid } from "@/lib/session";

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

async function guard() {
  if (!(await isAdminSessionValid())) throw new Error("Unauthorized");
}

export async function createContentItem(formData: FormData) {
  await guard();
  const type = formData.get("type") as ContentType;
  if (!Object.values(ContentType).includes(type)) throw new Error("Bad type");
  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Title required");
  const description = String(formData.get("description") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const videoUrl = String(formData.get("videoUrl") || "").trim() || null;
  const externalLink = String(formData.get("externalLink") || "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const published = formData.get("published") === "true";
  await prisma.contentItem.create({
    data: {
      type,
      title,
      description,
      imageUrl,
      videoUrl,
      externalLink,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      published,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/content");
}

export async function updateContentItem(id: string, formData: FormData) {
  await guard();
  const type = formData.get("type") as ContentType;
  if (!Object.values(ContentType).includes(type)) throw new Error("Bad type");
  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Title required");
  const description = String(formData.get("description") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const videoUrl = String(formData.get("videoUrl") || "").trim() || null;
  const externalLink = String(formData.get("externalLink") || "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const published = formData.get("published") === "true";
  await prisma.contentItem.update({
    where: { id },
    data: {
      type,
      title,
      description,
      imageUrl,
      videoUrl,
      externalLink,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      published,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function deleteContentItem(id: string) {
  await guard();
  await prisma.contentItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function saveSiteSettings(entries: Record<string, string>) {
  await guard();
  for (const [key, value] of Object.entries(entries)) {
    if (!key.trim()) continue;
    await prisma.siteSetting.upsert({
      where: { key: key.trim() },
      create: { key: key.trim(), value },
      update: { value },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function saveHomepageSettingsForm(formData: FormData) {
  const entries: Record<string, string> = {};
  for (const k of Object.keys(defaultSettings)) {
    const v = formData.get(k);
    if (typeof v === "string") entries[k] = v;
  }
  await saveSiteSettings(entries);
}
