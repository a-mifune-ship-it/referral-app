import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ArticlePublicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!id) notFound();

  const article = await prisma.article.findUnique({
    where: { id },
    include: { job: true },
  });
  if (!article) notFound();

  await prisma.article.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  return (
    <div className="app" style={{ maxWidth: 720 }}>
      <div className="eyebrow">Referral Recruiting</div>
      <h1 style={{ fontSize: 24, color: "var(--navy)", margin: "6px 0 18px" }}>
        {article.title}
      </h1>

      {article.desc && (
        <div className="card">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
            {article.desc}
          </p>
        </div>
      )}

      {article.job ? (
        <div className="card">
          <h3>{article.job.title}</h3>
          {article.job.dept && (
            <div className="meta">
              <span>
                <b>{article.job.dept}</b>
              </span>
            </div>
          )}
          {article.job.work && (
            <>
              <div className="section-label">業務内容</div>
              <div className="job-block">{article.job.work}</div>
            </>
          )}
          {article.job.appeal && (
            <>
              <div className="section-label">このポジションの魅力</div>
              <div className="job-block">{article.job.appeal}</div>
            </>
          )}
        </div>
      ) : (
        <div className="empty">この記事に紐づく求人票はまだ設定されていません。</div>
      )}
    </div>
  );
}
