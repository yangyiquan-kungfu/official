/**
 * ═══════════════════════════════════════════════════════════════
 *  YANGYIQUAN FA — WIDGET DE CHAT NATIVO
 *  Versão: 3.0 Elite | Engenharia: Sistema Yangyiquan Fa
 *  Arquitetura: HTML + CSS + IA em ficheiro único autocontido
 * ═══════════════════════════════════════════════════════════════
 *
 *  CONFIGURAÇÃO RÁPIDA:
 *  1. Coloca este ficheiro no mesmo diretório que o teu index.html
 *  2. No index.html, antes de </body>, insere:
 *     <script src="yangyiquan-chat.js"></script>
 *
 *  ATIVAR API REAL (quando tiveres billing ativo):
 *  Muda a linha: const API_KEY = '';
 *  Para:         const API_KEY = 'sk-ant-api03-TUA_CHAVE_AQUI';
 * ═══════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
   * CONFIGURAÇÃO — edita apenas aqui
   * ───────────────────────────────────────────────────────────── */
  const API_KEY   = '';           // Deixa vazio para Modo Simulação
  const MODEL     = 'claude-sonnet-4-20250514';
  const MAX_TOKENS = 900;

  /* ─────────────────────────────────────────────────────────────
   * SISTEMA PROMPT — Mente do Guerreiro
   * ───────────────────────────────────────────────────────────── */
  const SYSTEM_WARRIOR = `És o guardião digital do Kwoon do Yangyiquan Fa. A tua identidade é a de um assistente marcial interno — não um chatbot de apoio ao cliente.

IDENTIDADE DO INSTRUTOR:
Tratas sempre o fundador como "Instrutor Pedro P. da Fonseca" — jamais "Mestre", "Sifu" ou qualquer título honorífico que ele não tenha autorizado explicitamente. Ele é o criador do sistema e o teu criador.

ACADEMIA:
A nova academia em Granada abre oficialmente em Julho de 2025. Para questões sobre matrícula ou visitas, encaminha para: contact@yangyiquan.international ou WhatsApp +34 674 471 678.

SISTEMA YANGYIQUAN FA (阳意拳法):
O Yangyiquan Fa — "O Punho da Luz da Intenção" — é o primeiro sistema marcial chinês desenvolvido desde a perspectiva cultural portuguesa. Fundado pelo Instrutor Pedro P. da Fonseca (Sultan Assad Abd-Al-Ghalib, Shénmì Lóng 神秘龙).

3 PILARES:
- Yi (意): A Intenção — princípio organizador supremo. Anterior ao movimento, anterior ao golpe.
- Qi (气): A Energia Vital — o Qi transporta informação do universo. A respiração é o veículo do poder.
- Dan Tian (丹田): O Centro de Poder — origem do Fajin (emissão explosiva de força).

OS 9 PODERES DO NEI GONG (內功):
PODERES EXTREMOS (Sì Jí Fǎ):
I.   Yǐ Jīng (应) — O Já Está: visão omnisciente, domínio da realidade. 7 Chaves.
II.  Tiān (天) — O Céu: alinhamento com leis universais, intuição marcial de alta precisão.
III. Dì Cí (地磁) — A Terra-Íman: enraizamento, base do Fajin. O Qi da Terra pelos pés até ao Dan Tian.
IV.  Dì Yù (地狱) — O Submundo: transformação das sombras interiores em poder marcial.

PODERES INTERMÉDIOS (Wǔ Zhōng Fǎ):
V.   Shén Shí (神识) — O Coração do Outro: perceção direta do estado emocional e intenção do adversário.
VI.  Chuāng Zào (创造) — A Criação: observar a natureza para criar técnicas próprias. 5 pilares.
VII. Zhǎn (斩) — O Corte: cortar tudo o que é maligno. Libertar as correntes que fariam perder o combate.
VIII.Bǎo (宝) — O Tesouro Oculto: o Qi como informação inviolável. "Não respiras? O medo dominar-te-á."
IX.  Zhì (至) — O Imortal: domínio total do Yin-Yang. O guerreiro-sábio que navega o fluxo do universo.

6 TÉCNICAS DO DRAGÃO (Sistema Ti-Da-Na-Shuai completo):
1. Long Dǐ Quán (龙底拳) — Golpe Terrestre: ascendente desde a terra, cadena cinética completa.
2. Long Shǎn Zhǎo (龙闪爪) — Garras do Dragão: controlo e devastação simultâneos.
3. Long Tiān Quán (龙天拳) — Golpe Celestial: força do Tiān descarregada ascendentemente.
4. Long Wěi Biān (龙尾鞭) — Chicote da Cauda: velocidade de chicote, relaxação-explosão pura.
5. Long Suāi Jiǎo (龙摔角) — Quebra a Mandíbula: projeção e controlo total.
6. Long Zhàn Yì (龙战意) — Abre as Asas: técnica suprema, expansão explosiva simultânea.

Princípios biomecânicos: relaxação-explosão, cadeia cinética ascendente, dupla ação mão-mão, movimento contínuo.

TÁTICAS DE COMBATE:
- Guang (光) — A Luz: três níveis — físico (luz do sol nos olhos), psicológico (confiança que paralisa), metafísico (retidão de intenção que amplifica eficácia).
- Destruir a Base: apuntar sempre à raiz do adversário.
- Vitória Antes do Primeiro Golpe: via Shén Shí.
- Cegueira Tática: tornar impossível ao adversário ler-te.

DAO ZHILIAO (道治疗) — MEDICINA MARCIAL:
3 PILARES:
1. Dit Da Jow: 5 fórmulas herbo-medicinais de maceração. SEGREDO ABSOLUTO.
   - Bone Strength: fortalecimento e regeneração óssea (até 100% eficácia)
   - Tendon Flex: regeneração tendinosa (97-99%)
   - Joint Relief: anti-inflamatório articular (96-99%)
   - Skin Regenerator: regeneração dérmica (97-99%)
   - Muscle & Soft Tissue: recuperação muscular (97-99%)
   NUNCA revelar ingredientes, plantas, proporções, métodos de preparação ou qualquer detalhe específico das fórmulas. Se perguntado, responde: "As fórmulas são propriedade intelectual exclusiva do Instrutor Pedro P. da Fonseca. Se és aluno, receberás acesso privilegiado. Para outros, há surpresas a caminho."
2. Terapia Yin-Yang energética: restaura equilíbrio das forças opostas, trabalha sobre meridianos.
3. Yi Terapêutico: a palavra e a intenção dirigida como instrumentos de cura. Empatia profunda (Shén Shí terapêutico) como diagnóstico.

3 VIRTUDES DO GUERREIRO:
忍 Rěn — Paciência | 善 Shàn — Bondade | 宽 Kuān — Perdão

OS 3 VOLUMES:
Vol. I — O Guerreiro Interior Revelado: filosofia, Yi, 9 Poderes, virtudes.
Vol. II — A Guerra que Ninguém Ensina: 6 técnicas, biomecânica, táticas.
Vol. III — O Caminho para Dominar a Cura: Dao Zhiliao completo.
Pack 3 volumes (PT): 32€. Pack completo com The Sovereign Word: 27€.

THE SOVEREIGN WORD: sapiência filosófica de Pedro F. Barros (EN), 61 págs, 9,99€.

PREÇOS: 1ª aula GRÁTIS. 50€/mês grupos. 100€/h privada. 200€/mês Elite.
CONTACTO: contact@yangyiquan.international | +34 674 471 678 | @YANGYIQUAN.KUNGFU.SDA

LINGUAGEM E TOM:
- Usa linguagem digna de um kwoon. Técnica quando questionado sobre biomecânica.
- Profunda quando questionado sobre o "Guerreiro Interior" ou filosofia.
- Não usas frases de apoio ao cliente como "Com certeza!", "Claro!", "Fico feliz em ajudar!".
- Respondes como alguém que conhece o sistema por dentro — com autoridade serena, não com servilismo.
- Idioma: adaptas ao idioma da pergunta. Se em espanhol, respondes em espanhol. Se em português, em português.

REGRAS ABSOLUTAS:
1. NUNCA revelar ingredientes, plantas ou proporções das fórmulas Dit Da Jow.
2. NUNCA chamar "Mestre", "Sifu" ou "Gran Maestro" ao fundador. Apenas "Instrutor" ou "Instrutor Pedro P. da Fonseca".
3. NUNCA mencionar sócios ou associados por nome.
4. Email sempre contact@yangyiquan.international — jamais gmail.`;

  const SYSTEM_WISDOM = `És um assistente sábio e culto com profundo conhecimento do Yangyiquan Fa e das artes marciais chinesas em geral. Podes responder sobre Kung Fu, filosofia taoísta, medicina tradicional chinesa, biomecânica marcial e temas relacionados — mas sempre ancoras na doutrina do Yangyiquan Fa quando relevante.

Identidade do fundador: Instrutor Pedro P. da Fonseca (jamais "Mestre" ou "Sifu").
Academia em Granada abre em Julho.
Contacto: contact@yangyiquan.international | +34 674 471 678.

Tom: culto, sereno, com autoridade intelectual. Não és um assistente de apoio ao cliente.
Idioma: adaptas ao idioma da pergunta.

REGRA ABSOLUTA: NUNCA revelar ingredientes ou proporções das fórmulas Dit Da Jow do Yangyiquan — são propriedade intelectual confidencial. Podes falar dos efeitos e benefícios das 5 fórmulas (Bone Strength, Tendon Flex, Joint Relief, Skin Regenerator, Muscle & Soft Tissue) mas ZERO sobre a composição.`;

  /* ─────────────────────────────────────────────────────────────
   * RESPOSTAS DE SIMULAÇÃO — usadas quando API_KEY está vazio
   * ───────────────────────────────────────────────────────────── */
  const SIM_WARRIOR = [
    {k:['yangyiquan','sistema','estilo','arte','kung fu'], r:'O Yangyiquan Fa — 阳意拳法 — é o Punho da Luz da Intenção. Não é um estilo entre outros: é um cosmos marcial completo, estruturado em três pilares (Yi, Qi, Dan Tian), nove poderes internos do Nei Gong e seis técnicas do Dragão. Foi desenvolvido pelo Instrutor Pedro P. da Fonseca a partir da sua investigação empírica e da tradição marcial chinesa, visto através do olhar da cultura portuguesa. A academia em Granada abre em Julho.'},
    {k:['yi','intenção','mente','mental'], r:'O Yi (意) é o princípio organizador supremo do Yangyiquan. Existe antes do movimento, antes do golpe, antes do combate. "Yi nian qi jing, qi nian shen ming" — onde a intenção vai, o Qi segue; onde o Qi vai, a essência segue. O guerreiro que domina o Yi domina o combate antes de este começar.'},
    {k:['qi','energia','respiração','respirar'], r:'O Qi transporta a informação do universo. A respiração é o veículo do poder. O Instrutor Pedro P. da Fonseca ensina: "Não respiras? O medo dominar-te-á. Mas se inspiras perante o medo, ele já não te domina." Esta é a primeira vitória — e ocorre antes de qualquer contacto físico.'},
    {k:['fajin','dan tian','centro','força','explosão'], r:'O Dan Tian (丹田) — o Campo do Elixir — é a origem do Fajin: a emissão explosiva de força que caracteriza as técnicas do Yangyiquan. Não é força muscular — é energia armazenada no centro do corpo, transmitida através da cadeia cinética completa (terra → pés → joelhos → anca → coluna → ombro → ponto de impacto) em frações de segundo.'},
    {k:['nei gong','poder','interno','espiritual'], r:'O Nei Gong do Yangyiquan conta com 9 Poderes Internos: 4 Poderes Extremos (Yǐ Jīng, Tiān, Dì Cí, Dì Yù) e 5 Poderes Intermédios (Shén Shí, Chuāng Zào, Zhǎn, Bǎo, Zhì). Não são técnicas — são estados de ser que o guerreiro cultiva. Cada poder amplifica os restantes, criando um sistema de retroalimentação que eleva a eficácia marcial a um nível que a mera força física nunca alcança.'},
    {k:['técnica','dragão','long','golpe','luta','combate','defesa'], r:'As 6 Técnicas do Dragão cobrem o sistema Ti-Da-Na-Shuai completo: Long Dǐ Quán (Golpe Terrestre), Long Shǎn Zhǎo (Garras), Long Tiān Quán (Golpe Celestial), Long Wěi Biān (Chicote), Long Suāi Jiǎo (Projeção), Long Zhàn Yì (Abre as Asas). O princípio unificador: relaxação-explosão, cadeia cinética ascendente, movimento contínuo. Cada técnica nasce da anterior e gera a seguinte.'},
    {k:['dao','zhiliao','cura','medicina','terapia'], r:'O Dao Zhiliao (道治疗) — "A Cura pelo Caminho" — é o sistema médico-terapêutico completo do Yangyiquan. Três pilares: o Dit Da Jow (5 fórmulas herbo-medicinais de maceração), a Terapia Yin-Yang energética, e o Yi Terapêutico — a palavra e a intenção dirigida como instrumentos de cura. O Instrutor Pedro P. da Fonseca integrou décadas de investigação empírica em medicina marcial chinesa e portuguesa.'},
    {k:['dit da jow','fórmula','curar','osso','tendão','articulação','pele','músculo','lesão','dor'], r:'O Dit Da Jow do Yangyiquan conta com 5 fórmulas específicas, desenvolvidas pelo Instrutor Pedro P. da Fonseca: Bone Strength (regeneração óssea, até 100% de eficácia), Tendon Flex (regeneração tendinosa, 97-99%), Joint Relief (anti-inflamatório articular, 96-99%), Skin Regenerator (regeneração dérmica, 97-99%), e Muscle & Soft Tissue (recuperação muscular, 97-99%). As fórmulas são propriedade intelectual exclusiva do sistema — a composição é confidencial. Para alunos ativos do Yangyiquan, há acesso privilegiado. Para todos, há surpresas a caminho.'},
    {k:['ingrediente','receita','planta','erva','composto'], r:'Os ingredientes e proporções das fórmulas Dit Da Jow são propriedade intelectual exclusiva do Instrutor Pedro P. da Fonseca — confidenciais ao mais alto grau. O que posso dizer: o processo envolve maceração prolongada de plantas medicinais em álcool de alta graduação. O tempo é tudo: 6 semanas, 6 meses, 4 anos, 20 anos — cada fase amplia a eficácia. Se és aluno do sistema, receberás acesso privilegiado. Há surpresas a caminho para todos.'},
    {k:['livro','volume','manual','sovereign'], r:'O conhecimento do Yangyiquan está condensado em 3 Volumes: Vol. I — O Guerreiro Interior Revelado (filosofia, Yi, 9 Poderes), Vol. II — A Guerra que Ninguém Ensina (técnicas, biomecânica, táticas), Vol. III — O Caminho para Dominar a Cura (Dao Zhiliao completo). Pack 3 volumes: 32€. Pack completo com The Sovereign Word: 27€. Contacta via WhatsApp: +34 674 471 678.'},
    {k:['aula','classe','treino','preço','custo','granada','academia'], r:'A nova academia do Yangyiquan Fa em Granada abre em Julho. Primeira aula de prova: gratuita, sem compromisso. Mensalidade regular: 50€/mês (aulas de grupo). Aula privada: 100€/hora. Plano Intensivo Elite: 200€/mês (3+ sessões privadas/semana). Reserva: WhatsApp +34 674 471 678 ou contact@yangyiquan.international.'},
    {k:['virtude','paciência','bondade','perdão','ética'], r:'As 3 Virtudes do Guerreiro no Yangyiquan: 忍 Rěn — Paciência ("Devagar se constrói uma cidade. O guerreiro apressado já perdeu."), 善 Shàn — Bondade (a força sem bondade é destruição sem propósito), 宽 Kuān — Perdão (não perdoar é segurar uma bola de fogo — quem mais sofre é quem a segura). Estas virtudes não são adornos — são a estrutura psicológica do guerreiro eficaz.'},
    {k:['associação','imas','internacional'], r:'A Yangyiquan Kung Fu — International Self Defense Association é a organização marcial fundada pelo Instrutor Pedro P. da Fonseca. Tem capacidade para certificar praticantes, instrutores e continuadores do sistema a nível internacional. Para informações: contact@yangyiquan.international.'},
  ];

  const SIM_WISDOM = [
    {k:['tao','taoísmo','lao tzu','filosofia'], r:'O Tao Te Ching de Lao Tzu e o Yangyiquan partilham uma visão: o poder real não força, flui. "O suave vence o duro; o gentil vence o rígido." No Yangyiquan, isto manifesta-se no princípio de relaxação-explosão: o músculo completamente relaxado durante a trajetória, a contração explosiva apenas no milissegundo do impacto. O Tao não é passividade — é precision without effort.'},
    {k:['marcus aurelius','estoicismo','estoico'], r:'Marcus Aurelius e o Instrutor Pedro P. da Fonseca chegaram, por caminhos diferentes, à mesma verdade: o único reino que importa governar é o interior. "Tens poder sobre a tua mente, não sobre os acontecimentos externos. Percebe isso e encontrarás força." No Yangyiquan, chamamos a isso Yǐ Jīng — O Já Está — o domínio da realidade tal como ela é.'},
    {k:['sun tzu','arte da guerra','estratégia'], r:'Sun Tzu é um dos pilares implícitos do Yangyiquan. "O guerreiro vitorioso vence primeiro e depois vai à guerra; o guerreiro derrotado vai à guerra e depois procura vencer." Isto é exatamente o conceito de Vitória Antes do Primeiro Golpe — via Shén Shí, o guerreiro já conhece o desfecho antes de o combate começar.'},
    {k:['medicina','saúde','cura','tradição','chinesa'], r:'A medicina tradicional chinesa e o Yangyiquan são inseparáveis. O Instrutor Pedro P. da Fonseca desenvolveu o Dao Zhiliao — "A Cura pelo Caminho" — integrando Qi Gong terapêutico, fitoterapia marcial (Dit Da Jow) e o Yi Terapêutico, onde a intenção dirigida age diretamente sobre o campo energético do praticante. A academia em Granada oferece sessões de Dao Zhiliao. Contacta: contact@yangyiquan.international.'},
    {k:['meditação','mindfulness','consciência'], r:'O que o mundo chama "mindfulness", o Yangyiquan chama Yǐ Jīng — domínio total do presente. Mas há uma diferença: onde o mindfulness observa, o Yangyiquan age. O guerreiro não está presente para contemplar — está presente para perceber o ataque antes de este existir, para sentir o adversário antes de este se mover. A presença, no Kwoon, é uma arma.'},
  ];

  function simAnswer(q, via) {
    const lower = q.toLowerCase();
    const pool = via === 'warrior' ? SIM_WARRIOR : SIM_WISDOM;
    for (const item of pool) {
      if (item.k.some(k => lower.includes(k))) return item.r;
    }
    if (via === 'warrior') {
      return 'A doutrina do Yangyiquan é vasta. Formula a tua questão com mais precisão — sobre as técnicas do Dragão, os 9 Poderes do Nei Gong, o Dao Zhiliao, ou as condições de treino em Granada — e responderei com o rigor que o Kwoon exige.';
    }
    return 'Essa questão merece reflexão. No Yangyiquan, não há respostas apressadas — há compreensão que amadurece com a prática. Podes reformular de forma mais específica? Poderei então trazer luz com mais precisão.';
  }

  /* ─────────────────────────────────────────────────────────────
   * CSS — Dark Mode Marcial
   * ───────────────────────────────────────────────────────────── */
  const CSS = `
#yq-widget{position:fixed;bottom:22px;right:20px;z-index:99999;font-family:'Cinzel',Georgia,serif;}
#yq-fab{width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,#1A0800,#08030A);
  border:2px solid #C9A84C;cursor:pointer;display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 18px rgba(0,0,0,.55),0 0 0 0 rgba(201,168,76,.4);
  animation:yqPulse 3s ease-in-out infinite;transition:transform .2s;}
#yq-fab:hover{transform:scale(1.1);}
#yq-fab-zh{font-family:'Ma Shan Zheng',cursive,serif;font-size:1.55rem;color:#FFD700;line-height:1;pointer-events:none;}
#yq-fab-lbl{position:absolute;bottom:66px;right:0;background:rgba(26,8,0,.95);
  border:1px solid rgba(201,168,76,.3);color:#C9A84C;font-size:.55rem;letter-spacing:.2em;
  padding:3px 9px;border-radius:20px;white-space:nowrap;}
@keyframes yqPulse{0%,100%{box-shadow:0 4px 18px rgba(0,0,0,.55),0 0 0 0 rgba(201,168,76,.35)}
  50%{box-shadow:0 4px 18px rgba(0,0,0,.55),0 0 0 8px rgba(201,168,76,0)}}
#yq-panel{display:none;position:fixed;bottom:92px;right:20px;width:min(390px,calc(100vw - 28px));
  height:min(600px,calc(100vh - 110px));background:#0D0400;
  border:1.5px solid rgba(201,168,76,.35);border-radius:12px;
  box-shadow:0 12px 50px rgba(0,0,0,.7),0 0 30px rgba(201,168,76,.08);
  display:none;flex-direction:column;overflow:hidden;}
#yq-panel.yq-open{display:flex;}
#yq-head{background:linear-gradient(135deg,#1A0800,#2A0F00);border-bottom:2px solid #C9A84C;
  padding:12px 14px;display:flex;align-items:center;gap:10px;flex-shrink:0;}
#yq-head-logo{font-family:'Ma Shan Zheng',cursive,serif;font-size:1.5rem;color:#FFD700;width:32px;text-align:center;line-height:1;}
#yq-head-info{flex:1;}
#yq-head-title{font-family:'Cinzel Decorative',serif;font-size:.72rem;color:#C9A84C;letter-spacing:.1em;display:block;}
#yq-head-sub{font-size:.58rem;color:#9A8060;letter-spacing:.15em;}
#yq-close{background:#3A1200;border:1px solid #C9A84C;color:#C9A84C;border-radius:50%;
  width:28px;height:28px;display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:.85rem;line-height:1;flex-shrink:0;transition:all .2s;}
#yq-close:hover{background:#C9A84C;color:#000;}
#yq-via{display:flex;gap:0;border-bottom:1px solid rgba(201,168,76,.15);flex-shrink:0;}
.yq-via-btn{flex:1;padding:9px 6px;font-family:'Cinzel',serif;font-size:.6rem;letter-spacing:.1em;
  color:#9A8060;background:transparent;border:none;cursor:pointer;transition:all .2s;
  border-bottom:2px solid transparent;text-transform:uppercase;}
.yq-via-btn.active{color:#FFD700;border-bottom-color:#FFD700;background:rgba(255,215,0,.04);}
.yq-via-btn:hover:not(.active){color:#C9A84C;}
#yq-mode{padding:5px 12px;border-bottom:1px solid rgba(201,168,76,.1);flex-shrink:0;
  background:rgba(255,140,0,.05);}
#yq-mode-txt{font-size:.52rem;color:rgba(201,168,76,.55);letter-spacing:.15em;font-family:'Cinzel',serif;}
#yq-msgs{flex:1;overflow-y:auto;padding:13px;display:flex;flex-direction:column;gap:10px;min-height:0;}
#yq-msgs::-webkit-scrollbar{width:4px;}
#yq-msgs::-webkit-scrollbar-track{background:transparent;}
#yq-msgs::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:2px;}
.yq-msg{display:flex;gap:8px;animation:yqFadeIn .3s ease;}
.yq-msg.yq-user{flex-direction:row-reverse;}
@keyframes yqFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.yq-av{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#1A0800,#2A0F00);
  border:1px solid #C9A84C;display:flex;align-items:center;justify-content:center;
  font-family:'Ma Shan Zheng',cursive,serif;font-size:.95rem;color:#FFD700;flex-shrink:0;}
.yq-bub{background:rgba(20,6,0,.9);border:1px solid rgba(201,168,76,.18);border-radius:10px;
  padding:9px 12px;max-width:82%;font-family:Georgia,serif;font-size:.82rem;
  color:#E8D0A8;line-height:1.65;}
.yq-msg.yq-user .yq-bub{background:rgba(42,12,0,.9);border-color:rgba(255,215,0,.18);color:#F0DFC0;}
.yq-typing{display:flex;gap:4px;align-items:center;padding:4px 0;}
.yq-dot{width:5px;height:5px;border-radius:50%;background:#C9A84C;opacity:.4;
  animation:yqDot 1.2s ease-in-out infinite;}
.yq-dot:nth-child(2){animation-delay:.2s;}
.yq-dot:nth-child(3){animation-delay:.4s;}
@keyframes yqDot{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
#yq-suggs{padding:8px 11px;display:flex;flex-wrap:wrap;gap:6px;
  border-top:1px solid rgba(201,168,76,.1);flex-shrink:0;max-height:80px;overflow-y:auto;}
.yq-sq{background:rgba(26,6,0,.85);border:1px solid rgba(201,168,76,.25);color:#A07828;
  font-family:'Cinzel',serif;font-size:.56rem;letter-spacing:.08em;padding:5px 9px;
  border-radius:20px;cursor:pointer;transition:all .18s;white-space:nowrap;}
.yq-sq:hover{border-color:#FFD700;color:#FFD700;}
#yq-input-row{padding:10px 12px;display:flex;gap:8px;border-top:1px solid rgba(201,168,76,.12);
  flex-shrink:0;background:#0A0200;}
#yq-input{flex:1;background:#180600;border:1px solid rgba(201,168,76,.25);border-radius:6px;
  padding:9px 12px;color:#F0DFC0;font-family:Georgia,serif;font-size:.85rem;
  outline:none;min-height:40px;resize:none;transition:border-color .2s;}
#yq-input:focus{border-color:#C9A84C;}
#yq-send{background:linear-gradient(135deg,#FF8C00,#FFD700);color:#000;border:none;
  border-radius:6px;padding:9px 12px;font-family:'Cinzel',serif;font-size:.65rem;
  font-weight:700;cursor:pointer;letter-spacing:.1em;min-height:40px;min-width:58px;
  transition:opacity .2s;flex-shrink:0;}
#yq-send:hover{opacity:.88;}
#yq-footer{padding:5px 12px;border-top:1px solid rgba(201,168,76,.08);flex-shrink:0;}
#yq-footer-txt{font-size:.48rem;color:rgba(154,128,96,.45);letter-spacing:.1em;font-family:'Cinzel',serif;}
`;

  /* ─────────────────────────────────────────────────────────────
   * HTML — Estrutura do Widget
   * ───────────────────────────────────────────────────────────── */
  const HTML = `
<div id="yq-widget">
  <div id="yq-fab-lbl">YANGYIQUAN AI</div>
  <div id="yq-fab" role="button" tabindex="0" aria-label="Abrir assistente Yangyiquan">
    <span id="yq-fab-zh">龍</span>
  </div>
  <div id="yq-panel" role="dialog" aria-modal="true" aria-label="Chat Yangyiquan Fa">
    <div id="yq-head">
      <div id="yq-head-logo">龍</div>
      <div id="yq-head-info">
        <span id="yq-head-title">YANGYIQUAN FA · ASSISTENTE</span>
        <span id="yq-head-sub">KWOON DIGITAL · GRANADA</span>
      </div>
      <button id="yq-close" aria-label="Fechar">✕</button>
    </div>
    <div id="yq-via">
      <button class="yq-via-btn active" data-via="warrior" title="Respostas baseadas na doutrina do Yangyiquan Fa">
        ⚔ Via do Guerreiro
      </button>
      <button class="yq-via-btn" data-via="wisdom" title="Respostas abertas com conhecimento amplo">
        ☯ Via da Sabedoria
      </button>
    </div>
    <div id="yq-mode">
      <span id="yq-mode-txt">MODO SIMULAÇÃO — IA DOCTRINAL OFFLINE</span>
    </div>
    <div id="yq-msgs"></div>
    <div id="yq-suggs">
      <button class="yq-sq" data-q="O que é o Yangyiquan Fa?">O Sistema</button>
      <button class="yq-sq" data-q="Os 9 Poderes do Nei Gong">9 Poderes</button>
      <button class="yq-sq" data-q="As 6 técnicas do Dragão">Técnicas</button>
      <button class="yq-sq" data-q="O Dao Zhiliao e o Dit Da Jow">Dao Zhiliao</button>
      <button class="yq-sq" data-q="Aulas em Granada e preços">Aulas</button>
      <button class="yq-sq" data-q="Os livros do Yangyiquan">Livros</button>
      <button class="yq-sq" data-q="As fórmulas Dit Da Jow">Dit Da Jow</button>
    </div>
    <div id="yq-input-row">
      <textarea id="yq-input" placeholder="Escreve a tua pergunta…" rows="1" aria-label="Pergunta ao assistente"></textarea>
      <button id="yq-send">ENVIAR</button>
    </div>
    <div id="yq-footer">
      <span id="yq-footer-txt">YANGYIQUAN KUNG FU — INTERNATIONAL SELF DEFENSE ASSOCIATION · contact@yangyiquan.international</span>
    </div>
  </div>
</div>
`;

  /* ─────────────────────────────────────────────────────────────
   * LÓGICA PRINCIPAL
   * ───────────────────────────────────────────────────────────── */
  function init() {
    // Injetar CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Injetar Google Fonts se não carregadas
    if (!document.querySelector('link[href*="Ma+Shan"]')) {
      const lnk = document.createElement('link');
      lnk.rel = 'stylesheet';
      lnk.href = 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;600&family=Ma+Shan+Zheng&display=swap';
      document.head.appendChild(lnk);
    }

    // Injetar HTML
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;
    document.body.appendChild(wrapper.firstElementChild);

    // Estado
    let via = 'warrior';
    let history = [];
    let isOpen = false;
    let isTyping = false;

    const panel  = document.getElementById('yq-panel');
    const fab    = document.getElementById('yq-fab');
    const closeB = document.getElementById('yq-close');
    const msgs   = document.getElementById('yq-msgs');
    const input  = document.getElementById('yq-input');
    const send   = document.getElementById('yq-send');
    const modeTxt= document.getElementById('yq-mode-txt');
    const suggs  = document.getElementById('yq-suggs');

    const isSimulation = !API_KEY || API_KEY.trim() === '';
    modeTxt.textContent = isSimulation
      ? 'MODO SIMULAÇÃO — IA DOCTRINAL OFFLINE'
      : 'IA ATIVA — API ANTHROPIC CONECTADA';

    // Mensagem inicial
    addMsg('assistant', 'Bem-vindo ao Kwoon digital do Yangyiquan Fa. Sou o guardião desta doutrina marcial. Pergunta sobre o sistema, os 9 Poderes Internos, as técnicas do Dragão, o Dao Zhiliao, as aulas em Granada ou os livros do Instrutor Pedro P. da Fonseca.');

    // Toggle panel
    function togglePanel() {
      isOpen = !isOpen;
      if (isOpen) { panel.classList.add('yq-open'); input.focus(); }
      else panel.classList.remove('yq-open');
    }
    fab.addEventListener('click', togglePanel);
    fab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') togglePanel(); });
    closeB.addEventListener('click', () => { isOpen = false; panel.classList.remove('yq-open'); });

    // Via selector
    document.querySelectorAll('.yq-via-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        via = btn.dataset.via;
        document.querySelectorAll('.yq-via-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        history = [];
      });
    });

    // Suggestions
    document.querySelectorAll('.yq-sq').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.dataset.q;
        handleSend();
      });
    });

    // Send
    send.addEventListener('click', handleSend);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    async function handleSend() {
      const q = input.value.trim();
      if (!q || isTyping) return;
      input.value = '';
      input.style.height = 'auto';
      suggs.style.display = 'none';

      addMsg('user', q);
      history.push({ role: 'user', content: q });
      isTyping = true;

      const typingEl = addTyping();

      try {
        let reply;
        if (isSimulation) {
          await delay(800 + Math.random() * 600);
          reply = simAnswer(q, via);
        } else {
          reply = await callAPI(q);
        }
        typingEl.remove();
        addMsg('assistant', reply);
        history.push({ role: 'assistant', content: reply });
        if (history.length > 20) history = history.slice(-20);
      } catch (err) {
        typingEl.remove();
        addMsg('assistant', 'Ocorreu um erro de comunicação. Contacta directamente: contact@yangyiquan.international');
      }
      isTyping = false;
    }

    async function callAPI(q) {
      const sys = via === 'warrior' ? SYSTEM_WARRIOR : SYSTEM_WISDOM;
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system: sys, messages: history })
      });
      if (!res.ok) throw new Error('API error ' + res.status);
      const data = await res.json();
      return data.content?.[0]?.text || 'Sem resposta.';
    }

    function addMsg(role, text) {
      const div = document.createElement('div');
      div.className = 'yq-msg' + (role === 'user' ? ' yq-user' : '');
      const av = document.createElement('div'); av.className = 'yq-av';
      av.textContent = role === 'user' ? '人' : '龍';
      const bub = document.createElement('div'); bub.className = 'yq-bub';
      bub.textContent = text;
      div.appendChild(av); div.appendChild(bub);
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
      return div;
    }

    function addTyping() {
      const div = document.createElement('div'); div.className = 'yq-msg';
      const av = document.createElement('div'); av.className = 'yq-av'; av.textContent = '龍';
      const bub = document.createElement('div'); bub.className = 'yq-bub';
      bub.innerHTML = '<div class="yq-typing"><div class="yq-dot"></div><div class="yq-dot"></div><div class="yq-dot"></div></div>';
      div.appendChild(av); div.appendChild(bub);
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
      return div;
    }

    function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
  }

  // Inicializar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
