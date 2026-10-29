/* Persistent utility controls; uses the accepted language and Vow 1 owners. */
(() => {
  "use strict";
  function initialise() {
    const menuButton = document.querySelector("#opening-menu-button");
    const soundButton = document.querySelector("#opening-sound-button");
    if (!menuButton || !soundButton) return;
    const controls = document.createElement("nav");
    controls.id = "journey-controls";
    controls.append(menuButton, soundButton);
    document.body.appendChild(controls);
    const dialog = document.createElement("dialog");
    dialog.id = "journey-menu";
    dialog.setAttribute("aria-labelledby", "journey-menu-title");
    dialog.innerHTML = `
      <h2 id="journey-menu-title"></h2>
      <div id="journey-menu-main">
        <button type="button" id="journey-continue"></button>
        <label for="journey-language" id="journey-language-label"></label>
        <select id="journey-language"><option value="zh">繁體中文</option><option value="vi">Tiếng Việt</option><option value="en">English</option></select>
        <button type="button" id="journey-sound"></button>
        <button type="button" id="journey-restart"></button>
        <button type="button" id="journey-leave"></button>
      </div>
      <div id="journey-confirm" hidden>
        <p id="journey-confirm-text"></p>
        <button type="button" id="journey-confirm-yes"></button>
        <button type="button" id="journey-confirm-cancel"></button>
      </div>`;
    document.body.appendChild(dialog);
    const get = id => document.getElementById(id);
    const words = {
      zh: { title: "旅程選單", continue: "繼續旅程", language: "語言", restart: "重新開始目前探索", leave: "離開旅程", on: "聲音：開", off: "聲音：關", restartText: "重新開始目前探索？", leaveText: "離開旅程，返回冒險起點？", yesRestart: "重新開始", cancel: "取消" },
      en: { title: "Journey Menu", continue: "Continue Journey", language: "Language", restart: "Restart Current Exploration", leave: "Leave Adventure", on: "Sound ON", off: "Sound OFF", restartText: "Restart the current exploration?", leaveText: "Leave the journey and return to the adventure opening?", yesRestart: "Restart", cancel: "Cancel" },
      vi: { title: "Menu hành trình", continue: "Tiếp tục hành trình", language: "Ngôn ngữ", restart: "Bắt đầu lại phần khám phá hiện tại", leave: "Rời hành trình", on: "Âm thanh BẬT", off: "Âm thanh TẮT", restartText: "Bắt đầu lại phần khám phá hiện tại?", leaveText: "Rời hành trình và trở về màn mở đầu?", yesRestart: "Bắt đầu lại", cancel: "Hủy" }
    };
    const start = get("start-button");
    const startOver = document.createElement("button");
    startOver.type = "button"; startOver.id = "journey-start-over";
    startOver.className = start.className;
    start.insertAdjacentElement("afterend", startOver);
    const saveNote = document.createElement("p");
    saveNote.id = "journey-save-note";
    startOver.insertAdjacentElement("afterend", saveNote);
    const saveWords = {
      zh: { begin: "出發！", continue: "繼續旅程", over: "重新開始", confirm: "重新開始第一願旅程？這會清除第一願進度與印記，保留語言與聲音設定。", saved: "旅程進度保留在此瀏覽器。", unavailable: "此瀏覽器目前無法儲存進度；關閉或重新整理後可能無法繼續。" },
      en: { begin: "Let’s Go!", continue: "Continue Journey", over: "Start Over", confirm: "Start Vow 1 over? This clears Vow 1 progress and its seal, while keeping Language and Sound settings.", saved: "Journey progress is saved in this browser.", unavailable: "This browser cannot currently save progress; continuation may be unavailable after closing or refreshing." },
      vi: { begin: "Lên đường!", continue: "Tiếp tục hành trình", over: "Bắt đầu lại", confirm: "Bắt đầu lại Nguyện 1? Tiến độ và ấn Nguyện 1 sẽ bị xóa; ngôn ngữ và âm thanh được giữ nguyên.", saved: "Tiến độ hành trình được lưu trong trình duyệt này.", unavailable: "Trình duyệt hiện không thể lưu tiến độ; có thể không tiếp tục được sau khi đóng hoặc tải lại." }
    };
    let confirmation = null;
    let lastScreen = null;
    const currentScreen = () => {
      const visible = Array.from(document.querySelectorAll(".screen")).filter(screen => !screen.hidden);
      const adventure = visible.filter(screen => screen.dataset.screen !== "language");
      // Prefer an adventure over a briefly overlapping gateway/outgoing scene.
      return adventure.find(screen => !screen.classList.contains("fade-out")) || adventure[0] || visible[0];
    };
    function render() {
      restoreControls();
      const language = window.PuxianLanguage.getCurrentLanguage() || "zh";
      const ui = words[language] || words.zh;
      const savedUi = saveWords[language] || saveWords.zh;
      const resumable = !!window.PuxianProgress.resumeScreen();
      start.textContent = resumable ? savedUi.continue : savedUi.begin;
      startOver.textContent = savedUi.over; startOver.hidden = !resumable;
      saveNote.hidden = !resumable;
      saveNote.textContent = window.PuxianProgress.isSaved() ? savedUi.saved : savedUi.unavailable;
      const enabled = window.PuxianAudio.isEnabled();
      controls.setAttribute("aria-label", ui.title);
      menuButton.title = ui.title;
      menuButton.setAttribute("aria-label", ui.title);
      menuButton.setAttribute("aria-expanded", String(dialog.open));
      menuButton.setAttribute("aria-controls", dialog.id);
      soundButton.textContent = enabled ? "🔊" : "🔇";
      soundButton.title = enabled ? ui.on : ui.off;
      soundButton.setAttribute("aria-label", soundButton.title);
      soundButton.setAttribute("aria-pressed", String(enabled));
      get("journey-menu-title").textContent = ui.title;
      get("journey-continue").textContent = ui.continue;
      get("journey-language-label").textContent = ui.language;
      get("journey-language").value = language;
      get("journey-sound").textContent = enabled ? ui.on : ui.off;
      get("journey-sound").setAttribute("aria-pressed", String(enabled));
      get("journey-restart").textContent = ui.restart;
      get("journey-leave").textContent = ui.leave;
      get("journey-menu-main").hidden = !!confirmation;
      get("journey-confirm").hidden = !confirmation;
      if (confirmation) {
        get("journey-confirm-text").textContent = confirmation === "startover" ? savedUi.confirm : confirmation === "restart" ? ui.restartText : ui.leaveText + " " + (window.PuxianProgress.isSaved() ? savedUi.saved : savedUi.unavailable);
        get("journey-confirm-yes").textContent = confirmation === "startover" ? savedUi.over : confirmation === "restart" ? ui.yesRestart : ui.leave;
        get("journey-confirm-cancel").textContent = confirmation === "restart" || confirmation === "startover" ? ui.cancel : ui.continue;
      }
    }
    function close() {
      confirmation = null;
      dialog.close();
      render();
      menuButton.focus();
    }
    function open() {
      if (dialog.open) { close(); return; }
      // Dismiss the accepted lightweight globe popup before opening a native modal.
      document.querySelector(".puxian-language-menu")?.remove();
      confirmation = null;
      render();
      dialog.showModal(); // native focus containment and inert background; no scene reset
      render();
      get("journey-continue").focus();
    }
    const toggleSound = () => window.PuxianAudio.setEnabled(!window.PuxianAudio.isEnabled());
    menuButton.addEventListener("click", open);
    soundButton.addEventListener("click", toggleSound);
    get("journey-sound").addEventListener("click", toggleSound);
    get("journey-continue").addEventListener("click", close);
    get("journey-language").addEventListener("change", event => window.PuxianLanguage.changeLanguage(event.target.value));
    ["restart", "leave"].forEach(action => get("journey-" + action).addEventListener("click", () => {
      if (action === "leave") window.PuxianGame.commitCheckpoint(currentScreen()?.dataset.screen);
      confirmation = action;
      render();
      get("journey-confirm-cancel").focus();
    }));
    get("journey-confirm-cancel").addEventListener("click", () => {
      const action = confirmation;
      if (action === "startover") {
        close();
        startOver.focus();
        return;
      }
      confirmation = null;
      render();
      get("journey-" + action).focus();
    });
    get("journey-confirm-yes").addEventListener("click", () => {
      const action = confirmation;
      const name = currentScreen()?.dataset.screen;
      close();
      if (action === "startover") window.PuxianGame.startJourneyOver();
      else if (action === "restart") window.PuxianGame.restartCurrentExploration(name);
      else if (action === "leave") window.PuxianGame.leaveAdventure();
    });
    dialog.addEventListener("cancel", event => {
      event.preventDefault();
      if (confirmation) get("journey-confirm-cancel").click();
      else close();
    });
    startOver.addEventListener("click", () => {
      document.querySelector(".puxian-language-menu")?.remove();
      confirmation = "startover"; render(); dialog.showModal(); render();
      get("journey-confirm-cancel").focus();
    });
    document.addEventListener("puxian:progresschange", render);
    document.addEventListener("puxian:languagechange", render);
    document.addEventListener("puxian:soundchange", render);
    function restoreControls() {
      // Keep the original controls/listeners: recover their placement without recreating them.
      if (controls.parentNode !== document.body) document.body.appendChild(controls);
      if (menuButton.parentNode !== controls || soundButton.parentNode !== controls) controls.append(menuButton, soundButton);
      const name = currentScreen()?.dataset.screen;
      const hidden = name === "language"; // A transient no-screen gap must not hide utilities.
      if (controls.hidden !== hidden) controls.hidden = hidden;
    }
    function syncScene() {
      restoreControls();
      const name = currentScreen()?.dataset.screen;
      // Preserve the last audio scene during a transient navigation gap.
      if (name && name !== lastScreen) {
        window.PuxianAudio.stopEvents(lastScreen === "opening" && name === "vow");
        window.PuxianAudio.setScene(name);
        lastScreen = name;
      }
    }
    const observer = new MutationObserver(records => {
      if (records.some(record => record.target === document.body || record.target === controls ||
        record.target === menuButton || record.target === soundButton || record.target.matches?.(".screen"))) syncScene();
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true,
      attributeFilter: ["hidden", "class", "style"] });
    dialog.addEventListener("close", syncScene);
    window.addEventListener("pageshow", syncScene);
    window.addEventListener("focus", syncScene);
    window.addEventListener("resize", restoreControls);
    document.addEventListener("visibilitychange", syncScene);
    render();
    syncScene();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialise);
  else initialise();
})();
