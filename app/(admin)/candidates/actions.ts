"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { STATUS_ORDER, type CandidateStatus } from "@/lib/status";

function isValidStatus(value: string): value is CandidateStatus {
  return (STATUS_ORDER as string[]).includes(value);
}

export async function createCandidate(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const referrer = String(formData.get("referrer") ?? "").trim();
  const jobIdRaw = String(formData.get("jobId") ?? "");
  const jobId = jobIdRaw ? Number(jobIdRaw) : null;
  const statusRaw = String(formData.get("status") ?? "APPLIED");
  const status = isValidStatus(statusRaw) ? statusRaw : "APPLIED";

  if (!name) return;

  await prisma.candidate.create({
    data: {
      name,
      referrer,
      jobId,
      status,
      statusHistory: { create: { status } },
    },
  });

  revalidatePath("/candidates");
}

export async function deleteCandidate(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await prisma.candidate.delete({ where: { id } });

  revalidatePath("/candidates");
}

export async function updateStatus(id: number, statusRaw: string) {
  if (!id || !isValidStatus(statusRaw)) return;

  const current = await prisma.candidate.findUnique({ where: { id } });
  if (!current || current.status === statusRaw) return;

  await prisma.candidate.update({
    where: { id },
    data: {
      status: statusRaw,
      statusHistory: { create: { status: statusRaw } },
    },
  });

  revalidatePath("/candidates");
}

export async function setRating(id: number, rating: number) {
  if (!id || rating < 0 || rating > 5) return;

  await prisma.candidate.update({
    where: { id },
    data: { rating },
  });

  revalidatePath("/candidates");
}

export async function addComment(formData: FormData) {
  const candidateId = Number(formData.get("candidateId"));
  const who = String(formData.get("who") ?? "").trim() || "評価者";
  const text = String(formData.get("text") ?? "").trim();
  const rating = Number(formData.get("rating")) || 0;

  if (!candidateId || !text) return;

  await prisma.comment.create({
    data: { candidateId, who, text, rating },
  });

  revalidatePath("/candidates");
}
