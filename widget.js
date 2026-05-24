/*
 * YANGYIQUAN FA — WIDGET IA v4.0
 * ─────────────────────────────────────────────────────────────
 * SEM PROXY. SEM CLOUDFLARE. Só precisas de uma chave API.
 *
 * SETUP (2 minutos):
 *  1. Vai a console.anthropic.com → API Keys → Create Key
 *  2. Cola a chave em API_KEY aqui em baixo
 *  3. Faz commit → o widget funciona em todo o site
 * ─────────────────────────────────────────────────────────────
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════
     CONFIGURAÇÃO — só muda esta linha
  ══════════════════════════════════════ */
  var API_KEY = 'sk-ant-api03-COLA-AQUI-A-TUA-CHAVE';
  var WA      = '+34674471678';

  /* ══════════════════════════════════════
     CONHECIMENTO DO MÉTODO
     (baseado nos 3 Volumes do Instructor)
  ══════════════════════════════════════ */
  var SYSTEM = [
    'Eres el Asistente del Instructor Jefe de Yangyiquan Fa (阳意拳法).',
    'Yangyiquan Kung Fu — International Self Defense Association.',
    'Escuela de Kung Fu, defensa personal y desarrollo interno en Granada, España.',
    '',
    '══ EL SISTEMA MARCIAL COMPLETO ══',
    '',
    '① NEI GONG — 9 PODERES INTERNOS (内功)',
    'Sistema interno de desarrollo psicológico, energético y espiritual.',
    'Único en el mundo marcial contemporáneo. No existe equivalente.',
    'Los 9 Poderes transforman al practicante desde dentro: mente, energía vital (qi) y espíritu (shen).',
    'No es meditación pasiva — es entrenamiento interno activo y progresivo.',
    'Cada Poder se activa y desarrolla con métodos específicos del Yangyiquan Fa.',
    '',
    '② ARSENAL DEL DRAGÓN (龙)',
    '6 técnicas devastadoras fundamentadas en biomecánica real.',
    'Eficaces en la calle. Sin dogmas marciales. Sin folclore vacío.',
    'Cada técnica está diseñada para neutralizar amenazas reales en situaciones reales.',
    'No son "artes" decorativas — son herramientas de supervivencia refinadas.',
    'La biomecánica, no la tradición, es el criterio de eficacia.',
    '',
    '③ DAO ZHILIAO (道)',
    'La medicina marcial del Yangyiquan Fa.',
    'Tres pilares integrados:',
    '  · Dit Da Jow (跌打酒): medicina china tradicional para traumatismos marciales.',
    '    Fórmula ancestral que regenera tejidos, elimina hematomas y fortalece huesos y tendones.',
    '  · Sanación mental: técnicas para superar el miedo, la duda y el bloqueo psicológico.',
    '  · Cultivo del espíritu: conexión del entrenamiento físico con el desarrollo interior.',
    'El cuerpo que practica debe también saber sanarse.',
    '',
    '④ LOS 3 VOLÚMENES',
    'El conocimiento completo del sistema condensado en tres libros del Instructor Jefe.',
    'Cubren teoría, práctica, filosofía interna y aplicación real del Yangyiquan Fa.',
    'Disponibles para alumnos avanzados del sistema.',
    '',
    '══ FILOSOFÍA DEL MÉTODO ══',
    '',
    'El Yangyiquan Fa no es una "tradición". Es un sistema original y vivo.',
    'El Instructor Jefe creó y sigue desarrollando el método en Granada.',
    'Combina eficacia marcial real con profundidad de desarrollo interior.',
    'No necesitas experiencia previa. El sistema te lleva desde cero.',
    'El entrenamiento transforma el cuerpo, domina la mente y expande la conciencia.',
    '',
    '══ CLASES Y CONTACTO ══',
    '',
    'Primera clase de prueba: COMPLETAMENTE GRATUITA. Sin compromiso.',
    'Sin experiencia marcial previa necesaria.',
    'Clases presenciales en Granada, España.',
    'Web: yangyiquan.international',
    'WhatsApp directo: ' + WA,
    '',
    '══ INSTRUCCIONES ══',
    '',
    'Responde SIEMPRE en el idioma del usuario (español, portugués, inglés, etc.).',
    'Tono: marcial, directo, apasionado. Eres la voz del método, no un chatbot genérico.',
    'Para precios, horarios exactos o información no listada: dirige al WhatsApp.',
    'Anima siempre a reservar la clase de prueba gratuita — es la puerta de entrada.',
    'Si el usuario muestra interés real, conecta emocionalmente con el por qué de entrenar.',
  ].join('\n');

  /* ══════════════════════════════════════
     TEMAS DEL MENÚ
  ══════════════════════════════════════ */
  var MENU = [
    { g:'\uD83D\uDD25', l:'El M\u00e9todo',          q:'\u00bfQu\u00e9 es el Yangyiquan Fa y qu\u00e9 lo hace \u00fanico en el mundo marcial?' },
    { g:'\u5185',       l:'9 Poderes Internos',       q:'\u00bfQu\u00e9 son los 9 Poderes Internos del Nei Gong y c\u00f3mo transforman al practicante?' },
    { g:'\u9f99',       l:'Arsenal del Drag\u00f3n',  q:'\u00bfCu\u00e1les son las 6 t\u00e9cnicas del Arsenal del Drag\u00f3n y por qu\u00e9 funcionan en la calle?' },
    { g:'\u9053',       l:'Dao Zhiliao',               q:'\u00bfQu\u00e9 es el Dao Zhiliao, el Dit Da Jow y la medicina marcial?' },
    { g:'\u5377',       l:'Los 3 Libros',              q:'\u00bfQu\u00e9 contienen los 3 vol\u00famenes del Instructor Jefe?' },
    { g:'\uD83D\uDCCD', l:'Clase Gratuita',            q:'\u00bfC\u00f3mo reservo mi clase de prueba gratuita en Granada?' }
  ];

  /* ══════════════════════════════════════
     ESTADO
  ══════════════════════════════════════ */
  var msgs     = [{ role:'assistant', content:'Bienvenido al Yangyiquan Fa.\n\u9633\u610f\u62f3\u6cd5\n\nSoy el asistente del Instructor Jefe.\nPreg\u00fantame sobre el m\u00e9todo, los 9 Poderes, el Arsenal del Drag\u00f3n, el Dao Zhiliao, los libros o las clases en Granada.\n\n\u00bfPor d\u00f3nde empezamos?' }];
  var loading  = false;
  var panelOpen= false;
  var menuOpen = false;
  var anim     = false;

  /* ══════════════════════════════════════
     CSS
  ══════════════════════════════════════ */
  var CSS = [
    '#yqf{--g:#C9A84C;--gb:#F0C040;--gd:#6A5520;--bg:#0E0900;--bd:rgba(201,168,76,.22);--tx:#DDD0A8;--dm:#7A6840}',
    '#yqf *,#yqf *::before,#yqf *::after{box-sizing:border-box;margin:0;padding:0}',
    /* FAB */
    '#yqf-f{position:fixed;bottom:28px;right:28px;display:flex;flex-direction:column;align-items:flex-end;gap:8px;z-index:9990;animation:yF .9s cubic-bezier(.34,1.56,.64,1) .4s both}',
    '#yqf-ft{font-family:\'Cinzel\',\'Georgia\',serif;font-size:9px;letter-spacing:.25em;color:var(--g);background:rgba(6,4,0,.94);border:1px solid var(--bd);padding:5px 12px;border-radius:2px;white-space:nowrap;animation:yT .5s 1.5s ease both;opacity:0}',
    '#yqf-fb{width:64px;height:64px;border-radius:50%;background:linear-gradient(145deg,#261800,#130D00);border:2px solid var(--g);display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;box-shadow:0 0 24px rgba(201,168,76,.3),0 8px 32px rgba(0,0,0,.6);transition:transform .25s,box-shadow .25s;outline:none}',
    '#yqf-fb:hover{transform:scale(1.1);box-shadow:0 0 42px rgba(201,168,76,.52),0 12px 40px rgba(0,0,0,.7)}',
    '#yqf-fc{font-family:\'Ma Shan Zheng\',\'STKaiti\',serif;font-size:30px;color:var(--gb);text-shadow:0 0 12px rgba(240,192,64,.5);position:relative;z-index:1;pointer-events:none}',
    '.yr{position:absolute;border-radius:50%;border:1.5px solid var(--g);opacity:0;animation:yR 2.8s ease-in-out infinite}',
    '.yr:nth-child(1){inset:-5px}',
    '.yr:nth-child(2){inset:-11px;border-width:1px;animation-delay:.9s}',
    /* PANEL */
    '#yqf-p{position:fixed;bottom:28px;right:28px;width:390px;height:620px;max-width:calc(100vw - 16px);max-height:calc(100vh - 32px);background:var(--bg);border:1px solid var(--bd);border-radius:4px;display:none;flex-direction:column;z-index:9991;overflow:hidden;transform-origin:bottom right;box-shadow:0 30px 90px rgba(0,0,0,.85),0 0 0 1px rgba(201,168,76,.07)}',
    '#yqf-p::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,transparent,var(--g),transparent);z-index:20;pointer-events:none}',
    '#yqf-p.yo{display:flex;animation:yO .6s cubic-bezier(.16,1.1,.3,1) both}',
    '#yqf-p.yc{animation:yC .44s cubic-bezier(.7,0,.84,0) both}',
    /* HEADER */
    '#yqf-h{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:linear-gradient(to right,#190F00,#0C0700);border-bottom:1px solid var(--bd);position:relative;z-index:15}',
    '#yqf-h::after{content:"";position:absolute;bottom:-1px;left:10%;right:10%;height:1px;background:linear-gradient(to right,transparent,var(--gd),transparent)}',
    '.yb{width:34px;height:34px;background:rgba(201,168,76,.07);border:1px solid rgba(201,168,76,.18);border-radius:2px;color:var(--g);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;outline:none}',
    '.yb:hover{background:rgba(201,168,76,.16);border-color:var(--g)}',
    '#yqf-hc{display:flex;align-items:center;gap:10px;min-width:0}',
    '#yqf-hd{font-family:\'Ma Shan Zheng\',\'STKaiti\',serif;font-size:30px;color:var(--gb);text-shadow:0 0 14px rgba(240,192,64,.4);flex-shrink:0}',
    '#yqf-ht{font-family:\'Cinzel\',\'Georgia\',serif;font-size:9px;letter-spacing:.22em;color:var(--g);font-weight:600;white-space:nowrap}',
    '#yqf-hs{font-family:\'Ma Shan Zheng\',\'STKaiti\',serif;font-size:13px;color:var(--gd);letter-spacing:.3em;margin-top:1px}',
    /* MENU */
    '#yqf-m{position:absolute;top:57px;left:0;bottom:0;width:100%;background:linear-gradient(160deg,#130D00,#080500);border-top:1px solid var(--bd);z-index:12;display:none;flex-direction:column;padding:18px 16px}',
    '#yqf-m.ymi{display:flex;animation:yMI .42s cubic-bezier(.16,1,.3,1) both}',
    '#yqf-m.ymo{display:flex;animation:yMO .36s cubic-bezier(.7,0,.84,0) both}',
    '#yqf-mb{display:flex;align-items:center;justify-content:space-between;padding-bottom:14px;border-bottom:1px solid var(--bd);margin-bottom:14px}',
    '#yqf-mb span{font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:.35em;color:var(--dm)}',
    '#yqf-mx{background:none;border:none;color:var(--dm);cursor:pointer;font-size:16px;padding:4px 8px;line-height:1;transition:color .2s;outline:none}',
    '#yqf-mx:hover{color:var(--g)}',
    '#yqf-ml{display:flex;flex-direction:column;gap:6px;flex:1;overflow-y:auto}',
    '#yqf-ml::-webkit-scrollbar{width:2px}',
    '#yqf-ml::-webkit-scrollbar-thumb{background:var(--gd)}',
    '.ymi-item{display:flex;align-items:center;gap:14px;padding:11px 15px;background:rgba(201,168,76,.055);border:1px solid rgba(201,168,76,.12);border-radius:2px;cursor:pointer;text-align:left;width:100%;transition:all .2s;animation:yII .4s cubic-bezier(.16,1,.3,1) both}',
    '.ymi-item:hover{background:rgba(201,168,76,.15);border-color:rgba(201,168,76,.35);transform:translateX(5px)}',
    '.ymi-g{font-family:\'Ma Shan Zheng\',\'STKaiti\',serif;font-size:22px;color:var(--g);width:28px;text-align:center;flex-shrink:0}',
    '.ymi-l{font-family:\'Cinzel\',serif;font-size:12px;letter-spacing:.06em;color:var(--tx)}',
    '#yqf-wa{display:block;text-align:center;padding:12px;margin-top:12px;background:rgba(37,211,102,.08);border:1px solid rgba(37,211,102,.25);border-radius:2px;color:#3DD175;text-decoration:none;font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:.22em;transition:background .2s}',
    '#yqf-wa:hover{background:rgba(37,211,102,.18)}',
    /* MESSAGES */
    '#yqf-ms{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:12px}',
    '#yqf-ms::-webkit-scrollbar{width:3px}',
    '#yqf-ms::-webkit-scrollbar-thumb{background:var(--gd);border-radius:2px}',
    '.ymr{display:flex;gap:9px;animation:yMR .4s ease both}',
    '.ymr.yu{justify-content:flex-end}',
    '.yav{width:30px;height:30px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#221500,#130D00);border:1px solid var(--gd);display:flex;align-items:center;justify-content:center;font-family:\'Ma Shan Zheng\',serif;font-size:14px;color:var(--g)}',
    '.ybu{max-width:78%;padding:10px 14px;border-radius:2px;font-size:14.5px;line-height:1.65;white-space:pre-wrap;font-family:\'Cormorant Garamond\',\'Palatino\',serif}',
    '.ybu.ya{background:linear-gradient(135deg,#180F00,#0F0900);border:1px solid rgba(201,168,76,.18);color:var(--tx);border-top-left-radius:0}',
    '.ybu.yuu{background:linear-gradient(135deg,#2C1D00,#1E1400);border:1px solid rgba(201,168,76,.32);color:var(--gb);border-bottom-right-radius:0}',
    '.ydt{display:flex;align-items:center;gap:5px;padding:4px 2px}',
    '.yd{width:6px;height:6px;border-radius:50%;background:var(--g)}',
    '.yd:nth-child(1){animation:yD 1.3s ease-in-out infinite}',
    '.yd:nth-child(2){animation:yD 1.3s ease-in-out .18s infinite}',
    '.yd:nth-child(3){animation:yD 1.3s ease-in-out .36s infinite}',
    /* INPUT */
    '#yqf-ib{flex-shrink:0;display:flex;gap:8px;padding:11px 14px;background:linear-gradient(to top,#100800,#090600);border-top:1px solid var(--bd);position:relative}',
    '#yqf-ib::before{content:"";position:absolute;top:0;left:8%;right:8%;height:1px;background:linear-gradient(to right,transparent,var(--gd),transparent)}',
    '#yqf-in{flex:1;background:rgba(201,168,76,.05);border:1px solid rgba(201,168,76,.18);border-radius:2px;padding:9px 13px;color:var(--tx);font-family:\'Cormorant Garamond\',\'Palatino\',serif;font-size:14px;outline:none;transition:border-color .2s}',
    '#yqf-in:focus{border-color:var(--gd);background:rgba(201,168,76,.09)}',
    '#yqf-in::placeholder{color:var(--dm);font-style:italic}',
    '#yqf-sn{padding:9px 15px;background:linear-gradient(135deg,#C9A84C,#8C6018);border:none;border-radius:2px;color:#060400;font-family:\'Cinzel\',serif;font-size:10px;font-weight:700;letter-spacing:.15em;cursor:pointer;white-space:nowrap;outline:none;transition:all .2s}',
    '#yqf-sn:hover:not(:disabled){background:linear-gradient(135deg,#F0C040,#C9A84C);transform:translateY(-1px)}',
    '#yqf-sn:disabled{opacity:.4;cursor:not-allowed}',
    '#yqf-dc{position:absolute;bottom:58px;right:6px;font-family:\'Ma Shan Zheng\',serif;font-size:100px;color:rgba(201,168,76,.025);line-height:1;pointer-events:none;user-select:none;z-index:0}',
    /* KEYFRAMES */
    '@keyframes yF{from{transform:scale(0) rotate(-200deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}',
    '@keyframes yT{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}',
    '@keyframes yR{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.55);opacity:0}}',
    '@keyframes yO{0%{transform:scale(.04) translateY(80px) translateX(80px);opacity:0;border-radius:60px}55%{opacity:1}100%{transform:scale(1) translateY(0) translateX(0);opacity:1;border-radius:4px}}',
    '@keyframes yC{0%{transform:scale(1);opacity:1;border-radius:4px}100%{transform:scale(.04) translateY(80px) translateX(80px);opacity:0;border-radius:60px}}',
    '@keyframes yMI{from{transform:translateX(-100%);opacity:.3}to{transform:translateX(0);opacity:1}}',
    '@keyframes yMO{from{transform:translateX(0);opacity:1}to{transform:translateX(-100%);opacity:0}}',
    '@keyframes yII{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}',
    '@keyframes yMR{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes yD{0%,80%,100%{transform:scale(.55);opacity:.4}40%{transform:scale(1);opacity:1}}',
    '@media(max-width:440px){#yqf-p{bottom:0;right:0;left:0;width:100%;height:100%;max-height:100%;border-radius:0}#yqf-f{bottom:16px;right:16px}}',
    '@media(max-width:440px){@keyframes yO{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes yC{from{transform:translateY(0);opacity:1}to{transform:translateY(100%);opacity:0}}}',
  ].join('\n');

  /* ══════════════════════════════════════
     FUNÇÕES
  ══════════════════════════════════════ */
  function q(id){ return document.getElementById(id); }

  function renderMsgs(){
    var box=q('yqf-ms'); if(!box) return;
    box.innerHTML='';
    msgs.forEach(function(m){
      var row=document.createElement('div');
      row.className='ymr'+(m.role==='user'?' yu':'');
      if(m.role==='assistant'){
        var av=document.createElement('div'); av.className='yav'; av.textContent='\u9f99'; row.appendChild(av);
      }
      var bub=document.createElement('div');
      bub.className='ybu '+(m.role==='assistant'?'ya':'yuu');
      bub.textContent=m.content; row.appendChild(bub); box.appendChild(row);
    });
    if(loading){
      var r=document.createElement('div'); r.className='ymr';
      r.innerHTML='<div class="yav">\u9f99</div><div class="ybu ya"><div class="ydt"><div class="yd"></div><div class="yd"></div><div class="yd"></div></div></div>';
      box.appendChild(r);
    }
    box.scrollTop=box.scrollHeight;
  }

  function openPanel(){
    if(anim) return; panelOpen=true;
    q('yqf-f').style.display='none';
    var p=q('yqf-p'); p.style.display='flex'; p.classList.remove('yc'); void p.offsetWidth; p.classList.add('yo');
    renderMsgs();
    setTimeout(function(){ var i=q('yqf-in'); if(i) i.focus(); },680);
  }

  function closePanel(){
    if(anim) return; anim=true;
    var p=q('yqf-p'); p.classList.remove('yo'); p.classList.add('yc');
    closeMenuNow();
    setTimeout(function(){ p.style.display='none'; p.classList.remove('yc'); q('yqf-f').style.display='flex'; panelOpen=false; anim=false; },450);
  }

  function openMenu(){
    menuOpen=true; var m=q('yqf-m');
    m.classList.remove('ymo'); m.classList.add('ymi');
    m.querySelectorAll('.ymi-item').forEach(function(it,i){ it.style.animation='none'; void it.offsetWidth; it.style.animation=''; it.style.animationDelay=(i*55)+'ms'; });
    q('yqf-mb-btn').textContent='\u2715';
  }

  function closeMenu(){
    if(!menuOpen) return; menuOpen=false;
    var m=q('yqf-m'); m.classList.remove('ymi'); m.classList.add('ymo');
    q('yqf-mb-btn').textContent='\u2630';
    setTimeout(function(){ m.classList.remove('ymo'); },370);
  }

  function closeMenuNow(){
    if(!menuOpen) return; menuOpen=false;
    q('yqf-m').className=''; q('yqf-mb-btn').textContent='\u2630';
  }

  function toggleMenu(){ menuOpen?closeMenu():openMenu(); }

  function send(override){
    var text=(override!==undefined?override:q('yqf-in').value).trim();
    if(!text||loading) return;
    q('yqf-in').value=''; q('yqf-sn').disabled=true;
    if(menuOpen) closeMenu();
    msgs.push({role:'user',content:text}); loading=true; renderMsgs();

    var key=API_KEY.trim();
    if(!key||key.indexOf('COLA-AQUI')>=0){
      setTimeout(function(){
        msgs.push({role:'assistant',content:'Necesito configuraci\u00f3n t\u00e9cnica.\nContacta por WhatsApp: '+WA});
        loading=false; renderMsgs();
      },600); return;
    }

    fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': key,
        'anthropic-version':'2023-06-01',
        'anthropic-dangerous-direct-browser-access':'true'
      },
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        system:SYSTEM,
        messages:msgs.slice(-20).map(function(m){ return{role:m.role,content:m.content}; })
      })
    })
    .then(function(r){ return r.json(); })
    .then(function(d){
      var t=''; if(d.content) d.content.forEach(function(b){ if(b.text) t+=b.text; });
      msgs.push({role:'assistant',content:t||'Error. WhatsApp: '+WA});
    })
    .catch(function(){
      msgs.push({role:'assistant',content:'Error de conexi\u00f3n.\nWhatsApp: '+WA});
    })
    .finally(function(){ loading=false; renderMsgs(); });
  }

  /* ══════════════════════════════════════
     INIT
  ══════════════════════════════════════ */
  function init(){
    /* Fonts */
    var lk=document.createElement('link'); lk.rel='stylesheet';
    lk.href='https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap';
    document.head.appendChild(lk);

    /* CSS */
    var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

    /* HTML */
    var waHref='https://wa.me/'+WA.replace(/\D/g,'');
    var root=document.createElement('div'); root.id='yqf';
    root.innerHTML=
      '<div id="yqf-f">'+
        '<div id="yqf-ft">ASISTENTE AI</div>'+
        '<button id="yqf-fb" aria-label="Abrir asistente">'+
          '<div class="yr"></div><div class="yr"></div>'+
          '<span id="yqf-fc">\u9f99</span>'+
        '</button>'+
      '</div>'+
      '<div id="yqf-p">'+
        '<div id="yqf-dc">\u9f99</div>'+
        '<div id="yqf-m">'+
          '<div id="yqf-mb">'+
            '<span>EXPLORAR EL M\u00c9TODO</span>'+
            '<button id="yqf-mx">\u2715</button>'+
          '</div>'+
          '<div id="yqf-ml"></div>'+
          '<a id="yqf-wa" href="'+waHref+'" target="_blank" rel="noreferrer">\uD83D\uDCF1\u00a0\u00a0WHATSAPP '+WA+'</a>'+
        '</div>'+
        '<div id="yqf-h">'+
          '<button class="yb" id="yqf-mb-btn">\u2630</button>'+
          '<div id="yqf-hc">'+
            '<span id="yqf-hd">\u9f99</span>'+
            '<div><div id="yqf-ht">ASISTENTE YANGYIQUAN FA</div><div id="yqf-hs">\u9633\u610f\u62f3\u6cd5</div></div>'+
          '</div>'+
          '<button class="yb" id="yqf-xb">\u2715</button>'+
        '</div>'+
        '<div id="yqf-ms"></div>'+
        '<div id="yqf-ib">'+
          '<input id="yqf-in" type="text" placeholder="Escribe tu pregunta..." autocomplete="off"/>'+
          '<button id="yqf-sn" disabled>ENVIAR</button>'+
        '</div>'+
      '</div>';
    document.body.appendChild(root);

    /* Menu items */
    var list=q('yqf-ml');
    MENU.forEach(function(item,i){
      var btn=document.createElement('button');
      btn.className='ymi-item'; btn.style.animationDelay=(i*55)+'ms';
      btn.innerHTML='<span class="ymi-g">'+item.g+'</span><span class="ymi-l">'+item.l+'</span>';
      btn.addEventListener('click',function(){ send(item.q); }); list.appendChild(btn);
    });

    /* Events */
    q('yqf-fb').addEventListener('click', openPanel);
    q('yqf-xb').addEventListener('click', closePanel);
    q('yqf-mb-btn').addEventListener('click', toggleMenu);
    q('yqf-mx').addEventListener('click', closeMenu);
    q('yqf-sn').addEventListener('click', function(){ send(); });
    q('yqf-in').addEventListener('keydown', function(e){ if(e.key==='Enter') send(); });
    q('yqf-in').addEventListener('input', function(){ q('yqf-sn').disabled=!this.value.trim()||loading; });
  }

  document.readyState==='loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
