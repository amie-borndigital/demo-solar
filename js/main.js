// Example Solar and Energy demo page.
(function () {
  // Fade sections in as they scroll into view.
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Phone and tablet menu.
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 1100px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  // Quote builder: the funnel (quote/index.html?embed=1) posts its height and current step.
  // Size the iframe to fit, and bring the card back into view when the step changes.
  var frame = document.querySelector('.quote-frame');
  var card = document.getElementById('quote');
  if (!frame || !card) return;
  var lastStep = null;
  window.addEventListener('message', function (e) {
    if (e.source !== frame.contentWindow || !e.data || typeof e.data.quoteHeight !== 'number') return;
    frame.style.height = Math.max(480, Math.ceil(e.data.quoteHeight)) + 'px';
    if (lastStep !== null && e.data.step !== lastStep) {
      var top = card.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.5) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    lastStep = e.data.step;
  });
})();
