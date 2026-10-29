(() => {
  "use strict";
  // Screens 09–11 only. Existing progress, language and navigation owners remain authoritative.
  function createInteractions(dependencies) {
    const { currentLanguage, transition, dailyReverenceScreen, dailyChoiceScreen,
      equalRespectScreen, loadProgress, saveProgress } = dependencies;
    const names = ["daily-reverence", "daily-choice", "equal-respect"];
    const screens = [dailyReverenceScreen, dailyChoiceScreen, equalRespectScreen];
    const assets = [["b02", "b01", "b04", "b05", "b05a"],
      ["b05a", "b05b", "b05c", "b06", "b06"],
      ["b07a", "b07b", "b08a", "b08b", "b09", "b09", "b09", "b10"]];
    const stateNames = [["modern-entry", "modern-plaza", "orange-drop", "elderly-retrieves-orange-3", "orange-noticed"],
      ["orange-noticed", "orange-1-collected", "orange-2-collected", "oranges-returned", "orange-reflection"],
      ["professional-approach", "professional-door-complete", "delivery-approach", "delivery-door-complete",
        "reflection", "dharma-question", "dharma-connection", "final-understanding"]];
    const altIndexes = [[0, 1, 2, 3, 4], [4, 5, 6, 7, 7], [8, 9, 10, 11, 12, 12, 12, 13]];
    let steps = [0, 0, 0];
    let activeKey = null;
    let session = 0;
    const timers = new Set();
    let initialized = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ui = () => window.PuxianVow01Content.checkpointB[currentLanguage()] || window.PuxianVow01Content.checkpointB.zh;
    const query = id => document.getElementById(id);
    const target = i => query("cb-object-" + i);
    const hand = i => target(i)?.querySelector(".cb-hand");
    const textHint = i => query("cb-text-hint-" + i);
    const scene = i => query("cb-scene-" + i);
    const art = i => query("cb-art-" + i);

    function cancel() {
      session += 1;
      timers.forEach(clearTimeout);
      timers.clear();
      activeKey = null;
      for (let i = 0; i < 3; i++) {
        if (textHint(i)) textHint(i).hidden = true;
        target(i)?.classList.remove("cb-cue-glow", "cb-cue-ring");
        if (hand(i)) { hand(i).hidden = true; hand(i).removeAttribute("src"); }
      }
    }
    function active() {
      if (document.hidden) return -1;
      return screens.findIndex(get => {
        const s = get();
        return s && !s.hidden && s.classList.contains("is-active") &&
          !s.classList.contains("fade-in") && !s.classList.contains("fade-out");
      });
    }
    function ready(i) {
      return active() === i && art(i)?.complete && art(i).naturalWidth > 0;
    }
    function later(delay, i, action) {
      const token = session;
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (token !== session) return;
        if (!ready(i)) { cancel(); return; }
        action();
      }, delay);
      timers.add(timer);
    }
    function actionable(i) { return (i === 1 && steps[1] < 2) || (i === 2 && [0, 2].includes(steps[2])); }
    function hints(i) {
      later(3000, i, () => target(i).classList.add("cb-cue-glow"));
      later(5000, i, () => { target(i).classList.remove("cb-cue-glow"); target(i).classList.add("cb-cue-ring"); });
      later(6500, i, () => {
        if (motion.matches) return;
        const h = hand(i);
        h.src = "assets/ui/hints/HINT_Tap_PointingHand_v2.gif";
        h.hidden = false;
      });
      later(11500, i, () => {
        target(i).classList.remove("cb-cue-glow", "cb-cue-ring");
        hand(i).hidden = true;
        hand(i).removeAttribute("src");
      });
      // Same cancellable session; 2.5 seconds after the existing hand window.
      later(14000, i, () => {
        if (actionable(i) && textHint(i)) textHint(i).hidden = false;
      });
    }
    function synchronize() {
      const i = active();
      if (i < 0 || !ready(i)) { if (activeKey !== null) cancel(); return; }
      const key = i + ":" + steps[i];
      if (key === activeKey) return;
      cancel(); activeKey = key;
      if (actionable(i)) { target(i).disabled = false; hints(i); }
      if (i === 0 && steps[0] < 4) {
        later([1800, 1800, 2400, 2400][steps[0]], i, () => setStep(i, steps[i] + 1));
      } else if (i === 1 && steps[1] === 2) {
        later(1800, i, () => {
          saveProgress({ vow01: { dailyChoiceSelection: "care" } });
          setStep(i, 3);
        });
      } else if (i === 1 && steps[1] === 3) later(2200, i, () => setStep(i, 4));
      else if (i === 2 && [1, 3].includes(steps[2])) later(2200, i, () => setStep(i, steps[i] + 1));
    }
    function addParagraphs(el, lines) {
      el.replaceChildren();
      for (const line of lines) {
        const p = document.createElement("p"); p.textContent = line; el.appendChild(p);
      }
    }
    function render(i) {
      const copy = ui();
      const s = steps[i];
      if (textHint(i)) textHint(i).textContent = i === 1 ? copy.orangeHint : copy.doorHint;
      scene(i).dataset.state = stateNames[i][s];
      const imagePath = "assets/vows/vow01/checkpoint-b/" + assets[i][s] + ".webp";
      if (art(i).getAttribute("src") !== imagePath) art(i).src = imagePath;
      art(i).alt = copy.alts[altIndexes[i][s]];
      query(names[i] + "-label").textContent = copy.labels[i];
      query(names[i] + "-title").textContent = copy.titles[i];
      for (const control of ["back", "language"]) {
        const button = query(names[i] + "-" + control + "-button");
        button.title = copy[control]; button.setAttribute("aria-label", copy[control]);
      }
      const object = target(i);
      object.hidden = !actionable(i);
      object.disabled = !ready(i);
      if (i === 1) {
        object.setAttribute("aria-label", copy.orange);
        // Coordinates are percentages of the uncropped approved 16:9 frame.
        object.style.left = (s === 0 ? 24 : 46) + "%";
        object.style.top = "74%"; object.style.width = "14%"; object.style.height = "23%";
      } else if (i === 2) {
        object.setAttribute("aria-label", copy.door);
        // Identical doorway target, dimensions and cue timing for both people.
        object.style.left = "68%"; object.style.top = "20%";
        object.style.width = "22%"; object.style.height = "72%";
      }
      const reflection = query("cb-reflection-" + i);
      let lines = [];
      if (i === 1 && s === 4) lines = [copy.reflection10];
      if (i === 2 && s === 4) lines = [copy.reflection11];
      if (i === 2 && s === 5) lines = copy.bridge;
      if (i === 2 && s === 6) lines = copy.dharma;
      if (i === 2 && s === 7) lines = [copy.final];
      addParagraphs(reflection, lines); reflection.hidden = lines.length === 0;
      const next = query(["daily-reverence-start-button", "daily-choice-next-button", "equal-respect-next-button"][i]);
      next.hidden = ![i === 0 && s === 4, i === 1 && s === 4, i === 2 && s === 7][i];
      next.textContent = i === 0 ? copy.near : (i === 2 ? copy.finish : copy.next);
      if (i === 2) {
        query("cb-reflect-next").hidden = ![4, 5, 6].includes(s);
        query("cb-reflect-next").textContent = s === 4 ? copy.reflect : copy.next;
      }
      // Expose the accounting to inspection, not as tutorial copy or a score.
      if (i === 0 || i === 1) {
        const picked = i === 1 ? Math.min(s, 2) : 0;
        const elderly = i === 0 && s < 3 ? 0 : 1;
        const returned = i === 1 && s >= 3;
        const inBag = i === 0 && s < 2 ? 3 : 0;
        scene(i).dataset.orangeTotal = "3";
        scene(i).dataset.bagOranges = String(inBag);
        scene(i).dataset.elderlyOranges = String(returned ? 3 : elderly);
        scene(i).dataset.sudhanaOranges = String(returned ? 0 : picked);
        scene(i).dataset.groundOranges = String(returned ? 0 : 3 - elderly - picked - inBag);
      }
    }
    function setStep(i, value) {
      cancel(); steps[i] = value; render(i); synchronize();
    }
    function activate(i) {
      if (!ready(i) || !actionable(i) || target(i).disabled) return;
      setStep(i, steps[i] + 1);
      // Hand cleanup is synchronous, before any image change or future callback.
      if (ready(i) && actionable(i)) target(i).focus({ preventScroll: true });
    }
    function updateModernLanguage() { for (let i = 0; i < 3; i++) render(i); }
    function resetNotice() { setStep(0, 0); }
    function resetDailyChoice() { setStep(1, 0); }
    function resetEqualRespect() { setStep(2, 0); }
    function chooseDailyLifeAction(choice, restoring = false) {
      if (restoring && choice === "care") setStep(1, 4);
    }
    function renderDailyChoiceResult(choice) { if (choice === "care") setStep(1, 4); }
    function restoreEqualRespectChoice() {
      if (loadProgress().vow01.equalRespectChoice === "equal") setStep(2, 7);
    }
    function chooseEqualRespectAction() {} // old quiz buttons are absent; no abstract choice action
    function renderEqualRespectResult() { restoreEqualRespectChoice(); }
    function enterDailyChoiceScreen() {
      cancel();
      steps[1] = loadProgress().vow01.dailyChoiceSelection === "care" ? 4 : 0;
      render(1); transition(dailyReverenceScreen(), dailyChoiceScreen());
      saveProgress({ currentVow: 1, currentScreen: names[1] });
    }
    function returnToDailyReverenceScreen() {
      cancel(); steps[0] = 4; render(0);
      transition(dailyChoiceScreen(), dailyReverenceScreen());
      saveProgress({ currentVow: 1, currentScreen: names[0] });
    }
    function enterEqualRespectScreen() {
      cancel(); steps[2] = loadProgress().vow01.equalRespectChoice === "equal" ? 7 : 0;
      render(2); transition(dailyChoiceScreen(), equalRespectScreen());
      saveProgress({ currentVow: 1, currentScreen: names[2] });
    }
    function returnToDailyChoiceScreen() {
      cancel(); render(1); transition(equalRespectScreen(), dailyChoiceScreen());
      saveProgress({ currentVow: 1, currentScreen: names[1] });
    }
    function retryDailyChoice() { saveProgress({ vow01: { dailyChoiceSelection: null } }); resetDailyChoice(); }
    function retryEqualRespect() { saveProgress({ vow01: { equalRespectChoice: null } }); resetEqualRespect(); }
    function initialiseModernWorld() {
      if (initialized) return; initialized = true;
      for (let i = 0; i < 3; i++) {
        target(i).addEventListener("click", () => activate(i));
        art(i).addEventListener("load", synchronize);
        const observer = new MutationObserver(synchronize);
        observer.observe(screens[i](), { attributes: true, attributeFilter: ["hidden", "class"] });
      }
      query("cb-reflect-next").addEventListener("click", () => {
        if (!ready(2) || ![4, 5, 6].includes(steps[2])) return;
        if (steps[2] === 6) saveProgress({ vow01: { equalRespectChoice: "equal" } });
        setStep(2, steps[2] + 1);
      });
      document.addEventListener("visibilitychange", synchronize);
      motion.addEventListener("change", () => {
        if (motion.matches) for (let i = 0; i < 3; i++) {
          hand(i).hidden = true; hand(i).removeAttribute("src");
        }
      });
      updateModernLanguage(); synchronize();
    }
    return { updateModernLanguage, initialiseModernWorld, resetNotice,
      updateDailyChoiceLanguage: updateModernLanguage, resetDailyChoice, renderDailyChoiceResult,
      chooseDailyLifeAction, enterDailyChoiceScreen, returnToDailyReverenceScreen, retryDailyChoice,
      updateEqualRespectLanguage: updateModernLanguage, resetEqualRespect, renderEqualRespectResult,
      chooseEqualRespectAction, restoreEqualRespectChoice, enterEqualRespectScreen,
      returnToDailyChoiceScreen, retryEqualRespect };
  }
  window.PuxianVow01Interactions = { createInteractions };
})();
