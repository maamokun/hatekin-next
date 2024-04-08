"use client";
export default function HomePage() {
    return (
        <div>
            <style jsx>{`
        body {
          text-align: center;
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
        body > a > img {
          max-width: 100vw;
          max-height: 100vh;
        }
      `}</style>
            <body>
                <a
                    href="https://www.nicovideo.jp/watch/sm36423272"
                    target="_blank"
                >
                    <img
                        src="https://cdn.mikn.dev/web/Hatekin/hatekin-original.png"
                        alt="表現の自由.com"
                    />
                </a>
                <p>ドメインの無駄遣いだなあ、そうに決まってる</p>
                {/* 「表現の自由.com」のドメインお借りしたいんです！って言われたらさぁ、やりましょう！って言いたいじゃないですか */}
                {/* 連絡はこちら : info@表現の自由.com */}
                {/* このサイトは表現の自由.JPにより復元されてます。上のメアドは関係ありません。 */}
                {/* なんだこの自己満サイト */}
            </body>
        </div>
    );
}
