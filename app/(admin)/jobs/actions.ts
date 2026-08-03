"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createJob(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const dept = String(formData.get("dept") ?? "").trim();
  const work = String(formData.get("work") ?? "").trim();
  const appeal = String(formData.get("appeal") ?? "").trim();

  if (!title) return;

  await prisma.job.create({
    data: { title, dept, work, appeal },
  });

  revalidatePath("/jobs");
  revalidatePath("/articles");
  revalidatePath("/candidates");
}

export async function deleteJob(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await prisma.job.delete({ where: { id } });

  revalidatePath("/jobs");
  revalidatePath("/articles");
  revalidatePath("/candidates");
}
