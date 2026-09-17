import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Secured RAG Platform",
  description:
    "Front-end prototype: connect knowledge sources to a private, secured retrieval index.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
