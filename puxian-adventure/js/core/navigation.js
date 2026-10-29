(() => {
  "use strict";

  const pendingTransitions = new Set();

  function cancelPendingTransitions() {
    pendingTransitions.forEach(clearTimeout);
    pendingTransitions.clear();
    document.querySelectorAll(".fade-out").forEach(el => el.classList.remove("fade-out"));
  }

  function hide(element) {

    if (!element) return;

    element.hidden = true;

    element.classList.remove(
      "is-active",
      "active",
      "fade-in"
    );

  }


  function show(element) {

    if (!element) return;

    element.hidden = false;
    window.PuxianGame?.commitCheckpoint(element.dataset.screen);

    element.classList.add(
      "is-active",
      "active",
      "fade-in"
    );

    setTimeout(() => {

      element.classList.remove(
        "fade-in"
      );

    }, 450);


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  function transition(
    from,
    to
  ) {

    if (!to) return;


    if (!from) {

      show(to);

      return;

    }


    from.classList.add(
      "fade-out"
    );


    const timer = setTimeout(() => {
      pendingTransitions.delete(timer);

      from.classList.remove(
        "fade-out"
      );

      hide(from);

      show(to);

    }, 280);
    pendingTransitions.add(timer);

  }


  window.PuxianNavigation = { hide, show, transition, cancelPendingTransitions };
})();
