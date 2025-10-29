import Image from "next/image";
import React from "react";
import Hatekin from "@/assets/hatekin.png";

export default function Page() {
  return (
    <main>
      <div className={"flex flex-col items-center justify-center"}>
        <Image alt="表現の自由.JP" className="h-auto w-9/12" src={Hatekin} />
        <h1 className="mt-3 text-xl">
          開發時間の無駄遣いだなぁ、そうに決まってる
        </h1>
      </div>
    </main>
  );
}
