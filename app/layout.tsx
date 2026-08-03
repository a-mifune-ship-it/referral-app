import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "リファラル採用管理",
  description: "求人票の作成、記事の共有、選考の評価・コメントをひとつにまとめます",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
