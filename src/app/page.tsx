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
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen bg-[#f7f1e8] px-4 pb-8 sm:px-8"
      style={{
        paddingTop: "max(16px, env(safe-area-inset-top))",
        paddingBottom: "max(32px, env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-auto max-w-5xl alpha-appear">

        {/* ШАПКА */}
        <header className="alpha-hero relative mt-2 overflow-hidden rounded-[28px] px-6 py-10 text-center shadow-[0_16px_45px_rgba(65,20,29,0.18)] sm:rounded-[36px] sm:py-16">

          <div className="pointer-events-none absolute inset-0 opacity-80">
            <span className="absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-[#e8c17d]" />
            <span className="absolute right-[15%] top-[24%] h-3 w-3 rounded-full bg-[#e8c17d]" />
            <span className="absolute left-[24%] bottom-[18%] h-2 w-2 rounded-full bg-[#f0d49e]" />
            <span className="absolute right-[25%] bottom-[15%] h-2 w-2 rounded-full bg-[#d6a65e]" />
            <span className="absolute left-[50%] top-[12%] h-1.5 w-1.5 rounded-full bg-white" />
            <span className="absolute right-[8%] bottom-[35%] h-1.5 w-1.5 rounded-full bg-white" />
          </div>

          <div className="relative">
            <p className="mb-3 text-[10px] font-medium tracking-[0.35em] text-[#ead4b5]">
              A PLACE TO EXPLORE FAITH
            </p>

            <div className="alpha-script text-[76px] leading-none text-[#fff9ed] sm:text-[108px]">
              Альфа
            </div>

            <div className="mx-auto my-5 h-px w-16 bg-[#cba46c]" />

            <p className="text-[10px] font-medium tracking-[0.25em] text-[#f0d9b8] sm:text-xs">
              ВЕРА · ОБЩЕНИЕ · НОВЫЕ ЗНАКОМСТВА
            </p>
          </div>
        </header>

        {/* ПРИВЕТСТВИЕ */}
        <section className="px-2 pb-7 pt-9 sm:px-4 sm:pt-12">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-[#a17b51]">
            ДОБРО ПОЖАЛОВАТЬ
          </p>

          <h1 className="max-w-2xl text-[34px] font-medium leading-[1.13] tracking-[-0.045em] text-[#421d24] sm:text-5xl">
            Каждая история
            <br />
            начинается со знакомства.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#88766f] sm:text-base">
            Альфа — место, где можно задавать вопросы,
            знакомиться с христианством, общаться и вместе
            исследовать веру.
          </p>
        </section>

        {/* ФОРМА ИЛИ УСПЕХ */}
        {submitted ? (
          <section className="rounded-[28px] border border-[#eadfd1] bg-[#fffdf8] px-6 py-12 text-center shadow-[0_12px_40px_rgba(65,30,25,0.06)] sm:px-12 sm:py-16">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#d7bd91] bg-[#f8f0e2] text-3xl text-[#8a633e]">
              ✓
            </div>

            <p className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-[#a17b51]">
              ALPHA COURSE
            </p>

            <h2 className="text-3xl font-medium text-[#421d24]">
              Спасибо!
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#88766f]">
              Регистрация успешно сохранена. Мы рады, что ты
              помогаешь новым людям познакомиться с Альфой!
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-9 rounded-full bg-[#70232f] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#501923] active:scale-[0.98]"
            >
              Зарегистрировать ещё одного гостя
            </button>
          </section>
        ) : (
          <section className="overflow-hidden rounded-[28px] border border-[#eadfd1] bg-[#fffdf8] shadow-[0_12px_40px_rgba(65,30,25,0.06)] sm:rounded-[32px]">

            <div className="border-b border-[#eee4d8] px-6 py-7 sm:px-10 sm:py-9">
              <p className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-[#a17b51]">
                РЕГИСТРАЦИЯ ГОСТЯ
              </p>

              <h2 className="text-2xl font-medium tracking-tight text-[#421d24] sm:text-3xl">
                Давай познакомимся.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#928078]">
                Заполни информацию о человеке, которого приглашаешь.
                Все поля обязательны.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 px-6 py-7 sm:px-10 sm:py-9">

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Имя гостя">
                  <input name="firstName" required placeholder="Имя" className="field" />
                </Field>

                <Field label="Фамилия гостя">
                  <input name="lastName" required placeholder="Фамилия" className="field" />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Возраст">
                  <input
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    required
                    placeholder="Сколько лет?"
                    className="field"
                  />
                </Field>

                <Field label="Номер телефона">
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+375 XX XXX XX XX"
                    className="field"
                  />
                </Field>
              </div>

              <Field label="Расскажи немного о госте">
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Чем занимается, что ему интересно? Что нам полезно знать для знакомства и рассадки?"
                  className="field resize-none"
                />
              </Field>

              <div className="border-t border-[#eee4d8] pt-7">
                <p className="mb-5 text-[10px] font-semibold tracking-[0.25em] text-[#a17b51]">
                  КТО ПРИГЛАШАЕТ?
                </p>

                <Field label="Имя и фамилия приглашающего">
                  <input
                    name="inviter"
                    required
                    placeholder="Твоё имя и фамилия"
                    className="field"
                  />
                </Field>
              </div>

              <p className="text-xs leading-6 text-[#a09185]">
                Контактные данные используются организаторами
                для подготовки и организации Альфа-курса.
              </p>

              {error && (
                <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#70232f] px-6 py-[18px] text-sm font-medium tracking-wide text-white shadow-[0_8px_20px_rgba(112,35,47,0.16)] transition hover:bg-[#501923] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? "Сохраняем регистрацию..." : "Зарегистрировать гостя  →"}
              </button>
            </form>
          </section>
        )}

        {/* ПОДВАЛ */}
        <footer className="pb-3 pt-9 text-center">
          <div className="alpha-script text-3xl text-[#8b3942]">
            Альфа
          </div>
          <p className="mt-2 text-[9px] font-medium tracking-[0.25em] text-[#a58d79]">
            С МЫСЛЬЮ О КАЖДОМ
          </p>
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
      <span className="mb-2 block text-sm font-medium text-[#573c3b]">
        {label} <span className="text-[#b68a50]">*</span>
      </span>
      {children}
    </label>
  );
}
