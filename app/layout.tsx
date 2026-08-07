import type { Metadata } from "next";
import { Sawarabi_Mincho } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";

import "./globals.css";

const smincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "表現の自由.com",
  description: "ドメイン復活来た〜来た！！！来たぁ...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <Script
          defer
          src="https://cdn.mikn.dev/analytics/script"
          data-website-id="f73dde17-e5d1-45d8-9a19-562d112c7ce6"
          data-host-url="https://analytics.mikandev.com"
        />
      </head>
      <body className={smincho.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
