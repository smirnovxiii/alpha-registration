
"use client";

import { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Не удалось сохранить регистрацию");
      }

      setSubmitted(true);
      form.reset();

    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Произошла ошибка"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">

        <header className="mb-12 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-[0.2em] text-[#252824]">
            ALPHA<span className="text-[#9a9d92]">.</span>
          </div>
          <div className="text-xs font-medium tracking-[0.18em] text-[#888b82]">
            GUEST REGISTRATION
          </div>
        </header>

        {submitted ? (
          <section className="mx-auto max-w-xl rounded-[32px] bg-white p-10 text-center shadow-sm sm:p-16">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf2ec] text-3xl text-[#526b56]">
              ✓
            </div>
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#899184]">
              ALPHA COURSE
            </p>
            <h1 className="mb-5 text-3xl font-semibold text-[#252824] sm:text-4xl">
              Спасибо!
            </h1>
            <p className="leading-7 text-[#777b72]">
              Регистрация успешно сохранена. Мы рады, что ты помогаешь
              новым людям познакомиться с Альфой!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 text-sm font-medium text-[#526b56] underline underline-offset-4"
            >
              Зарегистрировать ещё одного гостя
            </button>
          </section>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

            <section className="py-4 lg:sticky lg:top-12 lg:py-12">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#e5e6df] bg-white px-4 py-2 text-xs tracking-wider text-[#777b72]">
                <span className="h-2 w-2 rounded-full bg-[#81977d]" />
                WELCOME TO ALPHA
              </div>

              <h1 className="mb-7 text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-[#252824] sm:text-6xl">
                Каждая история
                <br />
                начинается
                <br />
                <span className="text-[#899681]">со знакомства.</span>
              </h1>

              <p className="max-w-md text-base leading-8 text-[#777b72]">
                Альфа — это место, где можно задавать вопросы,
                знакомиться с христианством, общаться и вместе
                исследовать веру.
              </p>

              <div className="mt-12 hidden border-t border-[#e4e5df] pt-7 sm:block">
                <p className="text-xs tracking-[0.2em] text-[#a0a296]">
                  A PLACE TO EXPLORE FAITH
                </p>
                <p className="mt-2 text-sm text-[#777b72]">
                  Открытость · Общение · Новые знакомства
                </p>
              </div>
            </section>

            <section className="rounded-[28px] border border-[#eeeee9] bg-white p-6 shadow-[0_12px_50px_rgba(30,35,25,0.04)] sm:p-10">

              <div className="mb-9">
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#899681]">
                  РЕГИСТРАЦИЯ ГОСТЯ
                </p>
                <h2 className="text-2xl font-semibold text-[#252824] sm:text-3xl">
                  Давай познакомимся.
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#92948c]">
                  Заполни информацию о человеке, которого приглашаешь.
                  Все поля обязательны.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Имя гостя">
                    <input name="firstName" required placeholder="Имя" className="field" />
                  </Field>

                  <Field label="Фамилия гостя">
                    <input name="lastName" required placeholder="Фамилия" className="field" />
                  </Field>
                </div>

                <Field label="Возраст">
                  <input name="age" type="number" min="1" max="120" required placeholder="Сколько лет?" className="field" />
                </Field>

                <Field label="Номер телефона">
                  <input name="phone" type="tel" required placeholder="+375 XX XXX XX XX" className="field" />
                </Field>

                <Field label="Расскажи немного о госте">
                  <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="Чем занимается, что ему интересно? Что нам полезно знать для знакомства и рассадки?"
                    className="field resize-none"
                  />
                </Field>

                <div className="border-t border-[#eeeeea] pt-6">
                  <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-[#899681]">
                    КТО ПРИГЛАШАЕТ?
                  </p>

                  <Field label="Имя и фамилия приглашающего">
                    <input name="inviter" required placeholder="Твоё имя и фамилия" className="field" />
                  </Field>
                </div>

                <p className="text-xs leading-5 text-[#a0a197]">
                  Контактные данные используются организаторами
                  для подготовки и организации Альфа-курса.
                </p>

                {error && (
                  <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#303a32] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#465447] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? "Сохраняем..." : "Зарегистрировать гостя →"}
                </button>

              </form>
            </section>
          </div>
        )}

        <footer className="mt-12 text-center text-xs tracking-wide text-[#a0a296]">
          ALPHA COURSE · С МЫСЛЬЮ О КАЖДОМ
        </footer>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#454940]">
        {label} <span className="text-[#899681]">*</span>
      </span>
      {children}
    </label>
  );
}
