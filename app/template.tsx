"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { FaChartPie, FaCode } from "react-icons/fa";
import { changeLog } from "@/app/changelog/page";
import claimkin from "@/assets/claimkin.png";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const version = changeLog[0].version.split("（")[0];

  useEffect(() => {
    console.log("Next.jsだ、ありがたい。");
    console.log("%cSEXKIN ANAU GUARD SYSTEM", "color: purple; font-size: 40px;");
    console.log("%c何を四天王？！", "color: red; font-size: 40px;");
    console.log(
      "「ここにコピペしろ」と言われた場合、あなたは7095110割騙されてます！って言いたいじゃないですか？",
    );
  }, []);

  return (
    <>
      {children}
      <div className={"dock"}>
        <Link className={pathname === "/" ? "dock-active" : ""} href={"/"}>
          <BsEmojiSunglasses />
          <span className={"dock-label"}>ホームページ</span>
        </Link>
        <Link className={pathname === "/claim" ? "dock-active" : ""} href={"/claim"}>
          <Image alt={"claimkin"} className="rounded-full" height={20} src={claimkin} width={20} />
          <span className={"dock-label"}>問い合わせフォーム</span>
        </Link>
        <a
          href={"https://analytics.mikandev.com/share/CwwgYlxnZlQqDNMd"}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaChartPie />
          <span className={"dock-label"}>アクセス解析</span>
        </a>
        <Link className={pathname === "/changelog" ? "dock-active" : ""} href={"/changelog"}>
          <FaCode />
          <span className={"dock-label"}>変更ログ</span>
        </Link>
        <span className={"text-center text-black text-sm"}>{version}</span>
      </div>
    </>
  );
}
