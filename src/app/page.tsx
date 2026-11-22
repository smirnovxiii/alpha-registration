
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
    <main className="aurora-page">
      <div className="aurora-orb orb-one" />
      <div className="aurora-orb orb-two" />
      <div className="aurora-orb orb-three" />

      <div className="aurora-container">
        <header className="aurora-header">
          <div className="brand-pill">
            <span className="brand-dot" />
            A PLACE TO EXPLORE FAITH
          </div>

          <div className="hero-content">
            <div className="hero-symbol">✳</div>
            <p className="hero-eyebrow">ВЕРА · ОБЩЕНИЕ · НОВЫЕ ЗНАКОМСТВА</p>
            <h1>
              Альфа<span>.</span>
            </h1>
            <p className="hero-description">
              Место, где можно быть собой,
              задавать вопросы и открывать новое.
            </p>
          </div>

          <div className="hero-bottom">
            <span>WELCOME TO ALPHA</span>
            <span>✦</span>
          </div>
        </header>

        <section className="intro-section">
          <div className="intro-label">
            <span className="intro-line" />
            ДОБРО ПОЖАЛОВАТЬ
          </div>

          <h2>
            Каждая история
            <br />
            начинается <span>со знакомства.</span>
          </h2>

          <p>
            Альфа — место, где можно знакомиться с христианством,
            общаться, задавать любые вопросы и вместе исследовать веру.
          </p>
        </section>

        {submitted ? (
          <section className="form-card success-card">
            <div className="success-icon">
              <span>✓</span>
            </div>

            <div className="section-tag">ALPHA COMMUNITY</div>
            <h2>Спасибо!</h2>
            <p>
              Регистрация успешно сохранена.
              Спасибо, что помогаешь новым людям познакомиться с Альфой!
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="submit-button"
            >
              Зарегистрировать ещё одного гостя <span>→</span>
            </button>
          </section>
        ) : (
          <section className="form-card">
            <div className="form-heading">
              <div>
                <div className="section-tag">
                  <span className="tag-dot" />
                  РЕГИСТРАЦИЯ ГОСТЯ
                </div>
                <h2>Давай познакомимся.</h2>
                <p>
                  Расскажи нам немного о человеке,
                  которого приглашаешь на Альфу.
                </p>
              </div>

              <div className="form-decoration">✳</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <Field label="Имя гостя" number="01">
                  <input
                    name="firstName"
                    required
                    placeholder="Например, Анна"
                    className="aurora-input"
                  />
                </Field>

                <Field label="Фамилия гостя" number="02">
                  <input
                    name="lastName"
                    required
                    placeholder="Фамилия"
                    className="aurora-input"
                  />
                </Field>

                <Field label="Возраст" number="03">
                  <input
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    required
                    placeholder="Сколько лет?"
                    className="aurora-input"
                  />
                </Field>

                <Field label="Номер телефона" number="04">
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+375 XX XXX XX XX"
                    className="aurora-input"
                  />
                </Field>
              </div>

              <div className="form-divider" />

              <Field label="Расскажи немного о госте" number="05">
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Чем занимается, что ему интересно? Что нам полезно знать для знакомства и рассадки?"
                  className="aurora-input aurora-textarea"
                />
              </Field>

              <div className="inviter-block">
                <div className="inviter-heading">
                  <div className="inviter-icon">♡</div>
                  <div>
                    <h3>Кто приглашает?</h3>
                    <p>Укажи своё имя, чтобы мы знали, кто пригласил гостя.</p>
                  </div>
                </div>

                <Field label="Имя и фамилия приглашающего" number="06">
                  <input
                    name="inviter"
                    required
                    placeholder="Твоё имя и фамилия"
                    className="aurora-input"
                  />
                </Field>
              </div>

              <div className="privacy-note">
                <span>✧</span>
                <p>
                  Контактные данные используются организаторами
                  для подготовки и организации Альфа-курса.
                </p>
              </div>

              {error && (
                <div className="error-message" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                <span>
                  {loading ? "Сохраняем регистрацию..." : "Зарегистрировать гостя"}
                </span>
                {!loading && <span className="button-arrow">→</span>}
              </button>

              <p className="form-footnote">
                С любовью и мыслью о каждом <span>✦</span>
              </p>
            </form>
          </section>
        )}

        <footer className="aurora-footer">
          <div className="footer-logo">альфа.</div>
          <p>С МЫСЛЬЮ О КАЖДОМ</p>
        </footer>
      </div>
    </main>
  );
}

function Field({
  label,
  number,
  children,
}: {
  label: string;
  number: string;
  children: React.ReactNode;
}) {
  return (
    <label className="aurora-field">
      <span className="field-heading">
        <span>{label}</span>
        <span className="field-number">{number}</span>
      </span>
      {children}
    </label>
  );
}
