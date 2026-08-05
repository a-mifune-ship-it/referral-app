# リファラル採用管理アプリ

社内リファラル採用のための管理ツールです。求人票の作成・記事の共有・選考ステータス管理をひとつにまとめています。

## 機能

- 求人票の作成・管理(業務内容 / このポジションの魅力)
- リファラル記事の掲載、共有用URLの発行、閲覧数の確認
- 選考ステータス管理(応募 → 書類選考 → 面接 → 内定 / 不合格)、ステータス変更履歴
- 候補者へのコメント機能、★評価

現時点でスコープ外の機能(将来対応):

- メールの自動送信(既存のメールサービスとの連携が必要)
- 本番用の個人情報保存(社内システム部門との相談が必要)
- ログイン認証

## 技術スタック

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Prisma](https://www.prisma.io/) + PostgreSQL

## ローカルセットアップ

PostgreSQLが起動している前提です(Docker例: `docker run --name referral-pg -e POSTGRES_PASSWORD=localdev -e POSTGRES_DB=referral_app -p 5432:5432 -d postgres:16`)。

```bash
npm install
cp .env.example .env   # 初回のみ。DATABASE_URLを自分のDBに合わせて編集
npm run db:migrate      # DBマイグレーション適用
npm run db:seed         # サンプルデータ投入(任意)
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開くと利用できます。

## その他コマンド

```bash
npm run build       # 本番ビルド
npm run start        # 本番起動
npm run lint          # Lint
npm run db:studio    # Prisma Studio(DBの中身をGUIで確認)
```

## Vercelへのデプロイ

1. Vercelのダッシュボードでこのリポジトリ(`main`ブランチ)をImportする
2. Postgresデータベースを用意する(Vercel Postgres / Neon / Supabase など)。Vercel PostgresならVercelプロジェクトの Storage タブから作成すると`DATABASE_URL`が自動でプロジェクトの環境変数に設定される
3. 他のホスティングでDBを用意した場合は、Vercelプロジェクトの環境変数に`DATABASE_URL`(接続文字列)を手動で設定する
4. デプロイ時に`prisma migrate deploy`が実行されるよう、ビルドコマンドを `prisma migrate deploy && next build` に変更する(Vercelのプロジェクト設定 → Build & Development Settings)
5. 初回デプロイ後、必要であれば `npx prisma db seed` をローカルから本番DBに向けて実行してサンプルデータを投入する(任意)

## データについて

現在はPostgreSQLにデータを保存しています。候補者データはまだサンプル用途のみを想定しており、実在の個人情報(本番PII)を保存する場合は社内システム部門との相談が必要です。
