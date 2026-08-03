"use client";

import { useTransition } from "react";
import { updateStatus } from "./actions";
import { STATUS_ORDER, STATUS_LABEL, type CandidateStatus } from "@/lib/status";

export function StatusSelect({
  candidateId,
  status,
}: {
  candidateId: number;
  status: CandidateStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      className="status-select"
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as CandidateStatus;
        startTransition(() => {
          updateStatus(candidateId, next);
        });
      }}
    >
      {STATUS_ORDER.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}
