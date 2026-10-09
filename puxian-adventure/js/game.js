/* =========================================================
   善財童子 × 普賢十願 Adventure Game
   game.js

   Screen flow:
   Language Gateway
        ↓
   Screen 01 — Opening
        ↓
   Screen 02 — 第一願 introduction
        ↓
   Screen 03 — 四個人都在拜佛
   ========================================================= */

(() => {
  "use strict";

  const { currentLanguage } = window.PuxianI18n;

  /* =======================================================
     IN-GAME LANGUAGE SWITCHER
     Stay on the current scene while changing language.
     ======================================================= */

  let languageMenu = null;


  function closeInGameLanguageMenu() {

    if (!languageMenu) return;

    languageMenu.remove();
    languageMenu = null;

  }


  function ensureLanguageMenuStyles() {

    if (document.querySelector("#puxian-language-menu-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "puxian-language-menu-styles";
    style.textContent = `
      .puxian-language-menu {
        position: fixed;
        z-index: 9999;
        min-width: 190px;
        padding: 10px;
        border: 1px solid rgba(205, 151, 45, 0.55);
        border-radius: 16px;
        background: #fffdf7;
        box-shadow: 0 16px 42px rgba(45, 31, 12, 0.24);
      }

      .puxian-language-menu__title {
        margin: 2px 8px 8px;
        color: #7d5109;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.03em;
      }

      .puxian-language-menu__choice {
        display: block;
        width: 100%;
        margin: 3px 0;
        padding: 10px 12px;
        border: 0;
        border-radius: 10px;
        background: transparent;
        color: #211d18;
        font: inherit;
        font-weight: 700;
        text-align: left;
        cursor: pointer;
      }

      .puxian-language-menu__choice:hover,
      .puxian-language-menu__choice:focus-visible {
        background: #fff0c7;
        outline: none;
      }

      .puxian-language-menu__choice.is-current {
        background: #ffe6a0;
        color: #6f4300;
      }
    `;

    document.head.appendChild(style);

  }


  function openInGameLanguageMenu(anchorButton) {

    if (!anchorButton) return;

    if (languageMenu) {
      closeInGameLanguageMenu();
      return;
    }

    ensureLanguageMenuStyles();

    const lang = currentLanguage();
    const labels = {
      zh: "繁體中文",
      en: "English",
      vi: "Tiếng Việt"
    };

    const titles = {
      zh: "選擇語言",
      en: "Choose language",
      vi: "Chọn ngôn ngữ"
    };

    const menu = document.createElement("div");
    menu.className = "puxian-language-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", titles[lang] || titles.zh);

    const title = document.createElement("div");
    title.className = "puxian-language-menu__title";
    title.textContent = `🌐 ${titles[lang] || titles.zh}`;
    menu.appendChild(title);

    ["zh", "en", "vi"].forEach(language => {

      const choice = document.createElement("button");
      choice.type = "button";
      choice.className = "puxian-language-menu__choice";
      choice.textContent = labels[language];
      choice.dataset.switchLanguage = language;
      choice.setAttribute("role", "menuitem");

      if (language === lang) {
        choice.classList.add("is-current");
        choice.setAttribute("aria-current", "true");
      }

      choice.addEventListener("click", () => {

        window.PuxianLanguage
          ?.changeLanguage?.(language);

        closeInGameLanguageMenu();

      });

      menu.appendChild(choice);

    });

    document.body.appendChild(menu);
    languageMenu = menu;

    const rect = anchorButton.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const gap = 8;

    let left = rect.right - menuRect.width;
    let top = rect.bottom + gap;

    left = Math.max(10, Math.min(left, window.innerWidth - menuRect.width - 10));

    if (top + menuRect.height > window.innerHeight - 10) {
      top = Math.max(10, rect.top - menuRect.height - gap);
    }

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;

    const firstChoice = menu.querySelector(".puxian-language-menu__choice");
    firstChoice?.focus();

  }


  document.addEventListener("click", event => {

    if (!languageMenu) return;

    if (languageMenu.contains(event.target)) return;

    if (event.target.closest(window.PuxianVow01.languageButtonSelector)) {
      return;
    }

    closeInGameLanguageMenu();

  });


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeInGameLanguageMenu();
    }

  });


  const runtime = window.PuxianVow01.createRuntime(openInGameLanguageMenu);
  const initialise = runtime.initialise;
  window.PuxianGame = runtime.api;

  /* =======================================================
     START
     ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialise
    );

  } else {

    initialise();

  }

})();