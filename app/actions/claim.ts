'use server';
import { headers } from 'next/headers';
import { validateTurnstileToken } from 'next-turnstile';

export async function sendMessage(
  message: string,
  token: string
): Promise<string> {
  const headerList = await headers();
  const ip =
    headerList.get('cf-connecting-ip') ||
    headerList.get('x-forwarded-for') ||
    headerList.get('x-real-ip') ||
    'unknown';

  if (!message || message.length < 1) {
    return 'メッセージを入力してください。';
  }

  if (message.length > 1000) {
    return 'メッセージは1000文字以下でお願いします。';
  }

  const isValid = await validateTurnstileToken({
    token,
    secretKey: process.env.TURNSTILE_SECRET_KEY || '',
  });

  if (!isValid) {
    return '無効なトークンです。';
  }

  const payload = {
    embeds: [
      {
        title: '新しいクレームです！',
        fields: [
          {
            name: 'クレーム内容',
            value: message,
          },
          {
            name: 'IPアドレス',
            value: ip,
          },
        ],
        color: 16_711_680,
      },
    ],
  };
  const formData = new FormData();
  formData.append('payload_json', JSON.stringify(payload));

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL || '', {
    method: 'POST',
    body: formData,
  });

  if (!response.status || response.status !== 204) {
    const errorText = await response.text();
    console.error('Discord webhook error:', errorText);
    return 'メッセージの送信に失敗しました。';
  }

  return response.json();
}
