import { prisma } from "./prisma";
import { defaultSettings } from "./defaults";

export async function getSiteSettings(): Promise<Record<string, string>> {
  const rows = await prisma.siteSetting.findMany();
  const map = { ...defaultSettings };
  for (const r of rows) {
    map[r.key] = r.value;
  }
  return map;
}
