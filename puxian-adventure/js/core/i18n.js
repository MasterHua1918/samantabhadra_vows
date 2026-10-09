(() => {
  "use strict";

  function currentLanguage() {

    return (
      window.PuxianLanguage
        ?.getCurrentLanguage?.()
      || "zh"
    );

  }


  function localised(
    value,
    lang = currentLanguage()
  ) {

    if (
      window.PuxianVows
        ?.localised
    ) {

      return window.PuxianVows.localised(
        value,
        lang
      );

    }


    if (
      typeof value === "string"
    ) {

      return value;

    }


    if (
      !value ||
      typeof value !== "object"
    ) {

      return "";

    }


    return (
      value[lang]
      || value.zh
      || ""
    );

  }

  window.PuxianI18n = { currentLanguage, localised };
})();
