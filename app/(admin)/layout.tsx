import { TabNav } from "./TabNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app">
      <header className="app-header">
        <div className="eyebrow">Referral Recruiting</div>
        <h1>リファラル採用 管理ツール</h1>
        <p>求人票の作成、記事の共有、選考の評価・コメントをひとつにまとめます</p>
      </header>

      <div className="notice">
        ※
        メール自動送信と、本番用の個人情報保存はこの試作品には含まれていません。メール送信は既存のメールサービスとの連携、個人情報保存は社内システム部門との相談が必要です。
      </div>

      <TabNav />

      {children}
    </div>
  );
}
