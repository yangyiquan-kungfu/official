import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   SYSTEM PROMPT — Personalise com o conteúdo
   dos livros para respostas ainda mais ricas
   ───────────────────────────────────────────── */
const SYSTEM_PROMPT = `Eres el Asistente del Instructor Jefe de Yangyiquan Fa (阳意拳法).
Es una escuela de Kung Fu, defensa personal y desarrollo interno ubicada en Granada, España.

EL SISTEMA MARCIAL COMPLETO:

1. NEI GONG — 9 PODERES INTERNOS (内功):
Sistema interno de desarrollo psicológico, energético y espiritual. Único en el mundo marcial contemporáneo. Transforma mente, energía y espíritu desde adentro. No existe otro sistema equivalente en el mundo marcial actual.

2. ARSENAL DEL DRAGÓN (龙):
6 técnicas devastadoras fundamentadas en biomecánica real. Eficaces en la calle. Sin dogmas ni tradiciones vacías. Directas, funcionales y letales cuando se necesita.

3. DAO ZHILIAO (道):
La medicina marcial del Yangyiquan. Tres pilares: el Dit Da Jow (medicina china para traumatismos marciales), el trabajo de la mente, y la sanación del espíritu. Cura el cuerpo, la mente y el espíritu como parte integral del entrenamiento.

4. LOS 3 VOLÚMENES:
El conocimiento completo condensado en tres libros escritos por el Instructor Jefe. Disponibles para alumnos avanzados.

CLASES Y CONTACTO:
- Primera clase de prueba COMPLETAMENTE GRATIS, sin compromiso
- No se necesita experiencia previa
- Clases presenciales en Granada, España
- WhatsApp: +34 674 471 678
- Web: yangyiquan.international

INSTRUCCIONES DE COMPORTAMIENTO:
- Responde SIEMPRE en el idioma que usa el usuario (español, portugués, inglés, etc.)
- Tono: marcial, directo, apasionado y profundo. No eres un chatbot genérico — eres la voz del método.
- Si te preguntan precios, horarios exactos o detalles no listados, redirige al WhatsApp
- Nunca inventes información. Si no la tienes, di que contacten al Instructor directamente
- Anima siempre a reservar la clase de prueba gratuita — es la mejor forma de conocer el método
- Puedes citar conceptos del taoísmo, la biomecánica y la psicología cuando sea relevante`;

const MENU_ITEMS = [
  { glyph: "🔥", label: "El Método", q: "¿Qué es el Yangyiquan Fa y qué lo hace único en el mundo marcial?" },
  { glyph: "内", label: "9 Poderes Internos", q: "Explícame los 9 Poderes Internos del Nei Gong y cómo transforman al practicante." },
  { glyph: "龙", label: "Arsenal del Dragón", q: "¿Qué son las 6 técnicas del Arsenal del Dragón y por qué funcionan en la calle?" },
  { glyph: "道", label: "Dao Zhiliao", q: "¿Qué es el Dao Zhiliao y cómo el Dit Da Jow forma parte del sistema?" },
  { glyph: "卷", label: "Los 3 Volúmenes", q: "¿Qué contienen los 3 libros del Instructor Jefe y para quién son?" },
  { glyph: "📍", label: "Clases Gratis", q: "¿Cómo puedo reservar mi clase de prueba gratuita en Granada?" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

:root {
  --gold:       #C9A84C;
  --gold-b:     #F0C040;
  --gold-dim:   #6A5520;
  --gold-glow:  rgba(201,168,76,0.35);
  --bg-void:    #060400;
  --bg-panel:   #0E0900;
  --bg-card:    #161000;
  --bg-item:    rgba(201,168,76,0.06);
  --border:     rgba(201,168,76,0.2);
  --text:       #DDD0A8;
  --text-dim:   #7A6840;
  --red:        #C0392B;
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

body{
  font-family:'Cormorant Garamond',serif;
  background:var(--bg-void);
  min-height:100vh;
  overflow-x:hidden;
}

/* ── DEMO BACKGROUND ── */
.stage{
  position:fixed;inset:0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 20%, #1C1000 0%, #060400 65%),
    repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(201,168,76,0.015) 60px,rgba(201,168,76,0.015) 61px),
    repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(201,168,76,0.015) 60px,rgba(201,168,76,0.015) 61px);
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
}
.stage::before{
  content:'龍';
  position:absolute;
  font-family:'Ma Shan Zheng',cursive;
  font-size:42vw;
  color:rgba(201,168,76,0.018);
  line-height:1;
  pointer-events:none;
  animation:bgBreath 8s ease-in-out infinite alternate;
}
@keyframes bgBreath{
  from{transform:scale(1) rotate(-2deg);}
  to{transform:scale(1.04) rotate(2deg);}
}
.brand{
  text-align:center;
  animation:brandIn 1.2s cubic-bezier(.16,1,.3,1) both;
  pointer-events:none;
}
@keyframes brandIn{
  from{opacity:0;transform:translateY(30px);}
  to{opacity:1;transform:translateY(0);}
}
.brand-logo{
  font-family:'Ma Shan Zheng',cursive;
  font-size:min(22vw,120px);
  color:var(--gold);
  line-height:1;
  text-shadow:0 0 60px rgba(201,168,76,0.3),0 0 120px rgba(201,168,76,0.12);
  animation:logoPulse 4s ease-in-out infinite alternate;
}
@keyframes logoPulse{
  from{text-shadow:0 0 40px rgba(201,168,76,0.25),0 0 80px rgba(201,168,76,0.08);}
  to{text-shadow:0 0 80px rgba(201,168,76,0.45),0 0 160px rgba(201,168,76,0.18);}
}
.brand-name{
  font-family:'Cinzel',serif;
  font-size:clamp(16px,3.5vw,28px);
  letter-spacing:.4em;
  color:var(--gold-b);
  font-weight:700;
  margin-top:8px;
}
.brand-cn{
  font-family:'Ma Shan Zheng',cursive;
  font-size:clamp(14px,3vw,22px);
  letter-spacing:.6em;
  color:var(--gold);
  opacity:.75;
  margin-top:6px;
}
.brand-sub{
  font-size:11px;
  letter-spacing:.35em;
  color:var(--text-dim);
  font-style:italic;
  margin-top:20px;
}

/* ── FLOATING BUTTON ── */
.fab-wrap{
  position:fixed;bottom:28px;right:28px;
  display:flex;flex-direction:column;align-items:flex-end;gap:8px;
  z-index:900;
  animation:fabIn .9s cubic-bezier(.34,1.56,.64,1) .3s both;
}
@keyframes fabIn{
  from{transform:scale(0) rotate(-200deg);opacity:0;}
  to{transform:scale(1) rotate(0deg);opacity:1;}
}
.fab-tag{
  font-family:'Cinzel',serif;
  font-size:9px;letter-spacing:.25em;
  color:var(--gold);
  background:rgba(6,4,0,.92);
  border:1px solid var(--border);
  padding:5px 12px;
  border-radius:2px;
  animation:tagSlide .5s 1.4s ease both;
  backdrop-filter:blur(8px);
}
@keyframes tagSlide{
  from{opacity:0;transform:translateX(14px);}
  to{opacity:1;transform:translateX(0);}
}
.fab-btn{
  width:64px;height:64px;
  border-radius:50%;
  background:linear-gradient(145deg,#261800,#130D00);
  border:2px solid var(--gold);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
  position:relative;
  box-shadow:0 0 24px rgba(201,168,76,.28),0 8px 32px rgba(0,0,0,.6),inset 0 0 20px rgba(201,168,76,.04);
  transition:transform .25s,box-shadow .25s;
}
.fab-btn:hover{
  transform:scale(1.1);
  box-shadow:0 0 40px rgba(201,168,76,.5),0 12px 40px rgba(0,0,0,.7),inset 0 0 24px rgba(201,168,76,.08);
}
.fab-char{
  font-family:'Ma Shan Zheng',cursive;
  font-size:30px;color:var(--gold-b);
  position:relative;z-index:1;
  text-shadow:0 0 12px rgba(240,192,64,.5);
}
.fab-ring{
  position:absolute;inset:-5px;
  border-radius:50%;
  border:1.5px solid var(--gold);
  animation:ring 2.8s ease-in-out infinite;
  opacity:0;
}
.fab-ring2{
  position:absolute;inset:-10px;
  border-radius:50%;
  border:1px solid var(--gold);
  animation:ring 2.8s ease-in-out .9s infinite;
  opacity:0;
}
@keyframes ring{
  0%{transform:scale(1);opacity:.7;}
  100%{transform:scale(1.5);opacity:0;}
}

/* ── CHAT PANEL ── */
.chat-panel{
  position:fixed;bottom:28px;right:28px;
  width:390px;height:620px;
  max-width:calc(100vw - 16px);
  max-height:calc(100vh - 32px);
  background:var(--bg-panel);
  border:1px solid var(--border);
  border-radius:4px;
  display:flex;flex-direction:column;
  z-index:900;
  overflow:hidden;
  transform-origin:bottom right;
  box-shadow:
    0 30px 90px rgba(0,0,0,.85),
    0 0 0 1px rgba(201,168,76,.08),
    inset 0 0 100px rgba(201,168,76,.015);
}
.chat-panel::before{
  content:'';
  position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(to right,transparent,var(--gold),transparent);
  z-index:20;
}
.panel-open{
  animation:panelOpen .6s cubic-bezier(.16,1.1,.3,1) both;
}
@keyframes panelOpen{
  0%{
    transform:scale(.04) translateY(80px) translateX(80px);
    opacity:0;border-radius:60px;
  }
  55%{opacity:1;}
  100%{
    transform:scale(1) translateY(0) translateX(0);
    opacity:1;border-radius:4px;
  }
}
.panel-close{
  animation:panelClose .45s cubic-bezier(.7,0,.84,0) both;
}
@keyframes panelClose{
  0%{transform:scale(1);opacity:1;border-radius:4px;}
  100%{
    transform:scale(.04) translateY(80px) translateX(80px);
    opacity:0;border-radius:60px;
  }
}

/* ── HEADER ── */
.chat-header{
  flex-shrink:0;
  display:flex;align-items:center;justify-content:space-between;
  padding:10px 14px;
  background:linear-gradient(to right,#190F00,#0C0700);
  border-bottom:1px solid var(--border);
  position:relative;z-index:15;
}
.chat-header::after{
  content:'';position:absolute;bottom:-1px;left:10%;right:10%;height:1px;
  background:linear-gradient(to right,transparent,var(--gold-dim),transparent);
}
.hdr-btn{
  width:34px;height:34px;
  background:rgba(201,168,76,.07);
  border:1px solid rgba(201,168,76,.18);
  border-radius:2px;
  color:var(--gold);
  font-size:16px;
  cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;
  flex-shrink:0;
}
.hdr-btn:hover{
  background:rgba(201,168,76,.16);
  border-color:var(--gold);
}
.hdr-center{
  display:flex;align-items:center;gap:10px;
  min-width:0;
}
.hdr-dragon{
  font-family:'Ma Shan Zheng',cursive;
  font-size:30px;color:var(--gold-b);
  text-shadow:0 0 14px rgba(240,192,64,.4);
  flex-shrink:0;
}
.hdr-text{overflow:hidden;}
.hdr-title{
  font-family:'Cinzel',serif;
  font-size:9px;letter-spacing:.22em;
  color:var(--gold);font-weight:600;
  white-space:nowrap;
}
.hdr-sub{
  font-family:'Ma Shan Zheng',cursive;
  font-size:13px;color:var(--gold-dim);
  letter-spacing:.3em;margin-top:1px;
}

/* ── INTERNAL MENU ── */
.menu-drawer{
  position:absolute;
  top:57px;left:0;bottom:0;width:100%;
  background:linear-gradient(160deg,#130D00 0%,#080500 100%);
  border-top:1px solid var(--border);
  z-index:12;
  display:flex;flex-direction:column;
  padding:18px 16px;
}
.menu-in{animation:menuIn .42s cubic-bezier(.16,1,.3,1) both;}
@keyframes menuIn{
  from{transform:translateX(-100%);opacity:.3;}
  to{transform:translateX(0);opacity:1;}
}
.menu-out{animation:menuOut .36s cubic-bezier(.7,0,.84,0) both;}
@keyframes menuOut{
  from{transform:translateX(0);opacity:1;}
  to{transform:translateX(-100%);opacity:0;}
}
.menu-bar{
  display:flex;align-items:center;justify-content:space-between;
  padding-bottom:14px;
  border-bottom:1px solid var(--border);
  margin-bottom:14px;
}
.menu-bar-title{
  font-family:'Cinzel',serif;
  font-size:10px;letter-spacing:.35em;color:var(--text-dim);
}
.menu-x{
  background:none;border:none;
  color:var(--text-dim);cursor:pointer;
  font-size:14px;padding:4px 6px;
  transition:color .2s;
}
.menu-x:hover{color:var(--gold);}
.menu-list{display:flex;flex-direction:column;gap:6px;flex:1;overflow-y:auto;}
.menu-list::-webkit-scrollbar{width:2px;}
.menu-list::-webkit-scrollbar-thumb{background:var(--gold-dim);}
.menu-item{
  display:flex;align-items:center;gap:14px;
  padding:12px 16px;
  background:var(--bg-item);
  border:1px solid rgba(201,168,76,.1);
  border-radius:2px;cursor:pointer;
  text-align:left;
  color:var(--text);
  transition:all .2s;
  animation:itemIn .4s cubic-bezier(.16,1,.3,1) both;
}
@keyframes itemIn{
  from{opacity:0;transform:translateX(-24px);}
  to{opacity:1;transform:translateX(0);}
}
.menu-item:hover{
  background:rgba(201,168,76,.14);
  border-color:rgba(201,168,76,.32);
  transform:translateX(5px);
}
.menu-glyph{
  font-family:'Ma Shan Zheng',cursive;
  font-size:22px;color:var(--gold);
  width:28px;text-align:center;flex-shrink:0;
}
.menu-label-txt{
  font-family:'Cinzel',serif;
  font-size:12px;letter-spacing:.06em;
  color:var(--text);
}
.menu-wa{
  display:block;
  text-align:center;
  padding:12px;
  background:rgba(37,211,102,.08);
  border:1px solid rgba(37,211,102,.25);
  border-radius:2px;
  color:#3DD175;
  text-decoration:none;
  font-family:'Cinzel',serif;
  font-size:10px;letter-spacing:.25em;
  margin-top:12px;
  transition:all .2s;
}
.menu-wa:hover{background:rgba(37,211,102,.16);}

/* ── MESSAGES ── */
.msgs{
  flex:1;overflow-y:auto;
  padding:16px 14px;
  display:flex;flex-direction:column;gap:12px;
}
.msgs::-webkit-scrollbar{width:3px;}
.msgs::-webkit-scrollbar-thumb{background:var(--gold-dim);border-radius:2px;}
.msg-row{
  display:flex;gap:9px;
  animation:msgIn .4s ease both;
}
@keyframes msgIn{
  from{opacity:0;transform:translateY(14px);}
  to{opacity:1;transform:translateY(0);}
}
.msg-row.user{justify-content:flex-end;}
.msg-row.assistant{justify-content:flex-start;}
.msg-av{
  width:30px;height:30px;border-radius:50%;
  background:linear-gradient(135deg,#221500,#130D00);
  border:1px solid var(--gold-dim);
  display:flex;align-items:center;justify-content:center;
  font-family:'Ma Shan Zheng',cursive;
  font-size:14px;color:var(--gold);
  flex-shrink:0;
}
.bubble{
  max-width:78%;
  padding:10px 14px;
  border-radius:2px;
  font-size:14.5px;line-height:1.65;
  font-family:'Cormorant Garamond',serif;
}
.bubble.assistant{
  background:linear-gradient(135deg,#180F00,#0F0900);
  border:1px solid rgba(201,168,76,.18);
  color:var(--text);
  border-top-left-radius:0;
}
.bubble.user{
  background:linear-gradient(135deg,#2C1D00,#1E1400);
  border:1px solid rgba(201,168,76,.32);
  color:var(--gold-b);
  border-bottom-right-radius:0;
}
.dots{display:flex;align-items:center;gap:5px;padding:4px 2px;}
.dot{
  width:6px;height:6px;border-radius:50%;
  background:var(--gold);
  animation:dotBounce 1.3s ease-in-out infinite;
}
.dot:nth-child(2){animation-delay:.18s;}
.dot:nth-child(3){animation-delay:.36s;}
@keyframes dotBounce{
  0%,80%,100%{transform:scale(.55);opacity:.4;}
  40%{transform:scale(1);opacity:1;}
}

/* ── INPUT BAR ── */
.input-bar{
  flex-shrink:0;
  display:flex;gap:8px;
  padding:11px 14px;
  background:linear-gradient(to top,#100800,#090600);
  border-top:1px solid var(--border);
  position:relative;
}
.input-bar::before{
  content:'';position:absolute;top:0;left:8%;right:8%;height:1px;
  background:linear-gradient(to right,transparent,var(--gold-dim),transparent);
}
.chat-in{
  flex:1;
  background:rgba(201,168,76,.05);
  border:1px solid rgba(201,168,76,.18);
  border-radius:2px;
  padding:9px 13px;
  color:var(--text);
  font-family:'Cormorant Garamond',serif;
  font-size:14px;
  outline:none;
  transition:border-color .2s,background .2s;
}
.chat-in:focus{
  border-color:var(--gold-dim);
  background:rgba(201,168,76,.09);
}
.chat-in::placeholder{color:var(--text-dim);font-style:italic;}
.send{
  padding:9px 15px;
  background:linear-gradient(135deg,var(--gold),#8C6018);
  border:none;border-radius:2px;
  color:#060400;
  font-family:'Cinzel',serif;
  font-size:10px;font-weight:700;
  letter-spacing:.15em;
  cursor:pointer;
  transition:all .2s;
  white-space:nowrap;
}
.send:hover:not(:disabled){
  background:linear-gradient(135deg,var(--gold-b),var(--gold));
  transform:translateY(-1px);
  box-shadow:0 4px 16px rgba(201,168,76,.3);
}
.send:disabled{opacity:.45;cursor:not-allowed;}

/* ── BG GLYPH DECORATION ── */
.panel-deco{
  position:absolute;bottom:58px;right:6px;
  font-family:'Ma Shan Zheng',cursive;
  font-size:100px;
  color:rgba(201,168,76,.025);
  pointer-events:none;user-select:none;line-height:1;
  z-index:0;
}

/* ── MOBILE ── */
@media(max-width:440px){
  .chat-panel{
    bottom:0;right:0;left:0;
    width:100%;height:100%;max-height:100%;
    border-radius:0;
  }
  @keyframes panelOpen{
    0%{transform:translateY(100%);opacity:0;}
    100%{transform:translateY(0);opacity:1;}
  }
  @keyframes panelClose{
    0%{transform:translateY(0);opacity:1;}
    100%{transform:translateY(100%);opacity:0;}
  }
  .fab-wrap{bottom:16px;right:16px;}
}
`;

/* ════════════════════════════════════════════ */
export default function YangyiquanFaWidget() {
  const [open, setOpen]       = useState(false);
  const [closing, setClosing] = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [msgs, setMsgs] = useState([{
    role: "assistant",
    content: "Bienvenido al Yangyiquan Fa.\n阳意拳法\n\nSoy el asistente del Instructor Jefe. Pregúntame sobre el método, los 9 Poderes Internos, el Arsenal del Dragón, el Dao Zhiliao, los libros, o las clases en Granada.\n\n¿Por dónde empezamos?"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef   = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  /* ── open / close chat ── */
  const openChat = () => {
    setClosing(false);
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 680);
  };
  const closeChat = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false); setClosing(false);
      setMenuOpen(false); setMenuClosing(false);
    }, 450);
  };

  /* ── open / close menu ── */
  const openMenu = () => { setMenuClosing(false); setMenuOpen(true); };
  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 380);
  };
  const toggleMenu = () => menuOpen ? closeMenu() : openMenu();

  /* ── send message ── */
  const send = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    setInput("");
    if (menuOpen) closeMenu();

    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: next.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply =
        data.content?.map(b => b.text || "").join("") ||
        "Error de conexión. Contacta por WhatsApp: +34 674 471 678";
      setMsgs([...next, { role: "assistant", content: reply }]);
    } catch {
      setMsgs([...next, {
        role: "assistant",
        content: "Error de conexión.\nWhatsApp: +34 674 471 678"
      }]);
    }
    setLoading(false);
  };

  const formatMsg = (text) =>
    text.split("\n").map((line, i, arr) => (
      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
    ));

  /* ════════════ RENDER ════════════ */
  return (
    <>
      <style>{CSS}</style>

      {/* ── Demo background ── */}
      <div className="stage">
        <div className="brand">
          <div className="brand-logo">龍</div>
          <div className="brand-name">YANGYIQUAN FA</div>
          <div className="brand-cn">阳 意 拳 法</div>
          <div className="brand-sub">· KUNG FU · DEFENSA PERSONAL · GRANADA ·</div>
        </div>
      </div>

      {/* ── Floating button (only when chat closed) ── */}
      {!open && (
        <div className="fab-wrap">
          <div className="fab-tag">ASISTENTE AI</div>
          <button className="fab-btn" onClick={openChat} aria-label="Abrir asistente">
            <span className="fab-char">龍</span>
            <div className="fab-ring" />
            <div className="fab-ring2" />
          </button>
        </div>
      )}

      {/* ── Chat panel ── */}
      {open && (
        <div className={`chat-panel ${closing ? "panel-close" : "panel-open"}`}>

          {/* BG decoration glyph */}
          <div className="panel-deco">龍</div>

          {/* ─ Internal menu drawer ─ */}
          {menuOpen && (
            <div className={`menu-drawer ${menuClosing ? "menu-out" : "menu-in"}`}>
              <div className="menu-bar">
                <span className="menu-bar-title">EXPLORAR EL MÉTODO</span>
                <button className="menu-x" onClick={closeMenu} aria-label="Cerrar menú">✕</button>
              </div>
              <div className="menu-list">
                {MENU_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    className="menu-item"
                    style={{ animationDelay: `${i * 55}ms` }}
                    onClick={() => send(item.q)}
                  >
                    <span className="menu-glyph">{item.glyph}</span>
                    <span className="menu-label-txt">{item.label}</span>
                  </button>
                ))}
              </div>
              <a
                href="https://wa.me/34674471678"
                target="_blank"
                rel="noreferrer"
                className="menu-wa"
              >
                📱 &nbsp; WHATSAPP +34 674 471 678
              </a>
            </div>
          )}

          {/* ─ Header ─ */}
          <div className="chat-header">
            <button
              className="hdr-btn"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              title={menuOpen ? "Cerrar menú" : "Menú de temas"}
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            <div className="hdr-center">
              <span className="hdr-dragon">龍</span>
              <div className="hdr-text">
                <div className="hdr-title">ASISTENTE YANGYIQUAN FA</div>
                <div className="hdr-sub">阳意拳法</div>
              </div>
            </div>

            <button className="hdr-btn" onClick={closeChat} aria-label="Cerrar chat">✕</button>
          </div>

          {/* ─ Messages ─ */}
          <div className="msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`msg-row ${m.role}`}>
                {m.role === "assistant" && <div className="msg-av">龍</div>}
                <div className={`bubble ${m.role}`}>{formatMsg(m.content)}</div>
              </div>
            ))}
            {loading && (
              <div className="msg-row assistant">
                <div className="msg-av">龍</div>
                <div className="bubble assistant">
                  <div className="dots">
                    <div className="dot" /><div className="dot" /><div className="dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* ─ Input bar ─ */}
          <div className="input-bar">
            <input
              ref={inputRef}
              className="chat-in"
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              disabled={loading}
              aria-label="Escribe tu pregunta"
            />
            <button
              className="send"
              onClick={() => send()}
              disabled={loading || !input.trim()}
            >
              ENVIAR
            </button>
          </div>

        </div>
      )}
    </>
  );
}
