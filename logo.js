/* Elizaveta — logo (Tiko picked 2026-11-25, round 8 «Подпись»): the name in the site's italic, a hairline, and what she
   does in small tracked caps. Typography only. Rejected rounds 2–8 are in ~/.Trash/elizaveta-logo-*-2026-11-25/. */
window.renderLogo = (el) => {
  el.innerHTML = `<span class="lg"><span class="lg__name">Елизавета</span><span class="lg__rule" aria-hidden="true"></span><span class="lg__sub">дизайн<br>карточек</span></span>`;
};
/* tab icon: a tilted peach slide with an ink outline (a wordmark is unreadable at 16 px) */
window.logoFavicon = () => 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="8" y="3.5" width="16" height="23" rx="3.5" fill="#f3c4ab" stroke="#35261e" stroke-width="2" transform="rotate(-8 16 16)"/></svg>');
