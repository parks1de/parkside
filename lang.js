/* ─────────────────────────────────────────────────────────
   PARKSIDE — Bilingual toggle  NN ↔ EN
   Add  data-en="English text"  to any element whose text
   content should change. The original innerHTML is stored
   as data-nn automatically on first switch.
   Spanish (ES) can be added later by following the same pattern.
───────────────────────────────────────────────────────── */

(function () {
  var STORAGE_KEY = 'ps-lang';
  var DEFAULT_LANG = 'nn';

  function applyLang(lang) {
    /* toggle html[lang] attribute */
    document.documentElement.lang = lang === 'en' ? 'en' : 'nn';

    /* swap text on every element that carries a data-en attribute */
    document.querySelectorAll('[data-en]').forEach(function (el) {
      /* save original nn text the first time we encounter it */
      if (!el.dataset.nn) {
        el.dataset.nn = el.innerHTML;
      }
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.nn;
    });

    /* mark active button */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    applyLang(saved);

    /* wire up all switcher buttons (works across pages) */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.dataset.lang);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
