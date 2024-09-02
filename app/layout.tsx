import type { Metadata } from "next";
import { Sawarabi_Mincho } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const smincho = Sawarabi_Mincho({
    subsets: ["latin"],
    weight: "400",
});

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
            <script
                defer
                src="https://analytics.mikandev.tech/script.js"
                data-website-id="91df8a6b-c58f-4864-a609-0f4267acf2ba"
            ></script>
            <body className={smincho.className}>
                <Providers>{children} </Providers>
            </body>
        </html>
    );
}
