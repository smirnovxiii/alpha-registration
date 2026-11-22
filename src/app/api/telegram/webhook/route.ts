
import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_API = "https://api.telegram.org";

export async function POST(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token || !webhookSecret) {
    return NextResponse.json(
      { error: "Telegram environment variables are missing" },
      { status: 500 }
    );
  }

  if (
    request.headers.get("x-telegram-bot-api-secret-token") !==
    webhookSecret
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const update = await request.json();
    const message = update.message;

    if (!message?.text || !message?.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    if (message.text.trim().startsWith("/start")) {
      const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: message.chat.id,
          text:
            "Добро пожаловать на Альфа-курс! ❤️\n\n" +
            "Это пространство, где можно познакомиться с христианством, " +
            "задать важные вопросы, пообщаться и найти ответы.\n\n" +
            "Чтобы зарегистрироваться, нажмите на кнопку ниже.",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Открыть ALPHA",
                  web_app: {
                    url: "https://alpha-registration-production.up.railway.app/",
                  },
                },
              ],
            ],
          },
        }),
      });

      if (!response.ok) {
        console.error("Telegram sendMessage failed:", response.status);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }
}
