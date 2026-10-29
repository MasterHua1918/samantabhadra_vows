(() => {
  "use strict";
  const PROGRESS_KEY = "puxianAdventureProgress";
  const screens = ["vow", "challenge-one", "sutra-body-speech-mind", "countless-buddhas-intro", "buddha-expansion", "buddha-realms", "continuous-reverence", "daily-reverence", "daily-choice", "equal-respect", "vow01-synthesis", "vow01-seal", "vow01-crossroads"];
  const blankVow = () => ({ exploredPeople: [], exploredKarma: [], equalRespectChoice: null, sealAwarded: false,
    buddhaExpansionDiscovered: false, buddhaRealmsStep: 0, buddhaRealmsDharmaRevealed: false,
    continuousReverenceStep: 0, continuousReverenceDharmaRevealed: false, dailyChoiceSelection: null });
  const defaultProgress = () => ({ currentVow: 1, currentScreen: "opening", completedVows: [], seals: [], vow01: blankVow() });
  const object = value => value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const list = (value, valid) => Array.isArray(value) ? [...new Set(value.filter(valid))] : [];
  const step = (value, max) => Number.isInteger(value) ? Math.max(0, Math.min(max, value)) : 0;
  function sanitize(value) {
    const saved = object(value), v = object(saved.vow01);
    const progress = { ...saved, currentVow: 1,
      currentScreen: screens.includes(saved.currentScreen) ? saved.currentScreen : "opening",
      completedVows: list(saved.completedVows, x => Number.isInteger(x) && x >= 1 && x <= 10),
      seals: list(saved.seals, x => typeof x === "string" && /^vow(0[1-9]|10)$/.test(x)),
      vow01: { ...blankVow(),
        exploredPeople: list(v.exploredPeople, x => ["pride", "recognition", "distracted", "sincere"].includes(x)),
        exploredKarma: list(v.exploredKarma, x => ["body", "speech", "mind"].includes(x)),
        equalRespectChoice: ["status", "equal"].includes(v.equalRespectChoice) ? v.equalRespectChoice : null,
        dailyChoiceSelection: ["rush", "care"].includes(v.dailyChoiceSelection) ? v.dailyChoiceSelection : null,
        sealAwarded: v.sealAwarded === true,
        buddhaExpansionDiscovered: v.buddhaExpansionDiscovered === true,
        buddhaRealmsStep: step(v.buddhaRealmsStep, 5),
        buddhaRealmsDharmaRevealed: v.buddhaRealmsDharmaRevealed === true && step(v.buddhaRealmsStep, 5) === 5,
        continuousReverenceStep: step(v.continuousReverenceStep, 4),
        continuousReverenceDharmaRevealed: v.continuousReverenceDharmaRevealed === true && step(v.continuousReverenceStep, 4) === 4
      } };
    // Legacy Opening saves can still contain meaningful discoveries.
    if (saved.currentScreen === "opening") {
      const s = progress.vow01;
      if (s.sealAwarded || progress.completedVows.includes(1)) progress.currentScreen = "vow01-crossroads";
      else if (s.equalRespectChoice) progress.currentScreen = "equal-respect";
      else if (s.dailyChoiceSelection) progress.currentScreen = "daily-choice";
      else if (s.exploredKarma.length) progress.currentScreen = "sutra-body-speech-mind";
      else if (s.exploredPeople.length) progress.currentScreen = "challenge-one";
    }
    return progress;
  }
  let memory = defaultProgress(), readable = true, savedSuccessfully = false;
  function loadProgress() {
    if (!readable) return JSON.parse(JSON.stringify(memory));
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      memory = sanitize(raw ? JSON.parse(raw) : null);
      savedSuccessfully = !!raw;
    } catch (_) { readable = false; savedSuccessfully = false; }
    return JSON.parse(JSON.stringify(memory));
  }
  function saveProgress(update, checkpoint = false) {
    const previous = loadProgress();
    memory = sanitize({ ...previous, ...update,
      currentScreen: checkpoint ? update.currentScreen : previous.currentScreen,
      vow01: { ...previous.vow01, ...object(update.vow01) } });
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(memory)); readable = true; savedSuccessfully = true; }
    catch (_) { readable = false; savedSuccessfully = false; }
    document.dispatchEvent(new CustomEvent("puxian:progresschange"));
    return memory;
  }
  function resumeScreen() { const p = loadProgress(); return screens.includes(p.currentScreen) ? p.currentScreen : null; }
  function startOver() {
    const p = loadProgress();
    return saveProgress({ ...p, currentScreen: "opening", vow01: blankVow(),
      completedVows: p.completedVows.filter(x => x !== 1), seals: p.seals.filter(x => x !== "vow01") }, true);
  }
  window.PuxianProgress = { PROGRESS_KEY, defaultProgress, loadProgress, saveProgress, sanitize, resumeScreen,
    startOver, isSaved: () => savedSuccessfully, screens };
})();
