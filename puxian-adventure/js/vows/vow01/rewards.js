/* Checkpoint C presentation only. Progress and audio retain their existing owners. */
(() => {
  "use strict";
  const root = "assets/vows/vow01/checkpoint-c/";
  const seal = "C06_Vow1_Dharma_Seal_Lijing_Zhufo_v1.webp";
  const empty = "C07_Empty_Vow_Seal_Outline_v1.webp";
  const query = id => document.getElementById(id);
  const arcs = [
    { id: "cc-first", screen: "sutra-screen", gate: "karma-complete-panel", event: "first-petal" },
    { id: "cc-second", screen: "buddha-realms-screen", gate: "buddha-realms-sutra", event: "second-petal" },
    { id: "cc-continuity", screen: "continuous-reverence-screen", gate: "continuous-reverence-sutra", event: "third-petal" },
    { id: "vow01-synthesis-petals", screen: "vow01-synthesis-screen", event: "petal-synthesis" },
    { id: "vow01-seal-emblem", screen: "vow01-seal-screen", event: "vow-seal" }
  ];
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let seen = [false, false, false, false, false];
  let current = null;
  let sealSoundTimer = null;
  let modernDharmaSeen = false;
  let modernDharmaActive = false;
  function persisted() {
    const p = window.PuxianProgress.loadProgress(), v = p.vow01;
    return [v.exploredKarma.length === 3, v.buddhaRealmsDharmaRevealed, v.continuousReverenceDharmaRevealed,
      ["vow01-synthesis", "vow01-seal", "vow01-crossroads"].includes(p.currentScreen), v.sealAwarded];
  }
  function resolve(arc) {
    const el = query(arc.id);
    el.classList.remove("cc-arriving");
    el.classList.add("cc-resolved");
    el.dataset.rewardPhase = "settled";
    if (arc.event === "vow-seal") {
      if (seen[4]) el.classList.remove("cc-seal-pending");
      else el.classList.add("cc-seal-pending");
    }
  }
  function cleanup() {
    clearTimeout(sealSoundTimer);
    sealSoundTimer = null;
    if (current) window.PuxianAudio?.stopReward();
    arcs.forEach(resolve);
    current = null;
  }
  function restore(reset = false) {
    cleanup();
    window.PuxianAudio?.stopReward();
    window.PuxianAudio?.setQuiet(false);
    seen = persisted();
    if (seen[4]) query("vow01-seal-emblem").classList.remove("cc-seal-pending");
    else query("vow01-seal-emblem").classList.add("cc-seal-pending");
    modernDharmaActive = false;
    // Screen 11's intermediate explanation is transient in the accepted save design.
    // Resume there is conservatively silent: no new save field for a transient sound.
    // Start Over explicitly resets consumption; a fresh encounter still gets its chime.
    const p = window.PuxianProgress.loadProgress();
    modernDharmaSeen = !reset && (modernDharmaSeen || p.currentScreen === "equal-respect" || p.vow01.equalRespectChoice === "equal");
  }
  function stableScreen(id) {
    const screen = query(id);
    return !document.hidden && screen && !screen.hidden && screen.classList.contains("is-active") &&
      !screen.classList.contains("fade-in") && !screen.classList.contains("fade-out");
  }
  function synchronizeModernDharma() {
    const active = !!(stableScreen("equal-respect-screen") && query("cb-scene-2")?.dataset.state === "dharma-connection");
    if (modernDharmaActive && !active) window.PuxianAudio?.stopReward();
    modernDharmaActive = active;
    if (active && !modernDharmaSeen) {
      modernDharmaSeen = true;
      window.PuxianAudio?.play("CD_DHARMA");
    }
  }
  function synchronize() {
    synchronizeModernDharma();
    const arc = document.hidden ? null : arcs.find(a => {
      const screen = query(a.screen);
      return screen && !screen.hidden && screen.classList.contains("is-active") &&
        !screen.classList.contains("fade-in") && !screen.classList.contains("fade-out") &&
        (!a.gate || !query(a.gate).hidden);
    });
    if (arc === current) {
      window.PuxianAudio?.setQuiet(modernDharmaActive || !!(arc && (arc.gate || arc.event === "vow-seal")));
      return;
    }
    cleanup();
    window.PuxianAudio?.setQuiet(modernDharmaActive || !!(arc && (arc.gate || arc.event === "vow-seal")));
    if (!arc) return;
    current = arc;
    const i = arcs.indexOf(arc), el = query(arc.id);
    if (!seen[i]) {
      seen[i] = true; // consume even while muted; rendering, language and Resume cannot replay
      if (!motion.matches || arc.event === "vow-seal") {
        if (arc.event === "vow-seal") el.classList.remove("cc-seal-pending");
        el.classList.remove("cc-resolved");
        el.classList.add("cc-arriving");
        el.dataset.rewardPhase = "manifesting";
      }
      if (arc.event === "vow-seal" && motion.matches) {
        // Static reduced-motion sequence: C05 first, then C06 at one second.
        // Cancel on navigation/reset/mute; enabling sound never replays this acquisition.
        if (window.PuxianAudio?.isEnabled()) sealSoundTimer = setTimeout(() => {
          sealSoundTimer = null;
          if (current === arc && stableScreen(arc.screen)) window.PuxianAudio?.playReward(arc.event, true);
        }, 1000);
      } else window.PuxianAudio?.playReward(arc.event, motion.matches);
      document.dispatchEvent(new CustomEvent("puxian:rewardpresentation", { detail: { reward: arc.event } }));
    }
  }
  function renderJourney(completedAssets) {
    const list = query("cc-journey-markers");
    list.replaceChildren();
    for (let i = 0; i < 10; i++) {
      const item = document.createElement("li"), image = document.createElement("img");
      item.className = completedAssets[i] ? "cc-vow-complete" : "cc-vow-future";
      item.dataset.vow = String(i + 1);
      image.src = root + (completedAssets[i] || empty);
      image.alt = ""; image.width = 1536; image.height = 1024;
      item.appendChild(image); list.appendChild(item);
    }
  }
  function updateLanguage(language) {
    const copy = window.PuxianVow01Content.rewardArc[language] || window.PuxianVow01Content.rewardArc.zh;
    query("vow01-seal-progress").setAttribute("aria-label", copy.journey + ": " + copy.completed);
    Array.from(query("cc-journey-markers").children).forEach((item, i) => {
      item.setAttribute("aria-label", (i === 0 ? copy.completed : copy.future) + " · " + (i + 1));
    });
  }
  renderJourney([seal]);
  restore();
  arcs.forEach(arc => {
    const observer = new MutationObserver(synchronize);
    observer.observe(query(arc.screen), { attributes: true, attributeFilter: ["hidden", "class"] });
    if (arc.gate) observer.observe(query(arc.gate), { attributes: true, attributeFilter: ["hidden", "class"] });
    query(arc.id).addEventListener("animationend", event => {
      if (event.target === query(arc.id) && event.animationName === "cc-session") resolve(arc);
    });
  });
  // Observe the established Screen 11 state; do not change its story/controller or saves.
  const modernObserver = new MutationObserver(synchronize);
  modernObserver.observe(query("equal-respect-screen"), { attributes: true, attributeFilter: ["hidden", "class"] });
  modernObserver.observe(query("cb-scene-2"), { attributes: true, attributeFilter: ["data-state"] });
  document.addEventListener("puxian:soundchange", () => {
    if (!window.PuxianAudio?.isEnabled()) {
      clearTimeout(sealSoundTimer);
      sealSoundTimer = null;
    }
  });
  document.addEventListener("visibilitychange", synchronize);
  motion.addEventListener("change", () => { if (motion.matches) cleanup(); synchronize(); });
  window.PuxianVow01Rewards = { restore, updateLanguage, renderJourney };
})();
