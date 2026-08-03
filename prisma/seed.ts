import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.comment.deleteMany();
  await prisma.statusHistoryEntry.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.article.deleteMany();
  await prisma.job.deleteMany();

  const job = await prisma.job.create({
    data: {
      title: "クラウドエンジニア",
      dept: "プラットフォーム開発部",
      work: "クラウド基盤の設計・構築・運用を担当できます。",
      appeal:
        "最新のクラウド技術に触れながら、全社基盤を支える仕事ができます。",
    },
  });

  await prisma.article.create({
    data: {
      jobId: job.id,
      title: "クラウドエンジニア募集中!",
      desc: "インフラ好きな仲間を探しています。経験者歓迎。",
      views: 12,
    },
  });

  await prisma.candidate.create({
    data: {
      name: "田中 花子",
      referrer: "鈴木(開発部)",
      jobId: job.id,
      status: "INTERVIEW",
      rating: 4,
      statusHistory: {
        create: [{ status: "APPLIED" }, { status: "INTERVIEW" }],
      },
      comments: {
        create: [
          {
            who: "面接官A",
            text: "技術力は十分。コミュニケーションも良好。",
            rating: 4,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
