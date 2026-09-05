(function () {
  'use strict';

  /* ---- WhatsApp: número y mensajes ---- */
  // PLACEHOLDER: confirmar número real de WhatsApp (formato internacional, sin '+', sin espacios)
  var WHATSAPP_NUMBER = '34600000000';

  var MESSAGES = {
    general: 'Hola Roxibell, he visto tu página y me gustaría pedir información sobre micropigmentación.'
  };

  function buildWaHref(key) {
    var message = MESSAGES[key] || MESSAGES.general;
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  document.querySelectorAll('[data-whatsapp]').forEach(function (link) {
    var key = link.getAttribute('data-wa-message') || 'general';
    link.setAttribute('href', buildWaHref(key));
  });

  /* ---- Menú móvil a pantalla completa ---- */
  var navToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileMenuClose = document.getElementById('mobile-menu-close');

  if (navToggle && mobileMenu) {
    var siteHeader = document.querySelector('.site-header');
    var mainContent = document.getElementById('contenido');
    var waFloat = document.querySelector('.wa-float');
    var inertTargets = [siteHeader, mainContent, waFloat].filter(Boolean);

    function setBackgroundInert(isInert) {
      inertTargets.forEach(function (el) { el.inert = isInert; });
    }

    function openMenu() {
      mobileMenu.inert = false;
      mobileMenu.classList.add('is-open');
      document.body.classList.add('menu-open');
      navToggle.setAttribute('aria-expanded', 'true');
      setBackgroundInert(true);
      if (mobileMenuClose) mobileMenuClose.focus();
    }

    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      mobileMenu.inert = true;
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
      setBackgroundInert(false);
      navToggle.focus();
    }

    navToggle.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        mobileMenu.inert = true;
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        setBackgroundInert(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        mobileMenu.inert = true;
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        setBackgroundInert(false);
      }
    });
  }

  /* ---- Galería: filtros ---- */
  var filterButtons = document.querySelectorAll('.filter');
  var galleryItems = document.querySelectorAll('.gallery__item');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-filter');

      filterButtons.forEach(function (b) {
        var isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      galleryItems.forEach(function (item) {
        var category = item.getAttribute('data-category');
        item.hidden = value !== 'todas' && category !== value;
      });
    });
  });

  /* ---- FAQ: acordeón ---- */
  document.querySelectorAll('.accordion__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));

      trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (panel) panel.hidden = expanded;
    });
  });
})();
