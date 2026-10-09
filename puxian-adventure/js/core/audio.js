/* Approved Phase B Vow 1 audio; optional playback never controls gameplay. */
(() => {
  "use strict";
  const key = "puxianAdventureSoundEnabled";
  const sources = {
    E01: "assets/audio/vow01/expansion-01.mp3",
    E02: "assets/audio/vow01/expansion-02.mp3",
    E03: "assets/audio/vow01/expansion-03.mp3",
    E04: "assets/audio/vow01/expansion-04.mp3",
    E05: "assets/audio/vow01/expansion-05.mp3",
    R01: "assets/audio/vow01/dharma-revelation.mp3",
    D01: "assets/audio/vow01/discovery-chime.mp3",
    CD_DHARMA: "assets/audio/vow01/mixkit-relaxing-bell-chime-3109.wav",
    CD_PETAL: "assets/audio/vow01/mixkit-fairy-magic-sparkle-871.wav",
    CD_SEAL: "assets/audio/vow01/mixkit-fairy-glitter-867.wav"
  };
  let enabled = true;
  try { enabled = localStorage.getItem(key) !== "false"; } catch (_) {}
  const ambient = new Audio("assets/audio/vow01/ambient-sacred-space.mp3");
  ambient.loop = true;
  ambient.preload = "none";
  ambient.volume = 0.12;
  ambient.muted = !enabled;
  const effects = new Map();
  let sacredScene = false;
  let openingLaunch = null;
  let rewardTimer = null;
  const rewardIds = new Set(["CD_DHARMA", "CD_PETAL", "CD_SEAL"]);
  function stopOpeningLaunch() {
    if (!openingLaunch) return;
    openingLaunch.pause();
    try { openingLaunch.currentTime = 0; } catch (_) {}
  }
  function playOpeningLaunch() {
    if (!enabled) return;
    stopEvents();
    if (!openingLaunch) {
      openingLaunch = new Audio("assets/audio/vow01/opening-journey-launch.mp3");
      openingLaunch.preload = "none";
      openingLaunch.loop = false;
      openingLaunch.volume = 0.45;
    }
    openingLaunch.muted = false;
    safePlay(openingLaunch);
  }
  const ambientScenes = new Set([
    "vow", "challenge-one", "sutra-body-speech-mind", "countless-buddhas-intro",
    "buddha-expansion", "buddha-realms", "continuous-reverence", "daily-reverence",
    "daily-choice", "equal-respect", "vow01-synthesis", "vow01-seal"
  ]);
  function safePlay(audio) {
    try {
      const promise = audio.play();
      if (promise?.catch) promise.catch(() => {});
    } catch (_) {}
  }
  function clearRewardTimer() {
    clearTimeout(rewardTimer);
    rewardTimer = null;
  }
  function stopReward() {
    clearRewardTimer();
    effects.forEach((audio, id) => {
      if (!rewardIds.has(id)) return;
      audio.pause();
      try { audio.currentTime = 0; } catch (_) {}
    });
  }
  function setQuiet(value) {
    ambient.volume = value ? 0.035 : 0.12;
  }
  function stopEvents(preserveOpeningLaunch = false) {
    clearRewardTimer();
    if (!preserveOpeningLaunch) stopOpeningLaunch();
    effects.forEach(audio => {
      audio.pause();
      try { audio.currentTime = 0; } catch (_) {}
    });
  }
  function resumeAmbient() {
    if (enabled && sacredScene && ambient.paused) safePlay(ambient);
  }
  function setScene(name) {
    if (name !== "vow") stopOpeningLaunch();
    const active = ambientScenes.has(name); // Screen 14 / crossroads is completion, not exploration.
    if (active === sacredScene) return;
    sacredScene = active;
    if (active) resumeAmbient();
    else ambient.pause();
  }
  function setEnabled(value) {
    enabled = !!value;
    ambient.muted = !enabled;
    effects.forEach(audio => { audio.muted = !enabled; });
    if (!enabled) { ambient.pause(); stopEvents(); }
    else resumeAmbient();
    try { localStorage.setItem(key, String(enabled)); } catch (_) {}
    document.dispatchEvent(new CustomEvent("puxian:soundchange"));
  }
  function play(id) {
    if (!enabled || !sources[id]) return;
    stopEvents(); // one controlled event tail at a time; no accumulating layers
    let audio = effects.get(id);
    if (!audio) {
      audio = new Audio(sources[id]);
      audio.preload = "none";
      const rewardVolumes = { CD_DHARMA: 0.26, CD_PETAL: 0.30, CD_SEAL: 0.42 };
      audio.volume = rewardVolumes[id] ?? (id === "D01" ? 0.35 : 0.55);
      effects.set(id, audio);
    }
    audio.muted = !enabled;
    safePlay(audio);
  }
  // One transient continuation, owned and cancelled by the existing sound system.
  function playReward(reward, reducedMotion) {
    if (!enabled) return; // muted acquisitions are consumed by the reward owner, never queued
    if (["first-petal", "second-petal", "third-petal"].includes(reward)) {
      play("CD_DHARMA");
      rewardTimer = setTimeout(() => {
        rewardTimer = null;
        play("CD_PETAL");
      }, 1800); // approved chime is 1.678 s; let it finish before acquisition
    } else if (reward === "vow-seal") {
      stopEvents();
      if (reducedMotion) play("CD_SEAL");
      else rewardTimer = setTimeout(() => {
        rewardTimer = null;
        play("CD_SEAL");
      }, 2352); // 42% of the accepted 5.6 s C05 -> completion choreography
    }
  }
  window.PuxianAudio = { play, playReward, stopReward, setQuiet, playOpeningLaunch, stopEvents, setEnabled, setScene, resumeAmbient,
    isEnabled: () => enabled };
  // A blocked autoplay attempt may be retried on a later eligible user gesture.
  document.addEventListener("pointerdown", resumeAmbient, true);
  document.addEventListener("keydown", resumeAmbient, true);
})();
