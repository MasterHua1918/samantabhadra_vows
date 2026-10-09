/* 善財童子 × 普賢十願 — language.js (corrected) */
(() => {
  "use strict";

  const STORAGE_KEY = "puxianAdventureLanguage";
  const SUPPORTED = ["zh", "en", "vi"];

  const translations = {
    zh: {
      progress: "善財童子",
      journeyTitle: "普賢十願大冒險",
      vowTitle: "第一願・禮敬諸佛",
      hook: "「你來了！一起出發吧！」",
      start: "出發！",
      vowNumber: "第一願",
      sutraLine: "「一者、禮敬諸佛。」",
      speaker: "善財",
      dialogue: "禮敬諸佛……是不是只要見到佛，就恭恭敬敬地拜呢？",
      explore: "和善財一起尋找答案"
    },

    en: {
      progress: "Sudhana",
      journeyTitle: "The Great Adventure of Samantabhadra’s Ten Vows",
      vowTitle: "Vow 1 · To Honor and Respect All Buddhas",
      hook:
        "You’re here! Let’s set off together!",
      start: "Let’s Go!",
      vowNumber: "Vow 1",
      sutraLine: "“First: To honor and respect all Buddhas.”",
      speaker: "Sudhana",
      dialogue:
        "To honor and respect all Buddhas… does that simply mean bowing respectfully whenever I see a Buddha?",
      explore: "Search for the answer with Sudhana"
    },

    vi: {
      progress: "Thiện Tài Đồng Tử",
      journeyTitle:
        "Đại Phiêu Lưu Mười Đại Nguyện Phổ Hiền",
      vowTitle: "Nguyện thứ nhất · Lễ kính chư Phật",
      hook:
        "Bạn đến rồi! Cùng lên đường nhé!",
      start: "Lên đường!",
      vowNumber: "Nguyện thứ nhất",
      sutraLine: "“Thứ nhất: Lễ kính chư Phật.”",
      speaker: "Thiện Tài",
      dialogue:
        "Lễ kính chư Phật… có phải chỉ cần gặp Phật thì cung kính đảnh lễ là đủ không?",
      explore: "Cùng Thiện Tài đi tìm câu trả lời"
    }
  };

  let currentLanguage = null;

  function normaliseLanguage(lang) {
    if (!lang) return null;

    const value = String(lang).toLowerCase();

    if (value.startsWith("zh")) return "zh";
    if (value.startsWith("en")) return "en";
    if (value.startsWith("vi")) return "vi";

    return null;
  }

  function getSavedLanguage() {
    try {
      return normaliseLanguage(
        localStorage.getItem(STORAGE_KEY)
      );
    } catch (_) {
      return null;
    }
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }

  function applyTranslations(lang) {
    const pack =
      translations[lang] || translations.zh;

    document.documentElement.lang =
      lang === "zh"
        ? "zh-Hant"
        : lang === "vi"
        ? "vi"
        : "en";

    document
      .querySelectorAll("[data-i18n]")
      .forEach((el) => {
        const key = el.dataset.i18n;

        if (pack[key] !== undefined) {
          el.textContent = pack[key];
        }
      });

    const select =
      document.querySelector("#language-select");

    if (select) {
      select.value = lang;
    }
  }

  function gatewayScreen() {
    return document.querySelector(
      '[data-screen="language"]'
    );
  }

  function openingScreen() {
    return document.querySelector(
      '[data-screen="opening"]'
    );
  }

  function hide(el) {
    if (!el) return;

    el.hidden = true;

    el.classList.remove(
      "is-active",
      "active"
    );
  }

  function show(el) {
    if (!el) return;

    el.hidden = false;

    el.classList.add(
      "is-active",
      "active",
      "fade-in"
    );

    setTimeout(() => {
      el.classList.remove("fade-in");
    }, 450);
  }

  function enterGame(lang, remember = true) {
    lang = normaliseLanguage(lang);

    if (
      !lang ||
      !SUPPORTED.includes(lang)
    ) {
      return;
    }

    currentLanguage = lang;

    if (remember) {
      saveLanguage(lang);
    }

    applyTranslations(lang);

    hide(gatewayScreen());
    show(openingScreen());

    document.dispatchEvent(
      new CustomEvent(
        "puxian:languagechange",
        {
          detail: {
            language: lang
          }
        }
      )
    );
  }

  function changeLanguage(lang) {
    lang = normaliseLanguage(lang);

    if (!lang) return;

    currentLanguage = lang;

    saveLanguage(lang);

    applyTranslations(lang);

    document.dispatchEvent(
      new CustomEvent(
        "puxian:languagechange",
        {
          detail: {
            language: lang
          }
        }
      )
    );
  }

  function showLanguageGateway() {
    hide(openingScreen());
    show(gatewayScreen());
  }

  function initialise() {

    /*
     * IMPORTANT:
     * index.html uses data-language,
     * for example:
     *
     * data-language="zh"
     * data-language="en"
     * data-language="vi"
     */

    document
      .querySelectorAll("[data-language]")
      .forEach((button) => {

        button.addEventListener(
          "click",
          () => {

            enterGame(
              button.dataset.language
            );

          }
        );

      });

    const select =
      document.querySelector(
        "#language-select"
      );

    if (select) {

      select.addEventListener(
        "change",
        () => {

          changeLanguage(
            select.value
          );

        }
      );

    }

    const saved =
      getSavedLanguage();

    if (saved) {

      enterGame(
        saved,
        false
      );

    } else {

      currentLanguage = null;

      hide(
        openingScreen()
      );

      show(
        gatewayScreen()
      );

    }
  }

  window.PuxianLanguage = {
    translations,

    getCurrentLanguage:
      () => currentLanguage,

    getSavedLanguage,

    enterGame,

    changeLanguage,

    showLanguageGateway
  };

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialise
    );

  } else {

    initialise();

  }
})();