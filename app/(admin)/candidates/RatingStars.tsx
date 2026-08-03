"use client";

import { useTransition } from "react";
import { setRating } from "./actions";

export function RatingStars({
  candidateId,
  rating,
}: {
  candidateId: number;
  rating: number;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rating-row">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          className={`star-btn${i <= rating ? " filled" : ""}`}
          disabled={isPending}
          onClick={() => {
            const next = i === rating ? 0 : i;
            startTransition(() => setRating(candidateId, next));
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
