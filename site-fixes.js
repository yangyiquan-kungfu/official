/*
 * YANGYIQUAN FA — SITE FIXES + MÚSICA DE FUNDO
 * ─────────────────────────────────────────────
 * Corrige: logo, fontes chinesas, botão fechar menu
 * Adiciona: música ambiente após primeiro clique
 *
 * ANTES DE FAZER COMMIT:
 *  1. Faz upload dos 2 ficheiros MP3 para o teu GitHub com estes nomes:
 *       musica1.mp3   (guzheng-soundtrack...)
 *       musica2.mp3   (et11lx-chinese-ancient...)
 *  2. Commit site-fixes.js
 *  3. Em cada HTML, adiciona antes do </body>:
 *       <script src="site-fixes.js"></script>
 */
(function () {
  'use strict';

  /* ════════════════════════════════════════
     1. GOOGLE FONTS — CALIGRAFIA CHINESA
  ════════════════════════════════════════ */
  var fontsLink = document.createElement('link');
  fontsLink.rel  = 'stylesheet';
  fontsLink.href = 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Cinzel:wght@400;600;700&display=swap';
  document.head.appendChild(fontsLink);

  /* ════════════════════════════════════════
     2. CSS FIXES — injetado no <head>
  ════════════════════════════════════════ */
  var css = document.createElement('style');
  css.textContent = [

    /* ── Logo: aumentar substancialmente ── */
    '.nav-logo img, .logo img, header .logo img, nav img, .navbar img, .brand img {',
    '  width: clamp(110px, 20vw, 200px) !important;',
    '  height: auto !important;',
    '  max-height: none !important;',
    '  transition: transform 0.3s ease;',
    '}',
    '.nav-logo img:hover, .logo img:hover, nav img:hover {',
    '  transform: scale(1.06);',
    '}',

    /* ── Caligrafia chinesa nos caracteres dos cards ── */
    '.chinese-char, .card-icon, [class*="glyph"], [class*="icon-cn"],',
    '.card h3 + div, .feature-icon, .pillar-icon {',
    '  font-family: "Ma Shan Zheng", "STKaiti", "楷体", cursive !important;',
    '}',

    /* Força caligrafia em qualquer elemento que contenha
       exactamente um caractere CJK isolado */
    'h2, h3, p, span, div {',
    '  /* aplicado por JS abaixo para não afectar tudo */ ',
    '}',

    /* ── Menu mobile: botão fechar (✕) ── */
    '#yqf-nav-close {',
    '  position: absolute;',
    '  top: 18px;',
    '  right: 20px;',
    '  width: 38px; height: 38px;',
    '  background: rgba(201,168,76,.08);',
    '  border: 1px solid rgba(201,168,76,.25);',
    '  border-radius: 2px;',
    '  color: #C9A84C;',
    '  font-size: 20px;',
    '  cursor: pointer;',
    '  display: none;',
    '  align-items: center;',
    '  justify-content: center;',
    '  z-index: 9999;',
    '  transition: background 0.2s, transform 0.3s;',
    '}',
    '#yqf-nav-close:hover {',
    '  background: rgba(201,168,76,.2);',
    '  transform: rotate(90deg);',
    '}',

    /* ── Animação do menu ── */
    '@keyframes yqfNavIn  { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }',
    '@keyframes yqfNavOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }',
    '.yqf-nav-opening { animation: yqfNavIn  0.35s cubic-bezier(.16,1,.3,1) both; }',
    '.yqf-nav-closing { animation: yqfNavOut 0.3s  cubic-bezier(.7,0,.84,0) both; }',

    /* ── Botão música ── */
    '#yqf-music {',
    '  position: fixed;',
    '  bottom: 28px;',
    '  left: 20px;',
    '  width: 40px; height: 40px;',
    '  border-radius: 50%;',
    '  background: rgba(14,9,0,.85);',
    '  border: 1px solid rgba(201,168,76,.3);',
    '  color: #C9A84C;',
    '  font-size: 16px;',
    '  cursor: pointer;',
    '  display: flex; align-items: center; justify-content: center;',
    '  z-index: 9980;',
    '  backdrop-filter: blur(8px);',
    '  transition: all 0.25s;',
    '  box-shadow: 0 0 16px rgba(201,168,76,.15);',
    '  animation: yqfFadeIn 1s 3s ease both;',
    '  opacity: 0;',
    '}',
    '#yqf-music:hover { border-color: #C9A84C; box-shadow: 0 0 24px rgba(201,168,76,.35); }',
    '#yqf-music.playing { border-color: #C9A84C; animation: yqfFadeIn 1s 3s ease both, yqfMusicPulse 3s ease-in-out 3s infinite; }',
    '@keyframes yqfFadeIn { from { opacity:0; transform: scale(0.5); } to { opacity:1; transform: scale(1); } }',
    '@keyframes yqfMusicPulse { 0%,100% { box-shadow: 0 0 8px rgba(201,168,76,.2); } 50% { box-shadow: 0 0 22px rgba(201,168,76,.45); } }',

  ].join('\n');
  document.head.appendChild(css);

  /* ════════════════════════════════════════
     3. FIX CALIGRAFIA — aplica Ma Shan Zheng
        a caracteres chineses isolados
  ════════════════════════════════════════ */
  function fixChineseChars() {
    var cjkRange = /^[\u4E00-\u9FFF\u3400-\u4DBF]{1,3}$/;
    var all = document.querySelectorAll('span, div, p, h1, h2, h3, h4, td');
    all.forEach(function (el) {
      var t = el.textContent.trim();
      if (cjkRange.test(t) && el.children.length === 0) {
        el.style.fontFamily = '"Ma Shan Zheng", "STKaiti", "楷体", cursive';
      }
    });
  }

  /* ════════════════════════════════════════
     4. FIX MENU MÓVEL — adiciona botão fechar
  ════════════════════════════════════════ */
  function fixNavMenu() {
    /* Tenta encontrar o container do menu móvel */
    var navMenu =
      document.querySelector('.nav-menu') ||
      document.querySelector('.mobile-menu') ||
      document.querySelector('nav ul') ||
      document.querySelector('.menu-overlay') ||
      document.querySelector('[class*="mobile"]') ||
      document.querySelector('nav > div');

    var hamburger =
      document.querySelector('.hamburger') ||
      document.querySelector('.menu-toggle') ||
      document.querySelector('[class*="burger"]') ||
      document.querySelector('button[aria-label*="menu" i]') ||
      document.querySelector('button[aria-label*="Menu"]');

    if (!navMenu || document.getElementById('yqf-nav-close')) return;

    /* Cria o botão ✕ */
    var closeBtn = document.createElement('button');
    closeBtn.id = 'yqf-nav-close';
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Cerrar menú');
    navMenu.style.position = navMenu.style.position || 'relative';
    navMenu.appendChild(closeBtn);

    /* Detecta quando o menu abre */
    var observer = new MutationObserver(function () {
      var isOpen =
        navMenu.classList.contains('active') ||
        navMenu.classList.contains('open') ||
        navMenu.classList.contains('show') ||
        navMenu.style.display === 'flex' ||
        navMenu.style.display === 'block' ||
        navMenu.style.right === '0px' ||
        navMenu.style.left  === '0px';
      closeBtn.style.display = isOpen ? 'flex' : 'none';
    });
    observer.observe(navMenu, { attributes: true, attributeFilter: ['class','style'] });

    /* Fecha ao clicar no ✕ */
    closeBtn.addEventListener('click', function () {
      /* Simula clique no hamburger para fechar pelo mecanismo existente */
      if (hamburger) hamburger.click();
      /* Fallback: remove classes comuns de abertura */
      ['active','open','show','is-open','menu-open'].forEach(function (cls) {
        navMenu.classList.remove(cls);
        document.body.classList.remove(cls);
        document.documentElement.classList.remove(cls);
      });
      navMenu.style.display = '';
    });
  }

  /* ════════════════════════════════════════
     5. MÚSICA DE FUNDO
        Coloca os MP3s no GitHub com os nomes:
          musica1.mp3
          musica2.mp3
  ════════════════════════════════════════ */
  var TRACKS = ['musica1.mp3', 'musica2.mp3'];
  var trackIdx = 0;
  var musicStarted = false;
  var isMusicOn = true;
  var audio1 = new Audio();
  var audio2 = new Audio();
  var activeAudio = audio1;
  var FADE_DURATION = 3000; // ms de crossfade

  /* Pré-carrega ambos os tracks */
  audio1.preload = 'auto';
  audio2.preload = 'auto';
  audio1.volume  = 0;
  audio2.volume  = 0;

  function fadeIn(a, targetVol, duration) {
    var steps = 40;
    var step  = (targetVol) / steps;
    var delay = duration / steps;
    var count = 0;
    var id = setInterval(function () {
      if (!isMusicOn) { a.volume = 0; clearInterval(id); return; }
      count++;
      a.volume = Math.min(targetVol, a.volume + step);
      if (count >= steps) clearInterval(id);
    }, delay);
  }

  function fadeOut(a, duration, callback) {
    var steps    = 40;
    var startVol = a.volume;
    var step     = startVol / steps;
    var delay    = duration / steps;
    var count    = 0;
    var id = setInterval(function () {
      count++;
      a.volume = Math.max(0, a.volume - step);
      if (count >= steps) { clearInterval(id); a.pause(); a.currentTime = 0; if (callback) callback(); }
    }, delay);
  }

  function playNextTrack() {
    trackIdx = (trackIdx + 1) % TRACKS.length;
    var next = (activeAudio === audio1) ? audio2 : audio1;
    next.src = TRACKS[trackIdx];
    next.volume = 0;
    next.play().catch(function(){});
    fadeIn(next, 0.2, FADE_DURATION);
    fadeOut(activeAudio, FADE_DURATION, function () {
      activeAudio = next;
      activeAudio.onended = playNextTrack;
    });
  }

  function startMusic() {
    if (musicStarted) return;
    musicStarted = true;

    audio1.src = TRACKS[0];
    audio1.volume = 0;
    audio1.play()
      .then(function () {
        fadeIn(audio1, 0.2, 2000);
        audio1.onended = playNextTrack;
        activeAudio = audio1;
        var btn = document.getElementById('yqf-music');
        if (btn) btn.classList.add('playing');
      })
      .catch(function () {
        /* autoplay bloqueado — tenta na próxima interacção */
        musicStarted = false;
      });
  }

  /* Botão de controlo de música */
  function createMusicBtn() {
    var btn = document.createElement('button');
    btn.id = 'yqf-music';
    btn.title = 'Música';
    btn.innerHTML = '\u266a'; /* ♪ */
    btn.setAttribute('aria-label', 'Música ambiente');
    document.body.appendChild(btn);

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      isMusicOn = !isMusicOn;
      if (isMusicOn) {
        if (!musicStarted) {
          startMusic();
        } else {
          activeAudio.play().catch(function(){});
          fadeIn(activeAudio, 0.2, 1500);
          btn.classList.add('playing');
        }
        btn.innerHTML = '\u266a';
      } else {
        fadeOut(activeAudio, 1500, null);
        btn.innerHTML = '\uD83D\uDD07'; /* 🔇 */
        btn.classList.remove('playing');
      }
    });
  }

  /* ════════════════════════════════════════
     ARRANQUE — primeiro clique no site
  ════════════════════════════════════════ */
  function onFirstInteraction() {
    startMusic();
    /* remove listeners depois do primeiro disparo */
    ['click','touchstart','keydown'].forEach(function (ev) {
      document.removeEventListener(ev, onFirstInteraction);
    });
  }

  ['click','touchstart','keydown'].forEach(function (ev) {
    document.addEventListener(ev, onFirstInteraction, { passive: true });
  });

  /* ════════════════════════════════════════
     INIT — corre quando o DOM estiver pronto
  ════════════════════════════════════════ */
  function init() {
    fixChineseChars();
    fixNavMenu();
    createMusicBtn();
    /* Re-aplica fix de caligrafia após SPA renders, se houver */
    setTimeout(fixChineseChars, 500);
    setTimeout(fixChineseChars, 1500);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
