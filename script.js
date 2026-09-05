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
      mobileMenu.hidden = false;
      document.body.classList.add('menu-open');
      navToggle.setAttribute('aria-expanded', 'true');
      setBackgroundInert(true);
      if (mobileMenuClose) mobileMenuClose.focus();
    }

    function closeMenu() {
      mobileMenu.hidden = true;
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
      setBackgroundInert(false);
      navToggle.focus();
    }

    navToggle.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.hidden = true;
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        setBackgroundInert(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileMenu.hidden) closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        setBackgroundInert(false);
      }
    });
  }

  /* ---- Antes / después: pestañas ---- */
  var tabs = document.querySelectorAll('.ba__tab');
  var panels = document.querySelectorAll('.ba-media');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = tab.getAttribute('data-target');

      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.id !== targetId;
      });
    });
  });

  /* ---- Antes / después: control deslizante ---- */
  function initSlider(frame) {
    var handle = frame.querySelector('.ba-media__handle');
    if (!handle) return;

    var dragging = false;

    function setPosFromClientX(clientX) {
      var rect = frame.getBoundingClientRect();
      var ratio = (clientX - rect.left) / rect.width;
      ratio = Math.max(0, Math.min(1, ratio));
      var value = ratio * 100;
      frame.style.setProperty('--pos', value.toFixed(2) + '%');
      handle.setAttribute('aria-valuenow', Math.round(value));
    }

    function startDrag(clientX, pointerId) {
      dragging = true;
      frame.classList.add('is-dragging');
      if (pointerId !== undefined && handle.setPointerCapture) {
        try { handle.setPointerCapture(pointerId); } catch (e) { /* ignore */ }
      }
      setPosFromClientX(clientX);
    }

    function moveDrag(clientX) {
      if (!dragging) return;
      setPosFromClientX(clientX);
    }

    function endDrag() {
      dragging = false;
      frame.classList.remove('is-dragging');
    }

    handle.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      startDrag(e.clientX, e.pointerId);
    });
    handle.addEventListener('pointermove', function (e) {
      if (dragging) moveDrag(e.clientX);
    });
    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);

    handle.addEventListener('keydown', function (e) {
      var current = parseFloat(getComputedStyle(frame).getPropertyValue('--pos')) || 50;
      var step = 4;
      if (e.key === 'ArrowLeft') {
        current = Math.max(0, current - step);
      } else if (e.key === 'ArrowRight') {
        current = Math.min(100, current + step);
      } else {
        return;
      }
      frame.style.setProperty('--pos', current + '%');
      handle.setAttribute('aria-valuenow', Math.round(current));
      e.preventDefault();
    });

    // Tocar/hacer clic en cualquier punto de la imagen mueve el divisor.
    frame.addEventListener('pointerdown', function (e) {
      if (e.target === handle) return;
      frame.classList.add('is-dragging');
      setPosFromClientX(e.clientX);
      frame.classList.remove('is-dragging');
    });
  }

  document.querySelectorAll('.ba-media__frame').forEach(initSlider);

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
