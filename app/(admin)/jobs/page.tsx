import { prisma } from "@/lib/prisma";
import { createJob, deleteJob } from "./actions";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <form action={createJob} className="add-form">
        <h4>求人票を作成</h4>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="title">求人タイトル</label>
            <input id="title" name="title" placeholder="例:クラウドエンジニア" required />
          </div>
          <div className="field">
            <label htmlFor="dept">部署</label>
            <input id="dept" name="dept" placeholder="例:プラットフォーム開発部" />
          </div>
        </div>
        <div className="form-grid full" style={{ marginTop: 10 }}>
          <div className="field">
            <label htmlFor="work">【業務内容】</label>
            <textarea
              id="work"
              name="work"
              placeholder="担当していただく業務を具体的に記載します"
            />
          </div>
          <div className="field">
            <label htmlFor="appeal">【このポジションの魅力】</label>
            <textarea
              id="appeal"
              name="appeal"
              placeholder="このポジションならではの魅力を記載します"
            />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            求人票を保存
          </button>
        </div>
      </form>

      {jobs.length === 0 ? (
        <div className="empty">まだ求人票がありません。</div>
      ) : (
        jobs.map((job) => (
          <div className="card" key={job.id}>
            <div className="card-row">
              <div>
                <h3>{job.title}</h3>
                <div className="meta">
                  <span>
                    <b>{job.dept || "部署未設定"}</b>
                  </span>
                </div>
                <div className="section-label">業務内容</div>
                <div className="job-block">{job.work || "未記入"}</div>
                <div className="section-label">このポジションの魅力</div>
                <div className="job-block">{job.appeal || "未記入"}</div>
              </div>
              <form action={deleteJob}>
                <input type="hidden" name="id" value={job.id} />
                <button className="btn btn-outline btn-sm" type="submit">
                  削除
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
