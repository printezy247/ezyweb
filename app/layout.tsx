import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EzyWeb — Trading Intelligence Platform",
  description:
    "Free trading tools for traders burned by subscriptions and scams. Telegram bots + web dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-void text-text antialiased">{children}</body>
    </html>
  );
}
