import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    openGraph: {
        title: "表現の自由.JP",
        description: "サイトの自由排除",
        images: {
            url: "https://表現の自由.jp/og.png",
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <Head>
          <script async src="https://analytics.mikandev.tech/script.js" data-website-id="2f38dccd-3407-49e8-aca1-3559668ac012"></script>
        </Head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
