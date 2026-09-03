/**
 * Solisia — site scripts
 *
 * Deliberately dependency-free. Everything here degrades gracefully: the page
 * is fully readable with JavaScript disabled.
 */

(function () {
  'use strict';

  /** Stamp the current year into any [data-current-year] element. */
  function setCurrentYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll('[data-current-year]').forEach(function (el) {
      el.textContent = year;
    });
  }

  /** Wire up the mobile navigation toggle, if present. */
  function initNavToggle() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.hidden = isOpen;
    });
  }

  function init() {
    setCurrentYear();
    initNavToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
