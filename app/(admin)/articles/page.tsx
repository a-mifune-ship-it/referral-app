import Link from "next/link";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createArticle, deleteArticle } from "./actions";
import { CopyLinkButton } from "./CopyLinkButton";

export default async function ArticlesPage() {
  const [articles, jobs] = await Promise.all([
    prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: { job: true },
    }),
    prisma.job.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  const origin = `${proto}://${host}`;

  return (
    <div>
      <form action={createArticle} className="add-form">
        <h4>紹介用の記事を追加</h4>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="title">タイトル</label>
            <input
              id="title"
              name="title"
              placeholder="例:クラウドエンジニア募集中!"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="jobId">関連する求人票</label>
            <select id="jobId" name="jobId" defaultValue="">
              <option value="">(求人票を選択)</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-grid full" style={{ marginTop: 10 }}>
          <div className="field">
            <label htmlFor="desc">紹介文</label>
            <textarea
              id="desc"
              name="desc"
              placeholder="紹介する社員が送りやすい、一言サマリー"
            />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            追加する
          </button>
        </div>
      </form>

      {articles.length === 0 ? (
        <div className="empty">まだ記事がありません。</div>
      ) : (
        articles.map((article) => {
          const path = `/a/${article.id}`;
          return (
            <div className="card" key={article.id}>
              <div className="card-row">
                <div>
                  <h3>{article.title}</h3>
                  <div className="meta">
                    <span>
                      求人票: <b>{article.job?.title ?? "(求人票未選択)"}</b>
                    </span>
                    <span>
                      閲覧数: <b className="view-count">{article.views}</b>
                    </span>
                  </div>
                  {article.desc && (
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-soft)",
                        margin: "8px 0 0",
                      }}
                    >
                      {article.desc}
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Link
                    className="btn btn-amber btn-sm"
                    href={path}
                    target="_blank"
                    prefetch={false}
                  >
                    プレビュー
                  </Link>
                  <form action={deleteArticle}>
                    <input type="hidden" name="id" value={article.id} />
                    <button className="btn btn-outline btn-sm" type="submit">
                      削除
                    </button>
                  </form>
                </div>
              </div>
              <div className="link-row">
                <code>{`${origin}${path}`}</code>
                <CopyLinkButton path={path} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
