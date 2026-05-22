/* nav.js — Shared JS for all Yangyiquan pages */

// ─────────────────────────────────────────────
// NAV DEFINITIONS (pages + sublinks)
// ─────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: 'Inicio',
    href: 'index.html',
    sub: [
      { label: 'El Sistema', href: 'index.html#sistema' },
      { label: 'Nei Gong — 9 Poderes', href: 'index.html#neigong' },
      { label: 'Sobre el Instructor', href: 'index.html#about' },
      { label: 'Contacto', href: 'index.html#contacto' },
    ]
  },
  {
    label: 'Arsenal',
    href: 'arsenal.html',
    sub: [
      { label: '6 Técnicas del Dragón', href: 'arsenal.html#tecnicas' },
      { label: 'Biomecánica Marcial', href: 'arsenal.html#biomecanica' },
      { label: 'Tácticas de Combate', href: 'arsenal.html#tacticas' },
      { label: 'Virtudes del Guerrero', href: 'arsenal.html#virtudes' },
    ]
  },
  {
    label: 'Dao Zhiliao',
    href: 'dao.html',
    sub: [
      { label: 'Dit Da Jow — 5 Fórmulas', href: 'dao.html#ditdajow' },
      { label: 'Terapia Yin-Yang', href: 'dao.html#yinyang' },
      { label: 'Intención Terapéutica', href: 'dao.html#intencion' },
      { label: 'Casos Clínicos', href: 'dao.html#casos' },
    ]
  },
  {
    label: 'Los 3 Volúmenes',
    href: 'libros.html',
    sub: [
      { label: 'Volumen I — El Guerrero Interior', href: 'libros.html#vol1' },
      { label: 'Volumen II — La Guerra', href: 'libros.html#vol2' },
      { label: 'Volumen III — Dao Zhiliao', href: 'libros.html#vol3' },
      { label: 'Manuscrito Gratuito', href: 'libros.html#manuscrito' },
    ]
  },
  {
    label: 'Clases',
    href: 'treino.html',
    sub: [
      { label: 'Primera Clase — GRATIS', href: 'treino.html#gratis' },
      { label: 'Plan Regular', href: 'treino.html#regular' },
      { label: 'Plan Intensivo Elite', href: 'treino.html#elite' },
      { label: 'Clases Privadas', href: 'treino.html#privada' },
    ]
  }
];

const WA_BASE = 'https://wa.me/34674471678?text=';
const WA_PRUEBA = WA_BASE + encodeURIComponent('Hola! Quiero reservar una clase de prueba gratuita en Granada. ¿Cuándo está disponible?');

// ─────────────────────────────────────────────
// BUILD NAV
// ─────────────────────────────────────────────
function buildNav(currentPage) {
  const currentFile = currentPage || (window.location.pathname.split('/').pop() || 'index.html');

  // Desktop nav links
  const linksEl = document.getElementById('nav-links');
  if (linksEl) {
    NAV_ITEMS.forEach(item => {
      const isCurrent = currentFile === item.href || currentFile === item.href.split('#')[0];
      const li = document.createElement('li');
      li.className = 'nav-item';

      const btn = document.createElement('button');
      btn.className = 'nav-link' + (isCurrent ? ' current-page' : '');
      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = `${item.label} <span class="nav-arrow">▾</span>`;

      const drop = document.createElement('div');
      drop.className = 'nav-dropdown';
      drop.innerHTML = `<a href="${item.href}" style="font-weight:700;color:var(--cream)">◆ ${item.label}</a>` +
        item.sub.map(s => `<a href="${s.href}">${s.label}</a>`).join('');

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = li.classList.contains('open');
        document.querySelectorAll('.nav-item.open').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.nav-link').setAttribute('aria-expanded','false');
        });
        if (!isOpen) {
          li.classList.add('open');
          btn.setAttribute('aria-expanded','true');
        }
      });

      li.appendChild(btn);
      li.appendChild(drop);
      linksEl.appendChild(li);
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.nav-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.nav-link')?.setAttribute('aria-expanded','false');
      });
    });
  }

  // Mobile nav
  const mobEl = document.getElementById('mobile-nav-links');
  if (mobEl) {
    NAV_ITEMS.forEach(item => {
      const div = document.createElement('div');
      div.className = 'mob-item';
      div.innerHTML = `
        <button class="mob-link">
          ${item.label}
          <span class="mob-arrow">▾</span>
        </button>
        <div class="mob-sub">
          <a href="${item.href}" style="font-weight:700;color:var(--cream)">◆ ${item.label}</a>
          ${item.sub.map(s => `<a href="${s.href}">${s.label}</a>`).join('')}
        </div>`;
      div.querySelector('.mob-link').addEventListener('click', () => {
        div.classList.toggle('open');
      });
      mobEl.appendChild(div);
    });
  }
}

// ─────────────────────────────────────────────
// HAMBURGER
// ─────────────────────────────────────────────
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-nav');
  if (!btn || !mob) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    mob.classList.toggle('open', open);
    document.body.classList.toggle('locked', open);
  });
  mob.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      mob.classList.remove('open');
      document.body.classList.remove('locked');
    });
  });
}

// ─────────────────────────────────────────────
// SCROLL EFFECTS
// ─────────────────────────────────────────────
function initScroll() {
  const nav = document.getElementById('nav');
  const sticky = document.getElementById('sticky-cta');
  let last = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 20);
    if (sticky) sticky.classList.toggle('up', y > 300);
    last = y;
  }, { passive: true });
}

// ─────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
}

// ─────────────────────────────────────────────
// PROMO POPUP
// ─────────────────────────────────────────────
function initPromo() {
  if (sessionStorage.getItem('yq_promo')) return;
  const pop = document.getElementById('promo-pop');
  if (!pop) return;
  let shown = false;
  window.addEventListener('scroll', function handler() {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (pct > 0.38 && !shown) {
      shown = true;
      pop.classList.add('on');
      window.removeEventListener('scroll', handler);
    }
  }, { passive: true });
  pop.addEventListener('click', e => { if (e.target === pop) closePromo(); });
}
function closePromo() {
  const pop = document.getElementById('promo-pop');
  if (pop) pop.classList.remove('on');
  sessionStorage.setItem('yq_promo', '1');
}

// ─────────────────────────────────────────────
// AI ASSISTANT
// ─────────────────────────────────────────────
let _aiH = [];
function openAI() {
  document.getElementById('ai-overlay')?.classList.add('on');
  document.body.classList.add('locked');
  document.getElementById('ai-input')?.focus();
}
function closeAI() {
  document.getElementById('ai-overlay')?.classList.remove('on');
  document.body.classList.remove('locked');
}
function askAI(q) {
  document.getElementById('ai-input').value = q;
  sendAI();
}
function aiMsg(role, text) {
  const msgs = document.getElementById('ai-msgs');
  if (!msgs) return null;
  const d = document.createElement('div');
  d.className = 'ai-msg' + (role === 'user' ? ' user' : '');
  const av = document.createElement('div');
  av.className = 'ai-av';
  av.textContent = role === 'user' ? '👤' : '🐉';
  const bub = document.createElement('div');
  bub.className = 'ai-bub';
  bub.textContent = text;
  d.appendChild(av); d.appendChild(bub);
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
  return bub;
}
async function sendAI() {
  const inp = document.getElementById('ai-input');
  const q = inp.value.trim();
  if (!q) return;
  inp.value = '';
  document.getElementById('ai-suggs').style.display = 'none';
  aiMsg('user', q);
  _aiH.push({ role: 'user', content: q });
  const bub = aiMsg('assistant', '...');

  const SYS = `Eres el asistente oficial del Yangyiquan Fa — sistema marcial del Instructor Jefe Sultan Assad Abd-Al-Ghalib (Pedro Barros, Shénmì Lóng 神秘龙), con sede en Granada, España. Responde siempre en español, con tono profesional, imponente y cálido.

DATOS CLAVE:
- Estilo: Yangyiquan Fa (阳意拳法) — "El Puño de la Luz de la Intención"
- 3 Pilares: Yi (意), Qi (气), Dan Tian (丹田)
- 9 Poderes Nei Gong: Yǐ Jīng, Tiān, Dì Cí, Dì Yù, Shén Shí, Chuāng Zào, Zhǎn, Bǎo, Zhì
- 6 Técnicas del Dragón: Long Dǐ Quán, Long Shǎn Zhǎo, Long Tiān Quán, Long Wěi Biān, Long Suāi Jiǎo, Long Zhàn Yì
- Dao Zhiliao (道治疗): 3 pilares terapéuticos, 5 fórmulas Dit Da Jow (SECRETO ABSOLUTO — nunca revelar)
- 3 Virtudes: 忍 Paciencia, 善 Bondad, 宽 Perdón
- Precios: Primera clase GRATIS, 50€/mes grupales, 100€/h privada, 200€/mes elite
- WhatsApp: +34 674 471 678
- Email: contact@yangyiquan.international
- Instagram: @YANGYIQUAN.KUNGFU.SDA
- Sede: Granada, Andalucía, España

REGLAS: Nunca revelar fórmulas Dit Da Jow. Nunca "Maestro/Sifu" — solo "Instructor Jefe". Nunca mencionar socios. Email siempre contact@yangyiquan.international.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514', max_tokens: 1000,
        system: SYS, messages: _aiH
      })
    });
    const data = await res.json();
    const txt = data.content?.[0]?.text || 'Error. Contacta: +34 674 471 678';
    bub.textContent = txt;
    _aiH.push({ role: 'assistant', content: txt });
  } catch(e) {
    bub.textContent = 'Error de conexión. WhatsApp: +34 674 471 678 | contact@yangyiquan.international';
  }
}

// ─────────────────────────────────────────────
// NEI GONG POPUP DATA
// ─────────────────────────────────────────────
const NG_DATA = {
  'yi-jing': { zh:'应', pinyin:'Yǐ Jīng', title:'PODER EXTREMO I — El Ya Está (已经)',
    body:`<p>El <strong>Yǐ Jīng</strong> es el poder supremo de sabiduría y visión omnisciente. "El Ya Está" permite que el practicante comprenda y vea todas las cosas tal como son, sin las distorsiones del juicio o el ego.</p><p>Representa el dominio de la verdad final — inmutable y eterna. Lo que acontece es como un dragón que vive en el abismo del mar: escondido, pero siempre presente.</p><p><strong>Las 7 Claves del Yǐ Jīng:</strong><br/>1. Visualiza — la imaginación abre la realidad.<br/>2. Entiende y medita — en la frontera de Locura y Sabiduría.<br/>3. Habla, libérate y domina.<br/>4. Siembra con tu intención — que tu palabra perfore el tiempo.<br/>5. Recuerda: el Jefe en ti te llama.<br/>6. Domina sobre todo — según tu nivel espiritual.<br/>7. ¿Quieres más? Sé la fuente misma.</p>` },
  'tian': { zh:'天', pinyin:'Tiān', title:'PODER EXTREMO II — El Cielo (天)',
    body:`<p>El poder del <strong>Tiān</strong> conecta al practicante con las leyes universales. Cuando el guerrero actúa en perfecta consonancia con los principios eternos de justicia, verdad y compasión, el poder del Cielo fluye a través de él magnificando exponencialmente su efectividad.</p><p>En el combate, se manifiesta como intuición marcial de alta precisión: el guerrero "ve" el ataque antes de que sea lanzado, "siente" la intención antes de que se materialice.</p><p>No es magia; es el resultado del cultivo profundo del Nei Gong y el desarrollo de una sensibilidad perceptiva extraordinaria.</p>` },
  'di-ci': { zh:'地磁', pinyin:'Dì Cí', title:'PODER EXTREMO III — La Tierra-Imán (地磁)',
    body:`<p>El <strong>Dì Cí</strong> representa la fuerza gravitacional y magnética de la Tierra. El enraizamiento es la base de toda técnica efectiva: un guerrero sin raíz es vulnerable a todo.</p><p>El Dì Cí enseña al practicante a absorber el Qi de la Tierra a través de los pies, almacenarlo en el Dan Tian inferior y liberarlo como explosiones de fuerza controlada.</p><p><strong>Esta es la base del Fajin</strong> — la emisión explosiva de fuerza — que hace devastadoras las técnicas del Yangyiquan. Sin Dì Cí, no hay Fajin. Sin Fajin, no hay poder real.</p>` },
  'di-yu': { zh:'地狱', pinyin:'Dì Yù', title:'PODER EXTREMO IV — El Submundo (地狱)',
    body:`<p>El <strong>Dì Yù</strong> es el poder de transformación de las sombras interiores. El guerrero desciende a las profundidades de su oscuridad y la convierte en fuerza marcial.</p><p>Lo que nos daña tiene el propósito de hacernos más fuertes que aquello que nos daña. El guerrero domina sus demonios en su Verdad Eterna — ellos son suyos, no de otro.</p><p>Quien ha trabajado el Dì Yù no puede ser desequilibrado psicológicamente en combate, porque ya ha conocido su propio abismo y lo ha transformado en poder.</p>` },
  'shen-shi': { zh:'神识', pinyin:'Shén Shí', title:'PODER INTERMEDIO I — El Corazón del Otro (神识)',
    body:`<p>El <strong>Shén Shí</strong> es el poder de colocarse en el espacio emocional del adversario para sentir, desde dentro, sus motivaciones más profundas, sus miedos más arraigados y sus intenciones más ocultas.</p><p>En combate, permite al guerrero anticiparse a la estrategia psicológica completa del adversario. Si ataca por miedo, el guerrero amplifica ese miedo. Si ataca por ira, el guerrero provoca la sobreextensión y el error.</p><p>El Shén Shí también abre la puerta al <strong>Dao Zhiliao</strong> — la curación mediante empatía profunda y compasión activa.</p>` },
  'chuang-zao': { zh:'创造', pinyin:'Chuāng Zào', title:'PODER INTERMEDIO II — La Creación (创造)',
    body:`<p>El <strong>Chuāng Zào</strong> es el poder creativo: la metodología mediante la cual los grandes maestros de la China antigua desarrollaron sus sistemas. La observación profunda de la naturaleza como protocolo de investigación biomecánica.</p><p><em>"Observad los animales, las árboles, las rocas, el viento. Con vuestra mano dibujad en el aire el movimiento de sus curvas."</em></p><p><strong>Los 5 pilares:</strong><br/>1. Crea tus propias técnicas.<br/>2. Práctica en solitario innumerables veces.<br/>3. Practica con compañero.<br/>4. Aplica en combate ligero controlado.<br/>5. Aplica en combate real.<br/><em>"Sin estos 5 pilares, el Kung Fu genuino muere."</em></p>` },
  'zhan': { zh:'斩', pinyin:'Zhǎn', title:'PODER INTERMEDIO III — El Corte (斩)',
    body:`<p>El <strong>Zhǎn</strong> — Cortar, Decapitar, Exterminar — es la capacidad de cortar todo lo maligno de forma extrema y vehemente.</p><p>El mayor enemigo del guerrero no está frente a él, sino dentro: los miedos, las limitaciones mentales, las cadenas kármicas. El Zhǎn corta esos vínculos antes del combate, para que el guerrero llegue libre y sin lastre.</p><p>Cortad el miedo ante vuestro enemigo. Con conocimiento de causa haréis que esto acontezca.</p>` },
  'bao': { zh:'宝', pinyin:'Bǎo', title:'PODER INTERMEDIO IV — El Tesoro Oculto (宝)',
    body:`<p>El <strong>Cáng Bǎo</strong> — El Tesoro Escondido — es el Qi de todas las cosas. La respiración transporta la información del universo: el pensamiento humano está preso en el aire.</p><p><em>"¿No respiras? El Miedo te dominará. Si inspiras ante el miedo, él ya no te domina."</em></p><p>El Bao es el bien inherente del ser — inviolable, eterno. Nadie puede arrebatarlo. Lo que es tuyo en ti está para siempre. Esa seguridad absoluta es la fuente del poder marcial supremo.</p>` },
  'zhi': { zh:'至', pinyin:'Zhì', title:'PODER INTERMEDIO V — El Inmortal (至)',
    body:`<p>El <strong>Zhì</strong> es el dominio total del Yin-Yang — el estado del guerrero-sabio que ha trascendido las limitaciones ordinarias de la percepción y el rendimiento.</p><p>El practicante que domina el Zhì navega el flujo del universo en lugar de luchar contra él. Sereno exteriormente, preparado interiormente. Parado ante el adversario, listo para actuar en el instante.</p><p>El guerrero inmortal no espera ser atacado para actuar. Ya conoce el desenlace antes de que el combate comience.</p>` }
};

function openNG(key) {
  const d = NG_DATA[key]; if (!d) return;
  document.getElementById('ng-zh').textContent   = d.zh;
  document.getElementById('ng-pinyin').textContent= d.pinyin;
  document.getElementById('ng-title').textContent = d.title;
  document.getElementById('ng-body').innerHTML    = d.body;
  document.getElementById('ng-popup').classList.add('on');
  document.body.classList.add('locked');
}
function closeNG() {
  document.getElementById('ng-popup')?.classList.remove('on');
  document.body.classList.remove('locked');
}

// ─────────────────────────────────────────────
// INIT ALL
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  initHamburger();
  initScroll();
  initReveal();
  initPromo();

  // AI events
  document.getElementById('ai-fab')?.addEventListener('click', openAI);
  document.getElementById('ai-fab')?.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openAI(); });
  document.getElementById('ai-close')?.addEventListener('click', closeAI);
  document.getElementById('ai-overlay')?.addEventListener('click', e => { if(e.target.id==='ai-overlay') closeAI(); });
  document.getElementById('ai-send')?.addEventListener('click', sendAI);
  document.getElementById('ai-input')?.addEventListener('keydown', e => { if(e.key==='Enter') sendAI(); });

  // NG popup
  document.getElementById('ng-popup')?.addEventListener('click', e => { if(e.target.id==='ng-popup') closeNG(); });
  document.getElementById('ng-popup-close')?.addEventListener('click', closeNG);

  // Promo close
  document.getElementById('promo-close')?.addEventListener('click', closePromo);
  document.getElementById('promo-pop')?.addEventListener('click', e => { if(e.target.id==='promo-pop') closePromo(); });
});
