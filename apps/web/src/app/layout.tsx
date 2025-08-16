import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lernt",
  description: "Lernt web app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased text-gray-900">
        <div className="mx-auto max-w-5xl p-6">{children}</div>
      </body>
    </html>
  );
}
