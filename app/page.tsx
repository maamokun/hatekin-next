"use client";
import Image from "next/image";
import React from "react";
import Hatekin from "@/assets/hatekin.png";
import { Howl } from "howler";

const hyougencom = new Howl({
  src: ["https://cdn.mikn.dev/web/Hatekin/audio/hyougencom.mp3"],
});

export default function Page() {
  return (
    <main>
      <div className={"flex flex-col items-center justify-center"}>
        <Image
          alt="表現の自由.com"
          className="h-auto w-9/12 cursor-pointer"
          src={Hatekin}
          onClick={() => hyougencom.play()}
        />
        <h1 className="mt-3 text-xl">開發時間の無駄遣いだなぁ、そうに決まってる</h1>
      </div>
    </main>
  );
}
