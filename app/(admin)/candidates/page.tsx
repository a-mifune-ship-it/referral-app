import { prisma } from "@/lib/prisma";
import { createCandidate, deleteCandidate, addComment } from "./actions";
import { StatusSelect } from "./StatusSelect";
import { RatingStars } from "./RatingStars";
import { STATUS_ORDER, STATUS_LABEL, STATUS_BADGE_CLASS } from "@/lib/status";

export const dynamic = "force-dynamic";

export default async function CandidatesPage() {
  const [candidates, jobs] = await Promise.all([
    prisma.candidate.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        job: true,
        statusHistory: { orderBy: { createdAt: "asc" } },
        comments: { orderBy: { createdAt: "desc" } },
      },
    }),
    prisma.job.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div>
      <form action={createCandidate} className="add-form">
        <h4>候補者を追加</h4>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">候補者名</label>
            <input id="name" name="name" placeholder="例:山田 太郎" required />
          </div>
          <div className="field">
            <label htmlFor="referrer">紹介した社員</label>
            <input
              id="referrer"
              name="referrer"
              placeholder="例:佐藤(営業部)"
            />
          </div>
        </div>
        <div className="form-grid" style={{ marginTop: 10 }}>
          <div className="field">
            <label htmlFor="jobId">応募求人</label>
            <select id="jobId" name="jobId" defaultValue="">
              <option value="">(求人票を選択)</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="status">ステータス</label>
            <select id="status" name="status" defaultValue="APPLIED">
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            追加する
          </button>
        </div>
      </form>

      {candidates.length === 0 ? (
        <div className="empty">まだ候補者がいません。</div>
      ) : (
        candidates.map((c) => (
          <div className="card" key={c.id}>
            <div className="card-row">
              <div>
                <h3>{c.name}</h3>
                <div className="meta">
                  <span>
                    紹介者: <b>{c.referrer || "未記入"}</b>
                  </span>
                  <span>
                    応募求人: <b>{c.job?.title ?? "(求人票未選択)"}</b>
                  </span>
                </div>
                <div className="hist">
                  {c.statusHistory.map((h) => (
                    <span key={h.id}>
                      {h.createdAt.toISOString().slice(0, 10)} →{" "}
                      {STATUS_LABEL[h.status]}
                    </span>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                <StatusSelect candidateId={c.id} status={c.status} />
                <span className={`badge ${STATUS_BADGE_CLASS[c.status]}`}>
                  {STATUS_LABEL[c.status]}
                </span>
                <form action={deleteCandidate}>
                  <input type="hidden" name="id" value={c.id} />
                  <button className="btn btn-outline btn-sm" type="submit">
                    削除
                  </button>
                </form>
              </div>
            </div>

            <div className="eval-box">
              <div className="section-label">総合評価</div>
              <RatingStars candidateId={c.id} rating={c.rating} />

              <div className="section-label">コメント・面接評価</div>
              <form action={addComment}>
                <input type="hidden" name="candidateId" value={c.id} />
                <div className="form-grid" style={{ marginBottom: 6 }}>
                  <div className="field">
                    <input name="who" placeholder="評価者名(例:面接官B)" />
                  </div>
                  <div className="field">
                    <select name="rating" defaultValue="0">
                      <option value="0">評価点: なし</option>
                      <option value="1">★1</option>
                      <option value="2">★2</option>
                      <option value="3">★3</option>
                      <option value="4">★4</option>
                      <option value="5">★5</option>
                    </select>
                  </div>
                </div>
                <textarea
                  name="text"
                  placeholder="コメント(例:前向きで意欲が高い)"
                />
                <div className="form-actions">
                  <button className="btn btn-primary btn-sm" type="submit">
                    追加
                  </button>
                </div>
              </form>

              <div className="eval-list">
                {c.comments.map((comment) => (
                  <div className="eval-item" key={comment.id}>
                    <span className="date">
                      {comment.createdAt.toISOString().slice(0, 10)}
                    </span>
                    <span className="who">{comment.who}</span>
                    {comment.rating > 0 && (
                      <span className="stars">
                        {"★".repeat(comment.rating)}
                      </span>
                    )}
                    {comment.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
