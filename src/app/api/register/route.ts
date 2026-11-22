
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const webhook = process.env.ALPHA_WEBHOOK_URL;
    const secret = process.env.ALPHA_SECRET;

    if (!webhook || !secret) {
      throw new Error("Не настроены ALPHA_WEBHOOK_URL или ALPHA_SECRET");
    }

    const fields = [
      "firstName",
      "lastName",
      "age",
      "phone",
      "description",
      "inviter",
    ];

    for (const field of fields) {
      if (!data[field] || !String(data[field]).trim()) {
        throw new Error(`Заполните поле: ${field}`);
      }
    }

    const age = Number(data.age);

    if (!Number.isInteger(age) || age < 1 || age > 120) {
      throw new Error("Проверьте возраст");
    }

    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        ...data,
        secret,
      }),
      cache: "no-store",
      redirect: "follow",
    });

    const responseText = await response.text();

    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      const preview = responseText
        .replace(/\s+/g, " ")
        .slice(0, 180);

      throw new Error(
        `Google вернул не JSON. HTTP ${response.status}. ` +
        `Тип: ${response.headers.get("content-type")}. ` +
        `Ответ: ${preview}`
      );
    }

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || `Ошибка Google: HTTP ${response.status}`
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("ALPHA registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Неизвестная ошибка",
      },
      { status: 500 }
    );
  }
}
