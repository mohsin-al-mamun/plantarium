import type { Metadata } from "next";
import "./globals.css";
import { fraunces, inter } from "./fonts";

export const metadata: Metadata = {
  title: "Plantarium — Your Living Plant Journal",
  description: "Document every bloom, track growth over seasons, and build your personal botanical archive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
