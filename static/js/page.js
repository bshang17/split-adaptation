(function () {
  'use strict';

  // ── scroll-to-top ────────────────────────────────────────────────────
  // The template's version dereferences the button unconditionally inside
  // the scroll listener; guard it so a missing element cannot throw on
  // every scroll frame.
  var btn = document.querySelector('.scroll-to-top');
  if (btn) {
    var onScroll = function () {
      btn.classList.toggle('visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  // ── BibTeX copy ──────────────────────────────────────────────────────
  var copyBtn = document.getElementById('copy');
  var bib = document.getElementById('bib');
  if (copyBtn && bib) {
    var done = function () {
      copyBtn.textContent = 'Copied';
      copyBtn.classList.add('done');
      setTimeout(function () {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('done');
      }, 1600);
    };
    copyBtn.addEventListener('click', function () {
      var text = bib.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        if (ok) done();   // only report success when the copy actually succeeded
      }
    });
  }
})();
