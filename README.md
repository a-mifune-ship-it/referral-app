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
- [Prisma](https://www.prisma.io/) + SQLite(ローカルファイルDB)

## セットアップ

```bash
npm install
cp .env.example .env   # 初回のみ
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

## データについて

現在はSQLiteファイル(`dev.db`)にローカル保存しています。候補者データはまだサンプル用途のみを想定しており、実在の個人情報(本番PII)を保存する場合は社内システム部門との相談が必要です。
