/* global
 $, twemoji
*/

(() => {
  "use strict";

  // Make sure page is loaded over HTTPS
  if (!window.location.href.match(/^https/)) {
    window.location.href = "https://lfgg.jcink.net/";
  }

  const capitalizeFirstLetter = (text: string): string =>
    text.charAt(0).toUpperCase() + text.slice(1);

  if (undefined !== $) {
    // Functions that should be ran whenever posts are rendered;
    // ideally this'll run after quick edit completes,
    // but should be good on page load as well.
    const postFixers = () => {
      // Activate twemoji replacements
      if (undefined !== twemoji) {
        twemoji.parse(document.body);
      }

      // Turn IDs that should be classes into classes
      const idToClass = [
        "CODE",
        "CODE-WRAP",
        "QUOTE",
        "QUOTE-WRAP",
        // weirdly, these last two have CODE IDs within
        "HTML-WRAP",
        "SQL-WRAP"
      ];
      idToClass.forEach(name => {
        $(`[id="${name}"]`).each((index, element) => {
          $(element).addClass(name.toLowerCase());
          $(element).attr("id", null);
        });
      });
    };

    $(() => {
      postFixers();

      // Fix logo
      $("#logo-image").attr(
        "alt",
        $('meta[property="og:title"]').attr("content")
      );

      // Fix buttons
      $(".button-large, .button-small")
        .parent("a")
        .addClass("button-link");

      // Fix copyright wrapper
      $(".copyright")
        .parent("div")
        .attr("style", null);
      $(".copyright")
        .parent("div")
        .removeClass("row4");
      $(".copyright")
        .parent("div")
        .parent("div")
        .removeClass("tableborder");
      $(".copyright")
        .parent("div")
        .parent("div")
        .addClass("copyright-wrapper");
      $(".copyright").append($(".copyright-sequel"));

      // Remove "Logged in as"
      $("#logged-in-as")
        .parent()
        .html(
          $("#logged-in-as")
            .parent()
            .html()
            .replace("Logged in as:", "")
        );

      // Use labels and placeholders for quick login
      const quickLoginItems: string[] = ["UserName", "PassWord"];
      $("#quick-login input").each((index, element) => {
        const name: string = $(element).attr("name");
        if (quickLoginItems.includes(name)) {
          const fixedName: string = capitalizeFirstLetter(name.toLowerCase());

          $(element).removeAttr("onfocus");
          $(element).removeAttr("value");
          $(element).attr("placeholder", fixedName);

          const labelText: HTMLSpanElement = document.createElement("span");
          $(labelText).addClass("sr-only");
          $(labelText).text(fixedName);

          $(element).wrap("<label></label>");
          $(element).insertBefore(labelText);
        }
      });
    });
  }
})();
