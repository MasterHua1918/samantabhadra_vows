/* Screen 03 (Prototype B): if the character's thought bubble and Sudhana's reply bubble would
   overlap on a small screen, fade the thought bubble out while the reply is showing,
   so the reply stays fully readable. Does nothing when there is no overlap. */
(function () {
  "use strict";
  var panel = document.getElementById("discovery-panel");
  var reaction = document.getElementById("pb-reaction");
  if (!panel || !reaction) return;

  var frame = 0;

  function overlaps() {
    if (panel.hidden || reaction.hidden) return false;
    var a = panel.getBoundingClientRect();
    var b = reaction.getBoundingClientRect();
    if (!a.width || !b.width) return false;
    return Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 &&
           Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2;
  }

  function check() {
    frame = 0;
    panel.classList.remove("pb-yield");
    if (overlaps()) panel.classList.add("pb-yield");
  }

  var settleTimer = 0;

  function schedule() {
    if (!frame) frame = requestAnimationFrame(check);
    // Check again once the slide/fade animations have finished.
    clearTimeout(settleTimer);
    settleTimer = setTimeout(check, 480);
  }

  var options = {
    attributes: true,
    attributeFilter: ["hidden", "data-person", "data-thought"],
    childList: true,
    subtree: true,
    characterData: true
  };
  var observer = new MutationObserver(schedule);
  observer.observe(panel, options);
  observer.observe(reaction, options);
  panel.addEventListener("transitionend", schedule);
  panel.addEventListener("animationend", schedule);
  reaction.addEventListener("animationend", schedule);
  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", schedule);
})();
