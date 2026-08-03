"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createArticle(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const desc = String(formData.get("desc") ?? "").trim();
  const jobIdRaw = String(formData.get("jobId") ?? "");
  const jobId = jobIdRaw ? Number(jobIdRaw) : null;

  if (!title) return;

  await prisma.article.create({
    data: { title, desc, jobId },
  });

  revalidatePath("/articles");
}

export async function deleteArticle(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await prisma.article.delete({ where: { id } });

  revalidatePath("/articles");
}
