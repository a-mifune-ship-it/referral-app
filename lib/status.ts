import type { CandidateStatus } from "@/app/generated/prisma/enums";

export const STATUS_ORDER: CandidateStatus[] = [
  "APPLIED",
  "DOCUMENT_SCREENING",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
];

export const STATUS_LABEL: Record<CandidateStatus, string> = {
  APPLIED: "応募",
  DOCUMENT_SCREENING: "書類選考",
  INTERVIEW: "面接",
  OFFER: "内定",
  REJECTED: "不合格",
};

export const STATUS_BADGE_CLASS: Record<CandidateStatus, string> = {
  APPLIED: "badge-applied",
  DOCUMENT_SCREENING: "badge-screening",
  INTERVIEW: "badge-interview",
  OFFER: "badge-offer",
  REJECTED: "badge-rejected",
};

export type { CandidateStatus };
