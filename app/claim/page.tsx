"use client";
import { Turnstile } from "next-turnstile";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { sendMessage } from "@/app/actions/claim";
import * as Swetrix from "swetrix";

export default function Page() {
  const [claim, setClaim] = useState<HTMLAudioElement>();
  const [okashiidaro, setOkashiidaro] = useState<HTMLAudioElement>();

  useEffect(() => {
    const claim = new Audio("/audio/claim.mp3");
    const okashiidaro = new Audio("/audio/okashiidaro.mp3");
    setClaim(claim);
    setOkashiidaro(okashiidaro);
  }, []);

  const [message, setMessage] = useState<string>();
  const [key, setKey] = useState<string>();

  const send = async () => {
    Swetrix.track({ ev: "claimSubmit" });
    if (!key) return;
    if (!message || message.length < 1) {
      okashiidaro?.play();
      return toast.error("メッセージを入力してください。");
    }
    if (message.length > 1000) {
      okashiidaro?.play();
      return toast.error("メッセージは1000文字以下でお願いします。");
    }

    try {
      await sendMessage(message, key);
      toast.success("メッセージを送信しました！");
      setMessage("");
    } catch (err) {
      return toast.error("メッセージを送信できませんでした。");
    }
  };

  return (
    <main>
      <Turnstile
        onVerify={(token) => setKey(token)}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || ""}
        theme="light"
      />
      <div className={"flex h-screen flex-col items-center justify-center"}>
        <h1 className="mt-3 py-3 font-bold text-3xl">問い合わせフォーム</h1>
        <textarea
          className="textarea mt-5 w-9/12"
          onChange={(e) => setMessage(e.target.value)}
          onClick={() => claim?.play()}
          placeholder="あ、おい"
          value={message}
        />
        <div className="mt-3 flex flex-row items-center justify-center px-2">
          <button
            className={"btn btn-primary w-full"}
            disabled={!key}
            onClick={send}
          >
            {!key && <span className="loading loading-spinner mr-2" />}
            送信
          </button>
        </div>
      </div>
    </main>
  );
}
