interface logEntry {
  version: string;
  changes: string[];
}

export const changeLog: logEntry[] = [
  {
    version: "v5.1.5（2026/08/08）",
    changes: ["効果音2つ追加！"],
  },
  {
    version: "v5.1.4（2026/08/08）",
    changes: ["このページを作った。"],
  },
  {
    version: "v5.1.3（2026/08/08）",
    changes: [
      "メッセージ送信されてたのに送信失敗と出てたバグを修正（この前でもちゃんと届いてました）",
    ],
  },
  {
    version: "v5.1.2（2026/08/08）",
    changes: [
      "問い合わせフォームのボタンの見た目をちょっと変更",
      "メッセージ送信失敗字の音声を追加",
    ],
  },
  {
    version: "v5.1.1（2026/07/29）",
    changes: ["音声再生のライブラリをHowler.jsに変更"],
  },
  {
    version: "v5.1.0（2026/07/28）",
    changes: [
      "なんと2年ぐらい待ってましたが元祖ドメインの「表現の自由.com」をやっと手に入れることができました！これからもサイト運営（放置）頑張っていこうと思います！",
    ],
  },
];

export default function Page() {
  return (
    <main>
      <div className={"flex flex-col items-center justify-center mb-36 mt-10"}>
        <h1 className="mt-3 text-4xl">開發の自由</h1>
        <h2 className="mt-3 text-md">
          「開發者さん！開發者さんの力をお借りしたいです！」って言われたらさぁ、やぁりましょう！って言いたいじゃないですか？
        </h2>
        <h2 className="mt-3 text-sm">
          機能追加の要望は問い合わせフォームまで！（ちゃんと届いてて時々見ています）
        </h2>
        <div className="mt-5 flex w-full max-w-2xl flex-col gap-4 px-4">
          {changeLog.map((log) => (
            <div className="card bg-base-200" key={log.version}>
              <div className="card-body">
                <h2 className="card-title">{log.version}</h2>
                <ul className="list-disc pl-5">
                  {log.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
