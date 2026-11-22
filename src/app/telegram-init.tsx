"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        requestFullscreen?: () => void;
      };
    };
  }
}

export default function TelegramInit() {
  useEffect(() => {
    const initTelegram = () => {
      const app = window.Telegram?.WebApp;

      if (!app) return;

      app.ready();
      app.expand();

      if (app.requestFullscreen) {
        try {
          app.requestFullscreen();
        } catch (error) {
          console.log("Fullscreen is not available:", error);
        }
      }
    };

    if (window.Telegram?.WebApp) {
      initTelegram();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = initTelegram;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return null;
}
