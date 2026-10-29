(() => {
  "use strict";

  function createRuntime(openInGameLanguageMenu) {


  /* =======================================================
     STORAGE
     ======================================================= */

  const PROGRESS_KEY = window.PuxianProgress.PROGRESS_KEY;


  /* =======================================================
     CHALLENGE 1 STATE
     ======================================================= */

  const exploredPeople = new Set();

  let currentPersonId = null;


  /* =======================================================
     SCREEN 04 STATE — 身・語・意
     ======================================================= */

  const exploredKarma = new Set();


  /* =======================================================
     SCREEN HELPERS
     ======================================================= */

  const openingScreen = () =>
    document.querySelector(
      '[data-screen="opening"]'
    );


  const vowScreen = () =>
    document.querySelector(
      '[data-screen="vow"]'
    );


  const challengeOneScreen = () =>
    document.querySelector(
      '[data-screen="challenge-one"]'
    );


  const karmaScreen = () =>
    document.querySelector(
      '[data-screen="sutra-body-speech-mind"]'
    );


  const countlessBuddhasScreen = () =>
    document.querySelector(
      '[data-screen="countless-buddhas-intro"]'
    );


  const buddhaExpansionScreen = () =>
    document.querySelector(
      '[data-screen="buddha-expansion"]'
    );


  const buddhaRealmsScreen = () =>
    document.querySelector(
      '[data-screen="buddha-realms"]'
    );


  const continuousReverenceScreen = () =>
    document.querySelector(
      '[data-screen="continuous-reverence"]'
    );


  const dailyReverenceScreen = () =>
    document.querySelector(
      '[data-screen="daily-reverence"]'
    );


  const dailyChoiceScreen = () =>
    document.querySelector(
      '[data-screen="daily-choice"]'
    );


  const equalRespectScreen = () =>
    document.querySelector(
      '[data-screen="equal-respect"]'
    );

  const vowOneSynthesisScreen = () =>
    document.querySelector(
      '[data-screen="vow01-synthesis"]'
    );


  const vowOneSealScreen = () =>
    document.querySelector(
      '[data-screen="vow01-seal"]'
    );


  const vowOneCrossroadsScreen = () =>
    document.querySelector(
      '[data-screen="vow01-crossroads"]'
    );


  const { hide, show, transition } = window.PuxianNavigation;


  /* =======================================================
     PROGRESS SAVE SYSTEM
     ======================================================= */

  const { defaultProgress, loadProgress, saveProgress } = window.PuxianProgress;

  function saveChallengeProgress() {

    const progress =
      loadProgress();


    progress.vow01 = {

      ...(progress.vow01 || {}),

      exploredPeople:
        Array.from(
          exploredPeople
        )

    };


    progress.currentVow = 1;

    progress.currentScreen =
      "challenge-one";


    saveProgress(progress);

  }


  /* =======================================================
     LANGUAGE
     ======================================================= */

  const { currentLanguage, localised } = window.PuxianI18n;

  /* =======================================================
     GET VOW 1 DATA
     ======================================================= */

  function getVowOne() {

    return (
      window.PuxianVows
        ?.getVow?.(1)
      || null
    );

  }


  function getChallengeData() {

    return (
      getVowOne()
        ?.challenge1
      || null
    );

  }


  function getPersonData(
    personId
  ) {

    const challenge =
      getChallengeData();


    if (
      !challenge ||
      !Array.isArray(
        challenge.people
      )
    ) {

      return null;

    }


    return (
      challenge.people.find(
        person =>
          person.id === personId
      )
      || null
    );

  }


  /* =======================================================
     LANGUAGE TEXT FOR CHALLENGE
     ======================================================= */

const challengeUi = window.PuxianVow01Content.challengeUi;


  function getChallengeUi() {
    const lang = currentLanguage();
    return { ...(challengeUi[lang] || challengeUi.zh),
      ...(window.PuxianVow01Content.prototypeBUi[lang] || window.PuxianVow01Content.prototypeBUi.zh) };
  }

  // Prototype B owns only its local reveals; save the existing exploredPeople set.
  const challengeTimers = new Set();
  let challengeSession = 0;
  let challengeBusy = false;
  let challengePhase = "idle";
  let challengeThoughtIndex = 0;
  const discoveryTitles = { pride: "prideTitle", recognition: "fameTitle", distracted: "distractedTitle", sincere: "sincereTitle" };
  const challengeNode = id => document.querySelector("#" + id);
  const quoted = text => currentLanguage() === "zh" ? "「" + text + "」" : "“" + text + "”";

  function setChallengeBusy(value) {
    challengeBusy = value;
    challengeOneScreen()?.setAttribute("aria-busy", String(value));
    document.querySelectorAll(".worshipper").forEach(button => { button.disabled = value; });
  }

  function cancelChallengeReveal() {
    challengeSession++;
    challengeTimers.forEach(clearTimeout);
    challengeTimers.clear();
    setChallengeBusy(false);
    currentPersonId = null;
    challengePhase = "idle";
    ["discovery-panel", "pb-reaction", "pb-support"].forEach(id => { const node = challengeNode(id); if (node) node.hidden = true; });
    document.querySelectorAll(".worshipper").forEach(button => button.classList.remove("is-current", "pb-calm"));
  }

  function challengeLater(callback, delay) {
    const session = challengeSession;
    const timer = setTimeout(() => {
      challengeTimers.delete(timer);
      if (session !== challengeSession) return;
      if (challengeOneScreen()?.hidden || challengeOneScreen()?.classList.contains("fade-out")) {
        cancelChallengeReveal();
        return;
      }
      callback();
    }, delay);
    challengeTimers.add(timer);
  }

  function updateChallengeLanguage() {
    const challenge = getChallengeData();
    if (!challenge) return;
    const lang = currentLanguage(), ui = getChallengeUi();
    const text = (id, value) => { const node = challengeNode(id); if (node) node.textContent = value; };
    const label = challengeOneScreen()?.querySelector(".challenge-label");
    if (label) label.textContent = ui.vowLabel;
    text("challenge-one-title", localised(challenge.title, lang));
    text("challenge-one-instruction", ui.instruction);
    text("challenge-progress-label", ui.observed);
    text("thought-label", ui.thought);
    text("discovery-sudhana-name", ui.sudhana);
    text("discovery-label", ui.discovery);
    text("continue-observing-button", ui.continue);
    text("challenge-learning-label", ui.learningLabel);
    text("challenge-complete-title", ui.completeTitle);
    [["pride", "pride"], ["fame", "fame"], ["distracted", "distracted"], ["sincere", "sincere"]].forEach(([id,key]) => {
      text("learning-" + id + "-title", ui[key + "Title"]);
      text("learning-" + id + "-text", ui[key + "Text"]);
    });
    const key = challengeNode("challenge-key-discovery");
    if (key?.querySelector("strong")) key.querySelector("strong").textContent = ui.keyText;
    if (key?.querySelector(".key-discovery-label")) key.querySelector(".key-discovery-label").textContent = ui.keyLabel;
    text("challenge-next-button", ui.next);
    [["challenge-language-button",ui.changeLanguage], ["challenge-back-button",ui.back], ["close-discovery-button",ui.close]].forEach(([id,value]) => {
      const button = challengeNode(id);
      if (button) { button.title = value; button.setAttribute("aria-label",value); }
    });
    document.querySelectorAll(".worshipper").forEach((button, index) => {
      const found = exploredPeople.has(button.dataset.person);
      const title = ui[discoveryTitles[button.dataset.person]];
      button.setAttribute("aria-label", ui.person.replace("{n}", index + 1) + (found ? ": " + title : ""));
      button.setAttribute("aria-pressed", String(button.dataset.person === currentPersonId));
      const marker = button.querySelector(".worshipper-marker");
      if (marker) { marker.hidden = !found; marker.textContent = found ? title : ""; }
    });
    if (currentPersonId) populateDiscoveryPanel(currentPersonId);
    updateChallengeProgress();
  }

  function restoreChallengeProgress() {
    exploredPeople.clear();
    (loadProgress().vow01.exploredPeople || []).forEach(id => { if (getPersonData(id)) exploredPeople.add(id); });
    document.querySelectorAll(".worshipper").forEach(button => button.classList.toggle("is-explored", exploredPeople.has(button.dataset.person)));
    updateChallengeLanguage();
    if (exploredPeople.size === 4) showChallengeComplete();
  }

  function updateChallengeProgress() {
    const counter = challengeNode("challenge-progress-count");
    if (counter) counter.textContent = `${exploredPeople.size} / 4`;
  }

  function populateDiscoveryPanel(personId) {
    const person = getPersonData(personId);
    if (!person) return;
    const lang = currentLanguage();
    const thoughts = person.thoughts ? (person.thoughts[lang] || person.thoughts.zh) : [localised(person.thought, lang)];
    const thought = challengeNode("person-thought");
    if (thought) thought.textContent = quoted(thoughts[Math.min(challengeThoughtIndex, thoughts.length - 1)]);
    const reaction = challengeNode("sudhana-reaction-text");
    if (reaction) reaction.textContent = challengePhase === "payoff" ? getChallengeUi().completeTitle : quoted(localised(person.sudhana, lang));
    const result = challengeNode("discovery-result-text");
    if (result) result.textContent = localised(person.discovery, lang);
    const panel = challengeNode("discovery-panel");
    if (panel) { panel.dataset.person = personId; panel.dataset.thought = String(challengeThoughtIndex); }
  }

  function finishChallengeDiscovery(personId) {
    const fresh = !exploredPeople.has(personId);
    exploredPeople.add(personId);
    challengePhase = "stable";
    setChallengeBusy(false);
    document.querySelectorAll(".worshipper").forEach(button => button.classList.toggle("is-explored", exploredPeople.has(button.dataset.person)));
    const support = challengeNode("pb-support");
    if (support) support.hidden = false;
    updateChallengeLanguage();
    saveChallengeProgress();
    if (fresh) window.PuxianAudio?.play("D01");
    challengeLater(() => { challengeNode("discovery-panel").hidden = true; }, 2600);
    if (exploredPeople.size === 4) {
      // Let the last discovery register before the shared realization.
      challengeLater(() => showChallengeComplete(true), 1200);
    }
  }

  function openDiscovery(personId) {
    if (challengeBusy || challengeOneScreen()?.hidden || challengeOneScreen()?.classList.contains("fade-out") || !getPersonData(personId)) return;
    cancelChallengeReveal();
    currentPersonId = personId;
    challengeThoughtIndex = 0;
    challengePhase = "thought";
    const panel = challengeNode("discovery-panel");
    if (panel) panel.hidden = false;
    document.querySelectorAll(".worshipper").forEach(button => {
      button.classList.toggle("is-current", button.dataset.person === personId);
      button.classList.toggle("pb-calm", personId === "sincere" && button.dataset.person === personId);
    });
    updateChallengeLanguage();
    if (exploredPeople.has(personId)) {
      // Review a stable discovery without recounting or replaying its chime.
      challengePhase = "stable";
      challengeNode("pb-reaction").hidden = false;
      challengeNode("pb-support").hidden = false;
      if (exploredPeople.size === 4) showChallengeComplete();
      challengeLater(() => { challengeNode("discovery-panel").hidden = true; }, 2600);
      return;
    }
    setChallengeBusy(true);
    const count = personId === "distracted" ? 4 : 1;
    const dwell = personId === "distracted" ? 1700 : 1500;
    function nextThought() {
      if (++challengeThoughtIndex < count) {
        populateDiscoveryPanel(personId);
        challengeLater(nextThought, dwell);
      } else {
        challengeThoughtIndex = count - 1;
        challengePhase = "reaction";
        challengeNode("pb-reaction").hidden = false;
        populateDiscoveryPanel(personId);
        challengeLater(() => finishChallengeDiscovery(personId), 1300);
      }
    }
    challengeLater(nextThought, dwell);
  }

  function closeDiscovery() {
    cancelChallengeReveal();
    if (exploredPeople.size === 4) showChallengeComplete();
  }

  function showChallengeComplete(animate = false) {
    if (exploredPeople.size !== 4) return;
    const panel = challengeNode("challenge-complete-panel");
    if (panel) panel.hidden = false;
    challengeOneScreen()?.classList.add("is-complete");
    const title = challengeNode("challenge-complete-title");
    const key = challengeNode("challenge-key-discovery");
    const next = challengeNode("challenge-next-button");
    [title, key, next].forEach(node => { if (node) node.hidden = animate; });
    if (animate) {
      challengeLater(() => {
        challengePhase = "payoff";
        if (title) title.hidden = false;
        if (currentPersonId) populateDiscoveryPanel(currentPersonId);
      }, 1000);
      challengeLater(() => { if (key) key.hidden = false; if (next) next.hidden = false; }, 2400);
    }
  }

  function hideChallengeComplete() {
    challengeOneScreen()?.classList.remove("is-complete");
    const panel = challengeNode("challenge-complete-panel");
    if (panel) panel.hidden = true;
  }

  function enterChallengeOne() {
    cancelChallengeReveal();
    hideChallengeComplete();
    restoreChallengeProgress();
    transition(vowScreen(), challengeOneScreen());
    saveProgress({ currentVow: 1, currentScreen: "challenge-one" });
  }

  /* =======================================================
     SCREEN 04 — SUTRA / 身・語・意
     ======================================================= */

  const karmaUi = window.PuxianVow01Content.karmaUi;


  function getKarmaUi() {

    return (
      karmaUi[currentLanguage()]
      || karmaUi.zh
    );

  }


  function updateKarmaLanguage() {

    const ui =
      getKarmaUi();


    const textMap = {
      "#sutra-screen-label": ui.screenLabel,
      "#sutra-screen-title": ui.screenTitle,
      "#sutra-source-label": ui.source,
      "#sutra-main-quote": ui.quote,
      "#sutra-sudhana-name": ui.sudhana,
      "#sutra-sudhana-question-text": ui.sudhanaQuestion,
      "#sutra-instruction": ui.instruction,
      "#karma-progress-label": ui.progress,
      "#karma-body-title": ui.bodyTitle,
      "#karma-body-short": ui.bodyShort,
      "#karma-speech-title": ui.speechTitle,
      "#karma-speech-short": ui.speechShort,
      "#karma-mind-title": ui.mindTitle,
      "#karma-mind-short": ui.mindShort,
      "#karma-example-label": ui.exampleLabel,
      "#karma-detail-continue": ui.understood,
      "#karma-complete-label": ui.completeLabel,
      "#karma-complete-title": ui.completeTitle,
      "#karma-complete-explanation": ui.completeExplanation,
      "#sutra-connection-label": ui.connectionLabel,
      "#sutra-connection-text": ui.connectionText,
      "#dharma-petal-label": ui.rewardLabel,
      "#dharma-petal-name": ui.rewardName,
      "#karma-next-button": ui.next
    };


    Object.entries(textMap)
      .forEach(
        ([selector, value]) => {

          const element =
            document.querySelector(
              selector
            );


          if (element) {

            element.textContent =
              value;

          }

        }
      );


    const backButton =
      document.querySelector(
        "#sutra-back-button"
      );


    const languageButton =
      document.querySelector(
        "#sutra-language-button"
      );


    if (backButton) {

      backButton.title =
        ui.back;

      backButton.setAttribute(
        "aria-label",
        ui.back
      );

    }


    if (languageButton) {

      languageButton.title =
        ui.changeLanguage;

      languageButton.setAttribute(
        "aria-label",
        ui.changeLanguage
      );

    }


    if (
      !document
        .querySelector(
          "#karma-detail-panel"
        )
        ?.hidden
    ) {

      const openCard =
        document.querySelector(
          ".karma-card.is-current"
        );


      if (openCard) {

        populateKarmaDetail(
          openCard.dataset.karma
        );

      }

    }

  }


  function saveKarmaProgress() {

    const progress =
      loadProgress();


    progress.vow01 = {
      ...(progress.vow01 || {}),
      exploredKarma:
        Array.from(
          exploredKarma
        )
    };


    progress.currentVow = 1;

    progress.currentScreen =
      "sutra-body-speech-mind";


    saveProgress(progress);

  }


  function restoreKarmaProgress() {

    const progress =
      loadProgress();


    const savedKarma =
      progress
        ?.vow01
        ?.exploredKarma;


    if (Array.isArray(savedKarma)) {

      savedKarma.forEach(
        type => {

          if (
            ["body", "speech", "mind"]
              .includes(type)
          ) {

            exploredKarma.add(type);

          }

        }
      );

    }


    document
      .querySelectorAll(
        ".karma-card"
      )
      .forEach(
        card => {

          const type =
            card.dataset.karma;


          if (
            exploredKarma.has(type)
          ) {

            card.classList.add(
              "is-explored"
            );

            const status =
              card.querySelector(
                ".karma-status"
              );

            if (status) {
              status.textContent = "✓";
            }

          }

        }
      );


    updateKarmaProgress();

  }


  function updateKarmaProgress() {

    const counter =
      document.querySelector(
        "#karma-progress-count"
      );


    if (counter) {

      counter.textContent =
        `${exploredKarma.size} / 3`;

    }

  }


  function populateKarmaDetail(type) {

    const ui =
      getKarmaUi();


    const data = {
      body: {
        title: ui.bodyTitle,
        explanation: ui.bodyExplanation,
        example: ui.bodyExample
      },
      speech: {
        title: ui.speechTitle,
        explanation: ui.speechExplanation,
        example: ui.speechExample
      },
      mind: {
        title: ui.mindTitle,
        explanation: ui.mindExplanation,
        example: ui.mindExample
      }
    };


    const item =
      data[type];


    if (!item) return;


    const title =
      document.querySelector(
        "#karma-detail-title"
      );


    const explanation =
      document.querySelector(
        "#karma-detail-explanation"
      );


    const example =
      document.querySelector(
        "#karma-example-text"
      );


    const exampleLabel =
      document.querySelector(
        "#karma-example-label"
      );


    if (title) {
      title.textContent =
        item.title;
    }


    if (explanation) {
      explanation.textContent =
        item.explanation;
    }


    if (example) {
      example.textContent =
        item.example;
    }


    if (exampleLabel) {
      exampleLabel.textContent =
        ui.exampleLabel;
    }

  }


  function openKarmaDetail(type) {

    const card =
      document.querySelector(
        `.karma-card[data-karma="${type}"]`
      );


    if (!card) return;


    document
      .querySelectorAll(
        ".karma-card"
      )
      .forEach(
        item =>
          item.classList.remove(
            "is-current"
          )
      );


    card.classList.add(
      "is-current",
      "is-explored"
    );


    exploredKarma.add(type);


    const status =
      card.querySelector(
        ".karma-status"
      );


    if (status) {
      status.textContent = "✓";
    }


    populateKarmaDetail(type);

    updateKarmaProgress();

    saveKarmaProgress();


    const panel =
      document.querySelector(
        "#karma-detail-panel"
      );


    if (panel) {
      panel.hidden = false;
      panel.classList.add(
        "fade-in"
      );
    }

  }


  function closeKarmaDetail() {

    const panel =
      document.querySelector(
        "#karma-detail-panel"
      );


    if (panel) {
      panel.hidden = true;
      panel.classList.remove(
        "fade-in"
      );
    }


    document
      .querySelectorAll(
        ".karma-card"
      )
      .forEach(
        card =>
          card.classList.remove(
            "is-current"
          )
      );


    if (exploredKarma.size >= 3) {
      showKarmaComplete();
    }

  }


  function showKarmaComplete() {

    updateKarmaLanguage();


    const panel =
      document.querySelector(
        "#karma-complete-panel"
      );


    if (panel) {
      panel.hidden = false;
      panel.classList.add(
        "fade-in"
      );
    }

  }


  function hideKarmaComplete() {

    const panel =
      document.querySelector(
        "#karma-complete-panel"
      );


    if (panel) {
      panel.hidden = true;
      panel.classList.remove(
        "fade-in"
      );
    }

  }


  function enterKarmaScreen() {
    cancelChallengeReveal();

    hideChallengeComplete();
    hideKarmaComplete();

    updateKarmaLanguage();
    restoreKarmaProgress();


    transition(
      challengeOneScreen(),
      karmaScreen()
    );


    saveProgress({
      currentVow: 1,
      currentScreen:
        "sutra-body-speech-mind"
    });

  }


  /* =======================================================
     SCREEN 05 — HOW MANY BUDDHAS?
     ======================================================= */

  const countlessBuddhasUi = window.PuxianVow01Content.countlessBuddhasUi;

  function getCountlessBuddhasUi() {
    return countlessBuddhasUi[currentLanguage()] || countlessBuddhasUi.zh;
  }

  function updateCountlessBuddhasLanguage() {
    const ui = getCountlessBuddhasUi();

    const textMap = {
      "#countless-buddhas-label": ui.label,
      "#countless-buddhas-title": ui.title,
      "#countless-buddhas-sudhana-name": ui.sudhana,
      "#countless-buddhas-question-text": ui.question,
      "#countless-buddhas-hint": ui.hint,
      "#countless-buddhas-explore-text": ui.explore
    };

    Object.entries(textMap).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    });

    const backButton = document.querySelector("#countless-buddhas-back-button");
    const languageButton = document.querySelector("#countless-buddhas-language-button");

    if (backButton) {
      backButton.title = ui.back;
      backButton.setAttribute("aria-label", ui.back);
    }

    if (languageButton) {
      languageButton.title = ui.changeLanguage;
      languageButton.setAttribute("aria-label", ui.changeLanguage);
    }
  }

  function enterCountlessBuddhasScreen() {
    hideKarmaComplete();
    updateCountlessBuddhasLanguage();

    transition(
      karmaScreen(),
      countlessBuddhasScreen()
    );

    saveProgress({
      currentVow: 1,
      currentScreen: "countless-buddhas-intro"
    });
  }

  function returnToKarmaScreen() {
    transition(
      countlessBuddhasScreen(),
      karmaScreen()
    );

    updateKarmaLanguage();
    restoreKarmaProgress();

    if (exploredKarma.size >= 3) {
      setTimeout(showKarmaComplete, 320);
    }

    saveProgress({
      currentVow: 1,
      currentScreen: "sutra-body-speech-mind"
    });
  }


  /* =======================================================
     SCREEN 06 — BUDDHA EXPANSION
     從一尊佛開始尋找
     ======================================================= */

  const buddhaExpansionUi = window.PuxianVow01Content.buddhaExpansionUi;

  function getBuddhaExpansionUi() {
    return buddhaExpansionUi[currentLanguage()] || buddhaExpansionUi.zh;
  }

  function updateBuddhaExpansionLanguage() {
    const ui = getBuddhaExpansionUi();

    const textMap = {
      "#buddha-expansion-label": ui.label,
      "#buddha-expansion-title": ui.title,
      "#buddha-expansion-instruction": ui.instruction,
      "#buddha-expansion-count-label": ui.countLabel,
      "#buddha-expansion-count-value": ui.countValue,
      "#buddha-expansion-count-unit": ui.countUnit,
      "#buddha-expansion-sudhana-name": ui.sudhana,
      "#buddha-expansion-sudhana-text": ui.sudhanaText,
      "#buddha-expansion-discovery-label": ui.discoveryLabel,
      "#buddha-expansion-discovery-text": ui.discovery,
      "#buddha-expansion-next-button": ui.next
    };

    Object.entries(textMap).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    });

    const backButton = document.querySelector("#buddha-expansion-back-button");
    const languageButton = document.querySelector("#buddha-expansion-language-button");

    if (backButton) {
      backButton.title = ui.back;
      backButton.setAttribute("aria-label", ui.back);
    }

    if (languageButton) {
      languageButton.title = ui.changeLanguage;
      languageButton.setAttribute("aria-label", ui.changeLanguage);
    }
  }

  // Screen 06 only. Ephemeral presentation; the existing discovery owns completion.
  let buddhaHintCleanup = () => {};

  function initialiseBuddhaDiscoveryHint() {
    const screen = buddhaExpansionScreen();
    const target = document.querySelector("#buddha-expansion-focus");
    const discovery = document.querySelector("#buddha-expansion-discovery");
    const image = document.querySelector("#buddha-expansion-image");
    const hand = document.querySelector("#buddha-discovery-hint-hand");
    if (!screen || !target || !discovery || !image || !hand) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers = new Set();
    let session = 0;
    let running = false;
    const handSource = "assets/ui/hints/HINT_Tap_PointingHand_v2.gif";

    function hideHand() {
      hand.hidden = true;
      hand.removeAttribute("src"); // stop GIF decoding; a later entry starts a fresh cycle
    }
    function cancel() {
      session += 1;
      timers.forEach(clearTimeout);
      timers.clear();
      running = false;
      target.classList.remove("vow01-hint-glow", "vow01-hint-ring", "vow01-hint-static");
      hideHand();
    }
    buddhaHintCleanup = cancel;
    function ready() {
      return !screen.hidden && screen.classList.contains("is-active") &&
        !screen.classList.contains("fade-in") && !screen.classList.contains("fade-out") &&
        !document.hidden && discovery.hidden && !target.disabled &&
        image.complete && image.naturalWidth > 0;
    }
    function after(delay, action) {
      const token = session;
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (token !== session) return;
        if (!ready()) { cancel(); return; }
        action();
      }, delay);
      timers.add(timer);
    }
    function syncMotion() {
      target.classList.toggle("vow01-hint-static", motion.matches);
      if (motion.matches) hideHand();
      // Switching back does not replay a demonstration already in progress.
    }
    function synchronize() {
      if (!ready()) { if (running) cancel(); return; }
      if (running) return;
      running = true; // remains true after the single demonstration: no idle looping
      ++session;
      after(3000, () => {
        syncMotion();
        target.classList.add("vow01-hint-glow");
      });
      after(5000, () => {
        target.classList.remove("vow01-hint-glow");
        target.classList.add("vow01-hint-ring");
      });
      after(6500, () => {
        if (motion.matches) return; // static ring supplements the existing instruction/label
        hand.src = handSource;
        hand.hidden = false;
      });
      after(11500, () => {
        hideHand();
        target.classList.remove("vow01-hint-ring", "vow01-hint-static");
      });
    }
    const observer = new MutationObserver(synchronize);
    observer.observe(screen, { attributes: true, attributeFilter: ["hidden", "class"] });
    observer.observe(discovery, { attributes: true, attributeFilter: ["hidden"] });
    image.addEventListener("load", synchronize);
    document.addEventListener("visibilitychange", synchronize);
    motion.addEventListener("change", () => { if (running) syncMotion(); });
    synchronize();
  }

  function resetBuddhaExpansionScene() {
    buddhaHintCleanup();
    const discovery = document.querySelector("#buddha-expansion-discovery");
    if (discovery) {
      discovery.hidden = true;
      discovery.classList.remove("fade-in");
    }
  }

  function revealBuddhaExpansionDiscovery(event) {
    buddhaHintCleanup();
    const discovery = document.querySelector("#buddha-expansion-discovery");
    if (!discovery) return;
    if (event?.type === "click" && discovery.hidden) window.PuxianAudio?.play("D01");

    discovery.hidden = false;
    if (event?.type === "click") commitCheckpoint("buddha-expansion");
    discovery.classList.add("fade-in");
    updateBuddhaExpansionLanguage();

    discovery.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function enterBuddhaExpansionScreen() {
    resetBuddhaExpansionScene();
    updateBuddhaExpansionLanguage();

    transition(
      countlessBuddhasScreen(),
      buddhaExpansionScreen()
    );

    saveProgress({
      currentVow: 1,
      currentScreen: "buddha-expansion"
    });
  }

  function returnToCountlessBuddhasScreen() {
    resetBuddhaExpansionScene();

    transition(
      buddhaExpansionScreen(),
      countlessBuddhasScreen()
    );

    updateCountlessBuddhasLanguage();

    saveProgress({
      currentVow: 1,
      currentScreen: "countless-buddhas-intro"
    });
  }



  /* =======================================================
     SCREEN 07 — BUDDHA REALMS EXPANSION
     一尊佛 → 更多佛 → 更多佛剎 → 十方三世 → ∞
     ======================================================= */

  let buddhaRealmsStep = 0;
  let buddhaRealmsLocked = false;
  let buddhaRealmsTimer = null;
  let buddhaRealmsSession = 0;
  const buddhaRealmsImages = [
    "assets/vows/vow01-one-buddha.webp",
    "assets/vows/vow01/expansion/A06_Exactly_10_Buddhas_v1.webp",
    "assets/vows/vow01/expansion/A07_100_Buddha_Assembly_v1.webp",
    "assets/vows/vow01/expansion/A08_1000_Buddha_Assembly_v1.webp", // approved 10,000 stage
    "assets/vows/vow01/expansion/A09_Buddha_Lands_v1.webp",
    "assets/vows/vow01/expansion/A10_Effectively_Uncountable_Realms_v1.webp"
  ];
  function preloadBuddhaRealm(step) {
    if (step < buddhaRealmsImages.length) {
      const image = new Image();
      image.src = buddhaRealmsImages[step];
    }
  }

  const buddhaRealmsUi = window.PuxianVow01Content.buddhaRealmsUi;

  function getBuddhaRealmsUi() {
    return buddhaRealmsUi[currentLanguage()] || buddhaRealmsUi.zh;
  }

  function updateBuddhaRealmsLanguage() {
    const ui = getBuddhaRealmsUi();
    const stage = ui.stages[Math.min(buddhaRealmsStep, ui.stages.length - 1)];

    const textMap = {
      "#buddha-realms-label": ui.label,
      "#buddha-realms-title": ui.title,
      "#buddha-realms-instruction": ui.instruction,
      "#buddha-realms-count-label": ui.countLabel,
      "#buddha-realms-count-value": stage.count,
      "#buddha-realms-count-unit": buddhaRealmsStep >= 4 ? "" : ui.countUnit,
      "#buddha-realms-sudhana-name": currentLanguage() === "zh" ? "善財" : currentLanguage() === "vi" ? "Thiện Tài" : "Sudhana",
      "#buddha-realms-sudhana-text": stage.sudhana,
      "#buddha-realms-sutra-label": ui.sutraLabel,
      "#buddha-realms-expand-button": stage.button,
      "#buddha-realms-source": ui.source,
      "#buddha-realms-sutra-text": ui.quote,
      "#buddha-realms-realization": ui.realization,
      "#buddha-realms-reward-label": ui.rewardLabel,
      "#buddha-realms-reward-name": ui.rewardName,
      "#buddha-realms-next-button": ui.next
    };

    Object.entries(textMap).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    });

    /*
     * Screen 07 quote safeguard:
     * keep the visible sutra quotation in sync even if the current HTML
     * uses a class-based quote element instead of the expected ID.
     */
    const sutraPanel = document.querySelector("#buddha-realms-sutra");
    const visibleQuote =
      document.querySelector("#buddha-realms-sutra-text")
      || sutraPanel?.querySelector(
        ".buddha-realms-quote, blockquote, [data-sutra-quote]"
      );

    if (visibleQuote) {
      visibleQuote.textContent = ui.quote;
      visibleQuote.setAttribute("lang", currentLanguage() === "zh" ? "zh-Hant" : currentLanguage());
    }

    const screen = buddhaRealmsScreen();
    if (screen) screen.dataset.expansionStep = String(buddhaRealmsStep);

    const backButton = document.querySelector("#buddha-realms-back-button");
    const languageButton = document.querySelector("#buddha-realms-language-button");

    if (backButton) {
      backButton.title = ui.back;
      backButton.setAttribute("aria-label", ui.back);
    }

    if (languageButton) {
      languageButton.title = ui.changeLanguage;
      languageButton.setAttribute("aria-label", ui.changeLanguage);
    }
  }

  function resetBuddhaRealmsScene() {
    window.PuxianAudio?.stopEvents();
    ++buddhaRealmsSession; // invalidate decode and timer callbacks from the previous visit
    clearTimeout(buddhaRealmsTimer);
    buddhaRealmsTimer = null;
    buddhaRealmsLocked = false;
    buddhaRealmsStep = 0;
    const button = document.querySelector("#buddha-realms-expand-button");
    if (button) button.disabled = false;
    const visual = document.querySelector("#buddha-realms-visual");
    const main = document.querySelector("#buddha-realms-main-image");
    const next = document.querySelector("#buddha-realms-next-image");
    if (visual) visual.classList.remove("is-expanding");
    if (main) main.src = buddhaRealmsImages[0];
    if (next) next.removeAttribute("src");
    preloadBuddhaRealm(1);

    const sutraPanel = document.querySelector("#buddha-realms-sutra");
    if (sutraPanel) {
      sutraPanel.hidden = true;
      sutraPanel.classList.remove("fade-in");
    }

    const stage = document.querySelector("#buddha-realms-stage");
    if (stage) stage.hidden = false;

    updateBuddhaRealmsLanguage();
  }

  function buddhaRealmImageReady(image) {
    return image.complete && image.naturalWidth > 0;
  }

  function expandBuddhaRealms() {
    if (buddhaRealmsLocked) return;
    const ui = getBuddhaRealmsUi();
    const button = document.querySelector("#buddha-realms-expand-button");

    if (buddhaRealmsStep < ui.stages.length - 1) {
      buddhaRealmsLocked = true;
      if (button) button.disabled = true;
      const nextStep = buddhaRealmsStep + 1;
      const visual = document.querySelector("#buddha-realms-visual");
      const main = document.querySelector("#buddha-realms-main-image");
      const next = document.querySelector("#buddha-realms-next-image");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reduced ? 100 : nextStep === 5 ? 1100 : nextStep === 4 ? 950 : 700;
      const session = buddhaRealmsSession;
      const image = new Image();
      const isCurrent = () => session === buddhaRealmsSession && !buddhaRealmsScreen()?.hidden;
      const unlock = () => {
        if (!isCurrent()) return;
        visual?.classList.remove("is-expanding");
        if (next) next.removeAttribute("src");
        if (button) button.disabled = false;
        buddhaRealmsLocked = false;
      };
      const reveal = () => {
        if (!isCurrent() || !buddhaRealmImageReady(image)) return;
        if (!visual || !main || !next) { unlock(); return; }
        next.src = image.src;
        window.PuxianAudio?.play("E0" + nextStep);
        visual.classList.add("is-expanding");
        buddhaRealmsTimer = setTimeout(() => {
          if (!isCurrent()) return;
          main.src = image.src;
          buddhaRealmsStep = nextStep;
          commitCheckpoint("buddha-realms");
          updateBuddhaRealmsLanguage();
          preloadBuddhaRealm(nextStep + 1);
          unlock();
          buddhaRealmsTimer = null;
        }, duration);
      };
      image.onerror = unlock;
      image.src = buddhaRealmsImages[nextStep];
      if (image.decode) {
        image.decode().then(reveal, () => {
          // A decode rejection can mean an unavailable image. Never commit a blank state.
          if (buddhaRealmImageReady(image)) reveal();
          else unlock();
        });
      } else if (image.complete) {
        reveal();
      } else {
        image.onload = reveal;
      }
      return;
    }

    buddhaRealmsLocked = true;
    if (button) button.disabled = true;
    // Checkpoint D reveal/acquisition audio is deduplicated by the existing reward owner.
    const stage = document.querySelector("#buddha-realms-stage");
    const sutraPanel = document.querySelector("#buddha-realms-sutra");
    if (stage) stage.hidden = true;
    if (sutraPanel) {
      sutraPanel.hidden = false;
      commitCheckpoint("buddha-realms");
      sutraPanel.classList.add("fade-in");
      sutraPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function enterBuddhaRealmsScreen() {
    buddhaHintCleanup();
    resetBuddhaRealmsScene();

    transition(
      buddhaExpansionScreen(),
      buddhaRealmsScreen()
    );

    saveProgress({
      currentVow: 1,
      currentScreen: "buddha-realms"
    });
  }

  function returnToBuddhaExpansionScreen() {
    resetBuddhaRealmsScene();
    transition(
      buddhaRealmsScreen(),
      buddhaExpansionScreen()
    );

    updateBuddhaExpansionLanguage();
    revealBuddhaExpansionDiscovery();

    saveProgress({
      currentVow: 1,
      currentScreen: "buddha-expansion"
    });
  }



  /* =======================================================
     SCREEN 08 — CONTINUOUS REVERENCE
     今天 → 明天 → 一年後 → 很多年後 → ∞
     ======================================================= */

  let continuousReverenceStep = 0;

  const continuousReverenceUi = window.PuxianVow01Content.continuousReverenceUi;

  function getContinuousReverenceUi() {
    return continuousReverenceUi[currentLanguage()] || continuousReverenceUi.zh;
  }

  function ensureContinuousReverenceScreen() {
    if (continuousReverenceScreen()) return;

    const screen = document.createElement("section");
    screen.className = "screen continuous-reverence-screen";
    screen.dataset.screen = "continuous-reverence";
    screen.hidden = true;

    screen.innerHTML = `
      <div class="continuous-reverence-overlay" aria-hidden="true"></div>

      <button id="continuous-reverence-back-button" class="back-button" type="button">←</button>
      <button id="continuous-reverence-language-button" class="language-button" type="button">🌐</button>

      <div class="continuous-reverence-content">
        <div id="continuous-reverence-label" class="screen-label"></div>
        <h1 id="continuous-reverence-title" class="continuous-reverence-title"></h1>

        <div class="sudhana-dialogue continuous-reverence-question">
          <strong id="continuous-reverence-sudhana-name"></strong>
          <p id="continuous-reverence-question"></p>
        </div>

        <p id="continuous-reverence-instruction" class="screen-instruction"></p>

        <div id="continuous-reverence-stage" class="continuous-reverence-stage">
          <div class="continuous-reverence-time-track">
            <div id="continuous-reverence-time-icon" class="continuous-reverence-time-icon" aria-hidden="true"></div>
            <strong id="continuous-reverence-time-label" class="continuous-reverence-time-label"></strong>
            <p id="continuous-reverence-time-text" class="continuous-reverence-time-text"></p>
          </div>

          <div class="continuous-reverence-progress" aria-hidden="true">
            <span class="continuous-reverence-dot"></span><span class="continuous-reverence-line"></span>
            <span class="continuous-reverence-dot"></span><span class="continuous-reverence-line"></span>
            <span class="continuous-reverence-dot"></span><span class="continuous-reverence-line"></span>
            <span class="continuous-reverence-dot"></span><span class="continuous-reverence-line"></span>
            <span class="continuous-reverence-dot"></span>
          </div>

          <button id="continuous-reverence-forward-button" class="primary-button" type="button"></button>
        </div>

        <div id="continuous-reverence-sutra" class="continuous-reverence-sutra" hidden>
          <div id="continuous-reverence-sutra-label" class="screen-label"></div>
          <div id="continuous-reverence-source" class="sutra-source"></div>
          <blockquote id="continuous-reverence-quote" class="sutra-main-quote"></blockquote>

          <div class="key-discovery">
            <span id="continuous-reverence-discovery-label" class="key-discovery-label"></span>
            <strong id="continuous-reverence-discovery"></strong>
          </div>

          <div class="continuous-reverence-reward dharma-petal">
            <span id="continuous-reverence-reward-label"></span>
            <strong id="continuous-reverence-reward-name"></strong>
          </div>

          <button id="continuous-reverence-next-button" class="primary-button" type="button"></button>
        </div>
      </div>
    `;

    document.body.appendChild(screen);
  }

  function updateContinuousReverenceLanguage() {
    const ui = getContinuousReverenceUi();
    const stage = ui.stages[Math.min(continuousReverenceStep, ui.stages.length - 1)];

    const textMap = {
      "#continuous-reverence-label": ui.label,
      "#continuous-reverence-title": ui.title,
      "#continuous-reverence-sudhana-name": ui.sudhana,
      "#continuous-reverence-sudhana-text": ui.question,
      "#continuous-reverence-instruction": ui.instruction,
      "#continuous-reverence-time-icon": stage.icon,
      "#continuous-reverence-time-label": stage.label,
      "#continuous-reverence-time-text": stage.text,
      "#continuous-reverence-forward-button": ui.forward[Math.min(continuousReverenceStep, ui.forward.length - 1)],
      "#continuous-reverence-sutra-label": ui.sutraLabel,
            "#continuous-reverence-quote-one": ui.quoteOne,
      "#continuous-reverence-quote-two": ui.quoteTwo,
      "#continuous-reverence-discovery-label": ui.discoveryLabel,
      "#continuous-reverence-discovery-text": ui.discovery,
      "#continuous-reverence-reward-label": ui.rewardLabel,
      "#continuous-reverence-reward-name": ui.rewardName,
      "#continuous-reverence-next-button": ui.next
    };

    Object.entries(textMap).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    });

    document.querySelectorAll(".continuous-reverence-dot").forEach((dot, index) => {
      dot.classList.toggle("is-active", index <= continuousReverenceStep);
    });

    document
      .querySelectorAll(
        "#continuous-reverence-quote-one, #continuous-reverence-quote-two"
      )
      .forEach(quote => {
        quote.setAttribute(
          "lang",
          currentLanguage() === "zh" ? "zh-Hant" : currentLanguage()
        );
      });

    const backButton = document.querySelector("#continuous-reverence-back-button");
    const languageButton = document.querySelector("#continuous-reverence-language-button");

    if (backButton) {
      backButton.title = ui.back;
      backButton.setAttribute("aria-label", ui.back);
    }

    if (languageButton) {
      languageButton.title = ui.changeLanguage;
      languageButton.setAttribute("aria-label", ui.changeLanguage);
    }
  }

  function resetContinuousReverenceScene() {
    continuousReverenceStep = 0;

    const stage = document.querySelector("#continuous-reverence-stage");
    const sutra = document.querySelector("#continuous-reverence-sutra");

    if (stage) stage.hidden = false;
    if (sutra) {
      sutra.hidden = true;
      sutra.classList.remove("fade-in");
    }

    updateContinuousReverenceLanguage();
  }

  function advanceContinuousReverence() {
    const ui = getContinuousReverenceUi();

    if (continuousReverenceStep < ui.stages.length - 1) {
      continuousReverenceStep += 1;
      commitCheckpoint("continuous-reverence");
      updateContinuousReverenceLanguage();
      return;
    }

    const stage = document.querySelector("#continuous-reverence-stage");
    const sutra = document.querySelector("#continuous-reverence-sutra");

    if (stage) stage.hidden = true;

    if (sutra) {
      sutra.hidden = false;
      commitCheckpoint("continuous-reverence");
      sutra.classList.add("fade-in");
      sutra.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }

  function enterContinuousReverenceScreen() {
    ensureContinuousReverenceScreen();
    resetContinuousReverenceScene();

    transition(
      buddhaRealmsScreen(),
      continuousReverenceScreen()
    );

    saveProgress({
      currentVow: 1,
      currentScreen: "continuous-reverence"
    });
  }

  function returnToBuddhaRealmsScreen() {
    transition(
      continuousReverenceScreen(),
      buddhaRealmsScreen()
    );

    buddhaRealmsStep = buddhaRealmsUi.zh.stages.length - 1;
    updateBuddhaRealmsLanguage();

    const stage = document.querySelector("#buddha-realms-stage");
    const sutraPanel = document.querySelector("#buddha-realms-sutra");
    if (stage) stage.hidden = true;
    if (sutraPanel) sutraPanel.hidden = false;

    saveProgress({
      currentVow: 1,
      currentScreen: "buddha-realms"
    });
  }


  
  /* =======================================================
     SCREEN 09 — BACK TO DAILY LIFE
     把「禮敬」從佛前帶回日常生活
     ======================================================= */

  function updateDailyReverenceLanguage() {
    modernWorld.updateModernLanguage();
  }

  function enterDailyReverenceScreen() {
    modernWorld.resetNotice();
    updateDailyReverenceLanguage();

    transition(
      continuousReverenceScreen(),
      dailyReverenceScreen()
    );

    saveProgress({
      currentVow: 1,
      currentScreen: "daily-reverence"
    });
  }

  function returnToContinuousReverenceScreen() {
    transition(
      dailyReverenceScreen(),
      continuousReverenceScreen()
    );

    updateContinuousReverenceLanguage();

    saveProgress({
      currentVow: 1,
      currentScreen: "continuous-reverence"
    });
  }



  const modernWorld = window.PuxianVow01Interactions.createInteractions({ PROGRESS_KEY, currentLanguage, transition, dailyReverenceScreen, dailyChoiceScreen, equalRespectScreen, updateDailyReverenceLanguage, loadProgress, saveProgress });
  const { updateDailyChoiceLanguage, resetDailyChoice, renderDailyChoiceResult, chooseDailyLifeAction, enterDailyChoiceScreen, returnToDailyReverenceScreen, retryDailyChoice, updateEqualRespectLanguage, resetEqualRespect, renderEqualRespectResult, chooseEqualRespectAction, restoreEqualRespectChoice, enterEqualRespectScreen, returnToDailyChoiceScreen, retryEqualRespect } = modernWorld;

/* =======================================================
     INITIALISE GAME
     ======================================================= */

  function initialise() {
    initialiseBuddhaDiscoveryHint();
    modernWorld.initialiseModernWorld();

    ensureContinuousReverenceScreen();

    /* -----------------------------------------------------
       Screen 01 → Screen 02
       ----------------------------------------------------- */

    const start =
      document.querySelector(
        "#start-button"
      );


    if (start) {

      start.addEventListener(
        "click",
        () => {

          if (openingScreen()?.hidden || openingScreen()?.classList.contains("fade-out")) return;
          if (window.PuxianProgress.resumeScreen()) { resumeJourney(); return; }
          window.PuxianAudio?.playOpeningLaunch();
          transition(
            openingScreen(),
            vowScreen()
          );


          saveProgress({

            currentVow: 1,

            currentScreen:
              "vow"

          });

        }
      );

    }


    /* -----------------------------------------------------
       Screen 02 → Screen 01
       ----------------------------------------------------- */

    const back =
      document.querySelector(
        "#back-button"
      );


    if (back) {

      back.addEventListener(
        "click",
        () => {

          transition(
            vowScreen(),
            openingScreen()
          );


          saveProgress({

            currentVow: 1,

            currentScreen:
              "opening"

          });

        }
      );

    }


    /* -----------------------------------------------------
       Screen 02 → Challenge 1
       ----------------------------------------------------- */

    const explore =
      document.querySelector(
        "#explore-button"
      );


    if (explore) {

      explore.addEventListener(
        "click",
        () => {

          enterChallengeOne();

        }
      );

    }


    /* -----------------------------------------------------
       Challenge → Screen 02
       ----------------------------------------------------- */

    const challengeBack =
      document.querySelector(
        "#challenge-back-button"
      );


    if (challengeBack) {

      challengeBack.addEventListener(
        "click",
        () => {

          const discovery =
            document.querySelector(
              "#discovery-panel"
            );


          if (
            discovery &&
            !discovery.hidden
          ) {

            discovery.hidden =
              true;

          }


          cancelChallengeReveal();
          hideChallengeComplete();


          currentPersonId =
            null;


          transition(
            challengeOneScreen(),
            vowScreen()
          );


          saveProgress({

            currentVow: 1,

            currentScreen:
              "vow"

          });

        }
      );

    }


    /* -----------------------------------------------------
       Worshipper interactions
       ----------------------------------------------------- */

    document
      .querySelectorAll(
        ".worshipper"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const personId =
                button.dataset.person;


              openDiscovery(
                personId
              );

            }
          );

        }
      );


    /* -----------------------------------------------------
       Close discovery X
       ----------------------------------------------------- */

    const closeDiscoveryButton =
      document.querySelector(
        "#close-discovery-button"
      );


    if (
      closeDiscoveryButton
    ) {

      closeDiscoveryButton
        .addEventListener(
          "click",
          closeDiscovery
        );

    }


    /* -----------------------------------------------------
       Continue observing
       ----------------------------------------------------- */

    const continueButton =
      document.querySelector(
        "#continue-observing-button"
      );


    if (continueButton) {

      continueButton.addEventListener(
        "click",
        closeDiscovery
      );

    }


    /* -----------------------------------------------------
       Challenge language globe
       ----------------------------------------------------- */

    const challengeLanguageButton =
      document.querySelector(
        "#challenge-language-button"
      );


    if (
      challengeLanguageButton
    ) {

      challengeLanguageButton
        .addEventListener(
          "click",
          () => {
            openInGameLanguageMenu(
              challengeLanguageButton
            );
          }
        );

    }


    /* -----------------------------------------------------
       After observing all four → Screen 04
       ----------------------------------------------------- */

    const nextButton =
      document.querySelector(
        "#challenge-next-button"
      );


    if (nextButton) {

      nextButton.addEventListener(
        "click",
        enterKarmaScreen
      );

    }


    /* -----------------------------------------------------
       Screen 04 — 身・語・意 interactions
       ----------------------------------------------------- */

    document
      .querySelectorAll(
        ".karma-card"
      )
      .forEach(
        card => {

          card.addEventListener(
            "click",
            () => {
              openKarmaDetail(
                card.dataset.karma
              );
            }
          );

        }
      );


    const karmaClose =
      document.querySelector(
        "#karma-detail-close"
      );


    if (karmaClose) {
      karmaClose.addEventListener(
        "click",
        closeKarmaDetail
      );
    }


    const karmaContinue =
      document.querySelector(
        "#karma-detail-continue"
      );


    if (karmaContinue) {
      karmaContinue.addEventListener(
        "click",
        closeKarmaDetail
      );
    }


    const sutraBack =
      document.querySelector(
        "#sutra-back-button"
      );


    if (sutraBack) {

      sutraBack.addEventListener(
        "click",
        () => {

          const detail =
            document.querySelector(
              "#karma-detail-panel"
            );

          if (detail) detail.hidden = true;

          hideKarmaComplete();

          transition(
            karmaScreen(),
            challengeOneScreen()
          );

          updateChallengeLanguage();

          saveProgress({
            currentVow: 1,
            currentScreen:
              "challenge-one"
          });

        }
      );

    }


    const sutraLanguage =
      document.querySelector(
        "#sutra-language-button"
      );


    if (sutraLanguage) {

      sutraLanguage.addEventListener(
        "click",
        () => {
          openInGameLanguageMenu(
            sutraLanguage
          );
        }
      );

    }


    const karmaNext =
      document.querySelector(
        "#karma-next-button"
      );

    if (karmaNext) {
      karmaNext.addEventListener(
        "click",
        enterCountlessBuddhasScreen
      );
    }

    /* -----------------------------------------------------
       Screen 05 — How many Buddhas?
       ----------------------------------------------------- */

    const countlessBack =
      document.querySelector(
        "#countless-buddhas-back-button"
      );

    if (countlessBack) {
      countlessBack.addEventListener(
        "click",
        returnToKarmaScreen
      );
    }

    const countlessLanguage =
      document.querySelector(
        "#countless-buddhas-language-button"
      );

    if (countlessLanguage) {
      countlessLanguage.addEventListener(
        "click",
        () => {
          openInGameLanguageMenu(countlessLanguage);
        }
      );
    }

    const countlessExplore =
      document.querySelector(
        "#countless-buddhas-explore-button"
      );

    if (countlessExplore) {
      countlessExplore.addEventListener(
        "click",
        enterBuddhaExpansionScreen
      );
    }


    /* -----------------------------------------------------
       Screen 06 — Buddha expansion
       ----------------------------------------------------- */

    const buddhaExpansionBack =
      document.querySelector(
        "#buddha-expansion-back-button"
      );

    if (buddhaExpansionBack) {
      buddhaExpansionBack.addEventListener(
        "click",
        returnToCountlessBuddhasScreen
      );
    }

    const buddhaExpansionLanguage =
      document.querySelector(
        "#buddha-expansion-language-button"
      );

    if (buddhaExpansionLanguage) {
      buddhaExpansionLanguage.addEventListener(
        "click",
        () => {
          openInGameLanguageMenu(
            buddhaExpansionLanguage
          );
        }
      );
    }

    const buddhaExpansionFocus =
      document.querySelector(
        "#buddha-expansion-focus"
      );

    if (buddhaExpansionFocus) {
      buddhaExpansionFocus.addEventListener(
        "click",
        revealBuddhaExpansionDiscovery
      );
    }

    const buddhaExpansionNext =
      document.querySelector(
        "#buddha-expansion-next-button"
      );

    if (buddhaExpansionNext) {
      buddhaExpansionNext.addEventListener(
        "click",
        enterBuddhaRealmsScreen
      );
    }

    /* -----------------------------------------------------
       Screen 07 — Buddha realms expansion
       ----------------------------------------------------- */

    const buddhaRealmsBackButton =
      document.querySelector("#buddha-realms-back-button");

    if (buddhaRealmsBackButton) {
      buddhaRealmsBackButton.addEventListener(
        "click",
        returnToBuddhaExpansionScreen
      );
    }

    const buddhaRealmsLanguageButton =
      document.querySelector("#buddha-realms-language-button");

    if (buddhaRealmsLanguageButton) {
      buddhaRealmsLanguageButton.addEventListener(
        "click",
        event => {
          event.stopPropagation();
          openInGameLanguageMenu(buddhaRealmsLanguageButton);
        }
      );
    }

    const buddhaRealmsExpandButton =
      document.querySelector("#buddha-realms-expand-button");

    if (buddhaRealmsExpandButton) {
      buddhaRealmsExpandButton.addEventListener(
        "click",
        expandBuddhaRealms
      );
    }



    const buddhaRealmsNextButton =
      document.querySelector("#buddha-realms-next-button");

    if (buddhaRealmsNextButton) {
      buddhaRealmsNextButton.addEventListener(
        "click",
        enterContinuousReverenceScreen
      );
    }

    /* -----------------------------------------------------
       Screen 08 — Continuous reverence
       ----------------------------------------------------- */

    const continuousBackButton =
      document.querySelector("#continuous-reverence-back-button");

    if (continuousBackButton) {
      continuousBackButton.addEventListener(
        "click",
        returnToBuddhaRealmsScreen
      );
    }

    const continuousLanguageButton =
      document.querySelector("#continuous-reverence-language-button");

    if (continuousLanguageButton) {
      continuousLanguageButton.addEventListener(
        "click",
        event => {
          event.stopPropagation();
          openInGameLanguageMenu(continuousLanguageButton);
        }
      );
    }

    const continuousForwardButton =
      document.querySelector("#continuous-reverence-forward-button");

    if (continuousForwardButton) {
      continuousForwardButton.addEventListener(
        "click",
        advanceContinuousReverence
      );
    }

    const continuousNextButton =
      document.querySelector("#continuous-reverence-next-button");

    if (continuousNextButton) {
      continuousNextButton.addEventListener(
        "click",
        enterDailyReverenceScreen);
    }


    /* -----------------------------------------------------
       Restore saved Challenge 1 progress
       ----------------------------------------------------- */

    restoreChallengeProgress();
    restoreKarmaProgress();
    updateKarmaLanguage();
    updateCountlessBuddhasLanguage();
    updateBuddhaExpansionLanguage();
    updateBuddhaRealmsLanguage();
    updateContinuousReverenceLanguage();
    updateDailyReverenceLanguage();
    updateDailyChoiceLanguage();
    updateEqualRespectLanguage();
    updateVowOneSynthesisLanguage();
    updateVowOneSealLanguage();
    updateVowOneCrossroadsLanguage();


    /* -----------------------------------------------------
       Respond to language changes
       ----------------------------------------------------- */

    document.addEventListener(
      "puxian:languagechange",
      () => {
        updateChallengeLanguage();
        updateKarmaLanguage();
        updateCountlessBuddhasLanguage();
        updateBuddhaExpansionLanguage();
        updateBuddhaRealmsLanguage();
        updateContinuousReverenceLanguage();
        updateDailyReverenceLanguage();
        updateDailyChoiceLanguage();
        updateEqualRespectLanguage();
        updateVowOneSynthesisLanguage();
        updateVowOneSealLanguage();
        updateVowOneCrossroadsLanguage();
      }
    );

  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  
  const dailyReverenceBackButton =
    document.querySelector("#daily-reverence-back-button");

  const dailyReverenceLanguageButton =
    document.querySelector("#daily-reverence-language-button");

  const dailyReverenceStartButton =
    document.querySelector("#daily-reverence-start-button");

  dailyReverenceBackButton?.addEventListener(
    "click",
    returnToContinuousReverenceScreen
  );

  dailyReverenceLanguageButton?.addEventListener(
    "click",
    event => {
      event.stopPropagation();
      openInGameLanguageMenu(
        dailyReverenceLanguageButton
      );
    }
  );

  dailyReverenceStartButton?.addEventListener(
    "click",
    enterDailyChoiceScreen
  );


  const dailyChoiceBackButton =
    document.querySelector("#daily-choice-back-button");

  const dailyChoiceLanguageButton =
    document.querySelector("#daily-choice-language-button");

  const dailyChoiceRushButton =
    document.querySelector(
      '#daily-choice-rush-button, .daily-choice-option[data-choice="rush"]'
    );

  const dailyChoiceCareButton =
    document.querySelector(
      '#daily-choice-care-button, .daily-choice-option[data-choice="care"]'
    );

  const dailyChoiceRetryButton =
    document.querySelector("#daily-choice-retry-button");

  const dailyChoiceNextButton =
    document.querySelector("#daily-choice-next-button");

  dailyChoiceBackButton?.addEventListener(
    "click",
    returnToDailyReverenceScreen
  );

  dailyChoiceLanguageButton?.addEventListener(
    "click",
    event => {
      event.stopPropagation();
      openInGameLanguageMenu(
        dailyChoiceLanguageButton
      );
    }
  );

  dailyChoiceRushButton?.addEventListener(
    "click",
    () => chooseDailyLifeAction("rush")
  );

  dailyChoiceCareButton?.addEventListener(
    "click",
    () => chooseDailyLifeAction("care")
  );

  dailyChoiceRetryButton?.addEventListener(
    "click",
    retryDailyChoice
  );

  dailyChoiceNextButton?.addEventListener(
    "click",
    enterEqualRespectScreen
  );


  const equalRespectBackButton =
    document.querySelector("#equal-respect-back-button");

  const equalRespectLanguageButton =
    document.querySelector("#equal-respect-language-button");

  const equalRespectFavorButton =
    document.querySelector(
      '#equal-respect-status-button, .equal-respect-option[data-choice="status"]'
    );

  const equalRespectEqualButton =
    document.querySelector(
      '#equal-respect-equal-button, .equal-respect-option[data-choice="equal"]'
    );

  const equalRespectRetryButton =
    document.querySelector("#equal-respect-retry-button");

  const equalRespectNextButton =
    document.querySelector("#equal-respect-next-button");

  equalRespectBackButton?.addEventListener(
    "click",
    returnToDailyChoiceScreen
  );

  equalRespectLanguageButton?.addEventListener(
    "click",
    event => {
      event.stopPropagation();
      openInGameLanguageMenu(
        equalRespectLanguageButton
      );
    }
  );

  equalRespectFavorButton?.addEventListener(
    "click",
    () => chooseEqualRespectAction("status")
  );

  equalRespectEqualButton?.addEventListener(
    "click",
    () => chooseEqualRespectAction("equal")
  );

  equalRespectRetryButton?.addEventListener(
    "click",
    retryEqualRespect
  );

  equalRespectNextButton?.addEventListener(
    "click",
    enterVowOneSynthesisScreen
  );

  const vowOneSynthesisBackButton =
    document.querySelector("#vow01-synthesis-back-button");

  const vowOneSynthesisLanguageButton =
    document.querySelector("#vow01-synthesis-language-button");

  const vowOneSynthesisNextButton =
    document.querySelector("#vow01-synthesis-next-button");

  vowOneSynthesisBackButton?.addEventListener(
    "click",
    returnToEqualRespectScreen
  );

  vowOneSynthesisLanguageButton?.addEventListener(
    "click",
    event => {
      event.stopPropagation();
      openInGameLanguageMenu(vowOneSynthesisLanguageButton);
    }
  );

  vowOneSynthesisNextButton?.addEventListener(
    "click",
    enterVowOneSealScreen
  );



  /* =======================================================
     SCREEN 12 — FIRST VOW SYNTHESIS
     三片行願花瓣合流
     ======================================================= */

  const vowOneSynthesisUi = window.PuxianVow01Content.vowOneSynthesisUi;

  function getVowOneSynthesisUi() {
    return vowOneSynthesisUi[currentLanguage()] || vowOneSynthesisUi.zh;
  }

  function updateVowOneSynthesisLanguage() {
    const ui = getVowOneSynthesisUi();

    const textMap = {
      "#vow01-synthesis-label": ui.label,
      "#vow01-synthesis-title": ui.title,
      "#vow01-synthesis-instruction": ui.instruction,
      "#vow01-synthesis-petal-one-question": ui.petalOneQuestion,
      "#vow01-synthesis-petal-one-name": ui.petalOneName,
      "#vow01-synthesis-petal-two-question": ui.petalTwoQuestion,
      "#vow01-synthesis-petal-two-name": ui.petalTwoName,
      "#vow01-synthesis-petal-three-question": ui.petalThreeQuestion,
      "#vow01-synthesis-petal-three-name": ui.petalThreeName,
      "#vow01-synthesis-sudhana-name": ui.sudhana,
      "#vow01-synthesis-sudhana-line-one": ui.sudhanaLineOne,
      "#vow01-synthesis-sudhana-line-two": ui.sudhanaLineTwo,
      "#vow01-synthesis-sudhana-line-three": ui.sudhanaLineThree,
      "#vow01-synthesis-realization-label": ui.realizationLabel,
      "#vow01-synthesis-realization-text": ui.realization,
      "#vow01-synthesis-next-button": ui.next
    };

    Object.entries(textMap).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    });

    const backButton =
      document.querySelector("#vow01-synthesis-back-button");

    const languageButton =
      document.querySelector("#vow01-synthesis-language-button");

    if (backButton) {
      backButton.title = ui.back;
      backButton.setAttribute("aria-label", ui.back);
    }

    if (languageButton) {
      languageButton.title = ui.changeLanguage;
      languageButton.setAttribute("aria-label", ui.changeLanguage);
    }
  }

  function enterVowOneSynthesisScreen() {
    updateVowOneSynthesisLanguage();

    transition(
      equalRespectScreen(),
      vowOneSynthesisScreen()
    );

    saveProgress({
      currentVow: 1,
      currentScreen: "vow01-synthesis"
    });
  }

  function returnToEqualRespectScreen() {
    transition(
      vowOneSynthesisScreen(),
      equalRespectScreen()
    );

    updateEqualRespectLanguage();
    restoreEqualRespectChoice();

    saveProgress({
      currentVow: 1,
      currentScreen: "equal-respect"
    });
  }


  /* =======================================================
     SCREEN 13 — FIRST VOW SEAL
     第一行願法印・禮敬諸佛
     ======================================================= */

  const vowOneSealUi = window.PuxianVow01Content.vowOneSealUi;

  function getVowOneSealUi() {
    return vowOneSealUi[currentLanguage()] || vowOneSealUi.zh;
  }

  function updateVowOneSealLanguage() {
    const ui = getVowOneSealUi();
    const reward = window.PuxianVow01Content.rewardArc[currentLanguage()] || window.PuxianVow01Content.rewardArc.zh;
    window.PuxianVow01Rewards.updateLanguage(currentLanguage());

    const textMap = {
      "#vow01-seal-label": ui.label,
      "#vow01-seal-title": reward.sealTitle,
      "#vow01-seal-reward-label": ui.rewardLabel,
      "#vow01-seal-reward-name": reward.sealName,
      "#vow01-seal-progress-label": reward.journey,
      "#vow01-seal-progress-value": ui.progressValue,
      "#vow01-seal-daily-label": ui.dailyLabel,
      "#vow01-seal-daily-text": ui.dailyPractice,
      "#vow01-seal-closing": ui.closing,
      "#vow01-seal-next-button": ui.next
    };

    Object.entries(textMap).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    });

    const backButton =
      document.querySelector("#vow01-seal-back-button");

    const languageButton =
      document.querySelector("#vow01-seal-language-button");

    if (backButton) {
      backButton.title = ui.back;
      backButton.setAttribute("aria-label", ui.back);
    }

    if (languageButton) {
      languageButton.title = ui.changeLanguage;
      languageButton.setAttribute("aria-label", ui.changeLanguage);
    }
  }

  function awardFirstVowSeal() {
    const progress = loadProgress();

    const seals = Array.isArray(progress.seals)
      ? [...progress.seals]
      : [];

    if (!seals.includes("vow01")) {
      seals.push("vow01");
    }

    const completedVows = Array.isArray(progress.completedVows)
      ? [...progress.completedVows]
      : [];

    if (!completedVows.includes(1)) {
      completedVows.push(1);
    }

    progress.currentVow = 1;
    progress.currentScreen = "vow01-seal";
    progress.seals = seals;
    progress.completedVows = completedVows;
    progress.vow01 = {
      ...(progress.vow01 || {}),
      sealAwarded: true
    };

    saveProgress(progress);

    return progress;
  }

  function enterVowOneSealScreen() {
    updateVowOneSealLanguage();
    awardFirstVowSeal();

    transition(
      vowOneSynthesisScreen(),
      vowOneSealScreen()
    );
  }

  function returnToVowOneSynthesisScreen() {
    transition(
      vowOneSealScreen(),
      vowOneSynthesisScreen()
    );

    updateVowOneSynthesisLanguage();

    saveProgress({
      currentVow: 1,
      currentScreen: "vow01-synthesis"
    });
  }

  const vowOneSealBackButton =
    document.querySelector("#vow01-seal-back-button");

  const vowOneSealLanguageButton =
    document.querySelector("#vow01-seal-language-button");

  const vowOneSealNextButton =
    document.querySelector("#vow01-seal-next-button");

  vowOneSealBackButton?.addEventListener(
    "click",
    returnToVowOneSynthesisScreen
  );

  vowOneSealLanguageButton?.addEventListener(
    "click",
    event => {
      event.stopPropagation();
      openInGameLanguageMenu(vowOneSealLanguageButton);
    }
  );

  /* =======================================================
     SCREEN 14 — VOW 1 JOURNEY CROSSROADS
     第一願完成後：繼續旅程 / 深入第一願
     ======================================================= */

  const vowOneCrossroadsUi = window.PuxianVow01Content.vowOneCrossroadsUi;

  function getVowOneCrossroadsUi() {
    return vowOneCrossroadsUi[currentLanguage()] || vowOneCrossroadsUi.zh;
  }

  function updateVowOneCrossroadsLanguage() {
    const ui = getVowOneCrossroadsUi();

    const textMap = {
      "#vow01-crossroads-label": ui.label,
      "#vow01-crossroads-title": ui.title,
      "#vow01-crossroads-intro": ui.intro,
      "#vow01-crossroads-reflection": ui.reflection,
      "#vow01-crossroads-rest-title": ui.restTitle,
      "#vow01-crossroads-master-video-text": ui.masterVideo,
      "#vow01-crossroads-master-video-subtitle": ui.masterSubtitle,
      "#vow01-crossroads-modern-video-text": ui.modernVideo,
      "#vow01-crossroads-modern-video-subtitle": ui.modernSubtitle,
      "#vow01-crossroads-reading-label": ui.readingLabel,
      "#vow01-crossroads-commentary-text": ui.commentary,
      "#vow01-crossroads-reading-subtitle": ui.readingSubtitle,
      "#vow01-crossroads-reading-support": ui.readingSupport,
      "#vow01-crossroads-reading-cta": ui.readingCta,
      "#vow01-crossroads-vow02-button": ui.vow02Button,
      "#vow01-crossroads-note": ui.note
    };

    Object.entries(textMap).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    });

    const backButton =
      document.querySelector("#vow01-crossroads-back-button");

    const languageButton =
      document.querySelector("#vow01-crossroads-language-button");

    if (backButton) {
      backButton.title = ui.back;
      backButton.setAttribute("aria-label", ui.back);
    }

    if (languageButton) {
      languageButton.title = ui.changeLanguage;
      languageButton.setAttribute("aria-label", ui.changeLanguage);
    }

    const english = currentLanguage() === "en";
    const modernVideo = document.querySelector("#vow01-crossroads-modern-video");
    // Preserve the accepted Vietnamese video mapping to the authentic English source.
    const chineseVideo = currentLanguage() === "zh";
    if (modernVideo) modernVideo.href = chineseVideo
      ? "https://youtu.be/x7QNTmRwQ0I" : "https://youtu.be/SMB1T1Ix0QY";
    const thumbnail = document.querySelector("#vow01-crossroads-modern-thumbnail");
    const thumbnailSource = "https://i.ytimg.com/vi/" + (chineseVideo ? "x7QNTmRwQ0I" : "SMB1T1Ix0QY") + "/hqdefault.jpg";
    if (thumbnail && thumbnail.getAttribute("src") !== thumbnailSource) thumbnail.src = thumbnailSource;
    const reading = document.querySelector("#vow01-crossroads-commentary");
    if (reading) reading.href = english
      ? "https://kalavinkapress.org/ebooks_NEW/Avatamsaka%20Sutra_Vol%203_English_ebk_08-19-23.pdf"
      : "https://www.drbachinese.org/online_reading/sutra_explanation/Universal_Worthy/Universal_Worthy.htm";
  }

  // Presentation only: existing completion/checkpoint storage remains authoritative.
  let restStopArrivalPlayed = loadProgress().currentScreen === "vow01-crossroads";

  function enterVowOneCrossroadsScreen() {
    vowOneCrossroadsScreen()?.classList.toggle("pc-arrival", !restStopArrivalPlayed);
    restStopArrivalPlayed = true;
    updateVowOneCrossroadsLanguage();

    transition(
      vowOneSealScreen(),
      vowOneCrossroadsScreen()
    );

    saveProgress({
      currentVow: 1,
      currentScreen: "vow01-crossroads"
    });
  }

  function returnToVowOneSealScreen() {
    transition(
      vowOneCrossroadsScreen(),
      vowOneSealScreen()
    );

    updateVowOneSealLanguage();

    saveProgress({
      currentVow: 1,
      currentScreen: "vow01-seal"
    });
  }

  function previewVowTwo() {
    /*
     * Vow 2 is intentionally not built yet.
     * This button marks the next destination without
     * prematurely constructing Level 2.
     */
    window.alert(
      getVowOneCrossroadsUi().comingSoon
    );
  }

  const vowOneCrossroadsBackButton =
    document.querySelector("#vow01-crossroads-back-button");

  const vowOneCrossroadsLanguageButton =
    document.querySelector("#vow01-crossroads-language-button");

  const vowOneCrossroadsVow02Button =
    document.querySelector("#vow01-crossroads-vow02-button");

  vowOneSealNextButton?.addEventListener(
    "click",
    enterVowOneCrossroadsScreen
  );

  vowOneCrossroadsBackButton?.addEventListener(
    "click",
    returnToVowOneSealScreen
  );

  vowOneCrossroadsLanguageButton?.addEventListener(
    "click",
    event => {
      event.stopPropagation();
      openInGameLanguageMenu(vowOneCrossroadsLanguageButton);
    }
  );

  vowOneCrossroadsVow02Button?.addEventListener(
    "click",
    previewVowTwo
  );


  function restartCurrentExploration(name) {
    window.PuxianNavigation.cancelPendingTransitions();
    window.PuxianAudio?.stopEvents();
    if (name === "challenge-one") {
      cancelChallengeReveal();
      exploredPeople.clear();
      currentPersonId = null;
      document.querySelectorAll(".worshipper").forEach(button => button.classList.remove("is-explored"));
      const panel = document.querySelector("#discovery-panel");
      if (panel) panel.hidden = true;
      hideChallengeComplete();
      updateChallengeLanguage();
      saveChallengeProgress();
    } else if (name === "sutra-body-speech-mind") {
      exploredKarma.clear();
      document.querySelectorAll(".karma-card").forEach(card => {
        card.classList.remove("is-current", "is-explored");
        const status = card.querySelector(".karma-status");
        if (status) status.textContent = "";
      });
      const panel = document.querySelector("#karma-detail-panel");
      if (panel) panel.hidden = true;
      hideKarmaComplete();
      updateKarmaProgress();
      saveKarmaProgress();
    } else if (name === "buddha-expansion") resetBuddhaExpansionScene();
    else if (name === "buddha-realms") resetBuddhaRealmsScene();
    else if (name === "continuous-reverence") resetContinuousReverenceScene();
    else if (name === "daily-choice") retryDailyChoice();
    else if (name === "equal-respect") retryEqualRespect();
    commitCheckpoint(name);
    const screen = document.querySelector('[data-screen="' + name + '"]');
    if (screen) screen.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function leaveAdventure() {
    buddhaHintCleanup();
    cancelChallengeReveal();
    const active = Array.from(document.querySelectorAll(".screen")).find(el => !el.hidden && el.dataset.screen !== "opening" && el.dataset.screen !== "language");
    if (active) commitCheckpoint(active.dataset.screen);
    window.PuxianNavigation.cancelPendingTransitions();
    resetBuddhaRealmsScene();
    window.PuxianAudio?.stopEvents();
    document.querySelectorAll(".screen").forEach(hide);
    show(openingScreen()); // existing adventure entry, not a new external hub
  }

  // Persist only stable scene state. The existing decode/session owner remains authoritative.
  function commitCheckpoint(name) {
    if (!window.PuxianProgress.screens.includes(name)) return;
    const v = {};
    if (name === "buddha-expansion") v.buddhaExpansionDiscovered = document.querySelector("#buddha-expansion-discovery")?.hidden === false;
    if (name === "buddha-realms") {
      v.buddhaRealmsStep = buddhaRealmsStep;
      v.buddhaRealmsDharmaRevealed = document.querySelector("#buddha-realms-sutra")?.hidden === false;
    }
    if (name === "continuous-reverence") {
      v.continuousReverenceStep = continuousReverenceStep;
      v.continuousReverenceDharmaRevealed = document.querySelector("#continuous-reverence-sutra")?.hidden === false;
    }
    saveProgress({ currentScreen: name, vow01: v }, true);
  }

  function restoreJourneyState() {
    window.PuxianVow01Rewards.restore();
    // Resume/Start Over reconstruct a stable scene without replaying a transient reveal.
    vowOneCrossroadsScreen()?.classList.remove("pc-arrival");
    restStopArrivalPlayed = loadProgress().currentScreen === "vow01-crossroads";
    cancelChallengeReveal();
    const v = loadProgress().vow01;
    window.PuxianNavigation.cancelPendingTransitions();
    resetBuddhaRealmsScene(); // invalidate all pending decode/timer callbacks before restoring
    resetContinuousReverenceScene();
    resetBuddhaExpansionScene();
    window.PuxianAudio?.stopEvents();
    exploredPeople.clear(); exploredKarma.clear(); currentPersonId = null;
    document.querySelectorAll(".worshipper, .karma-card").forEach(el => el.classList.remove("is-explored", "is-current"));
    document.querySelectorAll(".karma-status").forEach(el => el.textContent = "");
    const discovery = document.querySelector("#discovery-panel");
    const detail = document.querySelector("#karma-detail-panel");
    if (discovery) discovery.hidden = true;
    if (detail) detail.hidden = true;
    hideChallengeComplete(); hideKarmaComplete();
    restoreChallengeProgress(); restoreKarmaProgress();
    if (exploredPeople.size === 4) showChallengeComplete();
    if (exploredKarma.size === 3) showKarmaComplete();
    document.querySelector("#buddha-expansion-discovery").hidden = !v.buddhaExpansionDiscovered;
    buddhaRealmsStep = v.buddhaRealmsStep;
    document.querySelector("#buddha-realms-main-image").src = buddhaRealmsImages[buddhaRealmsStep];
    document.querySelector("#buddha-realms-stage").hidden = v.buddhaRealmsDharmaRevealed;
    document.querySelector("#buddha-realms-sutra").hidden = !v.buddhaRealmsDharmaRevealed;
    document.querySelector("#buddha-realms-expand-button").disabled = v.buddhaRealmsDharmaRevealed;
    updateBuddhaRealmsLanguage(); preloadBuddhaRealm(buddhaRealmsStep + 1);
    continuousReverenceStep = v.continuousReverenceStep;
    document.querySelector("#continuous-reverence-stage").hidden = v.continuousReverenceDharmaRevealed;
    document.querySelector("#continuous-reverence-sutra").hidden = !v.continuousReverenceDharmaRevealed;
    updateContinuousReverenceLanguage();
    resetDailyChoice(); updateDailyChoiceLanguage();
    if (v.dailyChoiceSelection) chooseDailyLifeAction(v.dailyChoiceSelection, true);
    resetEqualRespect(); updateEqualRespectLanguage(); restoreEqualRespectChoice();
    updateChallengeLanguage(); updateKarmaLanguage(); updateCountlessBuddhasLanguage();
    updateBuddhaExpansionLanguage(); updateDailyReverenceLanguage();
    updateVowOneSynthesisLanguage(); updateVowOneSealLanguage(); updateVowOneCrossroadsLanguage();
    document.querySelector(".puxian-language-menu")?.remove();
  }

  function resumeJourney() {
    const name = window.PuxianProgress.resumeScreen();
    if (!name) return;
    restoreJourneyState();
    document.querySelectorAll(".screen").forEach(hide);
    show(document.querySelector('[data-screen="' + name + '"]'));
  }

  function startJourneyOver() {
    window.PuxianProgress.startOver();
    window.PuxianVow01Rewards.restore(true); // reset transient audio consumption for a new journey
    restoreJourneyState();
    document.querySelectorAll(".screen").forEach(hide);
    show(openingScreen());
  }

const api = {
    commitCheckpoint, resumeJourney, startJourneyOver,

    restartCurrentExploration,
    leaveAdventure,

    loadProgress,

    saveProgress,

    enterChallengeOne,

    enterKarmaScreen,

    updateChallengeLanguage,

    updateKarmaLanguage,

    enterCountlessBuddhasScreen,

    updateCountlessBuddhasLanguage,

    enterBuddhaExpansionScreen,

    updateBuddhaExpansionLanguage,
    enterBuddhaRealmsScreen,
    updateBuddhaRealmsLanguage,
    enterContinuousReverenceScreen,
    updateContinuousReverenceLanguage,
    enterDailyReverenceScreen,
    updateDailyReverenceLanguage,
    enterDailyChoiceScreen,
    updateDailyChoiceLanguage,
    enterEqualRespectScreen,
    updateEqualRespectLanguage,
    enterVowOneSynthesisScreen,
    updateVowOneSynthesisLanguage,
    enterVowOneSealScreen,
    updateVowOneSealLanguage,
    enterVowOneCrossroadsScreen,
    updateVowOneCrossroadsLanguage

  };


  return { api, initialise };
  }

  const languageButtonSelector = "#challenge-language-button, #sutra-language-button, #countless-buddhas-language-button, #buddha-expansion-language-button, #buddha-realms-language-button, #continuous-reverence-language-button, #daily-reverence-language-button, #daily-choice-language-button, #equal-respect-language-button, #vow01-synthesis-language-button, #vow01-seal-language-button, #vow01-crossroads-language-button";
  window.PuxianVow01 = { createRuntime, languageButtonSelector };
})();
