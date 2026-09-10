/* GERADO por build/build.js a partir de src/app.jsx — NÃO edite à mão. */
const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;

// ── STORAGE ──────────────────────────────────────────────────────────────────
const DB_KEY = "neocalc_db_v3",
  USERS_KEY = "neocalc_users_v3",
  SESSION_KEY = "neocalc_sess_v3";
const DEFAULT_DB = {
  scores: [{
    id: 1,
    color: "#4F6EF7",
    bg: "#EEF1FF",
    icon: "🧠",
    title: "Escore de Rodwell",
    sub: "Com interpretação",
    content: "Avalia sepse neonatal. Pontuação ≥3 indica sepse provável.\n\nCritérios:\n• Relação I/T ≥0,2 (1pt)\n• PMN imaturos ≥1500 (1pt)\n• Leucócitos <5000 (1pt)\n• Plaquetas <150.000 (1pt)\n• PCR elevada (1pt)\n\nEscore ≥3: sepse provável",
    active: true
  }, {
    id: 2,
    color: "#22C55E",
    bg: "#EDFDF5",
    icon: "📊",
    title: "SNAPPE II",
    sub: "Gravidade e risco de mortalidade neonatal",
    content: "Score of Neonatal Acute Physiology Perinatal Extension II.\n\nVariáveis avaliadas nas primeiras 12h de admissão na UTI Neonatal:\n• PAM\n• Temperatura mínima\n• PO₂/FiO₂\n• pH sérico mínimo\n• Convulsões múltiplas\n• Débito urinário\n• Apgar 5'\n• Peso ao nascer\n• PIG (Pequeno p/ IG)\n\nEscore SNAP II >40: mortalidade >50%",
    active: true
  }, {
    id: 3,
    color: "#EF4444",
    bg: "#FEF2F2",
    icon: "😢",
    title: "Escala de Dor",
    sub: "NIPS • PIPP • N-PASS",
    content: "Avaliação multidimensional da dor neonatal.\n\nNIPS (Neonatal Infant Pain Scale):\n• Expressão facial (0-1)\n• Choro (0-2)\n• Respiração (0-1)\n• Braços (0-1)\n• Pernas (0-1)\n• Estado de alerta (0-2)\nTotal >3: dor presente\n\nN-PASS: avalia dor e sedação em RN.",
    active: true
  }, {
    id: 4,
    color: "#F59E0B",
    bg: "#FFFBEB",
    icon: "👶",
    title: "Hiperbilirrubinemia",
    sub: "Avaliação baseada em horas de vida",
    content: "Protocolo baseado no nomograma de Bhutani.\n\nZonas de risco:\n• Alta: >95° percentil\n• Intermediária-alta: 75-95°\n• Intermediária-baixa: 40-75°\n• Baixa: <40° percentil\n\nIndicação de fototerapia conforme IG e fatores de risco.",
    active: true
  }, {
    id: 5,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    icon: "🫁",
    title: "Silverman-Anderson",
    sub: "Avalia desconforto respiratório",
    content: "Escore de desconforto respiratório neonatal.\n\nCritérios (0-2 cada):\n• Movimento tórax-abdome\n• Retração intercostal\n• Retração xifóidea\n• Batimento de asa de nariz\n• Gemido expiratório\n\nInterpretação:\n0: sem desconforto\n1-3: desconforto leve\n4-6: moderado\n7-10: grave",
    active: true
  }, {
    id: 6,
    color: "#EC4899",
    bg: "#FDF2F8",
    icon: "🩸",
    title: "Escore Transfusional",
    sub: "Avalia necessidade de transfusão de hemácias",
    content: "Indicação de transfusão de hemácias em neonatos.\n\nHb <13g/dL com suporte O2\nHb <10g/dL em ventilação\nHb <8g/dL sintomático\nHb <7g/dL estável\n\nVolume: 10-15ml/kg de CG em 3-4h",
    active: true
  }, {
    id: 7,
    color: "#F59E0B",
    bg: "#FFFBEB",
    icon: "⭐",
    title: "Apgar",
    sub: "Avaliação do recém-nascido ao nascer",
    content: "Avaliação do recém-nascido em 5 critérios:\n• Cor\n• Frequência cardíaca\n• Reflexos\n• Tônus muscular\n• Respiração\n\nEscore 7-10: normal\n4-6: depressão leve-moderada\n0-3: depressão grave",
    active: true
  }],
  calculos: [{
    id: 1,
    color: "#4F6EF7",
    bg: "#EEF1FF",
    icon: "💧",
    title: "Hidratação Venosa",
    sub: "Necessidades hídricas",
    content: "Cálculo da oferta hídrica neonatal.\n\nDia 1: 60-80ml/kg/dia\nDia 2: 80-100ml/kg/dia\nDia 3: 100-120ml/kg/dia\nDia 4+: 120-150ml/kg/dia\n\nGlicose: manter VIG 4-6mg/kg/min\nNa: 2-3mEq/kg/dia (após 48h)\nK: 1-2mEq/kg/dia (após diurese)",
    active: true
  }, {
    id: 2,
    color: "#22C55E",
    bg: "#EDFDF5",
    icon: "⚖️",
    title: "Balanço Hídrico",
    sub: "Entrada e saída de líquidos",
    content: "Controle do balanço hídrico em 24h.\n\nEntradas: EV + enteral + medicações\nSaídas: diurese + perdas insensíveis + fezes\n\nPerdas insensíveis:\n• RN a termo: 15-20ml/kg/dia\n• RNPT: 30-60ml/kg/dia\n• Sob fototerapia: +30%\n\nMeta: balanço ligeiramente positivo nas primeiras 48h",
    active: true
  }, {
    id: 3,
    color: "#EF4444",
    bg: "#FEF2F2",
    icon: "🦶",
    title: "Índice Gestacional Corrigido",
    sub: "Idade corrigida do recém-nascido",
    content: "Cálculo da idade gestacional corrigida (IGC).\n\nFórmula: IGC = IG ao nascer + semanas pós-natal\n\nUsar IGC para:\n• Avaliação do desenvolvimento\n• Curvas de crescimento\n• Vacinas\n• Critérios de alta\n\nExemplo: RN de 30 sem, com 8 sem de vida\nIGC = 30 + 8 = 38 semanas",
    active: true
  }, {
    id: 4,
    color: "#06B6D4",
    bg: "#ECFEFF",
    icon: "🩺",
    title: "Gasometria",
    sub: "pH, BE, HCO₃⁻, PaO₂/FiO₂",
    content: "Interpretação da gasometria arterial.\n\nValores normais (arterial):\npH: 7,35-7,45\nPCO2: 35-45 mmHg\nPO2: 60-90 mmHg\nHCO3: 22-26 mEq/L\nBE: -2 a +2\n\nAcidose respiratória: pH↓, PCO2↑\nAcidose metabólica: pH↓, HCO3↓\nAlcalose respiratória: pH↑, PCO2↓",
    active: true
  }, {
    id: 5,
    color: "#F97316",
    bg: "#FFF7ED",
    icon: "🫘",
    title: "TFG",
    sub: "Taxa de Filtração Glomerular",
    content: "Avaliação da função renal neonatal.\n\nFórmula de Schwartz:\nTFG = k × comprimento (cm) / creatinina sérica\n\nk = 0,45 (RN a termo)\nk = 0,33 (RNPT)\n\nNormal em RN a termo: 20-40ml/min/1,73m²\nNormal em RNPT: 10-15ml/min/1,73m²\n\nOligúria: diurese <1ml/kg/h",
    active: true
  }, {
    id: 6,
    color: "#0EA5E9",
    bg: "#F0F9FF",
    icon: "🫁",
    title: "Oxygenation Index (OI)",
    sub: "(MAP × FiO₂ × 100) / PaO₂",
    content: "Índice de oxigenação para avaliação de gravidade.\n\nFórmula: OI = (MAP × FiO₂ × 100) / PaO₂\n\nInterpretação:\nOI <15: disfunção leve\nOI 15-25: moderada\nOI >25: grave → considerar VAFO\nOI >40: indicação de ECMO\n\nFiO₂ em fração (ex: 60% = 0,6)",
    active: true
  }, {
    id: 7,
    color: "#EF4444",
    bg: "#FEF2F2",
    icon: "💊",
    title: "Drogas de Infusão Contínua — BIC",
    sub: "Vasoativos · Sedoanalgesia · Diuréticos",
    content: "Cálculo de BIC para drogas vasoativas e sedoanalgesia em neonatologia.",
    active: true
  }, {
    id: 8,
    color: "#4F6EF7",
    bg: "#EEF1FF",
    icon: "💊",
    title: "Antibióticos Neonatais",
    sub: "Ampicilina · Gentamicina · Vancomicina · Oxacilina",
    content: "Doses ajustadas por IG, dias de vida e peso. Inclui via, preparo e observações.",
    active: true
  }, {
    id: 9,
    color: "#22C55E",
    bg: "#EDFDF5",
    icon: "⚖️",
    title: "Balanço Hídrico",
    sub: "Entradas · Saídas · Perdas insensíveis",
    content: "Controle hídrico completo com cálculo de perdas insensíveis ajustadas por fototerapia e berço radiante.",
    active: true
  }, {
    id: 10,
    color: "#06B6D4",
    bg: "#ECFEFF",
    icon: "🧂",
    title: "Correção de Na⁺ — Sódio",
    sub: "Hiponatremia · Hipernatremia",
    content: "Cálculo do déficit de sódio e déficit de água livre com dose e velocidade de correção.",
    active: true
  }],
  medicacoes: [{
    id: 1,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    icon: "🧴",
    title: "FM 85 em Neonatologia",
    sub: "Dose para ganho de peso",
    content: "Fórmula de multicomponentes para RNPT.\n\nIndicação: RNPT <34 semanas ou <1800g\n\nDose:\n• Início: 2g/kg/dia\n• Aumento: 0,5g/kg/dia a cada 2-3 dias\n• Meta: 3,5-4g/kg/dia\n\nDiluição: 1g/25ml de leite materno\nMonitorar: ureia, triglicérides, ganho ponderal",
    active: true
  }, {
    id: 2,
    color: "#22C55E",
    bg: "#EDFDF5",
    icon: "☕",
    title: "Cafeína em Neonatologia",
    sub: "Dose de ataque e manutenção",
    content: "Tratamento de apneia da prematuridade.\n\nIndicação: apneia em RNPT <34 semanas\n\nDose:\n• Ataque: 20mg/kg IV ou VO (1x)\n• Manutenção: 5-10mg/kg/dia (24/24h)\n• Início 24h após ataque\n\nSuspender: IG corrigida ≥34-36 semanas\n\nEfeitos adversos: taquicardia, irritabilidade",
    active: true
  }, {
    id: 3,
    color: "#EF4444",
    bg: "#FEF2F2",
    icon: "🫁",
    title: "Surfactante",
    sub: "Dose conforme peso e via",
    content: "Terapia de reposição de surfactante.\n\nIndicações:\n• SDR em RNPT <30 sem (profilático)\n• SDR com FiO2 >0,30 (resgate)\n\nPoractant alfa (Curosurf®):\n• Dose: 100-200mg/kg IT\n• Máx: 2 doses\n\nBeractant (Survanta®):\n• Dose: 100mg/kg IT\n• Máx: 4 doses em 48h\n\nMétodo INSURE: Intubar-Surfactante-Extubação",
    active: true
  }],
  doencas: [{
    id: 1,
    color: "#EF4444",
    bg: "#FEF2F2",
    icon: "🎗️",
    title: "HIV",
    sub: "Conduta em RN exposto",
    content: "Profilaxia e manejo do RN exposto ao HIV.\n\nAZT profilático:\n• RN ≥35 sem: 4mg/kg/dose VO 12/12h × 28 dias\n• RN 30-35 sem: 2mg/kg/dose 12/12h × 28 dias\n• RN <30 sem: 2mg/kg/dose 12/12h × 28 dias\n\nNão amamentar\nPCR DNA HIV: 1ª semana, 1-2 meses, 4-6 meses\nSorologia: 18 meses",
    active: true
  }, {
    id: 2,
    color: "#F59E0B",
    bg: "#FFFBEB",
    icon: "🧬",
    title: "Sífilis",
    sub: "Conduta em RN exposto",
    content: "Protocolo de sífilis congênita.\n\nInvestigar RN quando:\n• Mãe com sífilis sem tratamento\n• Tratamento inadequado da mãe\n• Mãe não tratada\n\nExames: VDRL, hemograma, Rx ossos, LCR\n\nTratamento:\n• Sífilis congênita confirmada: Pen.G cristalina 50.000UI/kg/dose 12/12h × 10 dias\n• Exposição sem confirmação: Pen.G benzatina 50.000UI/kg dose única",
    active: true
  }, {
    id: 3,
    color: "#22C55E",
    bg: "#EDFDF5",
    icon: "🦠",
    title: "Toxoplasmose",
    sub: "Conduta em RN exposto",
    content: "Toxoplasmose congênita.\n\nInvestigar se mãe soroconverteu na gestação.\n\nExames: IgM/IgG, fundo de olho, TC crânio, LCR\n\nTratamento (12 meses):\n• Pirimetamina 1mg/kg/dia\n• Sulfadiazina 100mg/kg/dia (12/12h)\n• Ácido folínico 10mg 3x/semana\n\nMonitorar: hemograma quinzenal",
    active: true
  }, {
    id: 4,
    color: "#EC4899",
    bg: "#FDF2F8",
    icon: "❤️",
    title: "Persistência de Duto Arterial",
    sub: "Avaliação e conduta",
    content: "PDA hemodinamicamente significativo.\n\nDiagnóstico: ecocardiograma\n\nTratamento clínico:\n• Restrição hídrica\n• Ibuprofeno: 10-5-5mg/kg/dia VO/EV\n• Indometacina: 0,1-0,2mg/kg EV\n\nContraindicações: CrS >1,8, plaquetas <60mil, enterocolite\n\nCirurgia (ligadura): falha do tratamento clínico\n\nFechamento espontâneo: frequente em RNPT >28sem",
    active: true
  }],
  vacinas: [{
    id: 1,
    color: "#4F6EF7",
    bg: "#EEF1FF",
    icon: "💉",
    title: "BCG",
    sub: "Dose única intradérmica RN ≥ 2.000g",
    content: "Vacina BCG intradérmica.\n\nIndicação: RN com peso ≥2.000g\n\nDose: 0,1ml intradérmico\nLocal: região deltoide direita\n\nContraindicações:\n• Peso <2.000g\n• Imunodeficiência grave\n• RN exposto ao HIV (aguardar PCR)\n\nReação esperada: pápula → pústula → cicatriz (3-12 semanas)",
    active: true
  }],
  tabelas: [],
  tabs: [{
    id: "home",
    icon: "🏠",
    label: "Home"
  }, {
    id: "scores",
    icon: "📋",
    label: "Scores"
  }, {
    id: "calculos",
    icon: "🧮",
    label: "Cálculos"
  }, {
    id: "grafico",
    icon: "📈",
    label: "Gráfico Crescimento"
  }, {
    id: "medicacoes",
    icon: "💊",
    label: "Medicações"
  }, {
    id: "doencas",
    icon: "🧬",
    label: "Doenças Neonatais"
  }, {
    id: "vacinas",
    icon: "💉",
    label: "Vacinas"
  }, {
    id: "favoritos",
    icon: "⭐",
    label: "Favoritos"
  }, {
    id: "historico",
    icon: "🕐",
    label: "Histórico"
  }],
  lastUpdated: Date.now()
};

// Abas antigas sem página real — escondidas da sidebar mesmo se estiverem
// no db salvo em localStorage de instalações anteriores.
const PLACEHOLDER_TABS = ["protocolo", "conversoes", "referencias"];
const DEFAULT_USERS = [
// `password` guarda o hash SHA-256 da senha — o texto puro não fica no código.
// Para trocar a senha do gestor: gere o hash com
//   printf '%s' 'NOVA_SENHA' | shasum -a 256
// e cole o resultado abaixo (ou edite o usuário pelo painel, que já hasheia).
{
  id: "admin",
  name: "Dr. Rodrigo Cahuana",
  role: "gestor",
  login: "dr.rodrigo",
  password: "951bcbec75fb417759bdc855116447ad319432b7e4593a4171cc0694c0087a99",
  specialty: "Neonatologia",
  avatar: "👨‍⚕️",
  active: true
}];

// ── HASH DE SENHA (SHA-256 via Web Crypto — exige https ou localhost) ─────────
const sha256 = async txt => {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
};
const isHash = s => typeof s === "string" && /^[a-f0-9]{64}$/.test(s);
// Aceita hash novo; para usuários antigos com senha em texto puro, compara direto
// (migração suave — na próxima vez que o gestor editar o usuário a senha é hasheada).
const checkPassword = async (stored, input) => {
  try {
    return isHash(stored) ? stored === (await sha256(input)) : stored === input;
  } catch {
    return false;
  }
};
const loadDB = () => {
  try {
    const d = localStorage.getItem(DB_KEY);
    return d ? JSON.parse(d) : DEFAULT_DB;
  } catch {
    return DEFAULT_DB;
  }
};
const saveDB = d => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify({
      ...d,
      lastUpdated: Date.now()
    }));
  } catch {}
};
const loadUsers = () => {
  try {
    const d = localStorage.getItem(USERS_KEY);
    return d ? JSON.parse(d) : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
};
const saveUsers = u => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(u));
  } catch {}
};
const loadSess = () => {
  try {
    const d = localStorage.getItem(SESSION_KEY);
    return d ? JSON.parse(d) : null;
  } catch {
    return null;
  }
};
const saveSess = s => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  } catch {}
};
const clearSess = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
};

// minúsculas + sem acento — busca tolerante ("veno" acha "venosa", "sodio" acha "sódio")
const norm = s => {
  try {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } catch {
    return (s || "").toLowerCase();
  }
};

// ── FAVORITOS (por navegador — localStorage, sem sync) ───────────────────────
const FAV_KEY = "neocalc_fav_v1";
const loadFavs = () => {
  try {
    const d = localStorage.getItem(FAV_KEY);
    return d ? JSON.parse(d) : [];
  } catch {
    return [];
  }
};
const saveFavs = a => {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(a));
  } catch {}
};
const favKey = (sec, id) => `${sec}:${id}`;
// Seções que aceitam favorito (as que renderizam cards de item via SectionGrid)
const FAV_SECTIONS = [{
  key: "scores",
  label: "Scores",
  icon: "📋",
  cols: 3
}, {
  key: "calculos",
  label: "Cálculos",
  icon: "🧮",
  cols: 3
}, {
  key: "medicacoes",
  label: "Medicações",
  icon: "💊",
  cols: 2
}, {
  key: "doencas",
  label: "Doenças Neonatais",
  icon: "🧬",
  cols: 3
}, {
  key: "vacinas",
  label: "Vacinas",
  icon: "💉",
  cols: 2
}];
const SEC_LABEL = {
  scores: "Score",
  calculos: "Cálculo",
  medicacoes: "Medicação",
  doencas: "Doença",
  vacinas: "Vacina"
};

// ── HISTÓRICO (últimos itens abertos — localStorage, sem sync) ───────────────
const HIST_KEY = "neocalc_hist_v1";
const HIST_MAX = 30;
const loadHist = () => {
  try {
    const d = localStorage.getItem(HIST_KEY);
    return d ? JSON.parse(d) : [];
  } catch {
    return [];
  }
};
const saveHist = a => {
  try {
    localStorage.setItem(HIST_KEY, JSON.stringify(a));
  } catch {}
};
const timeAgo = ts => {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "agora";
  if (s < 3600) return `há ${Math.floor(s / 60)} min`;
  if (s < 86400) return `há ${Math.floor(s / 3600)} h`;
  return `há ${Math.floor(s / 86400)} d`;
};

// ── GROWTH CHART DATA ────────────────────────────────────────────────────────
const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const PERC = {
  P97: [4200, 5400, 6300, 7000, 7700, 8200, 8700, 9000, 9400, 9700, 9900, 10100, 10300],
  P85: [3800, 4900, 5700, 6400, 7000, 7500, 8000, 8300, 8600, 8900, 9100, 9300, 9500],
  P50: [3300, 4200, 5000, 5700, 6300, 6800, 7200, 7500, 7800, 8100, 8300, 8500, 8700],
  P15: [2800, 3600, 4300, 5000, 5500, 6000, 6400, 6700, 7000, 7200, 7400, 7600, 7800],
  P3: [2400, 3100, 3700, 4300, 4800, 5200, 5600, 5900, 6100, 6300, 6500, 6700, 6800]
};
const PC = {
  P97: "#EF4444",
  P85: "#F97316",
  P50: "#22C55E",
  P15: "#3B82F6",
  P3: "#8B5CF6"
};
const ICONS = ["🧠", "📊", "😢", "👶", "🫁", "🩸", "💧", "⚖️", "🦶", "🩺", "🫘", "💉", "🧴", "☕", "🎗️", "🧬", "🦠", "❤️", "📋", "🧮", "⚡", "🔬", "🩻", "🏥", "📌", "⚠️", "✅", "❌", "🔴", "🟡", "🟢", "📝", "🗂️", "💊", "🌡️", "🩹", "🔬"];
const COLS = [{
  c: "#4F6EF7",
  bg: "#EEF1FF"
}, {
  c: "#22C55E",
  bg: "#EDFDF5"
}, {
  c: "#EF4444",
  bg: "#FEF2F2"
}, {
  c: "#F59E0B",
  bg: "#FFFBEB"
}, {
  c: "#8B5CF6",
  bg: "#F5F3FF"
}, {
  c: "#EC4899",
  bg: "#FDF2F8"
}, {
  c: "#06B6D4",
  bg: "#ECFEFF"
}, {
  c: "#F97316",
  bg: "#FFF7ED"
}, {
  c: "#0EA5E9",
  bg: "#F0F9FF"
}, {
  c: "#14B8A6",
  bg: "#F0FDFA"
}];

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function Toast({
  msg,
  type
}) {
  const isErr = type === "err";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 20,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      padding: "11px 22px",
      borderRadius: 50,
      background: isErr ? "linear-gradient(135deg,#EF4444,#DC2626)" : "linear-gradient(135deg,#22C55E,#16A34A)",
      color: "white",
      fontWeight: 700,
      fontSize: 13,
      boxShadow: `0 8px 32px ${isErr ? "rgba(239,68,68,0.4)" : "rgba(34,197,94,0.4)"}`,
      display: "flex",
      alignItems: "center",
      gap: 8,
      whiteSpace: "nowrap",
      animation: "toastIn 0.3s cubic-bezier(.4,0,.2,1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, isErr ? "✕" : "✓"), msg);
}
function Modal({
  title,
  onClose,
  children
}) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(10,15,40,0.6)",
      zIndex: 1000,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      padding: "0"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    style: {
      background: "white",
      borderRadius: "24px 24px 0 0",
      padding: "0",
      width: "100%",
      maxWidth: 580,
      maxHeight: "92vh",
      overflowY: "auto",
      boxShadow: "0 -8px 40px rgba(0,0,0,0.25)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "10px 0 2px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 2,
      background: "#E5E7EB"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px 14px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 800,
      color: "#111827"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "#F3F4F6",
      border: "none",
      borderRadius: 50,
      width: 32,
      height: 32,
      fontSize: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6B7280"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 28px"
    }
  }, children)));
}
function Inp({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  rows
}) {
  const s = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 12,
    border: "1.5px solid #E8EDFF",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
    background: "#F8FAFF",
    fontFamily: "inherit",
    transition: "border-color 0.15s,box-shadow 0.15s"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 5,
      letterSpacing: 0.3
    }
  }, label), rows ? /*#__PURE__*/React.createElement("textarea", {
    value: value,
    onChange: e => onChange(e.target.value),
    rows: rows,
    placeholder: placeholder,
    style: {
      ...s,
      resize: "vertical"
    }
  }) : /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    style: s
  }));
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({
  onLogin
}) {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const go = async () => {
    if (!login || !pass) {
      setErr("Preencha login e senha.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const u = loadUsers().find(x => x.login === login && x.active);
    const ok = u && (await checkPassword(u.password, pass));
    if (ok) {
      const s = {
        userId: u.id,
        name: u.name,
        role: u.role,
        avatar: u.avatar
      };
      saveSess(s);
      onLogin(s);
    } else setErr("Credenciais inválidas. Solicite acesso ao Dr. Rodrigo Cahuana.");
    setLoading(false);
  };
  const inpStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: "1.5px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(160deg,#060B1A 0%,#0F1E4A 40%,#1a2d6e 70%,#0f172a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      fontFamily: "'Nunito','Segoe UI',sans-serif",
      position: "relative",
      overflow: "hidden"
    }
  }, [{
    w: 400,
    h: 400,
    t: "-10%",
    l: "-10%",
    c: "rgba(79,110,247,0.12)"
  }, {
    w: 300,
    h: 300,
    t: "60%",
    l: "70%",
    c: "rgba(124,158,255,0.1)"
  }, {
    w: 200,
    h: 200,
    t: "30%",
    l: "40%",
    c: "rgba(236,72,153,0.06)"
  }].map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "fixed",
      borderRadius: "50%",
      background: o.c,
      width: o.w,
      height: o.h,
      top: o.t,
      left: o.l,
      pointerEvents: "none",
      filter: "blur(40px)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      maxWidth: 380,
      animation: "fadeInUp 0.5s cubic-bezier(.4,0,.2,1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      borderRadius: 28,
      background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 44,
      margin: "0 auto 14px",
      boxShadow: "0 16px 48px rgba(79,110,247,0.5)"
    }
  }, "\uD83D\uDC76"), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "white",
      fontSize: 30,
      fontWeight: 900,
      letterSpacing: -1,
      margin: 0
    }
  }, "NeoCalc"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 13,
      marginTop: 5,
      fontWeight: 500
    }
  }, "C\xE1lculos e Scores em Neonatologia")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderRadius: 28,
      padding: 26,
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 32px 80px rgba(0,0,0,0.6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(79,110,247,0.18)",
      border: "1px solid rgba(79,110,247,0.35)",
      borderRadius: 14,
      padding: "10px 14px",
      marginBottom: 20,
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      flexShrink: 0
    }
  }, "\uD83D\uDC68\u200D\u2695\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "white",
      fontSize: 12,
      fontWeight: 800
    }
  }, "Dr. Rodrigo Cahuana"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 10,
      marginTop: 1
    }
  }, "Acesso com credenciais autorizadas"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      color: "rgba(255,255,255,0.55)",
      fontSize: 11,
      fontWeight: 700,
      display: "block",
      marginBottom: 6,
      letterSpacing: 0.8
    }
  }, "LOGIN"), /*#__PURE__*/React.createElement("input", {
    value: login,
    onChange: e => {
      setLogin(e.target.value);
      setErr("");
    },
    placeholder: "Seu login",
    onKeyDown: e => e.key === "Enter" && go(),
    style: inpStyle
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      color: "rgba(255,255,255,0.55)",
      fontSize: 11,
      fontWeight: 700,
      display: "block",
      marginBottom: 6,
      letterSpacing: 0.8
    }
  }, "SENHA"), /*#__PURE__*/React.createElement("input", {
    type: showPass ? "text" : "password",
    value: pass,
    onChange: e => {
      setPass(e.target.value);
      setErr("");
    },
    placeholder: "Sua senha",
    onKeyDown: e => e.key === "Enter" && go(),
    style: {
      ...inpStyle,
      paddingRight: 46
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowPass(v => !v),
    style: {
      position: "absolute",
      right: 14,
      top: 32,
      background: "none",
      border: "none",
      color: "rgba(255,255,255,0.4)",
      fontSize: 17,
      cursor: "pointer",
      padding: 0,
      lineHeight: 1
    }
  }, showPass ? "🙈" : "👁")), err && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(239,68,68,0.18)",
      border: "1px solid rgba(239,68,68,0.35)",
      borderRadius: 12,
      padding: "10px 14px",
      color: "#FCA5A5",
      fontSize: 12,
      marginBottom: 14,
      display: "flex",
      gap: 7,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u26A0\uFE0F"), err), /*#__PURE__*/React.createElement("button", {
    onClick: go,
    disabled: loading,
    style: {
      width: "100%",
      padding: 15,
      borderRadius: 16,
      border: "none",
      background: loading ? "rgba(79,110,247,0.5)" : "linear-gradient(135deg,#4F6EF7,#7C3AED)",
      color: "white",
      fontWeight: 800,
      fontSize: 15,
      boxShadow: loading ? "none" : "0 8px 32px rgba(79,110,247,0.5)",
      cursor: loading ? "not-allowed" : "pointer",
      letterSpacing: 0.3
    }
  }, loading ? "Entrando..." : "Entrar no NeoCalc →"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.25)",
      fontSize: 11,
      textAlign: "center",
      marginTop: 16,
      lineHeight: 1.7
    }
  }, "Sem acesso? Solicite ao gestor", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(124,158,255,0.7)",
      fontWeight: 700
    }
  }, "Dr. Rodrigo Cahuana")))));
}
function ItemEditor({
  item,
  section,
  onSave,
  onClose
}) {
  const [f, setF] = useState(item || {
    icon: "📋",
    title: "",
    sub: "",
    content: "",
    color: COLS[0].c,
    bg: COLS[0].bg,
    active: true
  });
  const s = (k, v) => setF(x => ({
    ...x,
    [k]: v
  }));
  return /*#__PURE__*/React.createElement(Modal, {
    title: (item ? "Editar" : "Novo") + " Item — " + section,
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 10
    }
  }, ICONS.map(ic => /*#__PURE__*/React.createElement("button", {
    key: ic,
    onClick: () => s("icon", ic),
    style: {
      width: 33,
      height: 33,
      borderRadius: 8,
      border: f.icon === ic ? "2.5px solid #4F6EF7" : "1.5px solid #E5E7EB",
      background: f.icon === ic ? "#EEF1FF" : "white",
      fontSize: 15
    }
  }, ic))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 12
    }
  }, COLS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.c,
    onClick: () => setF(x => ({
      ...x,
      color: c.c,
      bg: c.bg
    })),
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: c.c,
      border: f.color === c.c ? "3px solid #111" : "2px solid transparent"
    }
  }))), /*#__PURE__*/React.createElement(Inp, {
    label: "T\xEDtulo",
    value: f.title,
    onChange: v => s("title", v),
    placeholder: "Nome do item"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Subt\xEDtulo",
    value: f.sub,
    onChange: v => s("sub", v),
    placeholder: "Breve descri\xE7\xE3o"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Conte\xFAdo / Protocolo",
    value: f.content,
    onChange: v => s("content", v),
    rows: 5,
    placeholder: "Detalhes, protocolos, observa\xE7\xF5es..."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: f.active,
    onChange: e => s("active", e.target.checked),
    id: "act",
    style: {
      width: 16,
      height: 16
    }
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "act",
    style: {
      fontSize: 13,
      color: "#374151",
      fontWeight: 600
    }
  }, "Ativo (vis\xEDvel para usu\xE1rios)")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: 10,
      marginBottom: 14,
      border: "1.5px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF",
      fontWeight: 700,
      marginBottom: 6
    }
  }, "PREVIEW"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: f.bg,
      borderRadius: 10,
      padding: "10px 12px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      border: `1.5px solid ${f.color}22`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 9,
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      flexShrink: 0
    }
  }, f.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: f.color
    }
  }, f.title || "Título"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#6B7280"
    }
  }, f.sub || "Subtítulo")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onSave(f),
    style: {
      flex: 2,
      padding: 10,
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#4F6EF7,#7C9EFF)",
      color: "white",
      fontWeight: 800,
      fontSize: 13
    }
  }, "Salvar")));
}

// ── USER MANAGER ──────────────────────────────────────────────────────────────
const BLANK_USER = {
  id: null,
  name: "",
  login: "",
  password: "",
  specialty: "Neonatologia",
  avatar: "👩‍⚕️",
  role: "usuario",
  active: true
};
function UserManager({
  onClose
}) {
  const [users, setUsers] = useState(loadUsers());
  const [mode, setMode] = useState(null); // null | "add" | "edit"
  const [f, setF] = useState(BLANK_USER);
  const sf = (k, v) => setF(x => ({
    ...x,
    [k]: v
  }));
  const close = () => {
    setMode(null);
    setF(BLANK_USER);
  };
  const persist = u => {
    setUsers(u);
    saveUsers(u);
  };
  const openAdd = () => {
    setF(BLANK_USER);
    setMode("add");
  };
  const openEdit = u => {
    setF({
      ...u,
      password: ""
    });
    setMode("edit");
  }; // senha vazia = manter

  const save = async () => {
    if (!f.name || !f.login) return;
    if (mode === "add") {
      if (!f.password) return;
      persist([...users, {
        ...f,
        password: await sha256(f.password),
        id: Date.now().toString()
      }]);
    } else {
      const patch = {
        name: f.name,
        login: f.login,
        specialty: f.specialty,
        avatar: f.avatar,
        role: f.id === "admin" ? "gestor" : f.role
      };
      if (f.password) patch.password = await sha256(f.password); // só troca se preenchida
      persist(users.map(x => x.id === f.id ? {
        ...x,
        ...patch
      } : x));
    }
    close();
  };
  const tog = id => persist(users.map(x => x.id === id ? {
    ...x,
    active: !x.active
  } : x));
  const del = id => persist(users.filter(x => x.id !== id));
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDC65 Gerenciar Usu\xE1rios",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, users.map(u => /*#__PURE__*/React.createElement("div", {
    key: u.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 12,
      border: "1.5px solid #E5E7EB",
      marginBottom: 8,
      background: u.active ? "#FAFAFA" : "#F3F4F6",
      opacity: u.active ? 1 : 0.65
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, u.avatar), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#111827"
    }
  }, u.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF"
    }
  }, "@", u.login, " \xB7 ", u.role === "gestor" ? "Gestor" : "Usuário")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      alignItems: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openEdit(u),
    style: {
      padding: "3px 8px",
      borderRadius: 7,
      border: "none",
      background: "#EEF1FF",
      color: "#4F6EF7",
      fontSize: 12,
      fontWeight: 700
    }
  }, "\u270F"), u.id !== "admin" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => tog(u.id),
    style: {
      padding: "3px 10px",
      borderRadius: 7,
      border: "none",
      background: u.active ? "#DCFCE7" : "#FEE2E2",
      color: u.active ? "#16A34A" : "#DC2626",
      fontSize: 11,
      fontWeight: 700
    }
  }, u.active ? "Ativo" : "Inativo"), /*#__PURE__*/React.createElement("button", {
    onClick: () => del(u.id),
    style: {
      padding: "3px 8px",
      borderRadius: 7,
      border: "none",
      background: "#FEE2E2",
      color: "#DC2626",
      fontSize: 12
    }
  }, "\uD83D\uDDD1")) : /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "4px 10px",
      borderRadius: 7,
      background: "linear-gradient(90deg,#4F6EF7,#7C9EFF)",
      color: "white",
      fontSize: 11,
      fontWeight: 700
    }
  }, "Gestor"))))), mode === null ? /*#__PURE__*/React.createElement("button", {
    onClick: openAdd,
    style: {
      width: "100%",
      padding: 11,
      borderRadius: 12,
      border: "2px dashed #4F6EF7",
      background: "#EEF1FF",
      color: "#4F6EF7",
      fontWeight: 800,
      fontSize: 13
    }
  }, "+ Adicionar Novo Usu\xE1rio") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 14,
      padding: 14,
      border: "1.5px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      color: "#111827",
      marginBottom: 10,
      fontSize: 13
    }
  }, mode === "add" ? "Novo Usuário" : `Editar — ${f.name || f.login}`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 10
    }
  }, ["👨‍⚕️", "👩‍⚕️", "🧑‍⚕️", "👶", "🏥"].map(av => /*#__PURE__*/React.createElement("button", {
    key: av,
    onClick: () => sf("avatar", av),
    style: {
      width: 36,
      height: 36,
      borderRadius: 9,
      border: f.avatar === av ? "2px solid #4F6EF7" : "1.5px solid #E5E7EB",
      background: f.avatar === av ? "#EEF1FF" : "white",
      fontSize: 20
    }
  }, av))), /*#__PURE__*/React.createElement(Inp, {
    label: "Nome completo",
    value: f.name,
    onChange: v => sf("name", v),
    placeholder: "Dr. Nome Sobrenome"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Login",
    value: f.login,
    onChange: v => sf("login", v),
    placeholder: "usuario.login"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: mode === "add" ? "Senha inicial" : "Nova senha (deixe em branco para manter)",
    value: f.password,
    onChange: v => sf("password", v),
    type: "password",
    placeholder: mode === "add" ? "Senha" : "•••••• (inalterada)"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Especialidade",
    value: f.specialty,
    onChange: v => sf("specialty", v),
    placeholder: "Neonatologia"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 4
    }
  }, "Fun\xE7\xE3o"), /*#__PURE__*/React.createElement("select", {
    value: f.id === "admin" ? "gestor" : f.role,
    disabled: f.id === "admin",
    onChange: e => sf("role", e.target.value),
    style: {
      width: "100%",
      padding: "9px 12px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      fontSize: 13,
      background: f.id === "admin" ? "#F3F4F6" : "#FAFAFA",
      fontFamily: "inherit"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "usuario"
  }, "Usu\xE1rio"), /*#__PURE__*/React.createElement("option", {
    value: "gestor"
  }, "Gestor"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: close,
    style: {
      flex: 1,
      padding: 9,
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: save,
    style: {
      flex: 2,
      padding: 9,
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#4F6EF7,#7C9EFF)",
      color: "white",
      fontWeight: 800,
      fontSize: 13
    }
  }, mode === "add" ? "Criar Usuário" : "Salvar alterações"))));
}

// ── TAB MANAGER ───────────────────────────────────────────────────────────────
function TabManager({
  tabs,
  onSave,
  onClose
}) {
  const [list, setList] = useState(tabs.filter(t => t.id !== "home"));
  const [showAdd, setShowAdd] = useState(false);
  const [f, setF] = useState({
    icon: "📌",
    label: ""
  });
  const tIcons = ["📋", "🧮", "📈", "💊", "🧬", "💉", "⭐", "🕐", "⚡", "🔄", "📚", "🔬", "🩻", "📌", "🏥", "⚠️", "✅", "📊", "🗂️", "📝", "🌡️", "💊", "🩹"];
  const add = () => {
    if (!f.label) return;
    setList(l => [...l, {
      id: f.label.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      icon: f.icon,
      label: f.label
    }]);
    setShowAdd(false);
    setF({
      icon: "📌",
      label: ""
    });
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDDC2\uFE0F Gerenciar Abas",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px",
      borderRadius: 10,
      background: "#EEF1FF",
      border: "1.5px solid #4F6EF7",
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFE0"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#4F6EF7"
    }
  }, "Home \u2014 Fixo (n\xE3o remov\xEDvel)")), list.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 12px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      marginBottom: 6,
      background: "#FAFAFA"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, t.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 600,
      color: "#374151"
    }
  }, t.label), /*#__PURE__*/React.createElement("button", {
    onClick: () => setList(l => l.filter(x => x.id !== t.id)),
    style: {
      padding: "3px 8px",
      borderRadius: 6,
      border: "none",
      background: "#FEE2E2",
      color: "#DC2626",
      fontSize: 12
    }
  }, "\u2715")))), !showAdd ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowAdd(true),
    style: {
      width: "100%",
      padding: 11,
      borderRadius: 12,
      border: "2px dashed #22C55E",
      background: "#EDFDF5",
      color: "#16A34A",
      fontWeight: 800,
      fontSize: 13,
      marginBottom: 12
    }
  }, "+ Nova Aba") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: 12,
      border: "1.5px solid #E5E7EB",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap",
      marginBottom: 10
    }
  }, tIcons.map(ic => /*#__PURE__*/React.createElement("button", {
    key: ic,
    onClick: () => setF(x => ({
      ...x,
      icon: ic
    })),
    style: {
      width: 32,
      height: 32,
      borderRadius: 7,
      border: f.icon === ic ? "2px solid #4F6EF7" : "1.5px solid #E5E7EB",
      background: f.icon === ic ? "#EEF1FF" : "white",
      fontSize: 15
    }
  }, ic))), /*#__PURE__*/React.createElement(Inp, {
    label: "Nome da aba",
    value: f.label,
    onChange: v => setF(x => ({
      ...x,
      label: v
    })),
    placeholder: "Ex: Tabelas de Refer\xEAncia"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowAdd(false),
    style: {
      flex: 1,
      padding: 8,
      borderRadius: 9,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 12
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      flex: 2,
      padding: 8,
      borderRadius: 9,
      border: "none",
      background: "linear-gradient(90deg,#22C55E,#4ADE80)",
      color: "white",
      fontWeight: 800,
      fontSize: 12
    }
  }, "Adicionar"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onSave([{
      id: "home",
      icon: "🏠",
      label: "Home"
    }, ...list]),
    style: {
      flex: 2,
      padding: 10,
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#4F6EF7,#7C9EFF)",
      color: "white",
      fontWeight: 800,
      fontSize: 13
    }
  }, "Salvar Abas")));
}

// ── TABLE EDITOR ──────────────────────────────────────────────────────────────
function TableEditor({
  table,
  onSave,
  onClose
}) {
  const [title, setTitle] = useState(table?.title || "");
  const [headers, setHeaders] = useState(table?.headers || ["Coluna 1", "Coluna 2", "Coluna 3"]);
  const [rows, setRows] = useState(table?.rows || [["", "", ""], ["", "", ""]]);
  const addCol = () => {
    setHeaders(h => [...h, "Nova Coluna"]);
    setRows(r => r.map(row => [...row, ""]));
  };
  const addRow = () => setRows(r => [...r, headers.map(() => "")]);
  const setH = (i, v) => setHeaders(h => h.map((c, j) => j === i ? v : c));
  const setC = (ri, ci, v) => setRows(rs => rs.map((row, r) => r === ri ? row.map((c, ci2) => ci2 === ci ? v : c) : row));
  const remRow = i => setRows(r => r.filter((_, j) => j !== i));
  const remCol = i => {
    setHeaders(h => h.filter((_, j) => j !== i));
    setRows(r => r.map(row => row.filter((_, j) => j !== i)));
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: table ? "Editar Tabela" : "Nova Tabela",
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Inp, {
    label: "T\xEDtulo da Tabela",
    value: title,
    onChange: setTitle,
    placeholder: "Ex: Tabela de Antibi\xF3ticos"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse",
      width: "100%",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, headers.map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      padding: 6,
      borderBottom: "2px solid #4F6EF7",
      minWidth: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: h,
    onChange: e => setH(i, e.target.value),
    style: {
      border: "none",
      background: "#EEF1FF",
      padding: "4px 6px",
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 700,
      color: "#4F6EF7",
      width: "100%",
      outline: "none",
      fontFamily: "inherit"
    }
  }), headers.length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => remCol(i),
    style: {
      background: "none",
      border: "none",
      color: "#EF4444",
      fontSize: 12,
      flexShrink: 0
    }
  }, "\u2715")))), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: addCol,
    style: {
      background: "#EEF1FF",
      border: "none",
      borderRadius: 6,
      padding: "4px 8px",
      color: "#4F6EF7",
      fontSize: 12,
      fontWeight: 700
    }
  }, "+ Col")))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri,
    style: {
      background: ri % 2 === 0 ? "#FAFAFA" : "white"
    }
  }, row.map((cell, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    style: {
      padding: "3px 5px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: cell,
    onChange: e => setC(ri, ci, e.target.value),
    style: {
      border: "none",
      background: "transparent",
      padding: "2px 4px",
      fontSize: 12,
      color: "#374151",
      width: "100%",
      outline: "none",
      fontFamily: "inherit"
    }
  }))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => remRow(ri),
    style: {
      background: "none",
      border: "none",
      color: "#EF4444",
      fontSize: 12
    }
  }, "\u2715"))))))), /*#__PURE__*/React.createElement("button", {
    onClick: addRow,
    style: {
      width: "100%",
      padding: 8,
      borderRadius: 9,
      border: "2px dashed #22C55E",
      background: "#EDFDF5",
      color: "#16A34A",
      fontWeight: 700,
      fontSize: 12,
      marginBottom: 14
    }
  }, "+ Linha"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onSave({
      ...table,
      title,
      headers,
      rows,
      id: table?.id || Date.now()
    }),
    style: {
      flex: 2,
      padding: 10,
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#4F6EF7,#7C9EFF)",
      color: "white",
      fontWeight: 800
    }
  }, "Salvar Tabela")));
}

// ── GROWTH CHART SVG ──────────────────────────────────────────────────────────
function GrowthChartSVG() {
  const W = 360,
    H = 170,
    PL = 38,
    PB = 26,
    PT = 8,
    PR = 8;
  const cW = W - PL - PR,
    cH = H - PB - PT;
  const xS = m => PL + m / 12 * cW,
    yS = w => PT + cH - w / 11000 * cH;
  const pathFor = arr => arr.map((v, i) => `${i === 0 ? "M" : "L"}${xS(MONTHS[i])},${yS(v)}`).join(" ");
  return /*#__PURE__*/React.createElement("svg", {
    width: W,
    height: H,
    style: {
      overflow: "visible",
      maxWidth: "100%"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "sh2"
  }, /*#__PURE__*/React.createElement("feDropShadow", {
    dx: "0",
    dy: "2",
    stdDeviation: "3",
    floodOpacity: "0.12"
  }))), [0, 2000, 4000, 6000, 8000, 10000].map(v => /*#__PURE__*/React.createElement("line", {
    key: v,
    x1: PL,
    x2: W - PR,
    y1: yS(v),
    y2: yS(v),
    stroke: "#E5E7EB",
    strokeWidth: "1"
  })), MONTHS.map(m => /*#__PURE__*/React.createElement("line", {
    key: m,
    x1: xS(m),
    x2: xS(m),
    y1: PT,
    y2: H - PB,
    stroke: "#E5E7EB",
    strokeWidth: "1"
  })), [0, 2000, 4000, 6000, 8000, 10000].map(v => /*#__PURE__*/React.createElement("text", {
    key: v,
    x: PL - 5,
    y: yS(v) + 4,
    textAnchor: "end",
    fontSize: "9",
    fill: "#9CA3AF"
  }, v === 0 ? "0" : v / 1000 + "k")), MONTHS.map(m => /*#__PURE__*/React.createElement("text", {
    key: m,
    x: xS(m),
    y: H - PB + 14,
    textAnchor: "middle",
    fontSize: "9",
    fill: "#9CA3AF"
  }, m)), Object.entries(PERC).map(([k, arr]) => /*#__PURE__*/React.createElement("path", {
    key: k,
    d: pathFor(arr),
    fill: "none",
    stroke: PC[k],
    strokeWidth: "2",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: xS(2),
    cy: yS(2450),
    r: "5",
    fill: "#4F6EF7",
    stroke: "white",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: xS(2) + 8,
    y: yS(2450) - 20,
    width: "106",
    height: "40",
    rx: "6",
    fill: "white",
    stroke: "#E5E7EB",
    filter: "url(#sh2)"
  }), /*#__PURE__*/React.createElement("text", {
    x: xS(2) + 14,
    y: yS(2450) - 7,
    fontSize: "9",
    fill: "#6B7280"
  }, "Idade: 5 dias"), /*#__PURE__*/React.createElement("text", {
    x: xS(2) + 14,
    y: yS(2450) + 4,
    fontSize: "9",
    fill: "#374151",
    fontWeight: "bold"
  }, "Peso: 2.450 g"), /*#__PURE__*/React.createElement("text", {
    x: xS(2) + 14,
    y: yS(2450) + 14,
    fontSize: "9",
    fill: "#22C55E"
  }, "Percentil: P50"));
}

// ── RODWELL CALCULATOR ────────────────────────────────────────────────────────
function RodwellCalc({
  item,
  onClose
}) {
  const [vals, setVals] = useState({
    leucocitos: "",
    it: "",
    pmnImaduros: "",
    plaquetas: "",
    pcr: "n"
  });
  const [resultado, setResultado] = useState(null);
  const sv = (k, v) => setVals(x => ({
    ...x,
    [k]: v
  }));
  const calcular = () => {
    const leuco = parseFloat(vals.leucocitos);
    const it = parseFloat(vals.it);
    const pmn = parseFloat(vals.pmnImaduros);
    const plaq = parseFloat(vals.plaquetas);
    const pcr = vals.pcr;
    if (isNaN(leuco) || isNaN(it) || isNaN(pmn) || isNaN(plaq)) {
      setResultado({
        erro: "Preencha todos os campos numéricos."
      });
      return;
    }
    let pontos = 0,
      criterios = [];
    if (leuco < 5000) {
      pontos++;
      criterios.push({
        ok: true,
        texto: "Leucócitos <5.000/mm³",
        valor: `${leuco.toLocaleString("pt-BR")}/mm³`,
        pts: "+1pt"
      });
    } else criterios.push({
      ok: false,
      texto: "Leucócitos <5.000/mm³",
      valor: `${leuco.toLocaleString("pt-BR")}/mm³`,
      pts: "0pt"
    });
    if (leuco > 30000) {
      pontos++;
      criterios.push({
        ok: true,
        texto: "Leucócitos >30.000/mm³",
        valor: `${leuco.toLocaleString("pt-BR")}/mm³`,
        pts: "+1pt"
      });
    } else criterios.push({
      ok: false,
      texto: "Leucócitos >30.000/mm³",
      valor: `${leuco.toLocaleString("pt-BR")}/mm³`,
      pts: "0pt"
    });
    if (it >= 0.2) {
      pontos++;
      criterios.push({
        ok: true,
        texto: "Relação I/T ≥0,2",
        valor: it.toFixed(2),
        pts: "+1pt"
      });
    } else criterios.push({
      ok: false,
      texto: "Relação I/T ≥0,2",
      valor: it.toFixed(2),
      pts: "0pt"
    });
    if (pmn >= 1500) {
      pontos++;
      criterios.push({
        ok: true,
        texto: "PMN imaturos ≥1.500/mm³",
        valor: `${pmn.toLocaleString("pt-BR")}/mm³`,
        pts: "+1pt"
      });
    } else criterios.push({
      ok: false,
      texto: "PMN imaturos ≥1.500/mm³",
      valor: `${pmn.toLocaleString("pt-BR")}/mm³`,
      pts: "0pt"
    });
    if (plaq < 150000) {
      pontos++;
      criterios.push({
        ok: true,
        texto: "Plaquetas <150.000/mm³",
        valor: `${plaq.toLocaleString("pt-BR")}/mm³`,
        pts: "+1pt"
      });
    } else criterios.push({
      ok: false,
      texto: "Plaquetas <150.000/mm³",
      valor: `${plaq.toLocaleString("pt-BR")}/mm³`,
      pts: "0pt"
    });
    if (pcr === "s") {
      pontos++;
      criterios.push({
        ok: true,
        texto: "PCR positiva (>10 mg/L)",
        valor: "Positiva",
        pts: "+1pt"
      });
    } else criterios.push({
      ok: false,
      texto: "PCR positiva (>10 mg/L)",
      valor: "Negativa",
      pts: "0pt"
    });
    let interp, cor, bgCor, emoji, conduta;
    if (pontos === 0) {
      interp = "Sepse muito improvável";
      cor = "#16A34A";
      bgCor = "#DCFCE7";
      emoji = "✅";
      conduta = "Observação clínica. Não iniciar antibiótico empiricamente.";
    } else if (pontos <= 2) {
      interp = "Sepse possível";
      cor = "#D97706";
      bgCor = "#FEF9C3";
      emoji = "⚠️";
      conduta = "Considerar coleta de hemocultura e observação. Antibiótico a critério clínico.";
    } else if (pontos <= 4) {
      interp = "Sepse provável";
      cor = "#DC2626";
      bgCor = "#FEE2E2";
      emoji = "🔴";
      conduta = "Iniciar antibioticoterapia empírica. Coletar hemocultura antes do antibiótico. Ampicilina + Gentamicina.";
    } else {
      interp = "Sepse muito provável / Confirmada";
      cor = "#7F1D1D";
      bgCor = "#FEE2E2";
      emoji = "🚨";
      conduta = "Iniciar antibioticoterapia imediatamente. Hemocultura urgente. Considerar UTI Neonatal.";
    }
    setResultado({
      pontos,
      criterios,
      interp,
      cor,
      bgCor,
      emoji,
      conduta
    });
  };
  const limpar = () => {
    setVals({
      leucocitos: "",
      it: "",
      pmnImaduros: "",
      plaquetas: "",
      pcr: "n"
    });
    setResultado(null);
  };
  const inpS = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    fontSize: 13,
    color: "#111827",
    outline: "none",
    background: "#FAFAFA",
    fontFamily: "inherit",
    boxSizing: "border-box"
  };
  const lbS = {
    fontSize: 11,
    fontWeight: 700,
    color: "#374151",
    display: "block",
    marginBottom: 4
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83E\uDDE0 Escore Hematol\xF3gico de Rodwell",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 16,
      padding: "10px 14px",
      background: "#EEF1FF",
      borderRadius: 12,
      border: "1.5px solid #4F6EF720"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: "linear-gradient(135deg,#7C9EFF,#4F6EF7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      flexShrink: 0
    }
  }, "\uD83E\uDDE0"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#1E2D6E"
    }
  }, "Avalia\xE7\xE3o de Sepse Neonatal"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#6B7280",
      marginTop: 2
    }
  }, "6 crit\xE9rios hematol\xF3gicos \xB7 Pontua\xE7\xE3o 0\u20136"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Leuc\xF3citos totais ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(c\xE9lulas/mm\xB3)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    value: vals.leucocitos,
    onChange: e => sv("leucocitos", e.target.value),
    placeholder: "Ex: 8500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Rela\xE7\xE3o I/T ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(imaturos/totais)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.01",
    value: vals.it,
    onChange: e => sv("it", e.target.value),
    placeholder: "Ex: 0.15"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "PMN imaturos ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(c\xE9lulas/mm\xB3)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    value: vals.pmnImaduros,
    onChange: e => sv("pmnImaduros", e.target.value),
    placeholder: "Ex: 1200"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Plaquetas ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(c\xE9lulas/mm\xB3)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    value: vals.plaquetas,
    onChange: e => sv("plaquetas", e.target.value),
    placeholder: "Ex: 180000"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "PCR (Prote\xEDna C Reativa) ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(", ">", " 10 mg/L)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [["n", "Negativa / Normal"], ["s", "Positiva (>10 mg/L)"]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => sv("pcr", v),
    style: {
      flex: 1,
      padding: "9px 12px",
      borderRadius: 10,
      border: `1.5px solid ${vals.pcr === v ? "#4F6EF7" : "#E5E7EB"}`,
      background: vals.pcr === v ? "#EEF1FF" : "white",
      color: vals.pcr === v ? "#4F6EF7" : "#374151",
      fontWeight: vals.pcr === v ? 700 : 500,
      fontSize: 12,
      transition: "all 0.15s"
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F8FAFC",
      borderRadius: 10,
      padding: "10px 12px",
      marginBottom: 14,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 6
    }
  }, "\uD83D\uDCCB CRIT\xC9RIOS (cada crit\xE9rio = 1 ponto)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "3px 16px"
    }
  }, [["Leucócitos <5.000/mm³", "Leucócitos >30.000/mm³"], ["Relação I/T ≥0,2", "PMN imaturos ≥1.500/mm³"], ["Plaquetas <150.000/mm³", "PCR >10 mg/L"]].map((pair, i) => pair.map(c => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      fontSize: 10.5,
      color: "#6B7280",
      padding: "2px 0"
    }
  }, "\u2022 ", c))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "10px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#4F6EF7,#7C9EFF)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(79,110,247,0.35)"
    }
  }, "\u26A1 Calcular Escore")), resultado && (resultado.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 12,
      padding: 14,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", resultado.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: resultado.bgCor,
      borderRadius: 14,
      padding: "14px 16px",
      marginBottom: 14,
      border: `2px solid ${resultado.cor}30`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 4
    }
  }, resultado.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      fontWeight: 900,
      color: resultado.cor,
      lineHeight: 1
    }
  }, resultado.pontos, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: resultado.cor + "99"
    }
  }, "/6")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: resultado.cor,
      marginTop: 4
    }
  }, resultado.interp)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 8
    }
  }, "DETALHAMENTO DOS CRIT\xC9RIOS"), resultado.criterios.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "7px 10px",
      borderRadius: 9,
      marginBottom: 5,
      background: c.ok ? "#DCFCE7" : "#F9FAFB",
      border: `1px solid ${c.ok ? "#86EFAC" : "#E5E7EB"}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      flexShrink: 0
    }
  }, c.ok ? "✅" : "⭕"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: c.ok ? "#15803D" : "#374151"
    }
  }, c.texto), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#6B7280"
    }
  }, "Valor: ", /*#__PURE__*/React.createElement("b", null, c.valor))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: c.ok ? "#16A34A" : "#9CA3AF",
      background: c.ok ? "#BBF7D0" : "#F3F4F6",
      padding: "3px 8px",
      borderRadius: 6
    }
  }, c.pts)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#1E2D6E,#2D4299)",
      borderRadius: 14,
      padding: "14px 16px",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(255,255,255,0.6)",
      marginBottom: 6
    }
  }, "\uD83D\uDC8A CONDUTA RECOMENDADA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.9)"
    }
  }, resultado.conduta)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      background: "#F9FAFB",
      borderRadius: 12,
      padding: "10px 14px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 8
    }
  }, "TABELA DE INTERPRETA\xC7\xC3O"), [{
    pts: "0",
    interp: "Sepse muito improvável",
    cor: "#16A34A",
    bg: "#DCFCE7"
  }, {
    pts: "1–2",
    interp: "Sepse possível",
    cor: "#D97706",
    bg: "#FEF9C3"
  }, {
    pts: "3–4",
    interp: "Sepse provável",
    cor: "#DC2626",
    bg: "#FEE2E2"
  }, {
    pts: "5–6",
    interp: "Sepse muito provável",
    cor: "#7F1D1D",
    bg: "#FEE2E2"
  }].map(row => /*#__PURE__*/React.createElement("div", {
    key: row.pts,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "6px 8px",
      borderRadius: 8,
      marginBottom: 4,
      background: row.bg,
      border: `1px solid ${row.cor}20`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 24,
      borderRadius: 6,
      background: row.cor,
      color: "white",
      fontWeight: 800,
      fontSize: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, row.pts), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: row.cor
    }
  }, row.interp)))))));
}

// ── BILIRUBIN CALCULATOR ──────────────────────────────────────────────────────
// Limites baseados no nomograma de Bhutani / AAP 2004 (tabelas por IG e horas de vida)
// Limiares para RN ≥35 sem SEM fatores de risco (conservadores)
// Tabela: [horasMin, horasMax, observar_max, foto_simples_max, foto_intensiva_max]
// Acima do foto_intensiva_max → exsanguíneotransfusão
function getBilirubinThresholds(ig, horas) {
  // Ajuste por IG: quanto mais prematuro, limiares mais baixos
  // Base: IG 40sem. Redução: -1mg/dL por semana abaixo de 38sem (simplificado)
  const igAdj = Math.max(0, 38 - Math.min(ig, 38));
  // Curva de Bhutani por horas de vida (zona de risco — valores aproximados em mg/dL)
  // [horas, observar, fotoSimples, fotoIntensiva] → acima de fotoIntensiva = EST
  const tabela = [[0, 12, 5, 8, 11], [12, 24, 7, 10, 13], [24, 36, 9, 12, 15], [36, 48, 11, 14, 17], [48, 60, 12, 15, 18], [60, 72, 13, 16, 19], [72, 84, 13, 16, 20], [84, 96, 13, 17, 20], [96, 108, 14, 17, 21], [108, 120, 14, 17, 21], [120, 144, 15, 18, 22], [144, 999, 15, 18, 22]];
  const linha = tabela.find(r => horas >= r[0] && horas < r[1]) || tabela[tabela.length - 1];
  return {
    observar: Math.max(1, linha[2] - igAdj),
    fotoSimples: Math.max(2, linha[3] - igAdj),
    fotoIntensiva: Math.max(3, linha[4] - igAdj)
  };
}
function BilirubinCalc({
  onClose
}) {
  const [ig, setIg] = useState("");
  const [horas, setHoras] = useState("");
  const [bili, setBili] = useState("");
  const [risco, setRisco] = useState("baixo"); // baixo | alto
  const [resultado, setResultado] = useState(null);
  const calcular = () => {
    const igN = parseFloat(ig),
      horasN = parseFloat(horas),
      biliN = parseFloat(bili);
    if (isNaN(igN) || isNaN(horasN) || isNaN(biliN)) {
      setResultado({
        erro: "Preencha todos os campos."
      });
      return;
    }
    if (igN < 23 || igN > 42) {
      setResultado({
        erro: "IG deve estar entre 23 e 42 semanas."
      });
      return;
    }
    if (horasN < 0 || horasN > 336) {
      setResultado({
        erro: "Horas de vida deve ser entre 0 e 336h (14 dias)."
      });
      return;
    }
    if (biliN < 0 || biliN > 50) {
      setResultado({
        erro: "Bilirrubina deve ser entre 0 e 50 mg/dL."
      });
      return;
    }
    const th = getBilirubinThresholds(igN, horasN);
    // Se fatores de risco, limiares -2mg/dL
    const adj = risco === "alto" ? 2 : 0;
    const limObs = th.observar - adj;
    const limFotoSimp = th.fotoSimples - adj;
    const limFotoInt = th.fotoIntensiva - adj;
    let conduta, cor, bgCor, emoji, nivel, detalhe, urgencia;
    if (biliN < limObs) {
      nivel = "Zona Segura — Observar";
      conduta = "Observação clínica e monitoramento. Estimular alimentação frequente (8-12x/dia). Repetir bilirrubina conforme evolução clínica.";
      detalhe = "Nível abaixo do limiar de fototerapia. Não há indicação de tratamento no momento.";
      cor = "#16A34A";
      bgCor = "#DCFCE7";
      emoji = "✅";
      urgencia = "OBSERVAR";
    } else if (biliN < limFotoSimp) {
      nivel = "Zona de Atenção — Risco Intermediário";
      conduta = "Considerar fototerapia profilática. Monitoramento rigoroso a cada 4-6h. Avaliar fatores de risco adicionais.";
      detalhe = "Nível na zona intermediária. Reavaliar em 4-6h com nova bilirrubina. Estimular aleitamento materno.";
      cor = "#D97706";
      bgCor = "#FEF9C3";
      emoji = "⚠️";
      urgencia = "ATENÇÃO";
    } else if (biliN < limFotoInt) {
      nivel = "Indicação de Fototerapia Simples";
      conduta = "INICIAR FOTOTERAPIA SIMPLES. Expor a maior área corporal possível. Proteger os olhos. Manter hidratação. Repetir bilirrubina em 4-6h após início.";
      detalhe = "Nível acima do limiar de fototerapia simples. Iniciar imediatamente e monitorar resposta.";
      cor = "#EA580C";
      bgCor = "#FFF7ED";
      emoji = "💡";
      urgencia = "FOTOTERAPIA SIMPLES";
    } else if (biliN < limFotoInt + 3) {
      nivel = "Indicação de Fototerapia Intensiva";
      conduta = "INICIAR FOTOTERAPIA INTENSIVA (bercinho de fibra óptica + LED de alta potência). Cobrir máxima área corporal. Hidratação endovenosa se necessário. Controle em 2-4h. Preparar para exsanguíneotransfusão se não houver resposta.";
      detalhe = "Nível elevado — risco de kernicterus. Resposta inadequada à fototerapia simples esperada.";
      cor = "#DC2626";
      bgCor = "#FEE2E2";
      emoji = "🔴";
      urgencia = "FOTOTERAPIA INTENSIVA";
    } else {
      nivel = "Indicação de Exsanguíneotransfusão (EST)";
      conduta = "INDICAÇÃO DE EXSANGUÍNEOTRANSFUSÃO. Iniciar fototerapia intensiva IMEDIATAMENTE enquanto prepara EST. Acionar UTI Neonatal e banco de sangue URGENTE. Monitorar sinais de encefalopatia bilirrubínica (hipotonia, opistótono, choro agudo).";
      detalhe = "Nível crítico — risco iminente de kernicterus/encefalopatia bilirrubínica aguda.";
      cor = "#7F1D1D";
      bgCor = "#FEE2E2";
      emoji = "🚨";
      urgencia = "EXSANGUÍNEOTRANSFUSÃO";
    }

    // Porcentagem visual da barra
    const maxBili = 30;
    const pctBili = Math.min(100, biliN / maxBili * 100);
    const pctObs = Math.min(100, limObs / maxBili * 100);
    const pctFotoS = Math.min(100, limFotoSimp / maxBili * 100);
    const pctFotoI = Math.min(100, limFotoInt / maxBili * 100);
    setResultado({
      nivel,
      conduta,
      detalhe,
      cor,
      bgCor,
      emoji,
      urgencia,
      limObs,
      limFotoSimp,
      limFotoInt,
      biliN,
      igN,
      horasN,
      pctBili,
      pctObs,
      pctFotoS,
      pctFotoI,
      adj
    });
  };
  const limpar = () => {
    setIg("");
    setHoras("");
    setBili("");
    setRisco("baixo");
    setResultado(null);
  };
  const inpS = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    background: "#FAFAFA",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    fontWeight: 700
  };
  const lbS = {
    fontSize: 11,
    fontWeight: 700,
    color: "#374151",
    display: "block",
    marginBottom: 5,
    textAlign: "center"
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDC76 Calculadora de Hiperbilirrubinemia",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 16,
      padding: "10px 14px",
      background: "linear-gradient(135deg,#FFFBEB,#FEF9C3)",
      borderRadius: 12,
      border: "1.5px solid #F59E0B30"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: "linear-gradient(135deg,#FCD34D,#F59E0B)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      flexShrink: 0,
      boxShadow: "0 4px 12px rgba(245,158,11,0.3)"
    }
  }, "\uD83D\uDC76"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#92400E"
    }
  }, "Nomograma de Bhutani \u2014 AAP 2004"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#B45309",
      marginTop: 2
    }
  }, "Limiares ajustados por IG e fatores de risco"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "IG ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(semanas)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    min: "23",
    max: "42",
    value: ig,
    onChange: e => setIg(e.target.value),
    placeholder: "Ex: 38"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 3
    }
  }, "23\u201342 semanas")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Horas de vida"), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    min: "0",
    max: "336",
    value: horas,
    onChange: e => setHoras(e.target.value),
    placeholder: "Ex: 48"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 3
    }
  }, "0\u2013336 horas")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Bilirrubina ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mg/dL)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#F59E0B",
      fontSize: 16
    },
    type: "number",
    step: "0.1",
    min: "0",
    max: "50",
    value: bili,
    onChange: e => setBili(e.target.value),
    placeholder: "Ex: 12.5"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 3
    }
  }, "mg/dL"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 6
    }
  }, "Fatores de Risco ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(altera os limiares)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }
  }, [["baixo", "🟢 Sem fatores de risco", "RN ≥38 sem, saudável"], ["alto", "🔴 Com fatores de risco", "Aloimunização, G6PD, asfixia, instab. térmica, sepse, acidose, albumina <3g/dL"]].map(([v, l, sub]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setRisco(v),
    style: {
      padding: "9px 10px",
      borderRadius: 11,
      border: `2px solid ${risco === v ? v === "baixo" ? "#22C55E" : "#EF4444" : "#E5E7EB"}`,
      background: risco === v ? v === "baixo" ? "#DCFCE7" : "#FEE2E2" : "white",
      cursor: "pointer",
      textAlign: "left",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: risco === v ? v === "baixo" ? "#16A34A" : "#DC2626" : "#374151"
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "#9CA3AF",
      marginTop: 2,
      lineHeight: 1.3
    }
  }, sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#F59E0B,#FBBF24)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(245,158,11,0.4)"
    }
  }, "\u26A1 Calcular")), resultado && (resultado.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 12,
      padding: 14,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", resultado.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: resultado.bgCor,
      borderRadius: 16,
      padding: "14px 16px",
      marginBottom: 14,
      border: `2px solid ${resultado.cor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      marginBottom: 4
    }
  }, resultado.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: "5px 16px",
      borderRadius: 20,
      background: resultado.cor,
      color: "white",
      fontWeight: 900,
      fontSize: 13,
      letterSpacing: 0.5,
      marginBottom: 8
    }
  }, resultado.urgencia), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: resultado.cor,
      lineHeight: 1.4
    }
  }, resultado.nivel)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 14,
      padding: "12px 14px",
      marginBottom: 14,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 10
    }
  }, "\uD83D\uDCCA BILIRRUBINA vs LIMIARES (IG ", resultado.igN, "sem \xB7 ", resultado.horasN, "h de vida", resultado.adj > 0 ? " · com fatores de risco" : "", ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 32,
      borderRadius: 10,
      background: "linear-gradient(90deg,#DCFCE7 0%,#DCFCE7 var(--p1),#FEF9C3 var(--p1),#FEF9C3 var(--p2),#FFF7ED var(--p2),#FFF7ED var(--p3),#FEE2E2 var(--p3),#FEE2E2 100%)",
      overflow: "hidden",
      marginBottom: 6
    },
    style: {
      position: "relative",
      height: 32,
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 6,
      background: "#F3F4F6"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: `${resultado.pctObs}%`,
      height: "100%",
      background: "#DCFCE7"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${resultado.pctObs}%`,
      width: `${resultado.pctFotoS - resultado.pctObs}%`,
      height: "100%",
      background: "#FEF9C3"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${resultado.pctFotoS}%`,
      width: `${resultado.pctFotoI - resultado.pctFotoS}%`,
      height: "100%",
      background: "#FED7AA"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${resultado.pctFotoI}%`,
      width: `${100 - resultado.pctFotoI}%`,
      height: "100%",
      background: "#FEE2E2"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${Math.min(98, resultado.pctBili)}%`,
      width: 3,
      height: "100%",
      background: resultado.cor,
      transform: "translateX(-50%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: `${Math.min(96, resultado.pctBili)}%`,
      transform: "translate(-50%,-50%)",
      background: resultado.cor,
      color: "white",
      borderRadius: 6,
      padding: "2px 6px",
      fontSize: 11,
      fontWeight: 900,
      whiteSpace: "nowrap"
    }
  }, resultado.biliN, " mg/dL")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 12
    }
  }, [["#DCFCE7", "#16A34A", "Seguro"], ["#FEF9C3", "#D97706", "Atenção"], ["#FED7AA", "#EA580C", "Foto Simples"], ["#FEE2E2", "#DC2626", "Foto Intensiva/EST"]].map(([bg, c, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: bg,
      border: `1px solid ${c}40`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#6B7280"
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6
    }
  }, [{
    label: "Limite Observar",
    val: resultado.limObs,
    cor: "#16A34A",
    bg: "#DCFCE7"
  }, {
    label: "Foto Simples",
    val: resultado.limFotoSimp,
    cor: "#D97706",
    bg: "#FEF9C3"
  }, {
    label: "Foto Intensiva",
    val: resultado.limFotoInt,
    cor: "#DC2626",
    bg: "#FEE2E2"
  }].map(t => /*#__PURE__*/React.createElement("div", {
    key: t.label,
    style: {
      background: t.bg,
      borderRadius: 9,
      padding: "8px 8px",
      textAlign: "center",
      border: `1px solid ${t.cor}30`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: t.cor,
      fontWeight: 700,
      marginBottom: 2
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: t.cor
    }
  }, t.val.toFixed(1)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: t.cor + "99"
    }
  }, "mg/dL"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#92400E,#B45309)",
      borderRadius: 14,
      padding: "14px 16px",
      marginBottom: 14,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(255,255,255,0.65)",
      marginBottom: 6
    }
  }, "\uD83D\uDC8A CONDUTA RECOMENDADA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.7,
      color: "rgba(255,255,255,0.95)"
    }
  }, resultado.conduta)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: 14,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 4
    }
  }, "\u2139\uFE0F OBSERVA\xC7\xC3O"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#6B7280",
      lineHeight: 1.6
    }
  }, resultado.detalhe)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: "10px 14px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 8
    }
  }, "\uD83D\uDCCB REFER\xCANCIA R\xC1PIDA \u2014 CONDUTAS"), [{
    emoji: "✅",
    cond: "OBSERVAR",
    desc: "Bili < limiar observar",
    "cor": "#16A34A",
    bg: "#DCFCE7"
  }, {
    emoji: "💡",
    cond: "FOTOTERAPIA SIMPLES",
    desc: "Bili ≥ limiar foto simples",
    cor: "#EA580C",
    bg: "#FFF7ED"
  }, {
    emoji: "🔴",
    cond: "FOTOTERAPIA INTENSIVA",
    desc: "Bili ≥ limiar foto intensiva",
    cor: "#DC2626",
    bg: "#FEE2E2"
  }, {
    emoji: "🚨",
    cond: "EXSANGUÍNEOTRANSFUSÃO",
    desc: "Bili ≥ limiar EST (foto intensiva +3)",
    cor: "#7F1D1D",
    bg: "#FEE2E2"
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.cond,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "7px 9px",
      borderRadius: 9,
      marginBottom: 5,
      background: r.bg,
      border: `1px solid ${r.cor}20`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      flexShrink: 0
    }
  }, r.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: r.cor
    }
  }, r.cond), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "#6B7280"
    }
  }, r.desc)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF",
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "\u26A0\uFE0F Limiares baseados no Nomograma de Bhutani (AAP 2004). Sempre considerar o contexto cl\xEDnico completo e seguir o protocolo institucional.")))));
}

// ── OXYGENATION INDEX CALCULATOR ─────────────────────────────────────────────
function OICalc({
  onClose
}) {
  const [map, setMap] = useState("");
  const [fio2, setFio2] = useState("");
  const [pao2, setPao2] = useState("");
  const [modo, setModo] = useState("frac"); // frac=0-1, pct=0-100
  const [resultado, setResultado] = useState(null);
  const calcular = () => {
    const mapN = parseFloat(map);
    let fio2N = parseFloat(fio2);
    const pao2N = parseFloat(pao2);
    if (isNaN(mapN) || isNaN(fio2N) || isNaN(pao2N)) {
      setResultado({
        erro: "Preencha todos os campos."
      });
      return;
    }
    if (mapN <= 0 || mapN > 60) {
      setResultado({
        erro: "MAP deve ser entre 1 e 60 cmH₂O."
      });
      return;
    }
    if (modo === "pct") {
      if (fio2N < 21 || fio2N > 100) {
        setResultado({
          erro: "FiO₂ em porcentagem deve ser entre 21 e 100%."
        });
        return;
      }
      fio2N = fio2N / 100;
    } else {
      if (fio2N < 0.21 || fio2N > 1) {
        setResultado({
          erro: "FiO₂ em fração deve ser entre 0,21 e 1,0."
        });
        return;
      }
    }
    if (pao2N <= 0 || pao2N > 600) {
      setResultado({
        erro: "PaO₂ deve ser entre 1 e 600 mmHg."
      });
      return;
    }
    const oi = parseFloat((mapN * fio2N * 100 / pao2N).toFixed(1));

    // Relação PaO2/FiO2 (índice de Berlin)
    const pfRatio = parseFloat((pao2N / fio2N).toFixed(0));
    let nivel,
      cor,
      bgCor,
      emoji,
      gravidade,
      conduta,
      ecmo = false;
    if (oi < 5) {
      nivel = "Oxigenação Normal";
      gravidade = "Normal";
      cor = "#16A34A";
      bgCor = "#DCFCE7";
      emoji = "✅";
      conduta = "Parâmetros ventilatórios dentro da normalidade. Manter monitoramento contínuo de SpO₂. Otimizar parâmetros conforme evolução clínica. Considerar desmame ventilatório se clinicamente estável.";
    } else if (oi < 10) {
      nivel = "Disfunção Respiratória Leve";
      gravidade = "Leve";
      cor = "#16A34A";
      bgCor = "#DCFCE7";
      emoji = "🟡";
      conduta = "Monitoramento intensivo. Otimizar FiO₂ e PEEP. Verificar posicionamento do tubo. Avaliar necessidade de surfactante se RNPT com SDR. Gasometria seriada a cada 2-4h.";
    } else if (oi < 15) {
      nivel = "Disfunção Respiratória Moderada";
      gravidade = "Moderada";
      cor = "#D97706";
      bgCor = "#FEF9C3";
      emoji = "⚠️";
      conduta = "Considerar aumento de PEEP (5-8 cmH₂O). Avaliar estratégia de recrutamento alveolar. Considerar surfactante se RNPT. Ventilação protetora: volume corrente 4-6ml/kg, FR 40-60irpm. Gasometria 1-2h.";
    } else if (oi < 20) {
      nivel = "Disfunção Respiratória Grave";
      gravidade = "Grave";
      cor = "#EA580C";
      bgCor = "#FFF7ED";
      emoji = "🔴";
      conduta = "CONSIDERAR VAFO (Ventilação de Alta Frequência Oscilatória). Avaliar NO inalatório se HPPRN associada. Surfactante indicado em RNPT. Otimizar sedoanalgesia. Posição prona se aplicável. Acionar UTI Neonatal de referência.";
    } else if (oi < 25) {
      nivel = "Insuficiência Respiratória Muito Grave";
      gravidade = "Muito Grave";
      cor = "#DC2626";
      bgCor = "#FEE2E2";
      emoji = "🚨";
      conduta = "INDICAÇÃO DE VAFO. Iniciar NO inalatório (5-20ppm) se HPPRN. Avaliar surfactante de resgate. Descartar pneumotórax (Rx urgente). Considerar ECMO se OI persistir >25 por mais de 4-6h. Contato com centro de ECMO.";
    } else if (oi < 40) {
      nivel = "Insuficiência Respiratória Crítica — Pré-ECMO";
      gravidade = "Crítica";
      cor = "#7F1D1D";
      bgCor = "#FEE2E2";
      emoji = "🆘";
      ecmo = true;
      conduta = "CRITÉRIO PARA AVALIAÇÃO DE ECMO. Iniciar VAFO + NO inalatório imediatamente se não iniciado. Surfactante de resgate. Contato URGENTE com centro de ECMO. Estabilizar hemodinamicamente: dopamina/dobutamina se necessário. Verificar acesso venoso central.";
    } else {
      nivel = "Indicação Formal de ECMO";
      gravidade = "ECMO";
      cor = "#1E1B4B";
      bgCor = "#EDE9FE";
      emoji = "🔴";
      ecmo = true;
      conduta = "INDICAÇÃO FORMAL DE ECMO (OI>40). Acionar centro de ECMO IMEDIATAMENTE. Manter VAFO + NO inalatório durante transporte. Estabilização hemodinâmica urgente. Consentimento informado da família. Preparar para transferência se necessário.";
    }

    // Visual gauge %
    const oiMax = 50;
    const pct = Math.min(99, Math.round(oi / oiMax * 100));

    // P/F ratio classification
    let pfClass, pfCor;
    if (pfRatio >= 300) {
      pfClass = "Normal";
      pfCor = "#16A34A";
    } else if (pfRatio >= 200) {
      pfClass = "SARA Leve";
      pfCor = "#D97706";
    } else if (pfRatio >= 100) {
      pfClass = "SARA Moderada";
      pfCor = "#EA580C";
    } else {
      pfClass = "SARA Grave";
      pfCor = "#DC2626";
    }
    setResultado({
      oi,
      nivel,
      cor,
      bgCor,
      emoji,
      gravidade,
      conduta,
      ecmo,
      pct,
      pfRatio,
      pfClass,
      pfCor,
      mapN,
      fio2N,
      pao2N
    });
  };
  const limpar = () => {
    setMap("");
    setFio2("");
    setPao2("");
    setModo("frac");
    setResultado(null);
  };
  const inpS = {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    fontSize: 15,
    color: "#111827",
    outline: "none",
    background: "#FAFAFA",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    fontWeight: 700
  };
  const lbS = {
    fontSize: 11,
    fontWeight: 700,
    color: "#374151",
    display: "block",
    marginBottom: 5
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83E\uDEC1 Oxygenation Index (OI)",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 16,
      padding: "10px 14px",
      background: "linear-gradient(135deg,#F0F9FF,#E0F2FE)",
      borderRadius: 12,
      border: "1.5px solid #0EA5E920"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: "linear-gradient(135deg,#38BDF8,#0EA5E9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      flexShrink: 0,
      boxShadow: "0 4px 12px rgba(14,165,233,0.35)"
    }
  }, "\uD83E\uDEC1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#0C4A6E"
    }
  }, "\xCDndice de Oxigena\xE7\xE3o Neonatal"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#0369A1",
      marginTop: 2
    }
  }, "F\xF3rmula: OI = (MAP \xD7 FiO\u2082 \xD7 100) / PaO\u2082"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Formato da FiO\u2082"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [["frac", "Fração (0,21–1,0)"], ["pct", "Porcentagem (21–100%)"]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setModo(v),
    style: {
      flex: 1,
      padding: "8px 10px",
      borderRadius: 10,
      border: `1.5px solid ${modo === v ? "#0EA5E9" : "#E5E7EB"}`,
      background: modo === v ? "#F0F9FF" : "white",
      color: modo === v ? "#0369A1" : "#6B7280",
      fontWeight: modo === v ? 700 : 500,
      fontSize: 12,
      transition: "all 0.15s"
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      ...lbS,
      textAlign: "center"
    }
  }, "MAP ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(cmH\u2082O)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.5",
    min: "1",
    max: "60",
    value: map,
    onChange: e => setMap(e.target.value),
    placeholder: "Ex: 12"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 3
    }
  }, "Press\xE3o m\xE9dia via a\xE9rea")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      ...lbS,
      textAlign: "center"
    }
  }, "FiO\u2082 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, modo === "frac" ? "(0,21–1,0)" : "(21–100%)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#0EA5E9"
    },
    type: "number",
    step: modo === "frac" ? "0.01" : "1",
    value: fio2,
    onChange: e => setFio2(e.target.value),
    placeholder: modo === "frac" ? "Ex: 0,60" : "Ex: 60"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 3
    }
  }, "Fra\xE7\xE3o O\u2082 inspirado")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      ...lbS,
      textAlign: "center"
    }
  }, "PaO\u2082 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mmHg)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#7C3AED"
    },
    type: "number",
    step: "1",
    min: "1",
    max: "600",
    value: pao2,
    onChange: e => setPao2(e.target.value),
    placeholder: "Ex: 55"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 3
    }
  }, "PaO\u2082 gasometria arterial"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F8FAFC",
      borderRadius: 10,
      padding: "9px 14px",
      marginBottom: 14,
      border: "1px solid #E5E7EB",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "#6B7280"
    }
  }, "OI = "), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#0369A1"
    }
  }, map || "MAP"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "#6B7280"
    }
  }, " \xD7 "), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#0EA5E9"
    }
  }, fio2 ? modo === "frac" ? fio2 : (parseFloat(fio2) / 100).toFixed(2) : "FiO₂"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "#6B7280"
    }
  }, " \xD7 100 \xF7 "), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#7C3AED"
    }
  }, pao2 || "PaO₂"), map && fio2 && pao2 && !isNaN(parseFloat(map)) && !isNaN(parseFloat(fio2)) && !isNaN(parseFloat(pao2)) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 900,
      color: "#0C4A6E"
    }
  }, " = ", (parseFloat(map) * (modo === "frac" ? parseFloat(fio2) : parseFloat(fio2) / 100) * 100 / parseFloat(pao2)).toFixed(1))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#0EA5E9,#38BDF8)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(14,165,233,0.4)"
    }
  }, "\u26A1 Calcular OI")), resultado && (resultado.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 12,
      padding: 14,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", resultado.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: resultado.bgCor,
      borderRadius: 16,
      padding: "16px",
      marginBottom: 14,
      border: `2px solid ${resultado.cor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      marginBottom: 6
    }
  }, resultado.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 46,
      fontWeight: 900,
      color: resultado.cor,
      lineHeight: 1,
      marginBottom: 4
    }
  }, resultado.oi), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: resultado.cor + "99",
      fontWeight: 600,
      marginBottom: 6
    }
  }, "Oxygenation Index"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: "5px 18px",
      borderRadius: 20,
      background: resultado.cor,
      color: "white",
      fontWeight: 900,
      fontSize: 12,
      letterSpacing: 0.5,
      marginBottom: 6
    }
  }, resultado.gravidade.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: resultado.cor,
      lineHeight: 1.4
    }
  }, resultado.nivel), resultado.ecmo && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      padding: "6px 12px",
      borderRadius: 10,
      background: "rgba(127,29,29,0.15)",
      border: "1.5px solid #DC2626",
      color: "#7F1D1D",
      fontWeight: 800,
      fontSize: 13
    }
  }, "\u26A0\uFE0F CRIT\xC9RIO PARA ECMO")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 14,
      padding: "12px 14px",
      marginBottom: 14,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 10
    }
  }, "\uD83D\uDCCA ESCALA DE GRAVIDADE \u2014 OI"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 28,
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "0%",
      width: "10%",
      height: "100%",
      background: "#DCFCE7"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "10%",
      width: "10%",
      height: "100%",
      background: "#D1FAE5"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "20%",
      width: "10%",
      height: "100%",
      background: "#FEF9C3"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "30%",
      width: "10%",
      height: "100%",
      background: "#FED7AA"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "40%",
      width: "10%",
      height: "100%",
      background: "#FECACA"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "50%",
      width: "30%",
      height: "100%",
      background: "#FEE2E2"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "80%",
      width: "20%",
      height: "100%",
      background: "#EDE9FE"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${Math.min(97, resultado.pct)}%`,
      width: 3,
      height: "100%",
      background: resultado.cor,
      transform: "translateX(-50%)",
      zIndex: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: `${Math.min(94, resultado.pct)}%`,
      transform: "translate(-50%,-50%)",
      background: resultado.cor,
      color: "white",
      borderRadius: 6,
      padding: "2px 7px",
      fontSize: 11,
      fontWeight: 900,
      whiteSpace: "nowrap",
      zIndex: 3
    }
  }, resultado.oi)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 12,
      paddingLeft: 2
    }
  }, ["0", "5", "10", "15", "20", "25", "40", "50+"].map(v => /*#__PURE__*/React.createElement("span", {
    key: v,
    style: {
      fontSize: 9,
      color: "#9CA3AF"
    }
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 6
    }
  }, [{
    range: "< 5",
    desc: "Normal",
    cor: "#16A34A",
    bg: "#DCFCE7"
  }, {
    range: "5 – 10",
    desc: "Leve",
    cor: "#16A34A",
    bg: "#D1FAE5"
  }, {
    range: "10 – 15",
    desc: "Moderado",
    cor: "#D97706",
    bg: "#FEF9C3"
  }, {
    range: "15 – 20",
    desc: "Grave",
    cor: "#EA580C",
    bg: "#FFF7ED"
  }, {
    range: "20 – 25",
    desc: "Muito Grave",
    cor: "#DC2626",
    bg: "#FEE2E2"
  }, {
    range: "25 – 40",
    desc: "Crítico — Pré-ECMO",
    cor: "#991B1B",
    bg: "#FEE2E2"
  }, {
    range: "> 40",
    desc: "ECMO Formal",
    cor: "#1E1B4B",
    bg: "#EDE9FE"
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.range,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 9px",
      borderRadius: 8,
      background: r.bg,
      border: `1px solid ${r.cor}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 44,
      padding: "2px 5px",
      borderRadius: 5,
      background: r.cor,
      color: "white",
      fontWeight: 800,
      fontSize: 9,
      textAlign: "center"
    }
  }, r.range), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: r.cor
    }
  }, r.desc))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      marginBottom: 14
    }
  }, [{
    label: "MAP",
    val: `${resultado.mapN} cmH₂O`,
    cor: "#0369A1",
    bg: "#F0F9FF"
  }, {
    label: "FiO₂",
    val: `${(resultado.fio2N * 100).toFixed(0)}%`,
    cor: "#0EA5E9",
    bg: "#E0F2FE"
  }, {
    label: "PaO₂",
    val: `${resultado.pao2N} mmHg`,
    cor: "#7C3AED",
    bg: "#F5F3FF"
  }].map(p => /*#__PURE__*/React.createElement("div", {
    key: p.label,
    style: {
      background: p.bg,
      borderRadius: 10,
      padding: "9px 8px",
      textAlign: "center",
      border: `1px solid ${p.cor}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: p.cor,
      fontWeight: 700,
      marginBottom: 2
    }
  }, p.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 900,
      color: p.cor
    }
  }, p.val)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: 14,
      border: "1px solid #E5E7EB",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF",
      fontWeight: 700
    }
  }, "Rela\xE7\xE3o P/F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: resultado.pfCor
    }
  }, resultado.pfRatio), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: resultado.pfCor,
      fontWeight: 700
    }
  }, resultado.pfClass)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 11,
      color: "#6B7280",
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#374151"
    }
  }, "P/F \u2265300:"), " Normal \xA0|\xA0 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#D97706"
    }
  }, "200\u2013299:"), " SARA leve \xA0|\xA0 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#EA580C"
    }
  }, "100\u2013199:"), " SARA moderada \xA0|\xA0 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#DC2626"
    }
  }, "<100:"), " SARA grave")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#0C4A6E,#0369A1)",
      borderRadius: 14,
      padding: "14px 16px",
      marginBottom: 14,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(255,255,255,0.6)",
      marginBottom: 6
    }
  }, "\uD83D\uDC8A CONDUTA RECOMENDADA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.75,
      color: "rgba(255,255,255,0.95)"
    }
  }, resultado.conduta)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0F9FF",
      borderRadius: 12,
      padding: "10px 14px",
      border: "1px solid #BAE6FD"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#0369A1",
      marginBottom: 6
    }
  }, "\uD83D\uDCCB REFER\xCANCIA \u2014 LIMIARES DE DECIS\xC3O"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#0369A1",
      lineHeight: 1.8
    }
  }, /*#__PURE__*/React.createElement("b", null, "OI <15:"), " Ventila\xE7\xE3o convencional otimizada", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "OI \u226515:"), " Considerar VAFO", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "OI \u226520:"), " Iniciar NO inalat\xF3rio (HPPRN)", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "OI 25\u201340:"), " Contatar centro de ECMO", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "OI >40:"), " Indica\xE7\xE3o formal de ECMO", /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#7DD3FC",
      marginTop: 6
    }
  }, "\u26A0\uFE0F Decis\xF5es baseadas no contexto cl\xEDnico + evolu\xE7\xE3o temporal. OI persistentemente elevado >4-6h refor\xE7a indica\xE7\xE3o de escalonamento.")))));
}

// ── GASOMETRIA CALCULATOR ─────────────────────────────────────────────────────
function GasometriaCalc({
  onClose
}) {
  const [tipo, setTipo] = useState("arterial");
  const [vals, setVals] = useState({
    ph: "",
    pco2: "",
    po2: "",
    hco3: "",
    be: "",
    spo2: "",
    na: "",
    cl: ""
  });
  const [peso, setPeso] = useState("");
  const [vm, setVm] = useState(false); // em ventilação mecânica?
  const [params, setParams] = useState({
    fr: "",
    vt: "",
    peep: "",
    fio2: "",
    pip: ""
  });
  const [res, setRes] = useState(null);
  const sv = (k, v) => setVals(x => ({
    ...x,
    [k]: v
  }));
  const sp = (k, v) => setParams(x => ({
    ...x,
    [k]: v
  }));
  const calcular = () => {
    const ph = parseFloat(vals.ph),
      pco2 = parseFloat(vals.pco2),
      hco3 = parseFloat(vals.hco3);
    const po2 = parseFloat(vals.po2) || null,
      be = parseFloat(vals.be) || null;
    if (isNaN(ph) || isNaN(pco2) || isNaN(hco3)) {
      setRes({
        erro: "pH, PCO₂ e HCO₃⁻ são obrigatórios."
      });
      return;
    }
    if (ph < 6.5 || ph > 7.8) {
      setRes({
        erro: "pH fora da faixa esperada (6,5–7,8)."
      });
      return;
    }
    if (pco2 < 5 || pco2 > 150) {
      setRes({
        erro: "PCO₂ fora da faixa (5–150 mmHg)."
      });
      return;
    }

    // ── 1. DISTÚRBIO PRIMÁRIO ─────────────────────────────────────────────────
    const acidemia = ph < 7.35,
      alcalemia = ph > 7.45;
    const resp_acid = pco2 > 45,
      resp_alc = pco2 < 35;
    const meta_acid = hco3 < 22,
      meta_alc = hco3 > 26;
    let disturbio = "",
      distCorList = [],
      misto = false;
    let corVM = [],
      corTrat = [];

    // Classifica distúrbio primário
    if (acidemia && resp_acid && !meta_acid) disturbio = "Acidose Respiratória Pura";else if (acidemia && resp_acid && meta_acid) {
      disturbio = "Acidose Mista (Resp. + Metabólica)";
      misto = true;
    } else if (acidemia && meta_acid && !resp_acid) disturbio = "Acidose Metabólica Pura";else if (acidemia && meta_acid && resp_alc) {
      disturbio = "Acidose Metabólica com compensação resp.";
      misto = false;
    } else if (alcalemia && resp_alc && !meta_alc) disturbio = "Alcalose Respiratória Pura";else if (alcalemia && resp_alc && meta_alc) {
      disturbio = "Alcalose Mista (Resp. + Metabólica)";
      misto = true;
    } else if (alcalemia && meta_alc && !resp_alc) disturbio = "Alcalose Metabólica Pura";else if (alcalemia && meta_alc && resp_alc) {
      disturbio = "Alcalose Metabólica com compensação resp.";
    } else if (!acidemia && !alcalemia && resp_acid && meta_alc) {
      disturbio = "Distúrbio Misto compensado (Ac.Resp + Alc.Meta)";
      misto = true;
    } else if (!acidemia && !alcalemia && resp_alc && meta_acid) {
      disturbio = "Distúrbio Misto compensado (Alc.Resp + Ac.Meta)";
      misto = true;
    } else disturbio = "Gasometria Normal / Compensada";

    // Gravidade pelo pH
    let gravPh, corPh, bgPh, emojiPh;
    if (ph >= 7.35 && ph <= 7.45) {
      gravPh = "Normal";
      corPh = "#16A34A";
      bgPh = "#DCFCE7";
      emojiPh = "✅";
    } else if (ph >= 7.25 && ph < 7.35) {
      gravPh = "Acidemia Leve";
      corPh = "#D97706";
      bgPh = "#FEF9C3";
      emojiPh = "⚠️";
    } else if (ph >= 7.10 && ph < 7.25) {
      gravPh = "Acidemia Moderada";
      corPh = "#EA580C";
      bgPh = "#FFF7ED";
      emojiPh = "🔴";
    } else if (ph < 7.10) {
      gravPh = "Acidemia Grave";
      corPh = "#DC2626";
      bgPh = "#FEE2E2";
      emojiPh = "🚨";
    } else if (ph > 7.45 && ph <= 7.55) {
      gravPh = "Alcalemia Leve";
      corPh = "#0369A1";
      bgPh = "#F0F9FF";
      emojiPh = "⚠️";
    } else if (ph > 7.55 && ph <= 7.65) {
      gravPh = "Alcalemia Moderada";
      corPh = "#7C3AED";
      bgPh = "#F5F3FF";
      emojiPh = "🔴";
    } else {
      gravPh = "Alcalemia Grave";
      corPh = "#6D28D9";
      bgPh = "#EDE9FE";
      emojiPh = "🚨";
    }

    // ── 2. COMPENSAÇÃO ESPERADA ───────────────────────────────────────────────
    let compens = "",
      compOK = false;
    if (disturbio.includes("Acidose Metabólica")) {
      const pco2Esp = 1.5 * hco3 + 8;
      const margem = 2;
      compOK = Math.abs(pco2 - pco2Esp) <= margem;
      compens = `PCO₂ esperado (Winters): ${(pco2Esp - margem).toFixed(1)}–${(pco2Esp + margem).toFixed(1)} mmHg → atual: ${pco2} mmHg → ${compOK ? "Compensação adequada" : "Distúrbio adicional / compensação inadequada"}`;
    } else if (disturbio.includes("Alcalose Metabólica")) {
      const pco2Esp = 0.7 * (hco3 - 24) + 40;
      const margem = 2;
      compOK = Math.abs(pco2 - pco2Esp) <= margem;
      compens = `PCO₂ esperado: ${(pco2Esp - margem).toFixed(1)}–${(pco2Esp + margem).toFixed(1)} mmHg → atual: ${pco2} mmHg → ${compOK ? "Compensação adequada" : "Compensação inadequada"}`;
    } else if (disturbio.includes("Acidose Respiratória")) {
      const hco3Esp = 24 + 0.1 * (pco2 - 40);
      const margem = 2;
      compOK = Math.abs(hco3 - hco3Esp) <= margem;
      compens = `HCO₃⁻ esperado (agudo): ${(hco3Esp - margem).toFixed(1)}–${(hco3Esp + margem).toFixed(1)} mEq/L → atual: ${hco3} mEq/L → ${compOK ? "Compatível c/ agudo" : "Possível componente crônico ou distúrbio adicional"}`;
    } else if (disturbio.includes("Alcalose Respiratória")) {
      const hco3Esp = 24 - 0.2 * (40 - pco2);
      const margem = 2;
      compOK = Math.abs(hco3 - hco3Esp) <= margem;
      compens = `HCO₃⁻ esperado (agudo): ${(hco3Esp - margem).toFixed(1)}–${(hco3Esp + margem).toFixed(1)} mEq/L → atual: ${hco3} mEq/L → ${compOK ? "Compensação adequada" : "Possível componente crônico"}`;
    } else compens = "Gasometria dentro dos limites normais. Nenhuma compensação necessária.";

    // ── 3. ANION GAP ──────────────────────────────────────────────────────────
    let agStr = "",
      agAlto = false,
      deltaDelta = "";
    const naV = parseFloat(vals.na),
      clV = parseFloat(vals.cl);
    if (!isNaN(naV) && !isNaN(clV)) {
      const ag = naV - clV - hco3;
      agAlto = ag > 12;
      agStr = `Ânion Gap = ${naV} − ${clV} − ${hco3} = ${ag.toFixed(1)} mEq/L → ${ag > 16 ? "ELEVADO (>16)" : ag > 12 ? "Limítrofe (12–16)" : "Normal (≤12)"}`;
      if (agAlto && disturbio.includes("Acidose Metabólica")) {
        const delta = (ag - 12) / (24 - hco3);
        deltaDelta = `Δ/Δ = ${delta.toFixed(2)} → ${delta < 0.4 ? "Acidose metabólica hiperclorêmica pura" : delta <= 1 ? "Acidose metabólica AG elevado puro" : delta <= 2 ? "Distúrbio misto (AG + hiperclorêmica)" : "Alcalose metabólica associada"}`;
      }
    }

    // ── 4. BICARBONATO DE SÓDIO (correção metabólica) ─────────────────────────
    let bicarb = "";
    const pesoN = parseFloat(peso);
    if (meta_acid && ph < 7.20 && !isNaN(pesoN) && pesoN > 0) {
      const defBase = be ? Math.abs(be) : Math.abs(hco3 - 24);
      const doseTotal = (defBase * pesoN * 0.3).toFixed(1);
      const dose13 = (parseFloat(doseTotal) / 3).toFixed(1);
      bicarb = `NaHCO₃ 8,4% (1mEq/ml): Dose = BE × peso × 0,3 = ${defBase.toFixed(1)} × ${pesoN} × 0,3 = ${doseTotal} mEq\n→ Dar 1/3 (${dose13} mEq) lentamente EV em 30–60min, diluído em AD 1:1\n→ Reavaliar gasometria 30–60min após`;
    } else if (meta_acid && ph < 7.20) {
      bicarb = "Informe o peso para calcular a dose de bicarbonato.";
    }

    // ── 5. OXIGENAÇÃO ─────────────────────────────────────────────────────────
    let oxStr = "",
      oxCor = "#16A34A",
      oxEmoji = "✅";
    if (po2 !== null && tipo === "arterial") {
      if (po2 >= 80 && po2 <= 100) {
        oxStr = "PaO₂ normal (80–100 mmHg)";
        oxCor = "#16A34A";
        oxEmoji = "✅";
      } else if (po2 >= 60 && po2 < 80) {
        oxStr = "Hipoxemia leve (60–79 mmHg)";
        oxCor = "#D97706";
        oxEmoji = "⚠️";
      } else if (po2 >= 40 && po2 < 60) {
        oxStr = "Hipoxemia moderada (40–59 mmHg)";
        oxCor = "#EA580C";
        oxEmoji = "🔴";
      } else if (po2 < 40) {
        oxStr = "Hipoxemia grave (<40 mmHg)";
        oxCor = "#DC2626";
        oxEmoji = "🚨";
      } else if (po2 > 100) {
        oxStr = "Hiperoxia (>100 mmHg) — Reduzir FiO₂";
        oxCor = "#7C3AED";
        oxEmoji = "⚠️";
      }
    }

    // ── 6. CORREÇÕES NO VM ────────────────────────────────────────────────────
    if (vm) {
      const frN = parseFloat(params.fr),
        vtN = parseFloat(params.vt),
        peepN = parseFloat(params.peep),
        fio2N = parseFloat(params.fio2),
        pipN = parseFloat(params.pip);
      if (pco2 > 55) {
        corVM.push({
          tipo: "PCO₂ ELEVADO",
          cor: "#DC2626",
          bg: "#FEE2E2",
          acoes: [`↑ Frequência respiratória em +5–10 irpm (atual: ${isNaN(frN) ? "—" : frN} → ${isNaN(frN) ? "—" : frN + 8} irpm)`, `↑ Volume corrente em +0,5–1 ml/kg (atual: ${isNaN(vtN) ? "—" : vtN} ml/kg → ${isNaN(vtN) ? "—" : (vtN + 0.5).toFixed(1)} ml/kg; máx 6ml/kg)`, "↑ Tempo inspiratório se Ti muito curto", "Verificar vazamento de cuff/tubo"]
        });
      } else if (pco2 < 30) {
        corVM.push({
          tipo: "PCO₂ BAIXO — Hiperventilação",
          cor: "#7C3AED",
          bg: "#EDE9FE",
          acoes: [`↓ Frequência respiratória em −4–6 irpm (atual: ${isNaN(frN) ? "—" : frN} → ${isNaN(frN) ? "—" : Math.max(20, frN - 5)} irpm)`, `↓ Volume corrente em −0,5 ml/kg (atual: ${isNaN(vtN) ? "—" : vtN} ml/kg → ${isNaN(vtN) ? "—" : (vtN - 0.5).toFixed(1)} ml/kg)`, "Atenção: hiperventilação → vasoconstrição cerebral em neonatos"]
        });
      }
      if (po2 !== null && tipo === "arterial") {
        if (po2 < 60) {
          corVM.push({
            tipo: "HIPOXEMIA — Ajustar VM",
            cor: "#EA580C",
            bg: "#FFF7ED",
            acoes: [`↑ FiO₂ em +10% (atual: ${isNaN(fio2N) ? "—" : fio2N}% → ${isNaN(fio2N) ? "—" : Math.min(100, fio2N + 10)}%)`, `↑ PEEP em +1–2 cmH₂O (atual: ${isNaN(peepN) ? "—" : peepN} → ${isNaN(peepN) ? "—" : peepN + 2} cmH₂O; máx 8 cmH₂O em neonatos)`, `↑ PIP se necessário (atual: ${isNaN(pipN) ? "—" : pipN} cmH₂O; delta P=PIP-PEEP deve ser ≥10)`, "Verificar obstrução/dobradura do tubo, posição"]
          });
        } else if (po2 > 100) {
          corVM.push({
            tipo: "HIPEROXIA — Reduzir FiO₂",
            cor: "#0369A1",
            bg: "#F0F9FF",
            acoes: [`↓ FiO₂ em −5–10% (atual: ${isNaN(fio2N) ? "—" : fio2N}% → ${isNaN(fio2N) ? "—" : Math.max(21, fio2N - 10)}%)`, "Alvo SpO₂: 91–95% em RNPT; 95–98% em RN a termo", "Hiperoxia → retinopatia, displasia broncopulmonar em RNPT"]
          });
        }
      }
      if (ph < 7.25 && !meta_acid) {
        corVM.push({
          tipo: "ACIDOSE RESP. GRAVE — VM",
          cor: "#DC2626",
          bg: "#FEE2E2",
          acoes: [`↑ FR + VT para aumentar ventilação minuto`, `↑ PIP em +2 cmH₂O se volumes baixos`, "Considerar VAFO se OI elevado", "Descartar pneumotórax, obstrução, atelectasia"]
        });
      }
      if (ph > 7.55) {
        corVM.push({
          tipo: "ALCALOSE — VM",
          cor: "#7C3AED",
          bg: "#EDE9FE",
          acoes: [`↓ FR em −5–10 irpm`, `↓ VT em −0,5 ml/kg`, "Se alcalose metabólica: tratar causa base (hipocalemia, hipovolemia)"]
        });
      }
    }

    // ── 7. TRATAMENTOS ────────────────────────────────────────────────────────
    if (disturbio.includes("Acidose Metabólica")) {
      if (agAlto) {
        corTrat.push("🔍 Investigar causa AG elevado: sepse, hipóxia, cetoacidose, hipoglicemia, erros inatos do metabolismo, salicilatos");
        corTrat.push("💉 Se sepse: hemocultura + antibioticoterapia empírica");
        corTrat.push("🍼 Otimizar perfusão: volume, inotrópicos se necessário");
        corTrat.push("🩺 Glicemia urgente — corrigir hipoglicemia se presente");
      } else {
        corTrat.push("🔍 Investigar acidose hiperclorêmica: reposição excessiva de NaCl, ATR, diarreia");
        corTrat.push("💧 Reduzir oferta de cloreto se iatrogênica");
      }
      if (bicarb) corTrat.push("⚗️ Bicarbonato: " + bicarb);
      if (ph < 7.20) corTrat.push("🚨 pH <7,20 → Tratar causa + considerar correção com NaHCO₃");
    }
    if (disturbio.includes("Alcalose Metabólica")) {
      corTrat.push("🔍 Investigar: vômitos, aspiração gástrica, hipocalemia, excesso de bicarbonato, furosemida");
      corTrat.push("💊 Corrigir hipocalemia se presente (KCl EV)");
      corTrat.push("💧 Repor volume se depleção");
    }
    if (disturbio.includes("Acidose Respiratória") && !vm) {
      corTrat.push("🫁 Suporte ventilatório: CPAP, VNI ou IOT + VM conforme gravidade");
      corTrat.push("💊 Surfactante se SDR em RNPT");
      corTrat.push("🏥 Avaliar necessidade de intubação urgente");
    }
    if (disturbio.includes("Alcalose Respiratória") && !vm) {
      corTrat.push("🔍 Causas: febre, dor, sepse precoce, hiperestimulação, anxiedade");
      corTrat.push("💊 Tratar a causa base");
    }
    if (disturbio.includes("Normal")) {
      corTrat.push("✅ Gasometria dentro dos limites normais para neonatos/pediatria");
      corTrat.push("📋 Manter monitoramento conforme estado clínico");
    }
    setRes({
      disturbio,
      gravPh,
      corPh,
      bgPh,
      emojiPh,
      compens,
      agStr,
      agAlto,
      deltaDelta,
      oxStr,
      oxCor,
      oxEmoji,
      bicarb,
      corVM,
      corTrat,
      misto,
      ph,
      pco2,
      hco3,
      po2,
      be,
      tipo
    });
  };
  const limpar = () => {
    setVals({
      ph: "",
      pco2: "",
      po2: "",
      hco3: "",
      be: "",
      spo2: "",
      na: "",
      cl: ""
    });
    setPeso("");
    setVm(false);
    setParams({
      fr: "",
      vt: "",
      peep: "",
      fio2: "",
      pip: ""
    });
    setRes(null);
  };
  const inpS = {
    width: "100%",
    padding: "9px 10px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    background: "#FAFAFA",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    fontWeight: 700
  };
  const lbS = {
    fontSize: 10,
    fontWeight: 700,
    color: "#374151",
    display: "block",
    marginBottom: 3,
    textAlign: "center"
  };

  // Normal ranges for neonates
  const normals = {
    arterial: {
      ph: "7,35–7,45",
      pco2: "35–45",
      po2: "60–90",
      hco3: "22–26",
      be: "-2 a +2"
    },
    venoso: {
      ph: "7,31–7,41",
      pco2: "41–51",
      po2: "25–40",
      hco3: "22–26",
      be: "-2 a +2"
    },
    capilar: {
      ph: "7,33–7,43",
      pco2: "36–46",
      po2: "45–60",
      hco3: "22–26",
      be: "-2 a +2"
    }
  };
  const norm = normals[tipo];
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83E\uDE7A Gasometria \u2014 Interpreta\xE7\xE3o Neonatal/Pedi\xE1trica",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#ECFEFF,#CFFAFE)",
      borderRadius: 11,
      border: "1px solid #06B6D420"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#22D3EE,#06B6D4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(6,182,212,0.3)"
    }
  }, "\uD83E\uDE7A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#155E75"
    }
  }, "Interpreta\xE7\xE3o Sistem\xE1tica \u2014 6 passos"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#0E7490",
      marginTop: 1
    }
  }, "Neonatal \xB7 Pedi\xE1trico \xB7 Com corre\xE7\xE3o de VM"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 5
    }
  }, "Tipo de Amostra"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, [["arterial", "🩸 Arterial"], ["venoso", "💙 Venoso"], ["capilar", "💧 Capilar"]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setTipo(v),
    style: {
      flex: 1,
      padding: "8px 6px",
      borderRadius: 9,
      border: `1.5px solid ${tipo === v ? "#06B6D4" : "#E5E7EB"}`,
      background: tipo === v ? "#ECFEFF" : "white",
      color: tipo === v ? "#0369A1" : "#6B7280",
      fontWeight: tipo === v ? 700 : 500,
      fontSize: 11,
      transition: "all 0.15s"
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0FDFA",
      borderRadius: 9,
      padding: "7px 11px",
      marginBottom: 12,
      border: "1px solid #99F6E4",
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      color: "#0F766E",
      fontWeight: 700
    }
  }, "Refer\xEAncia ", tipo, ":"), [["pH", norm.ph], ["PCO₂", norm.pco2 + " mmHg"], ["PO₂", norm.po2 + " mmHg"], ["HCO₃⁻", norm.hco3 + " mEq/L"], ["BE", norm.be]].map(([k, v]) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      fontSize: 9.5,
      color: "#0F766E"
    }
  }, /*#__PURE__*/React.createElement("b", null, k, ":"), " ", v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      marginBottom: 10
    }
  }, [{
    k: "ph",
    l: "pH",
    p: "Ex: 7.28",
    cor: "#DC2626"
  }, {
    k: "pco2",
    l: "PCO₂ (mmHg)",
    p: "Ex: 58",
    cor: "#D97706"
  }, {
    k: "po2",
    l: "PO₂ (mmHg)",
    p: "Ex: 65",
    cor: "#7C3AED"
  }, {
    k: "hco3",
    l: "HCO₃⁻ (mEq/L)",
    p: "Ex: 18",
    cor: "#0369A1"
  }, {
    k: "be",
    l: "Base Excess",
    p: "Ex: -8",
    cor: "#DC2626"
  }, {
    k: "spo2",
    l: "SpO₂ (%)",
    p: "Ex: 88",
    cor: "#16A34A"
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.k
  }, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, f.l), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      borderColor: vals[f.k] ? f.cor + "60" : "#E5E7EB",
      color: vals[f.k] ? f.cor : "#374151"
    },
    type: "number",
    step: "0.01",
    value: vals[f.k],
    onChange: e => sv(f.k, e.target.value),
    placeholder: f.p
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "S\xF3dio Na\u207A ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mEq/L)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    value: vals.na,
    onChange: e => sv("na", e.target.value),
    placeholder: "Ex: 138"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Cloreto Cl\u207B ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mEq/L)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    value: vals.cl,
    onChange: e => sv("cl", e.target.value),
    placeholder: "Ex: 105"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Peso ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(kg)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.1",
    value: peso,
    onChange: e => setPeso(e.target.value),
    placeholder: "Ex: 1.8"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      marginBottom: vm ? 10 : 0
    },
    onClick: () => setVm(v => !v)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 20,
      borderRadius: 10,
      background: vm ? "#06B6D4" : "#D1D5DB",
      position: "relative",
      transition: "background 0.2s",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 2,
      left: vm ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "white",
      transition: "left 0.2s",
      boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: vm ? "#0369A1" : "#6B7280"
    }
  }, "\uD83E\uDEC1 Em Ventila\xE7\xE3o Mec\xE2nica")), vm && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0F9FF",
      borderRadius: 10,
      padding: "10px 12px",
      border: "1px solid #BAE6FD"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#0369A1",
      marginBottom: 8
    }
  }, "PAR\xC2METROS ATUAIS DO VM"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }
  }, [{
    k: "fr",
    l: "FR (irpm)",
    p: "Ex: 50"
  }, {
    k: "vt",
    l: "VT (ml/kg)",
    p: "Ex: 5"
  }, {
    k: "peep",
    l: "PEEP (cmH₂O)",
    p: "Ex: 5"
  }, {
    k: "fio2",
    l: "FiO₂ (%)",
    p: "Ex: 60"
  }, {
    k: "pip",
    l: "PIP (cmH₂O)",
    p: "Ex: 20"
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.k
  }, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, f.l), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      fontSize: 12
    },
    type: "number",
    step: "0.5",
    value: params[f.k],
    onChange: e => sp(f.k, e.target.value),
    placeholder: f.p
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#06B6D4,#22D3EE)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(6,182,212,0.4)"
    }
  }, "\u26A1 Interpretar")), res && (res.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 12,
      padding: 14,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", res.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.bgPh,
      borderRadius: 15,
      padding: "13px 14px",
      marginBottom: 12,
      border: `2px solid ${res.corPh}30`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 3
    }
  }, res.emojiPh), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 38,
      fontWeight: 900,
      color: res.corPh,
      lineHeight: 1
    }
  }, "pH ", res.ph), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: res.corPh,
      marginTop: 4
    }
  }, res.gravPh)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 7,
      marginBottom: 12
    }
  }, [{
    l: "PCO₂",
    v: `${res.pco2} mmHg`,
    status: res.pco2 > 45 ? "↑" : res.pco2 < 35 ? "↓" : "✓",
    cor: res.pco2 > 45 ? "#DC2626" : res.pco2 < 35 ? "#7C3AED" : "#16A34A",
    bg: res.pco2 > 45 ? "#FEE2E2" : res.pco2 < 35 ? "#EDE9FE" : "#DCFCE7"
  }, {
    l: "HCO₃⁻",
    v: `${res.hco3} mEq/L`,
    status: res.hco3 < 22 ? "↓" : res.hco3 > 26 ? "↑" : "✓",
    cor: res.hco3 < 22 ? "#DC2626" : res.hco3 > 26 ? "#7C3AED" : "#16A34A",
    bg: res.hco3 < 22 ? "#FEE2E2" : res.hco3 > 26 ? "#EDE9FE" : "#DCFCE7"
  }, res.po2 ? {
    l: "PO₂",
    v: `${res.po2} mmHg`,
    status: res.po2 < 60 ? "↓" : res.po2 > 100 ? "↑" : "✓",
    cor: res.po2 < 60 ? "#DC2626" : res.po2 > 100 ? "#7C3AED" : "#16A34A",
    bg: res.po2 < 60 ? "#FEE2E2" : res.po2 > 100 ? "#EDE9FE" : "#DCFCE7"
  } : null].filter(Boolean).map(p => /*#__PURE__*/React.createElement("div", {
    key: p.l,
    style: {
      background: p.bg,
      borderRadius: 9,
      padding: "8px",
      textAlign: "center",
      border: `1px solid ${p.cor}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: p.cor,
      fontWeight: 700,
      marginBottom: 1
    }
  }, p.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 900,
      color: p.cor
    }
  }, p.status, " ", p.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#155E75,#0E7490)",
      borderRadius: 13,
      padding: "12px 14px",
      marginBottom: 12,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.6)",
      fontWeight: 700,
      marginBottom: 4
    }
  }, "\uD83D\uDD2C DIST\xDARBIO PRIM\xC1RIO"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      lineHeight: 1.3
    }
  }, res.disturbio), res.misto && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      padding: "4px 10px",
      borderRadius: 7,
      background: "rgba(255,255,255,0.15)",
      fontSize: 11,
      fontWeight: 700
    }
  }, "\u26A0\uFE0F Dist\xFArbio misto \u2014 avaliar cada componente")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "10px 12px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 4
    }
  }, "\uD83D\uDCD0 COMPENSA\xC7\xC3O ESPERADA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#374151",
      lineHeight: 1.6
    }
  }, res.compens)), res.oxStr && /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.oxCor === "#16A34A" ? "#DCFCE7" : "#FFF7ED",
      borderRadius: 11,
      padding: "9px 12px",
      marginBottom: 12,
      border: `1px solid ${res.oxCor}30`,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, res.oxEmoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151"
    }
  }, "Oxigena\xE7\xE3o (PaO\u2082)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: res.oxCor,
      fontWeight: 600
    }
  }, res.oxStr))), res.agStr && /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.agAlto ? "#FEF9C3" : "#F9FAFB",
      borderRadius: 11,
      padding: "9px 12px",
      marginBottom: 12,
      border: `1px solid ${res.agAlto ? "#F59E0B" : "#E5E7EB"}30`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 3
    }
  }, "\uD83D\uDD22 \xC2NION GAP"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#374151",
      lineHeight: 1.6
    }
  }, res.agStr), res.deltaDelta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 12,
      color: "#D97706",
      fontWeight: 600
    }
  }, "\u0394/\u0394: ", res.deltaDelta)), res.corTrat.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#064E3B,#065F46)",
      borderRadius: 13,
      padding: "12px 14px",
      marginBottom: 12,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.6)",
      fontWeight: 700,
      marginBottom: 8
    }
  }, "\uD83D\uDC8A TRATAMENTO E CONDUTA"), res.corTrat.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12,
      lineHeight: 1.7,
      color: "rgba(255,255,255,0.9)",
      paddingLeft: 8,
      borderLeft: "2px solid rgba(255,255,255,0.2)",
      marginBottom: 4
    }
  }, t))), res.corVM.length > 0 && res.corVM.map((bloco, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: bloco.bg,
      borderRadius: 13,
      padding: "12px 14px",
      marginBottom: 10,
      border: `2px solid ${bloco.cor}30`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "\uD83E\uDEC1"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: bloco.cor
    }
  }, bloco.tipo)), bloco.acoes.map((a, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    style: {
      fontSize: 12,
      color: "#374151",
      padding: "5px 8px",
      borderRadius: 7,
      background: "rgba(255,255,255,0.6)",
      marginBottom: 4,
      lineHeight: 1.5,
      display: "flex",
      gap: 6,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      color: bloco.cor
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("span", null, a))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 10,
      padding: "9px 12px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF",
      lineHeight: 1.6
    }
  }, "\u2695\uFE0F Interpreta\xE7\xE3o autom\xE1tica para uso de apoio cl\xEDnico. Sempre correlacionar com quadro cl\xEDnico, exames complementares e evolu\xE7\xE3o do paciente. Seguir protocolos institucionais.")))));
}

// ── TFG CALCULATOR ────────────────────────────────────────────────────────────
function TFGCalc({
  onClose
}) {
  const [metodo, setMetodo] = useState("schwartz"); // schwartz | schwartz_bedside | diurese
  const [vals, setVals] = useState({
    comprimento: "",
    creatinina: "",
    diurese: "",
    peso: "",
    ig: "",
    idadeVida: "",
    ureia: "",
    sodioU: "",
    creatU: "",
    volumeU: ""
  });
  const [res, setRes] = useState(null);
  const sv = (k, v) => setVals(x => ({
    ...x,
    [k]: v
  }));

  // Constante k de Schwartz por perfil
  const getK = (ig, idadeVidaDias) => {
    const idVSem = idadeVidaDias / 7;
    const igCor = parseFloat(ig) + idVSem;
    if (igCor < 34) return {
      k: 0.33,
      desc: "RNPT <34 sem IG corrigida"
    };
    if (igCor < 37) return {
      k: 0.33,
      desc: "RNPT 34–36 sem IG corrigida"
    };
    if (idadeVidaDias <= 28) return {
      k: 0.45,
      desc: "RN a termo / Neonato"
    };
    if (idadeVidaDias <= 365) return {
      k: 0.45,
      desc: "Lactente <1 ano"
    };
    return {
      k: 0.55,
      desc: "Criança >1 ano"
    };
  };
  const calcular = () => {
    const comprN = parseFloat(vals.comprimento);
    const creatN = parseFloat(vals.creatinina);
    const igN = parseFloat(vals.ig) || 40;
    const idadeVN = parseFloat(vals.idadeVida) || 1;
    const pesoN = parseFloat(vals.peso);
    if (metodo === "schwartz" || metodo === "schwartz_bedside") {
      if (isNaN(comprN) || isNaN(creatN)) {
        setRes({
          erro: "Comprimento e Creatinina são obrigatórios."
        });
        return;
      }
      if (comprN < 20 || comprN > 200) {
        setRes({
          erro: "Comprimento deve ser entre 20 e 200 cm."
        });
        return;
      }
      if (creatN < 0.1 || creatN > 20) {
        setRes({
          erro: "Creatinina deve ser entre 0,1 e 20 mg/dL."
        });
        return;
      }
    }
    let tfg, formula, kInfo;
    if (metodo === "schwartz") {
      kInfo = getK(igN, idadeVN);
      tfg = parseFloat((kInfo.k * comprN / creatN).toFixed(1));
      formula = `TFG = k × Comprimento / Creatinina = ${kInfo.k} × ${comprN} / ${creatN} = ${tfg} mL/min/1,73m²`;
    } else if (metodo === "schwartz_bedside") {
      // Schwartz bedside (pediátrico >2 anos): k=0.413
      tfg = parseFloat((0.413 * comprN / creatN).toFixed(1));
      formula = `TFG Bedside = 0,413 × Comprimento / Creatinina = 0,413 × ${comprN} / ${creatN} = ${tfg} mL/min/1,73m²`;
      kInfo = {
        k: 0.413,
        desc: "Schwartz Bedside (>2 anos)"
      };
    } else {
      // Diurese / clearance endógeno
      const diureseN = parseFloat(vals.diurese);
      const creatUn = parseFloat(vals.creatU);
      const volUn = parseFloat(vals.volumeU);
      if (isNaN(diureseN) || isNaN(creatN) || isNaN(pesoN)) {
        setRes({
          erro: "Diurese (ml/kg/h), Creatinina sérica e Peso são obrigatórios para este método."
        });
        return;
      }
      // Clearance simplificado
      const diurMlMin = diureseN * pesoN / 60;
      if (!isNaN(creatUn) && !isNaN(volUn)) {
        tfg = parseFloat((creatUn * volUn / (creatN * 1440)).toFixed(1));
        formula = `Clearance = [Creat.Urinária × Volume24h] / [Creat.Sérica × 1440] = [${creatUn} × ${volUn}] / [${creatN} × 1440] = ${tfg} mL/min`;
      } else {
        tfg = parseFloat((diureseN * pesoN / 60 * 100 / creatN).toFixed(1));
        formula = `Clearance estimado pela diurese = ${tfg} mL/min/1,73m²`;
      }
      kInfo = {
        k: null,
        desc: "Clearance de Creatinina (urinário)"
      };
    }

    // ── REFERÊNCIA NEONATAL/PEDIÁTRICA ──────────────────────────────────────
    // ml/min/1,73m²
    let normalMin, normalMax, idadePerfil;
    const igCor = igN + idadeVN / 7;
    if (igCor < 30) {
      normalMin = 5;
      normalMax = 15;
      idadePerfil = "RNPT <30 sem IG corrigida";
    } else if (igCor < 34) {
      normalMin = 8;
      normalMax = 20;
      idadePerfil = "RNPT 30–33 sem IG corrigida";
    } else if (igCor < 37) {
      normalMin = 10;
      normalMax = 25;
      idadePerfil = "RNPT 34–36 sem IG corrigida";
    } else if (idadeVN <= 7) {
      normalMin = 15;
      normalMax = 40;
      idadePerfil = "RN a termo 1ª semana";
    } else if (idadeVN <= 28) {
      normalMin = 25;
      normalMax = 55;
      idadePerfil = "Neonato 1–4 sem";
    } else if (idadeVN <= 180) {
      normalMin = 35;
      normalMax = 80;
      idadePerfil = "Lactente 1–6 meses";
    } else if (idadeVN <= 365) {
      normalMin = 55;
      normalMax = 100;
      idadePerfil = "Lactente 6–12 meses";
    } else {
      normalMin = 80;
      normalMax = 120;
      idadePerfil = "Criança >1 ano";
    }

    // ── CLASSIFICAÇÃO KDIGO ADAPTADA NEONATAL ──────────────────────────────
    let estadio, cor, bgCor, emoji, descEstadio;
    const pct = tfg / normalMax;
    if (tfg >= normalMin) {
      estadio = "Normal para a idade";
      cor = "#16A34A";
      bgCor = "#DCFCE7";
      emoji = "✅";
      descEstadio = `TFG dentro do esperado para ${idadePerfil}`;
    } else if (tfg >= normalMin * 0.7) {
      estadio = "Levemente reduzida (KDIGO G2)";
      cor = "#D97706";
      bgCor = "#FEF9C3";
      emoji = "⚠️";
      descEstadio = "Redução leve — monitorar hidratação, medicamentos nefrotóxicos e perfusão renal";
    } else if (tfg >= normalMin * 0.5) {
      estadio = "Redução Moderada (KDIGO G3a–G3b)";
      cor = "#EA580C";
      bgCor = "#FFF7ED";
      emoji = "🔴";
      descEstadio = "Redução moderada — risco de acúmulo de toxinas e desequilíbrio eletrolítico";
    } else if (tfg >= normalMin * 0.25) {
      estadio = "Redução Grave (KDIGO G4)";
      cor = "#DC2626";
      bgCor = "#FEE2E2";
      emoji = "🚨";
      descEstadio = "Redução grave — risco elevado de IRA / IRC — avaliar diálise peritoneal";
    } else {
      estadio = "Insuficiência Renal / Falência (KDIGO G5)";
      cor = "#7F1D1D";
      bgCor = "#FEE2E2";
      emoji = "🆘";
      descEstadio = "Falência renal — avaliar indicação de diálise peritoneal ou terapia de substituição renal";
    }

    // ── DIURESE AVALIAÇÃO ──────────────────────────────────────────────────
    const diureseN2 = parseFloat(vals.diurese);
    let diureseStatus = "",
      diurCor = "#16A34A",
      diurEmoji = "✅";
    if (!isNaN(diureseN2)) {
      if (diureseN2 >= 1 && diureseN2 <= 3) {
        diureseStatus = "Diurese normal (1–3 ml/kg/h)";
        diurCor = "#16A34A";
        diurEmoji = "✅";
      } else if (diureseN2 >= 0.5 && diureseN2 < 1) {
        diureseStatus = "Oligúria leve (0,5–1 ml/kg/h)";
        diurCor = "#D97706";
        diurEmoji = "⚠️";
      } else if (diureseN2 > 0 && diureseN2 < 0.5) {
        diureseStatus = "Oligúria grave (<0,5 ml/kg/h) — Critério de IRA";
        diurCor = "#DC2626";
        diurEmoji = "🚨";
      } else if (diureseN2 === 0) {
        diureseStatus = "Anúria — Emergência nefrológica";
        diurCor = "#7F1D1D";
        diurEmoji = "🆘";
      } else if (diureseN2 > 3 && diureseN2 <= 5) {
        diureseStatus = "Poliúria leve (3–5 ml/kg/h)";
        diurCor = "#D97706";
        diurEmoji = "⚠️";
      } else if (diureseN2 > 5) {
        diureseStatus = "Poliúria grave (>5 ml/kg/h) — avaliar diabetes insipidus, fase de recuperação de IRA";
        diurCor = "#DC2626";
        diurEmoji = "🔴";
      }
    }

    // ── UREIA ──────────────────────────────────────────────────────────────
    const ureiaV = parseFloat(vals.ureia);
    let ureiaStatus = "",
      ureiaCor = "#16A34A";
    if (!isNaN(ureiaV)) {
      if (ureiaV <= 20) {
        ureiaStatus = `Ureia normal (≤20 mg/dL) — ${ureiaV} mg/dL ✅`;
      } else if (ureiaV <= 40) {
        ureiaStatus = `Ureia levemente elevada (${ureiaV} mg/dL) — monitorar ⚠️`;
        ureiaCor = "#D97706";
      } else if (ureiaV <= 100) {
        ureiaStatus = `Ureia elevada (${ureiaV} mg/dL) — avaliar IRA 🔴`;
        ureiaCor = "#EA580C";
      } else {
        ureiaStatus = `Ureia muito elevada (${ureiaV} mg/dL) — síndrome urêmica 🚨`;
        ureiaCor = "#DC2626";
      }
    }

    // ── ORIENTAÇÕES ───────────────────────────────────────────────────────
    const orientacoes = [];
    if (estadio.includes("Normal")) {
      orientacoes.push({
        emoji: "✅",
        titulo: "Função Renal Normal",
        desc: "Manter monitoramento rotineiro. Assegurar hidratação adequada (150ml/kg/dia em RNPT, 120ml/kg/dia em RN a termo).",
        cor: "#16A34A",
        bg: "#DCFCE7"
      });
      orientacoes.push({
        emoji: "📋",
        titulo: "Monitoramento",
        desc: "Controle de creatinina e ureia conforme evolução clínica. Ajuste de drogas nefrotóxicas pelo peso e IG.",
        cor: "#0369A1",
        bg: "#F0F9FF"
      });
    }
    if (estadio.includes("Leve") || estadio.includes("Normal")) {
      orientacoes.push({
        emoji: "💊",
        titulo: "Drogas Nefrotóxicas",
        desc: "Evitar ou ajustar: Aminoglicosídeos (monitorar nível sérico), AINEs, Indometacina, Vancomicina, contraste iodado. Ajustar dose/intervalo conforme TFG.",
        cor: "#D97706",
        bg: "#FFFBEB"
      });
    }
    if (estadio.includes("Moderada") || estadio.includes("Grave") || estadio.includes("Falência")) {
      orientacoes.push({
        emoji: "🔴",
        titulo: "Restrição Hídrica e Eletrolítica",
        desc: "Restringir volume se oligúria: 400ml/m²/dia + reposição das perdas. Monitorar K⁺, Na⁺, Ca²⁺, P, pH a cada 6–12h. Evitar hipercalemia (K⁺ >6 mEq/L — risco de arritmia).",
        cor: "#DC2626",
        bg: "#FEE2E2"
      });
      orientacoes.push({
        emoji: "💉",
        titulo: "Manejo da Hipercalemia",
        desc: "K⁺ >6,5 mEq/L: Gluconato de cálcio 10% (0,5-1ml/kg EV lento) + Bicarbonato + Insulina/Glicose + Poliestirenossulfonato (Kayexalate). ECG urgente.",
        cor: "#DC2626",
        bg: "#FEE2E2"
      });
      orientacoes.push({
        emoji: "📡",
        titulo: "Avaliar Diálise Peritoneal",
        desc: "Indicações: anúria, hipercalemia refratária, acidose grave, sobrecarga hídrica, ureia >100mg/dL com sintomas. Diálise peritoneal é o método de escolha em neonatos.",
        cor: "#7F1D1D",
        bg: "#FEE2E2"
      });
    }
    if (estadio.includes("Moderada")) {
      orientacoes.push({
        emoji: "🔬",
        titulo: "Investigação Etiológica",
        desc: "IRA pré-renal: hipovolemia, hipoperfusão → volume. IRA intrínseca: NTA, nefrite — EQU, proteinúria, USG renal. IRA pós-renal: obstrução — USG vesical/renal urgente.",
        cor: "#EA580C",
        bg: "#FFF7ED"
      });
    }
    if (diureseN2 > 0 && diureseN2 < 0.5) {
      orientacoes.push({
        emoji: "🚿",
        titulo: "Prova de Volume",
        desc: "Oligúria grave → expansão com SF 0,9% 10-20ml/kg em 30min (se sem sobrecarga). Se sem resposta → furosemida 1mg/kg EV. Sem resposta → avaliar IRA intrínseca.",
        cor: "#EA580C",
        bg: "#FFF7ED"
      });
    }
    if (!isNaN(creatN) && creatN > 1.5) {
      orientacoes.push({
        emoji: "🩻",
        titulo: "Imagem Urgente",
        desc: "Creatinina elevada → USG renal + vias urinárias urgente para descartar uropatia obstrutiva, trombose vascular renal. Doppler renal se disponível.",
        cor: "#7C3AED",
        bg: "#F5F3FF"
      });
    }
    orientacoes.push({
      emoji: "📊",
      titulo: "Monitoramento Laboratorial",
      desc: `Frequência recomendada:\n• TFG normal: creatinina semanal\n• TFG reduzida: creatinina + ureia + eletrólitos 12/12h–24/24h\n• IRA grave: 6/6h até estabilização\nAlvo creatinina neonatal: ≤0,4 mg/dL após 2ª semana de vida`,
      cor: "#0369A1",
      bg: "#F0F9FF"
    });

    // ── EQUAÇÃO DO CLEARANCE SÓDIO (FENa) ────────────────────────────────
    let fenaStr = "";
    const sodioUN = parseFloat(vals.sodioU),
      creatUN2 = parseFloat(vals.creatU),
      naN = parseFloat(vals.na) || 140;
    if (!isNaN(sodioUN) && !isNaN(creatUN2) && !isNaN(creatN)) {
      const fena = parseFloat((sodioUN * creatN / (naN * creatUN2) * 100).toFixed(1));
      fenaStr = `FENa = (Na⁺ urinário × Cr sérica) / (Na⁺ sérico × Cr urinária) × 100 = ${fena}%\n→ ${fena < 1 ? "FENa <1%: IRA PRÉ-RENAL (reabsorção sódio preservada) → expansão volêmica" : fena < 3 ? "FENa 1–3%: Zona cinzenta — avaliar contexto" : fena >= 3 ? "FENa ≥3%: IRA INTRÍNSECA / NTA (lesão tubular)" : "—"}`;
    }
    setRes({
      tfg,
      formula,
      estadio,
      cor,
      bgCor,
      emoji,
      descEstadio,
      normalMin,
      normalMax,
      idadePerfil,
      kInfo,
      diureseStatus,
      diurCor,
      diurEmoji,
      ureiaStatus,
      ureiaCor,
      orientacoes,
      fenaStr,
      pct: Math.min(100, tfg / normalMax * 100)
    });
  };
  const limpar = () => {
    setVals({
      comprimento: "",
      creatinina: "",
      diurese: "",
      peso: "",
      ig: "",
      idadeVida: "",
      ureia: "",
      sodioU: "",
      creatU: "",
      volumeU: ""
    });
    setRes(null);
  };
  const inpS = {
    width: "100%",
    padding: "9px 10px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontSize: 13,
    color: "#111827",
    outline: "none",
    background: "#FAFAFA",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    fontWeight: 700
  };
  const lbS = {
    fontSize: 10,
    fontWeight: 700,
    color: "#374151",
    display: "block",
    marginBottom: 3,
    textAlign: "center"
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83E\uDED8 TFG \u2014 Taxa de Filtra\xE7\xE3o Glomerular",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#FFF7ED,#FFEDD5)",
      borderRadius: 11,
      border: "1px solid #F9731620"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#FB923C,#F97316)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(249,115,22,0.3)"
    }
  }, "\uD83E\uDED8"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#7C2D12"
    }
  }, "Fun\xE7\xE3o Renal Neonatal e Pedi\xE1trica"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9A3412",
      marginTop: 1
    }
  }, "Schwartz \xB7 Schwartz Bedside \xB7 Clearance Urin\xE1rio"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 5
    }
  }, "M\xE9todo de C\xE1lculo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexDirection: "column"
    }
  }, [["schwartz", "📐 Schwartz (Neonatal)", "k × Comprimento / Creatinina — para RN e lactentes"], ["schwartz_bedside", "📐 Schwartz Bedside (>2 anos)", "k=0,413 — validado para crianças >2 anos"], ["diurese", "🔬 Clearance de Creatinina", "Creatinina urinária e sérica — mais preciso"]].map(([v, l, sub]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setMetodo(v),
    style: {
      padding: "8px 12px",
      borderRadius: 10,
      border: `1.5px solid ${metodo === v ? "#F97316" : "#E5E7EB"}`,
      background: metodo === v ? "#FFF7ED" : "white",
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      gap: 10,
      alignItems: "center",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      border: `2px solid ${metodo === v ? "#F97316" : "#D1D5DB"}`,
      background: metodo === v ? "#F97316" : "white",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: metodo === v ? "#C2410C" : "#374151"
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF"
    }
  }, sub)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "IG ao Nascer ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(sem)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    min: "23",
    max: "42",
    value: vals.ig,
    onChange: e => sv("ig", e.target.value),
    placeholder: "Ex: 32"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Idade de Vida ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(dias)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    value: vals.idadeVida,
    onChange: e => sv("idadeVida", e.target.value),
    placeholder: "Ex: 14"
  }))), (metodo === "schwartz" || metodo === "schwartz_bedside") && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Comprimento ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(cm)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#F97316"
    },
    type: "number",
    step: "0.5",
    value: vals.comprimento,
    onChange: e => sv("comprimento", e.target.value),
    placeholder: "Ex: 48"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Creatinina s\xE9rica ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mg/dL)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#DC2626"
    },
    type: "number",
    step: "0.01",
    value: vals.creatinina,
    onChange: e => sv("creatinina", e.target.value),
    placeholder: "Ex: 0.6"
  }))), metodo === "diurese" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Creatinina s\xE9rica ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mg/dL)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#DC2626"
    },
    type: "number",
    step: "0.01",
    value: vals.creatinina,
    onChange: e => sv("creatinina", e.target.value),
    placeholder: "Ex: 0.8"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Creatinina urin\xE1ria ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mg/dL)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.1",
    value: vals.creatU,
    onChange: e => sv("creatU", e.target.value),
    placeholder: "Ex: 40"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Volume urin\xE1rio 24h ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mL)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    value: vals.volumeU,
    onChange: e => sv("volumeU", e.target.value),
    placeholder: "Ex: 200"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Peso ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(kg)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.1",
    value: vals.peso,
    onChange: e => sv("peso", e.target.value),
    placeholder: "Ex: 1.5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 10,
      padding: "10px 12px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 8
    }
  }, "DADOS ADICIONAIS (opcionais \u2014 para orienta\xE7\xF5es extras)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Peso ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(kg)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.1",
    value: vals.peso,
    onChange: e => sv("peso", e.target.value),
    placeholder: "Ex: 1.5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Diurese ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(ml/kg/h)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.1",
    value: vals.diurese,
    onChange: e => sv("diurese", e.target.value),
    placeholder: "Ex: 1.2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Ureia ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mg/dL)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    value: vals.ureia,
    onChange: e => sv("ureia", e.target.value),
    placeholder: "Ex: 25"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Na\u207A s\xE9rico ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mEq/L)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    value: vals.na,
    onChange: e => sv("na", e.target.value),
    placeholder: "Ex: 138"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Na\u207A urin\xE1rio ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mEq/L)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    value: vals.sodioU,
    onChange: e => sv("sodioU", e.target.value),
    placeholder: "Ex: 30"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Cr urin\xE1ria ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mg/dL)")), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.1",
    value: vals.creatU,
    onChange: e => sv("creatU", e.target.value),
    placeholder: "Ex: 40"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#F97316,#FB923C)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(249,115,22,0.4)"
    }
  }, "\u26A1 Calcular TFG")), res && (res.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 12,
      padding: 14,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", res.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.bgCor,
      borderRadius: 16,
      padding: "14px 16px",
      marginBottom: 12,
      border: `2px solid ${res.cor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      marginBottom: 4
    }
  }, res.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 42,
      fontWeight: 900,
      color: res.cor,
      lineHeight: 1
    }
  }, res.tfg), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: res.cor + "99",
      fontWeight: 600,
      marginBottom: 4
    }
  }, "mL/min/1,73m\xB2"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: "4px 16px",
      borderRadius: 20,
      background: res.cor,
      color: "white",
      fontWeight: 900,
      fontSize: 11,
      marginBottom: 6
    }
  }, res.estadio), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: res.cor,
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, res.descEstadio)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "9px 13px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 3
    }
  }, "\uD83D\uDCD0 F\xD3RMULA APLICADA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#374151",
      fontWeight: 600,
      lineHeight: 1.6
    }
  }, res.formula), res.kInfo && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#6B7280",
      marginTop: 3
    }
  }, "k=", res.kInfo.k, " \u2014 ", res.kInfo.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: "10px 13px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 8
    }
  }, "\uD83D\uDCCA TFG vs REFER\xCANCIA \u2014 ", res.idadePerfil), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 26,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 6,
      background: "#F3F4F6"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: `${res.normalMin / res.normalMax * 100}%`,
      height: "100%",
      background: "#FEE2E2"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${res.normalMin / res.normalMax * 100}%`,
      width: `${100 - res.normalMin / res.normalMax * 100}%`,
      height: "100%",
      background: "#DCFCE7"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${Math.min(97, res.pct)}%`,
      width: 3,
      height: "100%",
      background: res.cor,
      transform: "translateX(-50%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: `${Math.min(94, res.pct)}%`,
      transform: "translate(-50%,-50%)",
      background: res.cor,
      color: "white",
      borderRadius: 5,
      padding: "1px 6px",
      fontSize: 10,
      fontWeight: 900,
      whiteSpace: "nowrap"
    }
  }, res.tfg)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 10,
      color: "#9CA3AF"
    }
  }, /*#__PURE__*/React.createElement("span", null, "0"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#DC2626"
    }
  }, "\u2191", res.normalMin, " (m\xEDn)"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#16A34A"
    }
  }, "\u2191", res.normalMax, " (m\xE1x)")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 11,
      color: "#374151",
      fontWeight: 600
    }
  }, "Normal para ", res.idadePerfil, ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#16A34A",
      fontWeight: 800
    }
  }, res.normalMin, "\u2013", res.normalMax, " mL/min/1,73m\xB2"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: res.diureseStatus && res.ureiaStatus ? "1fr 1fr" : "1fr",
      gap: 8,
      marginBottom: 12
    }
  }, res.diureseStatus && /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.diurCor === "#16A34A" ? "#DCFCE7" : res.diurCor === "#D97706" ? "#FEF9C3" : "#FEE2E2",
      borderRadius: 10,
      padding: "8px 10px",
      border: `1px solid ${res.diurCor}30`,
      display: "flex",
      gap: 7,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      flexShrink: 0
    }
  }, res.diurEmoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: res.diurCor
    }
  }, "Diurese"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: res.diurCor,
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, res.diureseStatus))), res.ureiaStatus && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 10,
      padding: "8px 10px",
      border: `1px solid ${res.ureiaCor}30`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 2
    }
  }, "Ureia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: res.ureiaCor,
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, res.ureiaStatus))), res.fenaStr && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F5F3FF",
      borderRadius: 11,
      padding: "10px 13px",
      marginBottom: 12,
      border: "1px solid #DDD6FE"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#7C3AED",
      marginBottom: 4
    }
  }, "\uD83D\uDD2C FRA\xC7\xC3O DE EXCRE\xC7\xC3O DE S\xD3DIO (FENa)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#374151",
      lineHeight: 1.7,
      whiteSpace: "pre-wrap"
    }
  }, res.fenaStr)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 8
    }
  }, "\uD83D\uDC8A ORIENTA\xC7\xD5ES E CONDUTA"), res.orientacoes.map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: o.bg,
      borderRadius: 12,
      padding: "10px 13px",
      marginBottom: 8,
      border: `1.5px solid ${o.cor}25`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, o.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: o.cor
    }
  }, o.titulo)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#374151",
      lineHeight: 1.65,
      whiteSpace: "pre-wrap",
      paddingLeft: 25
    }
  }, o.desc)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "10px 13px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 7
    }
  }, "\uD83D\uDCCB REFER\xCANCIA \u2014 TFG NORMAL POR IDADE (Neonatal/Pedi\xE1trica)"), [["RNPT <30 sem IG cor.", "5–15", "mL/min/1,73m²"], ["RNPT 30–33 sem", "8–20", "mL/min/1,73m²"], ["RNPT 34–36 sem", "10–25", "mL/min/1,73m²"], ["RN a termo 1ª semana", "15–40", "mL/min/1,73m²"], ["Neonato 1–4 semanas", "25–55", "mL/min/1,73m²"], ["Lactente 1–6 meses", "35–80", "mL/min/1,73m²"], ["Lactente 6–12 meses", "55–100", "mL/min/1,73m²"], ["Criança >1 ano", "80–120", "mL/min/1,73m²"]].map(([idade, val, un]) => /*#__PURE__*/React.createElement("div", {
    key: idade,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "5px 7px",
      borderRadius: 7,
      marginBottom: 3,
      background: "white",
      border: "1px solid #F3F4F6"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1.5,
      fontSize: 11,
      color: "#374151",
      fontWeight: 600
    }
  }, idade), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "#F97316"
    }
  }, val), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      color: "#9CA3AF"
    }
  }, un))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF",
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "\u26A0\uFE0F A TFG matura progressivamente. RNPT tem fun\xE7\xE3o renal fisiologicamente reduzida. Creatinina reflete a creatinina materna nas primeiras 48\u201372h de vida.")))));
}

// ── VENÓCLISE / HIDRATAÇÃO VENOSA CALCULATOR ─────────────────────────────────
function VenocliseCalc({
  onClose
}) {
  const [peso, setPeso] = useState("");
  const [tipo, setTipo] = useState("rnpt"); // rnpt | rnt
  const [dia, setDia] = useState("1");
  const [foto, setFoto] = useState(false);
  const [vmi, setVmi] = useState(false);
  const [vig, setVig] = useState("4.5");
  // eletrólitos - concentração escolhida
  const [nacl, setNacl] = useState("20"); // 10 ou 20%
  const [kcl, setKcl] = useState("10"); // 10 ou 19.1%
  const [mgso4, setMgso4] = useState("50"); // 10 ou 50%
  // doses custom (mEq/kg) - podem ser alteradas
  const [naclDose, setNaclDose] = useState("");
  const [kclDose, setKclDose] = useState("");
  const [mgso4Dose, setMgso4Dose] = useState("");
  const [glucCaDose, setGlucCaDose] = useState(""); // mg/kg/dia — opcional
  const [k2po4, setK2po4] = useState(false);
  const [bic, setBic] = useState(""); // mEq/kg se quiser adicionar bic
  const [res, setRes] = useState(null);

  // Tabela QH por dia e tipo (ml/kg/dia) - usa valor médio
  const getQH = () => {
    const pesoN = parseFloat(peso);
    if (isNaN(pesoN) || pesoN <= 0) return null;
    // Tabela da imagem por peso e dia
    const tabelaDia = {
      "<0.75": {
        1: [85, 85],
        2: [110, 110],
        3: [135, 135]
      },
      // mid
      "0.75-1": {
        1: [90, 90],
        2: [120, 120],
        3: [135, 135]
      },
      "1-1.5": {
        1: [90, 90],
        2: [110, 110],
        3: [135, 135]
      },
      "1.5-2.5": {
        1: [70, 70],
        2: [100, 100],
        3: [125, 125]
      },
      ">2.5": {
        1: [70, 70],
        2: [90, 90],
        3: [110, 110]
      }
    };
    // Simples: usa tabela RNPT padrão por dia (col1=min, col2=max)
    const d = parseInt(dia);
    let qhMin, qhMax;
    if (tipo === "rnpt") {
      if (d === 1) {
        qhMin = 70;
        qhMax = d === 1 && pesoN < 0.75 ? 100 : d === 1 && pesoN < 1 ? 100 : d === 1 && pesoN < 1.5 ? 100 : d === 1 && pesoN < 2.5 ? 80 : 80;
      }
      // Usa tabela por peso:
      let col;
      if (pesoN < 0.75) col = "<0.75";else if (pesoN < 1) col = "0.75-1";else if (pesoN < 1.5) col = "1-1.5";else if (pesoN < 2.5) col = "1.5-2.5";else col = ">2.5";
      const dKey = Math.min(d, 3).toString();
      const [mn, mx] = [tabelaDia[col][dKey][0] - 10, tabelaDia[col][dKey][0] + 10];
      qhMin = tabelaDia[col][dKey][0] - 8;
      qhMax = tabelaDia[col][dKey][0] + 8;
    } else {
      // RNT simples
      const rntTab = {
        1: [80, 80],
        2: [90, 90],
        3: [100, 100],
        4: [110, 110]
      };
      const dKey = Math.min(d, 4).toString();
      qhMin = rntTab[dKey][0] - 5;
      qhMax = rntTab[dKey][0] + 5;
    }
    // Após 72h (3 dias): usar máximo
    if (d >= 4 && tipo === "rnpt") {
      qhMin = 120;
      qhMax = 130;
    }
    if (d >= 4 && tipo === "rnt") {
      qhMin = 120;
      qhMax = 150;
    }
    // Ajuste foto/vmi
    let qhBase = (qhMin + qhMax) / 2;
    if (foto) qhBase = qhBase * 1.20;
    if (vmi) qhBase = qhBase * 0.80;
    return {
      qhBase: Math.round(qhBase),
      qhMin,
      qhMax,
      qhAjust: Math.round(qhBase)
    };
  };
  const calcular = () => {
    const pesoN = parseFloat(peso);
    if (isNaN(pesoN) || pesoN <= 0) {
      setRes({
        erro: "Informe o peso do RN."
      });
      return;
    }
    const vigN = parseFloat(vig) || 4.5;
    if (vigN < 2 || vigN > 12) {
      setRes({
        erro: "VIG deve estar entre 2 e 12 mg/kg/min."
      });
      return;
    }
    const qhInfo = getQH();
    const QH = qhInfo.qhAjust; // ml/kg/dia total
    const QHtotal = QH * pesoN; // ml/dia

    // ── 1. gG (g/kg/dia de glicose) ─────────────────────────────────────────
    const gG = parseFloat((vigN * pesoN * 1.44).toFixed(1));

    // ── 2. Eletrólitos — calcular volumes (subtrair do QH antes da glic) ────
    // NaCl — opcional (em branco = não usar)
    const naclConc = parseFloat(nacl); // 10% = 1,7 mEq/ml | 20% = 3,4 mEq/ml
    const naclMeqMl = naclConc === 10 ? 1.7 : 3.4;
    const naclDoseN = naclDose.trim() !== "" ? parseFloat(naclDose) : 0; // 0 se em branco
    const naclVol = naclDoseN > 0 ? parseFloat((naclDoseN * pesoN / naclMeqMl).toFixed(1)) : 0;

    // KCl — opcional (em branco = não usar)
    const kclConc = parseFloat(kcl); // 10% = 1,3 mEq/ml | 19.1% = 2,5 mEq/ml
    const kclMeqMl = kclConc === 10 ? 1.3 : 2.5;
    const kclDoseN = kclDose.trim() !== "" ? parseFloat(kclDose) : 0; // 0 se em branco
    const kclVol = kclDoseN > 0 ? parseFloat((kclDoseN * pesoN / kclMeqMl).toFixed(1)) : 0;

    // MgSO4 — opcional (em branco = não usar)
    const mgConc = parseFloat(mgso4); // 10% = 0,8 mEq/ml | 50% = 4 mEq/ml
    const mgMeqMl = mgConc === 10 ? 0.8 : mgConc === 25 ? 2 : 4;
    const mgDoseN = mgso4Dose.trim() !== "" ? parseFloat(mgso4Dose) : 0; // 0 se em branco
    const mgVol = mgDoseN > 0 ? parseFloat((mgDoseN * pesoN / mgMeqMl).toFixed(1)) : 0;

    // Gluconato de Cálcio 10% (100mg/ml) — opcional (em branco = não usar)
    const glucCaDoseN = glucCaDose.trim() !== "" ? parseFloat(glucCaDose) : 0; // 0 se em branco
    const glucCaVol = glucCaDoseN > 0 ? parseFloat((glucCaDoseN * pesoN / 100).toFixed(1)) : 0;

    // K2PO4 10% (2 mEq/ml) - se ativado, substitui KCl
    const k2po4Vol = k2po4 ? parseFloat((kclDoseN * pesoN / 2).toFixed(1)) : 0;
    const kVolFinal = k2po4 ? k2po4Vol : kclVol;

    // Bicarbonato (se informado)
    const bicN = parseFloat(bic) || 0; // mEq/kg
    const bicVol = parseFloat((bicN * pesoN * 8.33).toFixed(1)); // NaHCO3 8.4%: 1mEq=1ml; aqui convertendo

    // ── 3. Volume de eletrólitos total ───────────────────────────────────────
    const volEletTotal = naclVol + kVolFinal + mgVol + glucCaVol + (bicN > 0 ? bicVol : 0);

    // ── 4. QH ajustado (subtrair eletrólitos) ────────────────────────────────
    const QHajustado = parseFloat((QHtotal - volEletTotal).toFixed(1));

    // ── 5. Glicose 50% ───────────────────────────────────────────────────────
    const glic50 = parseFloat(((gG * 20 - QHajustado) / 9).toFixed(1));
    // corrigir se negativo
    const glic50Final = Math.max(0, glic50);

    // ── 6. SG 5% ─────────────────────────────────────────────────────────────
    const sg5 = parseFloat((QHajustado - glic50Final).toFixed(1));
    const sg5Final = Math.max(0, sg5);

    // ── 7. Volume Total ───────────────────────────────────────────────────────
    const VT = parseFloat((sg5Final + glic50Final + naclVol + kVolFinal + mgVol + glucCaVol + (bicN > 0 ? bicVol : 0)).toFixed(1));

    // ── 8. Concentração de glicose final ─────────────────────────────────────
    const concGlic = VT > 0 ? parseFloat((glic50Final * 50 / VT).toFixed(1)) : 0;
    const viaOk50 = concGlic <= 12.5,
      viaOk22 = concGlic <= 22;

    // ── 9. Velocidade de infusão (ml/h) ──────────────────────────────────────
    const velH = parseFloat((VT / 24).toFixed(1));
    // BIC separado ml/h (se usado)
    const bicMlH = bicN > 0 && bicVol > 0 ? parseFloat((bicVol / 24).toFixed(2)) : null;

    // ── VIG verificação ───────────────────────────────────────────────────────
    const vigVerif = parseFloat((gG * 1000 / (pesoN * 1440)).toFixed(2));
    setRes({
      QH,
      QHtotal: QHtotal.toFixed(1),
      QHajustado: QHajustado.toFixed(1),
      gG,
      vigN,
      vigVerif,
      // componentes
      sg5: sg5Final.toFixed(1),
      glic50: glic50Final.toFixed(1),
      glucCaVol: glucCaVol.toFixed(1),
      glucCaDoseN,
      naclVol: naclVol.toFixed(1),
      naclDoseN,
      naclConc,
      naclMeqMl,
      kVol: kVolFinal.toFixed(1),
      kclDoseN,
      k2po4,
      kclConc: k2po4 ? "K₂PO₄ 10%" : `KCl ${kcl}%`,
      kMeqMl: k2po4 ? 2 : kclMeqMl,
      mgVol: mgVol.toFixed(1),
      mgDoseN,
      mgConc,
      mgMeqMl,
      bicVol: bicN > 0 ? bicVol.toFixed(1) : null,
      bicN,
      VT: VT.toFixed(1),
      velH,
      bicMlH,
      concGlic,
      viaOk50,
      viaOk22,
      foto,
      vmi,
      pesoN,
      tipo,
      dia,
      volEletTotal: volEletTotal.toFixed(1)
    });
  };
  const limpar = () => {
    setPeso("");
    setVig("4.5");
    setNaclDose("");
    setKclDose("");
    setMgso4Dose("");
    setGlucCaDose("");
    setBic("");
    setK2po4(false);
    setRes(null);
  };
  const inpS = {
    width: "100%",
    padding: "9px 10px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontSize: 13,
    color: "#111827",
    outline: "none",
    background: "#FAFAFA",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    fontWeight: 700
  };
  const lbS = {
    fontSize: 10,
    fontWeight: 700,
    color: "#374151",
    display: "block",
    marginBottom: 3,
    textAlign: "center"
  };
  const tagS = (cor, bg, txt) => /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 7px",
      borderRadius: 5,
      background: bg,
      color: cor,
      fontSize: 10,
      fontWeight: 700,
      flexShrink: 0
    }
  }, txt);
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDCA7 Ven\xF3clise \u2014 Hidrata\xE7\xE3o Venosa Neonatal",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#EFF6FF,#DBEAFE)",
      borderRadius: 11,
      border: "1px solid #3B82F620"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#60A5FA,#3B82F6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(59,130,246,0.3)"
    }
  }, "\uD83D\uDCA7"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#1E40AF"
    }
  }, "C\xE1lculo Completo de Ven\xF3clise"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#1D4ED8",
      marginTop: 1
    }
  }, "QH \xB7 VIG \xB7 Glicose \xB7 Eletr\xF3litos \xB7 Volume Total"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 5
    }
  }, "Tipo de RN"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    }
  }, [["rnpt", "🍼 RNPT"], ["rnt", "👶 RNT"]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setTipo(v),
    style: {
      flex: 1,
      padding: "8px 6px",
      borderRadius: 9,
      border: `1.5px solid ${tipo === v ? "#3B82F6" : "#E5E7EB"}`,
      background: tipo === v ? "#EFF6FF" : "white",
      color: tipo === v ? "#1D4ED8" : "#6B7280",
      fontWeight: tipo === v ? 700 : 500,
      fontSize: 11
    }
  }, l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 5
    }
  }, "Dia de vida"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      flexWrap: "wrap"
    }
  }, ["1", "2", "3", "4+"].map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => setDia(d === "4+" ? "4" : d),
    style: {
      flex: 1,
      padding: "8px 4px",
      borderRadius: 9,
      border: `1.5px solid ${dia === (d === "4+" ? "4" : d) ? "#3B82F6" : "#E5E7EB"}`,
      background: dia === (d === "4+" ? "4" : d) ? "#EFF6FF" : "white",
      color: dia === (d === "4+" ? "4" : d) ? "#1D4ED8" : "#6B7280",
      fontWeight: dia === (d === "4+" ? "4" : d) ? 700 : 500,
      fontSize: 11
    }
  }, d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Peso ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(kg)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#1D4ED8",
      fontSize: 16
    },
    type: "number",
    step: "0.01",
    value: peso,
    onChange: e => setPeso(e.target.value),
    placeholder: "Ex: 1.250"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "VIG ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mg/kg/min \xB7 2\u201312)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#7C3AED"
    },
    type: "number",
    step: "0.5",
    min: "2",
    max: "12",
    value: vig,
    onChange: e => setVig(e.target.value),
    placeholder: "Ex: 4.5"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 2
    }
  }, "Habitual: 4,5 a 5 mg/kg/min"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, [[foto, setFoto, "☀️ Fototerapia", "+20% QH"], [vmi, setVmi, "🫁 VMI", "−20% QH"]].map(([v, sv, l, sub], i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => sv(x => !x),
    style: {
      flex: 1,
      padding: "8px 10px",
      borderRadius: 10,
      border: `1.5px solid ${v ? "#F59E0B" : "#E5E7EB"}`,
      background: v ? "#FFFBEB" : "white",
      display: "flex",
      alignItems: "center",
      gap: 7,
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 16,
      borderRadius: 8,
      background: v ? "#F59E0B" : "#D1D5DB",
      position: "relative",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 2,
      left: v ? 14 : 2,
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: "white",
      transition: "left 0.18s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: v ? "#D97706" : "#6B7280"
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF"
    }
  }, sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: "11px 12px",
      marginBottom: 10,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151"
    }
  }, "\u2697\uFE0F ELETR\xD3LITOS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "#9CA3AF",
      fontWeight: 600,
      background: "#F3F4F6",
      padding: "3px 8px",
      borderRadius: 6
    }
  }, "Deixar em branco se n\xE3o usar")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 9,
      padding: "9px 10px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      marginBottom: 5
    }
  }, "NaCl ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mEq/kg/dia) \xB7 opcional")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      marginBottom: 5
    }
  }, ["10", "20"].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setNacl(c),
    style: {
      flex: 1,
      padding: "4px",
      borderRadius: 7,
      border: `1px solid ${nacl === c ? "#3B82F6" : "#E5E7EB"}`,
      background: nacl === c ? "#EFF6FF" : "white",
      color: nacl === c ? "#1D4ED8" : "#6B7280",
      fontSize: 10,
      fontWeight: nacl === c ? 700 : 500
    }
  }, c, "% (", c === "10" ? "1,7" : "3,4", " mEq/ml)"))), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      fontSize: 12,
      borderColor: naclDose ? "#3B82F6" : "#E5E7EB"
    },
    type: "number",
    step: "0.5",
    value: naclDose,
    onChange: e => setNaclDose(e.target.value),
    placeholder: "em branco = n\xE3o usar"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 2
    }
  }, "Ref: RNT 2 \xB7 RNPT 3\u20134 mEq/kg")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 9,
      padding: "9px 10px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setK2po4(x => !x),
    style: {
      background: k2po4 ? "#F0FDF4" : "#F9FAFB",
      border: `1px solid ${k2po4 ? "#22C55E" : "#E5E7EB"}`,
      borderRadius: 5,
      padding: "1px 6px",
      fontSize: 9,
      fontWeight: 700,
      color: k2po4 ? "#16A34A" : "#6B7280",
      cursor: "pointer",
      marginRight: 4
    }
  }, k2po4 ? "K₂PO₄" : "KCl"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mEq/kg/dia) \xB7 opcional")), !k2po4 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      marginBottom: 5
    }
  }, ["10", "19.1"].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setKcl(c),
    style: {
      flex: 1,
      padding: "4px",
      borderRadius: 7,
      border: `1px solid ${kcl === c ? "#22C55E" : "#E5E7EB"}`,
      background: kcl === c ? "#F0FDF4" : "white",
      color: kcl === c ? "#15803D" : "#6B7280",
      fontSize: 9,
      fontWeight: kcl === c ? 700 : 500
    }
  }, c, "% (", c === "10" ? "1,3" : "2,5", " mEq/ml)"))), k2po4 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#16A34A",
      marginBottom: 5,
      fontWeight: 700
    }
  }, "K\u2082PO\u2084 10% = 2 mEq/ml"), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      fontSize: 12,
      borderColor: kclDose ? "#22C55E" : "#E5E7EB"
    },
    type: "number",
    step: "0.5",
    value: kclDose,
    onChange: e => setKclDose(e.target.value),
    placeholder: "em branco = n\xE3o usar"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 2
    }
  }, "Ref: RNT 2 \xB7 RNPT 1\u20132 mEq/kg")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 9,
      padding: "9px 10px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      marginBottom: 5
    }
  }, "MgSO\u2084 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mEq/kg/dia) \xB7 opcional")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      marginBottom: 5
    }
  }, ["10", "50"].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setMgso4(c),
    style: {
      flex: 1,
      padding: "4px",
      borderRadius: 7,
      border: `1px solid ${mgso4 === c ? "#8B5CF6" : "#E5E7EB"}`,
      background: mgso4 === c ? "#F5F3FF" : "white",
      color: mgso4 === c ? "#7C3AED" : "#6B7280",
      fontSize: 9,
      fontWeight: mgso4 === c ? 700 : 500
    }
  }, c, "% (", c === "10" ? "0,8" : "4,0", " mEq/ml)"))), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      fontSize: 12,
      borderColor: mgso4Dose ? "#8B5CF6" : "#E5E7EB"
    },
    type: "number",
    step: "0.1",
    value: mgso4Dose,
    onChange: e => setMgso4Dose(e.target.value),
    placeholder: "em branco = n\xE3o usar"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 2
    }
  }, "Ref: RNT 0,25\u20130,5 \xB7 RNPT 0,5 mEq/kg")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 9,
      padding: "9px 10px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      marginBottom: 5
    }
  }, "Gluconato Ca\xB2\u207A 10% ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mg/kg/dia) \xB7 opcional")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#EA580C",
      marginBottom: 5,
      fontWeight: 700
    }
  }, "100 mg/ml"), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      fontSize: 12,
      borderColor: glucCaDose ? "#EA580C" : "#E5E7EB"
    },
    type: "number",
    step: "50",
    value: glucCaDose,
    onChange: e => setGlucCaDose(e.target.value),
    placeholder: "em branco = n\xE3o usar"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 2
    }
  }, "Ref: 200 mg/kg/dia"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 9,
      padding: "9px 10px",
      border: "1px solid #FCA5A5"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#DC2626",
      marginBottom: 4
    }
  }, "NaHCO\u2083 8,4% ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(mEq/kg) \xB7 opcional \u2014 deixar em branco se n\xE3o usar")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      fontSize: 12,
      borderColor: bic ? "#EF4444" : "#E5E7EB"
    },
    type: "number",
    step: "0.5",
    value: bic,
    onChange: e => setBic(e.target.value),
    placeholder: "em branco = n\xE3o usar"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 2
    }
  }, "1 mEq NaHCO\u2083 8,4% = 1 mL \xB7 Dose: BE \xD7 peso \xD7 0,3"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#3B82F6,#60A5FA)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(59,130,246,0.4)"
    }
  }, "\u26A1 Calcular")), res && (res.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 12,
      padding: 14,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", res.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#1E40AF,#2563EB)",
      borderRadius: 15,
      padding: "12px 16px",
      marginBottom: 12,
      color: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.65)",
      fontWeight: 700,
      marginBottom: 2
    }
  }, res.tipo.toUpperCase(), " \xB7 DIA ", res.dia, " \xB7 PESO ", res.pesoN, " kg", res.foto ? " · FOTOTERAPIA" : "", res.vmi ? " · VMI" : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.6)"
    }
  }, "QH ajustado"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 900
    }
  }, res.QH, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, " ml/kg/dia"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.6)"
    }
  }, "Volume Total/dia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 900,
      color: "#93C5FD"
    }
  }, res.QHtotal, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600
    }
  }, " ml"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.6)"
    }
  }, "VIG"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: "#C4B5FD"
    }
  }, res.vigN, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11
    }
  }, " mg/kg/min"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F5F3FF",
      borderRadius: 10,
      padding: "9px 13px",
      marginBottom: 10,
      border: "1px solid #DDD6FE",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83C\uDF6C"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#7C3AED"
    }
  }, "gG \u2014 Grama de Glicose / dia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#6D28D9"
    }
  }, "gG = VIG \xD7 Peso \xD7 1,44 = ", res.vigN, " \xD7 ", res.pesoN, " \xD7 1,44 = ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, res.gG, " g/dia")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 13,
      border: "1.5px solid #E5E7EB",
      overflow: "hidden",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(90deg,#3B82F6,#60A5FA)",
      padding: "8px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "white",
      fontWeight: 800,
      fontSize: 12
    }
  }, "\uD83D\uDCCB COMPONENTES DA VEN\xD3CLISE")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "2px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1.2fr 1.2fr 1.2fr",
      gap: 0,
      padding: "6px 12px",
      background: "#F9FAFB",
      borderBottom: "1px solid #E5E7EB"
    }
  }, ["Componente", "Concentração", "Dose/Dia", "Volume (ml)"].map(h => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      color: "#9CA3AF"
    }
  }, h))), [{
    label: "💙 SG 5%",
    conc: "Glicose 5%",
    dose: "—",
    vol: res.sg5,
    cor: "#3B82F6",
    bg: "#EFF6FF",
    skip: false
  }, {
    label: "🟡 Glic. 50%",
    conc: "Glicose 50%",
    dose: "—",
    vol: res.glic50,
    cor: "#D97706",
    bg: "#FFFBEB",
    skip: false
  }, {
    label: "🟠 Glucon. Ca²⁺",
    conc: "100 mg/ml",
    dose: res.glucCaDoseN > 0 ? `${res.glucCaDoseN}mg/kg` : "—",
    vol: res.glucCaVol,
    cor: "#EA580C",
    bg: "#FFF7ED",
    skip: res.glucCaDoseN === 0
  }, {
    label: "🔵 NaCl",
    conc: `${res.naclConc}% (${res.naclMeqMl}mEq/ml)`,
    dose: res.naclDoseN > 0 ? `${res.naclDoseN}mEq/kg` : "—",
    vol: res.naclVol,
    cor: "#0369A1",
    bg: "#F0F9FF",
    skip: res.naclDoseN === 0
  }, {
    label: `🟢 ${res.k2po4 ? "K₂PO₄" : "KCl"}`,
    conc: res.k2po4 ? "10% (2mEq/ml)" : `${res.kclConc.replace("KCl ", "")} (${res.kMeqMl}mEq/ml)`,
    dose: res.kclDoseN > 0 ? `${res.kclDoseN}mEq/kg` : "—",
    vol: res.kVol,
    cor: "#16A34A",
    bg: "#F0FDF4",
    skip: res.kclDoseN === 0
  }, {
    label: "🟣 MgSO₄",
    conc: `${res.mgConc}% (${res.mgMeqMl}mEq/ml)`,
    dose: res.mgDoseN > 0 ? `${res.mgDoseN}mEq/kg` : "—",
    vol: res.mgVol,
    cor: "#7C3AED",
    bg: "#F5F3FF",
    skip: res.mgDoseN === 0
  }, res.bicVol ? {
    label: "⚪ NaHCO₃ 8,4%",
    conc: "1 mEq/ml",
    dose: `${res.bicN}mEq/kg`,
    vol: res.bicVol,
    cor: "#DC2626",
    bg: "#FEF2F2",
    skip: false
  } : null].filter(Boolean).filter(r => !r.skip).map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1.2fr 1.2fr 1.2fr",
      gap: 0,
      padding: "7px 12px",
      borderBottom: "1px solid #F3F4F6",
      background: row.bg,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: row.cor
    }
  }, row.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6B7280"
    }
  }, row.conc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6B7280"
    }
  }, row.dose), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 900,
      color: row.cor
    }
  }, row.vol, " ml"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1.2fr 1.2fr 1.2fr",
      gap: 0,
      padding: "9px 12px",
      background: "linear-gradient(90deg,#1E40AF10,#3B82F610)",
      borderTop: "2px solid #3B82F6"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 900,
      color: "#1E40AF",
      gridColumn: "1/4"
    }
  }, "\uD83D\uDD37 VOLUME TOTAL (VT)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: "#1E40AF"
    }
  }, res.VT, " ml")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#3B82F6,#60A5FA)",
      borderRadius: 12,
      padding: "12px 14px",
      color: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
      marginBottom: 2
    }
  }, "\u23F1 VELOCIDADE DE INFUS\xC3O"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 900
    }
  }, res.velH), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.8)"
    }
  }, "mL/h")), res.bicMlH && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#DC2626,#EF4444)",
      borderRadius: 12,
      padding: "12px 14px",
      color: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
      marginBottom: 2
    }
  }, "\uD83D\uDC89 BIC SEPARADO"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 900
    }
  }, res.bicMlH), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.8)"
    }
  }, "mL/h")), !res.bicMlH && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: "12px 14px",
      border: "1px solid #E5E7EB",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 4
    }
  }, "\uD83C\uDF6C [GLICOSE] FINAL"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: res.concGlic > 22 ? "#DC2626" : res.concGlic > 12.5 ? "#D97706" : "#16A34A"
    }
  }, res.concGlic, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: res.concGlic > 22 ? "#DC2626" : res.concGlic > 12.5 ? "#D97706" : "#16A34A",
      marginTop: 2,
      fontWeight: 700
    }
  }, res.concGlic <= 12.5 ? "✅ Veia periférica OK" : res.concGlic <= 22 ? "⚠️ Apenas Veia Central" : "🚨 Diluir — Acima do limite"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.concGlic > 22 ? "#FEE2E2" : res.concGlic > 12.5 ? "#FFFBEB" : "#DCFCE7",
      borderRadius: 12,
      padding: "10px 13px",
      marginBottom: 12,
      border: `1.5px solid ${res.concGlic > 22 ? "#EF4444" : res.concGlic > 12.5 ? "#F59E0B" : "#22C55E"}30`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: res.concGlic > 22 ? "#DC2626" : res.concGlic > 12.5 ? "#D97706" : "#16A34A",
      marginBottom: 4
    }
  }, res.concGlic > 22 ? "🚨" : "res.concGlic>12.5" ? "⚠️" : "✅", " Concentra\xE7\xE3o de Glicose Final: ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, res.concGlic, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#374151",
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("b", null, "Veia perif\xE9rica:"), " at\xE9 12,5% \u2192 ", res.viaOk50 ? "✅ OK" : "❌ NÃO", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "Veia central:"), " at\xE9 22% \u2192 ", res.viaOk22 ? "✅ OK" : "❌ NÃO — Revisar VIG ou aumentar volume")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F5F3FF",
      borderRadius: 10,
      padding: "9px 13px",
      marginBottom: 12,
      border: "1px solid #DDD6FE"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#7C3AED",
      marginBottom: 3
    }
  }, "\u2705 VERIFICA\xC7\xC3O DO VIG"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#374151"
    }
  }, "VIG = gG \xD7 1000 / (Peso \xD7 1440) = ", res.gG * 1000, " / (", res.pesoN, " \xD7 1440) = ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#7C3AED"
    }
  }, res.vigVerif, " mg/kg/min"), " ", Math.abs(res.vigVerif - res.vigN) < 0.2 ? "✅ Confere" : "⚠️ Verificar arredondamento")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFFBEB",
      borderRadius: 11,
      padding: "10px 13px",
      border: "1px solid #FDE68A"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#92400E",
      marginBottom: 6
    }
  }, "\u26A0\uFE0F OBSERVA\xC7\xD5ES IMPORTANTES"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#78350F",
      lineHeight: 1.8
    }
  }, "\u2022 Sempre subtrair eletr\xF3litos do QH ", /*#__PURE__*/React.createElement("b", null, "antes"), " de calcular Glic. 50% e SG 5%", /*#__PURE__*/React.createElement("br", null), "\u2022 Vol. eletr\xF3litos total: ", /*#__PURE__*/React.createElement("b", null, res.volEletTotal, " ml"), " \u2192 QH ajustado: ", /*#__PURE__*/React.createElement("b", null, res.QHajustado, " ml"), /*#__PURE__*/React.createElement("br", null), "\u2022 gG = VIG \xD7 Peso \xD7 1,44 = ", /*#__PURE__*/React.createElement("b", null, res.gG, " g/dia"), /*#__PURE__*/React.createElement("br", null), "\u2022 Glic. 50% = (gG \xD7 20 \u2212 QH ajustado) / 9", /*#__PURE__*/React.createElement("br", null), "\u2022 SG 5% = QH ajustado \u2212 Glic. 50%", /*#__PURE__*/React.createElement("br", null), res.foto ? "• Fototerapia: QH aumentado em 20% ☀️\n" : "", res.vmi ? "• VMI: QH reduzido em 20% 🫁\n" : "", "\u2022 Ap\xF3s 72h: RNPT m\xE1x 150ml/kg/dia \xB7 RNT 120ml/kg/dia")))));
}

// ── DROGAS INFUSÃO CONTÍNUA CALCULATOR ───────────────────────────────────────
const DROGAS_DB = [
// grupo 1 — sedoanalgesia / vasoativos principais
{
  id: "midazolam",
  nome: "Midazolam",
  conc: "5 mg/mL",
  unidDose: "mcg/kg/h",
  doseMin: 0.2,
  doseMax: 10,
  doseHab: 1,
  formula: (p, d) => ({
    vol: p * d * 1440 / 5000,
    bic24: p * d * 1440 / 5000 / 24,
    bic48: p * d * 1440 / 5000 / 48,
    formula: `P × dose × 1440 / 5000`
  }),
  cor: "#8B5CF6",
  bg: "#F5F3FF",
  emoji: "😴",
  via: "Central/Periférica",
  obs: "Sedação. Titular conforme resposta clínica."
}, {
  id: "fentanyl",
  nome: "Fentanyl",
  conc: "50 mcg/mL",
  unidDose: "mcg/kg/h",
  doseMin: 1,
  doseMax: 10,
  doseHab: 2,
  formula: (p, d) => ({
    vol: p * d * 24 / 50,
    bic24: p * d * 24 / 50 / 24,
    bic48: p * d * 24 / 50 / 48,
    formula: `P × dose × 24 / 50`
  }),
  cor: "#7C3AED",
  bg: "#EDE9FE",
  emoji: "💜",
  via: "Central",
  obs: "Analgesia/sedação. Monitorar FR."
}, {
  id: "ketamina",
  nome: "Ketamina",
  conc: "50 mg/mL",
  unidDose: "mcg/kg/min",
  doseMin: 20,
  doseMax: 40,
  doseHab: 30,
  formula: (p, d) => ({
    vol: p * d * 1.44 / 50,
    bic24: p * d * 1.44 / 50 / 24,
    bic48: p * d * 1.44 / 50 / 48,
    formula: `P × dose × 1,44 / 50`
  }),
  cor: "#0EA5E9",
  bg: "#F0F9FF",
  emoji: "🔵",
  via: "Central/Periférica",
  obs: "Analgesia. Manter via aérea. Associar midazolam."
}, {
  id: "dopamina",
  nome: "Dopamina",
  conc: "50 mg/10 mL",
  unidDose: "mcg/kg/min",
  doseMin: 5,
  doseMax: 20,
  doseHab: 5,
  formula: (p, d) => ({
    vol: p * d * 1.44 / 5,
    bic24: p * d * 1.44 / 5 / 24,
    bic48: p * d * 1.44 / 5 / 48,
    formula: `P × dose × 1,44 / 5`
  }),
  cor: "#EA580C",
  bg: "#FFF7ED",
  emoji: "❤️",
  via: "Central",
  obs: "Vasoativo. Alvo PA média. Monitorar FC."
}, {
  id: "dobutamina",
  nome: "Dobutamina",
  conc: "250 mg/20 mL",
  unidDose: "mcg/kg/min",
  doseMin: 5,
  doseMax: 20,
  doseHab: 5,
  formula: (p, d) => ({
    vol: p * d * 1.44 / 12.5,
    bic24: p * d * 1.44 / 12.5 / 24,
    bic48: p * d * 1.44 / 12.5 / 48,
    formula: `P × dose × 1,44 / 12,5`
  }),
  cor: "#F97316",
  bg: "#FFF7ED",
  emoji: "🫀",
  via: "Central",
  obs: "Inotrópico. Falência miocárdica. Monitorar ECG."
}, {
  id: "adrenalina",
  nome: "Adrenalina",
  conc: "1 mg/mL",
  unidDose: "mcg/kg/min",
  doseMin: 0.05,
  doseMax: 2,
  doseHab: 0.1,
  formula: (p, d) => ({
    vol: p * d * 1.44,
    bic24: p * d * 1.44 / 24,
    bic48: p * d * 1.44 / 48,
    formula: `P × dose × 1,44`
  }),
  cor: "#DC2626",
  bg: "#FEE2E2",
  emoji: "🚨",
  via: "Central",
  obs: "Choque refratário. Monitorar glicemia."
}, {
  id: "noradrenalina",
  nome: "Noradrenalina",
  conc: "4 mg/mL",
  unidDose: "mcg/kg/min",
  doseMin: 0.05,
  doseMax: 2,
  doseHab: 0.1,
  formula: (p, d) => ({
    vol: p * d * 1.44,
    bic24: p * d * 1.44 / 24,
    bic48: p * d * 1.44 / 48,
    formula: `P × dose × 1,44`
  }),
  cor: "#991B1B",
  bg: "#FEF2F2",
  emoji: "⚡",
  via: "Central",
  obs: "Choque vasoplégico. Monitorar PAM e diurese."
}, {
  id: "milrinona",
  nome: "Milrinona",
  conc: "1 mg/mL",
  unidDose: "mcg/kg/min",
  doseMin: 0.25,
  doseMax: 0.75,
  doseHab: 0.5,
  formula: (p, d) => ({
    vol: p * d * 1.44,
    bic24: p * d * 1.44 / 24,
    bic48: p * d * 1.44 / 48,
    formula: `P × dose × 1,44`
  }),
  cor: "#BE185D",
  bg: "#FDF2F8",
  emoji: "💗",
  via: "Central",
  obs: "Inodilatador. HPPRN/falência cardíaca. Monitorar PA."
},
// grupo 2 — outros
{
  id: "nitroprussiato",
  nome: "Nitroprussiato",
  conc: "50 mg/2 mL",
  unidDose: "mcg/kg/min",
  doseMin: 0.5,
  doseMax: 8,
  doseHab: 1,
  formula: (p, d) => ({
    vol: p * d * 1.44 / 25,
    bic24: p * d * 1.44 / 25 / 24,
    bic48: p * d * 1.44 / 25 / 48,
    formula: `P × dose × 1,44 / 25`
  }),
  cor: "#0369A1",
  bg: "#F0F9FF",
  emoji: "🩵",
  via: "Central",
  obs: "HAS/crise hipertensiva. Proteger da luz. Monitorar cianeto se uso >72h."
}, {
  id: "salbutamol",
  nome: "Salbutamol",
  conc: "0,5 mg/mL",
  unidDose: "mcg/kg/min",
  doseMin: 1,
  doseMax: 10,
  doseHab: 2,
  formula: (p, d) => ({
    vol: p * d * 1.44 / 0.5,
    bic24: p * d * 1.44 / 0.5 / 24,
    bic48: p * d * 1.44 / 0.5 / 48,
    formula: `P × dose × 1,44 / 0,5`
  }),
  cor: "#16A34A",
  bg: "#F0FDF4",
  emoji: "🫁",
  via: "Central/Periférica",
  obs: "Broncoespasmo. Monitorar FC e K⁺."
}, {
  id: "tiopental",
  nome: "Tiopental",
  conc: "1 g/20 mL",
  unidDose: "mcg/kg/min",
  doseMin: 5,
  doseMax: 60,
  doseHab: 15,
  formula: (p, d) => ({
    vol: p * d * 1.44 / 50,
    bic24: p * d * 1.44 / 50 / 24,
    bic48: p * d * 1.44 / 50 / 48,
    formula: `P × dose × 1,44 / 50`
  }),
  cor: "#64748B",
  bg: "#F8FAFC",
  emoji: "😶",
  via: "Central",
  obs: "Sedação refratária/EE refratário. Monitorar PA e FR."
}, {
  id: "furosemida",
  nome: "Furosemida",
  conc: "10 mg/mL",
  unidDose: "mg/kg/h",
  doseMin: 0.1,
  doseMax: 1,
  doseHab: 0.5,
  formula: (p, d) => ({
    vol: p * d * 24 / 10,
    bic24: p * d * 24 / 10 / 24,
    bic48: p * d * 24 / 10 / 48,
    formula: `P × dose × 24 / 10`
  }),
  cor: "#D97706",
  bg: "#FFFBEB",
  emoji: "💧",
  via: "Central/Periférica",
  obs: "Diurese forçada. Monitorar eletrólitos e diurese."
}, {
  id: "prostaglandina",
  nome: "Prostaglandina E1",
  conc: "20 mcg/1 mL",
  unidDose: "mcg/kg/min",
  doseMin: 0.01,
  doseMax: 0.1,
  doseHab: 0.05,
  formula: (p, d) => {
    // Apresentação: 20 mcg em 1 mL — concentração pura
    const vol = p * d * 1440 / 20;
    return {
      vol: parseFloat(vol.toFixed(2)),
      bic24: parseFloat((vol / 24).toFixed(3)),
      bic48: parseFloat((vol / 48).toFixed(3)),
      formula: `P × dose × 1440 / 20 (mcg/mL)`
    };
  },
  cor: "#DC2626",
  bg: "#FEF2F2",
  emoji: "❤️‍🔥",
  via: "VEIA CENTRAL — obrigatório",
  obs: "Cardiopatia congênita ducto-dependente. Monitorar apneia! Ter suporte ventilatório disponível.",
  especial: "pge1"
}];
function DrogasCalc({
  onClose
}) {
  const [peso, setPeso] = useState("");
  const [drogaId, setDrogaId] = useState("midazolam");
  const [doseCustom, setDoseCustom] = useState("");
  const [volDilui, setVolDilui] = useState("24");
  const [res, setRes] = useState(null);
  const droga = DROGAS_DB.find(d => d.id === drogaId) || DROGAS_DB[0];
  const doseN = parseFloat(doseCustom) || droga.doseHab;
  const calcular = () => {
    const pesoN = parseFloat(peso);
    if (isNaN(pesoN) || pesoN <= 0) {
      setRes({
        erro: "Informe o peso do paciente."
      });
      return;
    }
    if (doseN < droga.doseMin * 0.5 || doseN > droga.doseMax * 1.5) {
      setRes({
        erro: `Dose fora do intervalo esperado (${droga.doseMin}–${droga.doseMax} ${droga.unidDose}).`
      });
      return;
    }
    const calc = droga.formula(pesoN, doseN);
    const volDrug = parseFloat(calc.vol.toFixed(2));
    const volTotalN = parseFloat(volDilui);
    const volSF = parseFloat((volTotalN - volDrug).toFixed(2));
    const bicMlH = parseFloat((volTotalN / 24).toFixed(2));
    const bicMlH48 = parseFloat((volTotalN / 48).toFixed(2));

    // alertas dose
    let alertaDose = null;
    const pctRange = (doseN - droga.doseMin) / (droga.doseMax - droga.doseMin);
    if (doseN < droga.doseMin) alertaDose = {
      tipo: "warn",
      txt: "Dose abaixo do mínimo recomendado"
    };else if (doseN > droga.doseMax) alertaDose = {
      tipo: "danger",
      txt: "⚠️ Dose acima do máximo recomendado"
    };else if (pctRange > 0.85) alertaDose = {
      tipo: "warn",
      txt: "Dose na faixa alta — monitorar"
    };
    setRes({
      pesoN,
      doseN,
      volDrug,
      volSF,
      volTotalN,
      bicMlH,
      bicMlH48,
      formula: calc.formula,
      alertaDose,
      droga,
      pctRange: Math.max(0, Math.min(1, pctRange))
    });
  };
  const limpar = () => {
    setPeso("");
    setDoseCustom("");
    setRes(null);
  };
  const inpS = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    background: "#FAFAFA",
    fontFamily: "inherit",
    boxSizing: "border-box",
    fontWeight: 700
  };
  const inpCtrS = {
    ...inpS,
    textAlign: "center",
    fontSize: 15
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDC8A Drogas de Infus\xE3o Cont\xEDnua \u2014 BIC",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#FEF2F2,#FEE2E2)",
      borderRadius: 11,
      border: "1px solid #EF444420"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#F87171,#EF4444)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(239,68,68,0.3)"
    }
  }, "\uD83D\uDC8A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#7F1D1D"
    }
  }, "C\xE1lculo de BIC \u2014 Drogas Vasoativas e Sedoanalgesia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#991B1B",
      marginTop: 1
    }
  }, "Dilui\xE7\xE3o \xB7 Volume \xB7 Velocidade (mL/h)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 5
    }
  }, "Peso do Paciente ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(kg)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpCtrS,
      color: "#1D4ED8",
      fontSize: 18,
      border: "2px solid #3B82F640"
    },
    type: "number",
    step: "0.01",
    value: peso,
    onChange: e => setPeso(e.target.value),
    placeholder: "Ex: 1.250"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 6
    }
  }, "Medica\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 6
    }
  }, DROGAS_DB.map(d => /*#__PURE__*/React.createElement("button", {
    key: d.id,
    onClick: () => {
      setDrogaId(d.id);
      setDoseCustom("");
      setRes(null);
    },
    style: {
      padding: "8px 10px",
      borderRadius: 10,
      border: `1.5px solid ${drogaId === d.id ? d.cor : "#E5E7EB"}`,
      background: drogaId === d.id ? d.bg : "white",
      cursor: "pointer",
      textAlign: "left",
      transition: "all 0.15s",
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      flexShrink: 0
    }
  }, d.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: drogaId === d.id ? 800 : 600,
      color: drogaId === d.id ? d.cor : "#374151",
      lineHeight: 1.2
    }
  }, d.nome), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF"
    }
  }, d.conc)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: droga.bg,
      borderRadius: 11,
      padding: "9px 12px",
      marginBottom: 12,
      border: `1.5px solid ${droga.cor}30`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, droga.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: droga.cor
    }
  }, droga.nome, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 500,
      color: "#6B7280"
    }
  }, droga.conc)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6B7280"
    }
  }, "Dose: ", droga.doseMin, "\u2013", droga.doseMax, " ", droga.unidDose, " \xB7 Habitual: ", droga.doseHab))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 8px",
      borderRadius: 5,
      background: droga.cor,
      color: "white",
      fontSize: 9,
      fontWeight: 700
    }
  }, "\uD83D\uDCD0 ", droga.formula), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 8px",
      borderRadius: 5,
      background: "rgba(0,0,0,0.06)",
      color: "#374151",
      fontSize: 9,
      fontWeight: 700
    }
  }, "\uD83C\uDFE5 ", droga.via))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 5
    }
  }, "Dose ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(", droga.unidDose, ")"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      padding: "2px 8px",
      borderRadius: 5,
      background: droga.cor,
      color: "white",
      fontSize: 10,
      fontWeight: 700
    }
  }, droga.doseMin, "\u2013", droga.doseMax)), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpCtrS,
      color: droga.cor,
      border: `2px solid ${droga.cor}50`,
      fontSize: 17
    },
    type: "number",
    step: droga.doseMax < 1 ? "0.01" : droga.doseMax < 10 ? "0.5" : "1",
    value: doseCustom,
    onChange: e => setDoseCustom(e.target.value),
    placeholder: `Habitual: ${droga.doseHab}`
  }), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: droga.doseMin,
    max: droga.doseMax,
    step: droga.doseMax < 1 ? "0.01" : droga.doseMax < 10 ? "0.5" : "1",
    value: doseCustom || droga.doseHab,
    onChange: e => setDoseCustom(e.target.value),
    style: {
      width: "100%",
      marginTop: 6,
      accentColor: droga.cor,
      cursor: "pointer"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 9,
      color: "#9CA3AF",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("span", null, "M\xEDn: ", droga.doseMin), /*#__PURE__*/React.createElement("span", null, "Habitual: ", droga.doseHab), /*#__PURE__*/React.createElement("span", null, "M\xE1x: ", droga.doseMax))), droga.especial === "pge1" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF2F2",
      borderRadius: 10,
      padding: "9px 12px",
      marginBottom: 10,
      border: "1.5px solid #EF4444"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#DC2626",
      marginBottom: 4
    }
  }, "\u2764\uFE0F\u200D\uD83D\uDD25 Prostaglandina E1"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#991B1B",
      lineHeight: 1.6
    }
  }, "Apresenta\xE7\xE3o: ", /*#__PURE__*/React.createElement("b", null, "20 mcg em 1 mL"), /*#__PURE__*/React.createElement("br", null), "F\xF3rmula: ", /*#__PURE__*/React.createElement("b", null, "P \xD7 dose \xD7 1440 / concentra\xE7\xE3o ap\xF3s dilui\xE7\xE3o"), /*#__PURE__*/React.createElement("br", null), "Volume total nas 24h \xF7 24 = mL/h em BIC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#991B1B",
      marginTop: 6,
      fontWeight: 700
    }
  }, "\u26A0\uFE0F CORRER EM VEIA CENTRAL \u2014 obrigat\xF3rio")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 5
    }
  }, "Volume Total da Seringa (dilui\xE7\xE3o)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, [["24", "24 mL → 1 mL/h"], ["48", "48 mL → 2 mL/h"], ["12", "12 mL → 0,5 mL/h"]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setVolDilui(v),
    style: {
      flex: 1,
      padding: "8px 6px",
      borderRadius: 10,
      border: `1.5px solid ${volDilui === v ? "#EF4444" : "#E5E7EB"}`,
      background: volDilui === v ? "#FEF2F2" : "white",
      color: volDilui === v ? "#DC2626" : "#6B7280",
      fontWeight: volDilui === v ? 700 : 500,
      fontSize: 10.5,
      textAlign: "center"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      marginTop: 4,
      textAlign: "center"
    }
  }, "Obs: Diluir o volume da droga com SF0,9% para completar o volume total \u2192 correr em BIC")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: `linear-gradient(90deg,${droga.cor},${droga.cor}CC)`,
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: `0 4px 14px ${droga.cor}44`
    }
  }, "\u26A1 Calcular BIC")), res && (res.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 12,
      padding: 14,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", res.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, res.alertaDose && /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.alertaDose.tipo === "danger" ? "#FEE2E2" : "#FFFBEB",
      borderRadius: 10,
      padding: "8px 12px",
      marginBottom: 10,
      border: `1.5px solid ${res.alertaDose.tipo === "danger" ? "#EF4444" : "#F59E0B"}`,
      fontSize: 12,
      fontWeight: 700,
      color: res.alertaDose.tipo === "danger" ? "#DC2626" : "#D97706"
    }
  }, res.alertaDose.txt), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "9px 12px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 6
    }
  }, "\uD83D\uDCCA POSI\xC7\xC3O DA DOSE NO INTERVALO TERAP\xCAUTICO"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 20,
      borderRadius: 8,
      overflow: "hidden",
      background: "linear-gradient(90deg,#DCFCE7,#FEF9C3,#FEE2E2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${Math.min(97, res.pctRange * 100)}%`,
      width: 3,
      height: "100%",
      background: droga.cor,
      transform: "translateX(-50%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: `${Math.min(94, res.pctRange * 100)}%`,
      transform: "translate(-50%,-50%)",
      background: droga.cor,
      color: "white",
      borderRadius: 5,
      padding: "1px 6px",
      fontSize: 10,
      fontWeight: 900,
      whiteSpace: "nowrap"
    }
  }, res.doseN, " ", droga.unidDose)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 9,
      color: "#9CA3AF",
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", null, "M\xEDn: ", droga.doseMin), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: droga.cor
    }
  }, "Dose: ", res.doseN), /*#__PURE__*/React.createElement("span", null, "M\xE1x: ", droga.doseMax))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${droga.cor}EE,${droga.cor}AA)`,
      borderRadius: 16,
      padding: "14px 16px",
      marginBottom: 12,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
      marginBottom: 8
    }
  }, "\uD83D\uDCD0 ", res.formula), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.15)",
      borderRadius: 12,
      padding: "10px 12px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
      marginBottom: 2
    }
  }, "\uD83D\uDC8A VOL. DA DROGA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 900,
      lineHeight: 1
    }
  }, res.volDrug), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.8)"
    }
  }, "mL")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.15)",
      borderRadius: 12,
      padding: "10px 12px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
      marginBottom: 2
    }
  }, "\uD83D\uDC89 SF 0,9% p/ diluir"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 900,
      lineHeight: 1
    }
  }, res.volSF), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.8)"
    }
  }, "mL")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1E40AF",
      borderRadius: 13,
      padding: "11px 13px",
      textAlign: "center",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,0.65)",
      fontWeight: 700,
      marginBottom: 2
    }
  }, "\uD83E\uDDEA VOLUME TOTAL"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 900
    }
  }, res.volTotalN, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "mL")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)"
    }
  }, "Seringa completa")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#16A34A,#22C55E)",
      borderRadius: 13,
      padding: "11px 13px",
      textAlign: "center",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,0.65)",
      fontWeight: 700,
      marginBottom: 2
    }
  }, "\u23F1 BIC em mL/h"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 900,
      lineHeight: 1
    }
  }, res.bicMlH), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.8)"
    }
  }, "para ", res.volTotalN, " mL/24h"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 13,
      border: "2px solid #E5E7EB",
      overflow: "hidden",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(90deg,${droga.cor},${droga.cor}BB)`,
      padding: "7px 13px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "white",
      fontWeight: 800,
      fontSize: 12
    }
  }, "\uD83D\uDCCB PRESCRI\xC7\xC3O \u2014 ", res.droga.nome.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 6,
      marginBottom: 8
    }
  }, [{
    l: "Paciente",
    v: `${res.pesoN} kg`,
    cor: "#1D4ED8"
  }, {
    l: "Medicação",
    v: res.droga.nome,
    cor: droga.cor
  }, {
    l: "Concentração",
    v: res.droga.conc,
    cor: "#374151"
  }, {
    l: "Dose prescrita",
    v: `${res.doseN} ${droga.unidDose}`,
    cor: droga.cor
  }, {
    l: "Vol. droga (puro)",
    v: `${res.volDrug} mL`,
    cor: "#7C3AED"
  }, {
    l: "SF 0,9% diluente",
    v: `${res.volSF} mL`,
    cor: "#0369A1"
  }, {
    l: "Vol. total seringa",
    v: `${res.volTotalN} mL`,
    cor: "#374151"
  }, {
    l: "BIC velocidade",
    v: `${res.bicMlH} mL/h`,
    cor: "#16A34A"
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.l,
    style: {
      background: "#F9FAFB",
      borderRadius: 8,
      padding: "6px 9px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      fontWeight: 700
    }
  }, r.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: r.cor
    }
  }, r.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: droga.bg,
      borderRadius: 9,
      padding: "8px 10px",
      border: `1px solid ${droga.cor}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: droga.cor,
      marginBottom: 3
    }
  }, "\uD83C\uDFE5 Via: ", droga.via), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#374151",
      lineHeight: 1.6
    }
  }, droga.obs)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "9px 13px",
      border: "1px solid #E5E7EB",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 5
    }
  }, "\uD83D\uDD04 ALTERNATIVA \u2014 Seringa 48 mL (2 mL/h)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#6B7280"
    }
  }, "Vol. droga \xD7 2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: droga.cor
    }
  }, (res.volDrug * 2).toFixed(2), " mL")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#9CA3AF",
      fontSize: 16
    }
  }, "+"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#6B7280"
    }
  }, "SF 0,9%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: "#0369A1"
    }
  }, (48 - res.volDrug * 2).toFixed(2), " mL")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#9CA3AF",
      fontSize: 16
    }
  }, "="), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#6B7280"
    }
  }, "BIC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: "#16A34A"
    }
  }, "2,0 mL/h")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "10px 12px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 7
    }
  }, "\uD83D\uDCCB REFER\xCANCIA \u2014 DROGAS DE INFUS\xC3O CONT\xCDNUA"), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse",
      width: "100%",
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "#F3F4F6"
    }
  }, ["Droga", "Conc.", "Dose", "Fórmula"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: "5px 7px",
      textAlign: "left",
      fontWeight: 700,
      color: "#6B7280",
      borderBottom: "1px solid #E5E7EB"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, DROGAS_DB.map((d, i) => /*#__PURE__*/React.createElement("tr", {
    key: d.id,
    style: {
      background: i % 2 === 0 ? "white" : "#FAFAFA"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 7px",
      borderBottom: "1px solid #F3F4F6"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: d.cor
    }
  }, d.emoji, " ", d.nome), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF"
    }
  }, d.conc)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 7px",
      color: "#374151",
      borderBottom: "1px solid #F3F4F6",
      whiteSpace: "nowrap"
    }
  }, d.doseMin, "\u2013", d.doseMax, " ", d.unidDose), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 7px",
      color: "#6B7280",
      borderBottom: "1px solid #F3F4F6",
      fontStyle: "italic",
      fontSize: 9
    }
  }, d.formula.toString().match(/formula:`([^`]+)`/)?.[1] || "—"))))))))));
}

// ── SNAPPE II CALCULATOR ──────────────────────────────────────────────────────
// Ref: Richardson DK et al. J Pediatr 2001;138:92-100
// Variáveis colhidas nas primeiras 12h de admissão na UTI Neonatal

const SNAPPE_VARS = [{
  id: "pam",
  label: "PAM — Pressão Arterial Média",
  icon: "❤️",
  opcoes: [{
    label: "≥ 30 mmHg",
    pts: 0,
    hint: "Normal"
  }, {
    label: "20 – 29 mmHg",
    pts: 9,
    hint: "Baixa"
  }, {
    label: "< 20 mmHg",
    pts: 19,
    hint: "Crítica"
  }]
}, {
  id: "temp",
  label: "Temperatura mínima",
  icon: "🌡️",
  opcoes: [{
    label: "> 35,6 °C",
    pts: 0,
    hint: "Normal"
  }, {
    label: "35 – 35,6 °C",
    pts: 8,
    hint: "Hipotermia leve"
  }, {
    label: "< 35 °C",
    pts: 15,
    hint: "Hipotermia grave"
  }]
}, {
  id: "po2fio2",
  label: "PO₂ / FiO₂ (mmHg / %)",
  icon: "🫁",
  opcoes: [{
    label: "> 2,49",
    pts: 0,
    hint: "Normal"
  }, {
    label: "1 – 2,49",
    pts: 5,
    hint: "Disfunção leve"
  }, {
    label: "0,3 – 0,99",
    pts: 16,
    hint: "Disfunção moderada"
  }, {
    label: "< 0,3",
    pts: 28,
    hint: "Disfunção grave"
  }]
}, {
  id: "ph",
  label: "pH sérico mais baixo",
  icon: "🩺",
  opcoes: [{
    label: "≥ 7,2",
    pts: 0,
    hint: "Normal"
  }, {
    label: "7,1 – 7,19",
    pts: 7,
    hint: "Acidemia moderada"
  }, {
    label: "< 7,1",
    pts: 16,
    hint: "Acidemia grave"
  }]
}, {
  id: "conv",
  label: "Convulsões múltiplas",
  icon: "⚡",
  opcoes: [{
    label: "Não",
    pts: 0,
    hint: "Ausentes"
  }, {
    label: "Sim",
    pts: 19,
    hint: "Crises epilépticas múltiplas"
  }]
}, {
  id: "diurese",
  label: "Débito urinário",
  icon: "💧",
  opcoes: [{
    label: "≥ 1 mL/kg/h",
    pts: 0,
    hint: "Normal"
  }, {
    label: "0,1 – 0,9 mL/kg/h",
    pts: 5,
    hint: "Oligúria"
  }, {
    label: "< 0,1 mL/kg/h",
    pts: 18,
    hint: "Oligúria grave / Anúria"
  }]
},
// Extensão perinatal (SNAPPE)
{
  id: "apgar",
  label: "Apgar 5'",
  icon: "👶",
  opcoes: [{
    label: "≥ 7",
    pts: 0,
    hint: "Normal"
  }, {
    label: "< 7",
    pts: 18,
    hint: "Depressão neonatal"
  }]
}, {
  id: "peso",
  label: "Peso ao nascer",
  icon: "⚖️",
  opcoes: [{
    label: "≥ 1000 g",
    pts: 0,
    hint: "Normal"
  }, {
    label: "750 – 999 g",
    pts: 10,
    hint: "RNPT extremo"
  }, {
    label: "< 750 g",
    pts: 17,
    hint: "RNPT limítrofe"
  }]
}, {
  id: "pig",
  label: "PIG — Pequeno para a Idade Gestacional",
  icon: "📏",
  opcoes: [{
    label: "> p3 (acima do percentil 3)",
    pts: 0,
    hint: "Adequado"
  }, {
    label: "≤ p3 (abaixo do percentil 3)",
    pts: 12,
    hint: "PIG — Restrição de crescimento"
  }]
}];

// Mortalidade hospitalar estimada (Richardson 2001, curva SNAPPE II)
function getMortalidade(escore) {
  if (escore <= 9) return {
    pct: "<1%",
    desc: "Risco muito baixo",
    cor: "#16A34A",
    bg: "#DCFCE7"
  };
  if (escore <= 19) return {
    pct: "~1–5%",
    desc: "Risco baixo",
    cor: "#65A30D",
    bg: "#ECFCCB"
  };
  if (escore <= 29) return {
    pct: "~5–15%",
    desc: "Risco moderado",
    cor: "#D97706",
    bg: "#FEF9C3"
  };
  if (escore <= 39) return {
    pct: "~15–30%",
    desc: "Risco alto",
    cor: "#EA580C",
    bg: "#FFF7ED"
  };
  if (escore <= 49) return {
    pct: "~30–50%",
    desc: "Risco muito alto",
    cor: "#DC2626",
    bg: "#FEE2E2"
  };
  if (escore <= 69) return {
    pct: "~50–70%",
    desc: "Risco crítico",
    cor: "#991B1B",
    bg: "#FEE2E2"
  };
  return {
    pct: ">70%",
    desc: "Risco extremamente alto",
    cor: "#7F1D1D",
    bg: "#FEE2E2"
  };
}
function SNAPPECalc({
  onClose
}) {
  const [sels, setSels] = useState({}); // {varId: ptsValue}
  const [res, setRes] = useState(null);
  const setSel = (id, pts) => setSels(s => ({
    ...s,
    [id]: pts
  }));
  const calcular = () => {
    const nPreench = Object.keys(sels).length;
    if (nPreench < SNAPPE_VARS.length) {
      setRes({
        aviso: `Preencha todos os ${SNAPPE_VARS.length} campos para o SNAPPE II completo. (${nPreench}/${SNAPPE_VARS.length} preenchidos)`
      });
    }
    const snapII = ["pam", "temp", "po2fio2", "ph", "conv", "diurese"].reduce((acc, id) => acc + (sels[id] || 0), 0);
    const perinatal = ["apgar", "peso", "pig"].reduce((acc, id) => acc + (sels[id] || 0), 0);
    const snappeII = snapII + perinatal;
    const mort = getMortalidade(snappeII);
    const detalhes = SNAPPE_VARS.map(v => ({
      label: v.label,
      icon: v.icon,
      opcaoSel: v.opcoes.find(o => o.pts === (sels[v.id] ?? null)),
      pts: sels[v.id] ?? null
    }));
    setRes({
      snapII,
      snappeII,
      mort,
      detalhes,
      nPreench
    });
  };
  const limpar = () => {
    setSels({});
    setRes(null);
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDCCA SNAPPE II \u2014 Calculadora",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#EDFDF5,#D1FAE5)",
      borderRadius: 11,
      border: "1px solid #22C55E20"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#4ADE80,#22C55E)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(34,197,94,0.3)"
    }
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#14532D"
    }
  }, "SNAPPE II \u2014 Score of Neonatal Acute Physiology"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#15803D",
      marginTop: 1
    }
  }, "Dados das primeiras 12h de admiss\xE3o na UTI Neonatal \xB7 Ref: Richardson 2001"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 9,
      padding: "8px 12px",
      marginBottom: 14,
      border: "1px solid #E5E7EB",
      fontSize: 11,
      color: "#6B7280",
      lineHeight: 1.5
    }
  }, "\uD83D\uDCCB Selecione o ", /*#__PURE__*/React.createElement("b", null, "pior valor"), " de cada vari\xE1vel registrado nas primeiras ", /*#__PURE__*/React.createElement("b", null, "12h ap\xF3s admiss\xE3o"), " na UTIN. Vari\xE1veis 1\u20136 = ", /*#__PURE__*/React.createElement("b", null, "SNAP II"), ". Itens 7\u20139 = extens\xE3o perinatal (SNAPPE II)."), SNAPPE_VARS.map((v, vi) => /*#__PURE__*/React.createElement("div", {
    key: v.id,
    style: {
      marginBottom: 12,
      borderRadius: 12,
      border: `1.5px solid ${sels[v.id] !== undefined ? sels[v.id] === 0 ? "#22C55E" : "#F59E0B" : "#E5E7EB"}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 11px",
      background: vi < 6 ? "linear-gradient(90deg,#EDFDF5,#F0FDF4)" : "linear-gradient(90deg,#EFF6FF,#F0F9FF)",
      borderBottom: "1px solid #F3F4F6"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, v.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: "#111827"
    }
  }, vi + 1, ". ", v.label), vi === 5 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      fontWeight: 600
    }
  }, "\u2191 SNAP II (itens 1\u20136) \u2191"), vi === 6 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#3B82F6",
      fontWeight: 700
    }
  }, "\u2193 Extens\xE3o Perinatal \u2193")), sels[v.id] !== undefined && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 8px",
      borderRadius: 6,
      background: sels[v.id] === 0 ? "#22C55E" : "#F59E0B",
      color: "white",
      fontWeight: 900,
      fontSize: 12
    }
  }, sels[v.id], " pts")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 11px",
      display: "flex",
      flexDirection: "column",
      gap: 5,
      background: "white"
    }
  }, v.opcoes.map(op => /*#__PURE__*/React.createElement("button", {
    key: op.pts,
    onClick: () => setSel(v.id, op.pts),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "7px 10px",
      borderRadius: 9,
      border: `1.5px solid ${sels[v.id] === op.pts ? op.pts === 0 ? "#22C55E" : "#F59E0B" : "#E5E7EB"}`,
      background: sels[v.id] === op.pts ? op.pts === 0 ? "#DCFCE7" : op.pts <= 9 ? "#FEF9C3" : "#FEE2E2" : "#FAFAFA",
      transition: "all 0.15s",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 7,
      background: sels[v.id] === op.pts ? op.pts === 0 ? "#22C55E" : op.pts <= 9 ? "#F59E0B" : "#EF4444" : "#F3F4F6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 900,
      color: sels[v.id] === op.pts ? "white" : "#9CA3AF"
    }
  }, op.pts)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: sels[v.id] === op.pts ? 700 : 500,
      color: sels[v.id] === op.pts ? "#111827" : "#374151"
    }
  }, op.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF"
    }
  }, op.hint)), sels[v.id] === op.pts && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "\u2713")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 10,
      padding: "8px 12px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF"
    }
  }, "PROGRESSO"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: Object.keys(sels).length === SNAPPE_VARS.length ? "#22C55E" : "#F59E0B"
    }
  }, Object.keys(sels).length, "/", SNAPPE_VARS.length, " preenchidos")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 4,
      background: "#E5E7EB",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 4,
      background: `linear-gradient(90deg,#22C55E,#4ADE80)`,
      width: `${Object.keys(sels).length / SNAPPE_VARS.length * 100}%`,
      transition: "width 0.3s"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#22C55E,#4ADE80)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(34,197,94,0.4)"
    }
  }, "\u26A1 Calcular SNAPPE II")), res && /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, res.aviso && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF9C3",
      borderRadius: 10,
      padding: "9px 12px",
      marginBottom: 10,
      border: "1px solid #F59E0B",
      fontSize: 12,
      color: "#92400E",
      fontWeight: 600
    }
  }, "\u26A0\uFE0F ", res.aviso), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#0F766E,#14B8A6)",
      borderRadius: 14,
      padding: "12px 14px",
      textAlign: "center",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
      marginBottom: 2
    }
  }, "SNAP II"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 38,
      fontWeight: 900,
      lineHeight: 1
    }
  }, res.snapII), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)"
    }
  }, "itens 1\u20136")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${res.mort.cor},${res.mort.cor}CC)`,
      borderRadius: 14,
      padding: "12px 14px",
      textAlign: "center",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
      marginBottom: 2
    }
  }, "SNAPPE II"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 38,
      fontWeight: 900,
      lineHeight: 1
    }
  }, res.snappeII), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)"
    }
  }, "escore total"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.mort.bg,
      borderRadius: 14,
      padding: "13px 15px",
      marginBottom: 12,
      border: `2px solid ${res.mort.cor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: res.mort.cor,
      marginBottom: 4
    }
  }, "\uD83D\uDCC8 MORTALIDADE HOSPITALAR ESTIMADA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      fontWeight: 900,
      color: res.mort.cor,
      lineHeight: 1,
      marginBottom: 4
    }
  }, res.mort.pct), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: "4px 16px",
      borderRadius: 20,
      background: res.mort.cor,
      color: "white",
      fontWeight: 800,
      fontSize: 12,
      marginBottom: 6
    }
  }, res.mort.desc.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: res.mort.cor,
      opacity: 0.8
    }
  }, "Ref: Richardson DK et al. J Pediatr 2001;138:92\u2013100")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: "10px 13px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 8
    }
  }, "\uD83D\uDCCA SNAPPE II \u2014 ESCALA DE RISCO"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 24,
      borderRadius: 8,
      overflow: "hidden",
      background: "linear-gradient(90deg,#DCFCE7 0%,#FEF9C3 30%,#FFF7ED 50%,#FEE2E2 70%,#FCA5A5 85%,#FEE2E2 100%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${Math.min(97, res.snappeII / 100 * 100)}%`,
      width: 3,
      height: "100%",
      background: res.mort.cor,
      transform: "translateX(-50%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: `${Math.min(94, res.snappeII / 100 * 100)}%`,
      transform: "translate(-50%,-50%)",
      background: res.mort.cor,
      color: "white",
      borderRadius: 5,
      padding: "1px 7px",
      fontSize: 11,
      fontWeight: 900,
      whiteSpace: "nowrap"
    }
  }, res.snappeII)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 9,
      color: "#9CA3AF",
      marginTop: 3
    }
  }, ["0", "10", "20", "30", "40", "60", "80", "100+"].map(v => /*#__PURE__*/React.createElement("span", {
    key: v
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 8
    }
  }, "\uD83D\uDD0D DETALHAMENTO"), res.detalhes.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "7px 10px",
      borderRadius: 9,
      marginBottom: 5,
      background: d.pts === null ? "#F9FAFB" : d.pts === 0 ? "#DCFCE7" : d.pts <= 9 ? "#FEF9C3" : "#FEE2E2",
      border: `1px solid ${d.pts === null ? "#E5E7EB" : d.pts === 0 ? "#86EFAC" : d.pts <= 9 ? "#FDE68A" : "#FCA5A5"}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      flexShrink: 0
    }
  }, d.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#111827"
    }
  }, i + 1, ". ", d.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6B7280"
    }
  }, d.opcaoSel ? d.opcaoSel.label : "Não preenchido", " \xB7 ", d.opcaoSel?.hint || "")), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "3px 9px",
      borderRadius: 7,
      background: d.pts === null ? "#E5E7EB" : d.pts === 0 ? "#22C55E" : d.pts <= 9 ? "#F59E0B" : "#EF4444",
      color: "white",
      fontWeight: 900,
      fontSize: 13,
      minWidth: 30,
      textAlign: "center"
    }
  }, d.pts === null ? "?" : d.pts)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "10px 13px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 7
    }
  }, "\uD83D\uDCCB TABELA DE MORTALIDADE \u2014 SNAPPE II"), [["0–9", "< 1%", "Muito baixo", "#16A34A", "#DCFCE7"], ["10–19", "1–5%", "Baixo", "#65A30D", "#ECFCCB"], ["20–29", "5–15%", "Moderado", "#D97706", "#FEF9C3"], ["30–39", "15–30%", "Alto", "#EA580C", "#FFF7ED"], ["40–49", "30–50%", "Muito alto", "#DC2626", "#FEE2E2"], ["50–69", "50–70%", "Crítico", "#991B1B", "#FEE2E2"], ["≥70", "> 70%", "Extremamente alto", "#7F1D1D", "#FEE2E2"]].map(([range, mort, desc, c, bg]) => /*#__PURE__*/React.createElement("div", {
    key: range,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "6px 9px",
      borderRadius: 8,
      marginBottom: 4,
      background: bg,
      border: `1px solid ${c}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 40,
      padding: "2px 6px",
      borderRadius: 5,
      background: c,
      color: "white",
      fontWeight: 900,
      fontSize: 10,
      textAlign: "center"
    }
  }, range), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 11,
      fontWeight: 700,
      color: c
    }
  }, desc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 900,
      color: c
    }
  }, mort))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "#9CA3AF",
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "\u26A0\uFE0F Os dados devem ser coletados nas primeiras 12h ap\xF3s admiss\xE3o na UTI Neonatal. Sempre correlacionar com o quadro cl\xEDnico."))));
}

// ── NIPS — ESCALA DE DOR NEONATAL ─────────────────────────────────────────────
const NIPS_VARS = [{
  id: "face",
  label: "FACE",
  icon: "😣",
  opcoes: [{
    pts: 0,
    label: "Relaxada",
    emoji: "😌",
    desc: "Expressão facial tranquila, musculos relaxados"
  }, {
    pts: 1,
    label: "Contraída",
    emoji: "😣",
    desc: "Careca franzida, sobrancelhas unidas, sulco nasolabial aprofundado"
  }]
}, {
  id: "choro",
  label: "CHORO",
  icon: "😭",
  opcoes: [{
    pts: 0,
    label: "Ausente",
    emoji: "🤫",
    desc: "Quieto, sem choro"
  }, {
    pts: 1,
    label: "Resmungo",
    emoji: "😤",
    desc: "Gemido suave, intermitente"
  }, {
    pts: 2,
    label: "Vigoroso",
    emoji: "😭",
    desc: "Choro forte, contínuo, estridente"
  }]
}, {
  id: "resp",
  label: "RESPIRAÇÃO",
  icon: "🫁",
  opcoes: [{
    pts: 0,
    label: "Regular",
    emoji: "😮‍💨",
    desc: "Padrão respiratório habitual"
  }, {
    pts: 1,
    label: "Diferente da basal",
    emoji: "⚡",
    desc: "Irregular, mais rápida, apneia, suspiros"
  }]
}, {
  id: "bracos",
  label: "BRAÇOS",
  icon: "💪",
  opcoes: [{
    pts: 0,
    label: "Relaxados",
    emoji: "😌",
    desc: "Sem tensão muscular, movimentos livres"
  }, {
    pts: 1,
    label: "Fletidos/Estendidos",
    emoji: "😬",
    desc: "Tensão, hipertonia, braços rígidos fletidos ou estendidos"
  }]
}, {
  id: "pernas",
  label: "PERNAS",
  icon: "🦵",
  opcoes: [{
    pts: 0,
    label: "Relaxadas",
    emoji: "😌",
    desc: "Sem tensão muscular, movimentos livres"
  }, {
    pts: 1,
    label: "Fletidas/Estendidas",
    emoji: "😬",
    desc: "Tensão, hipertonia, pernas rígidas fletidas ou estendidas"
  }]
}, {
  id: "alerta",
  label: "ESTADO DE ALERTA",
  icon: "👁️",
  opcoes: [{
    pts: 0,
    label: "Dormindo e/ou calmo",
    emoji: "😴",
    desc: "RN tranquilo, dormindo ou vígil quieto"
  }, {
    pts: 1,
    label: "Desconfortável e/ou irritado",
    emoji: "😡",
    desc: "Agitado, inquieto, irritável"
  }]
}];
function getInterpNIPS(score, intubado) {
  const s = intubado ? score : score; // mesmo score, só choro muda
  if (s === 0) return {
    nivel: "Sem dor",
    cor: "#16A34A",
    bg: "#DCFCE7",
    emoji: "✅",
    conduta: "Nenhuma intervenção necessária. Manter conforto e monitoramento."
  };
  if (s <= 2) return {
    nivel: "Dor leve",
    cor: "#65A30D",
    bg: "#ECFCCB",
    emoji: "💚",
    conduta: "Medidas não farmacológicas: sucção não nutritiva, sacarose 25% 0,5mL VO 2min antes do procedimento, posicionamento canguru, contenção, enrolamento."
  };
  if (s <= 3) return {
    nivel: "Dor moderada",
    cor: "#D97706",
    bg: "#FEF9C3",
    emoji: "⚠️",
    conduta: "Associar medidas não farmacológicas + avaliar analgesia farmacológica. Dipirona 10–15mg/kg/dose EV ou VO. Paracetamol 15mg/kg/dose VO. Reavaliar em 30min."
  };
  if (s <= 5) return {
    nivel: "Dor intensa",
    cor: "#EA580C",
    bg: "#FFF7ED",
    emoji: "🔴",
    conduta: "Analgesia farmacológica indicada. Morfina 0,05–0,1mg/kg/dose EV lento. Fentanil 1–2mcg/kg/dose EV. Se VM: considerar infusão contínua. NIPS >3 = transportar com analgesia."
  };
  return {
    nivel: "Dor muito intensa",
    cor: "#DC2626",
    bg: "#FEE2E2",
    emoji: "🚨",
    conduta: "Dor intratável. Avaliar causa. Opioides IV contínuos. Sedação se agitação grave. Se recebendo opioides → transportar intubado. Reavaliar a cada 30–60min."
  };
}
function NIPSCalc({
  onClose
}) {
  const [sels, setSels] = useState({});
  const [intubado, setIntubado] = useState(false);
  const [res, setRes] = useState(null);
  const setSel = (id, pts) => {
    setSels(s => ({
      ...s,
      [id]: pts
    }));
    setRes(null);
  };

  // Score com regra de intubado: face×2, sem choro
  const calcScore = () => {
    let score = 0;
    NIPS_VARS.forEach(v => {
      if (sels[v.id] === undefined) return;
      if (intubado && v.id === "choro") return; // intubado: não pontua choro
      let pts = sels[v.id];
      if (intubado && v.id === "face") pts = pts * 2; // dobra face
      score += pts;
    });
    return score;
  };
  const preenchidos = NIPS_VARS.filter(v => {
    if (intubado && v.id === "choro") return true; // skip choro se intubado
    return sels[v.id] !== undefined;
  }).length;
  const total = intubado ? NIPS_VARS.length - 1 : NIPS_VARS.length; // choro não conta se intubado

  const calcular = () => {
    const varsFaltando = NIPS_VARS.filter(v => {
      if (intubado && v.id === "choro") return false;
      return sels[v.id] === undefined;
    });
    if (varsFaltando.length > 0) {
      setRes({
        aviso: `Preencha todos os campos. Faltam: ${varsFaltando.map(v => v.label).join(", ")}`
      });
      return;
    }
    const score = calcScore();
    const interp = getInterpNIPS(score, intubado);
    // Detalhes
    const detalhes = NIPS_VARS.map(v => {
      const skip = intubado && v.id === "choro";
      const pts = skip ? null : sels[v.id];
      const ptsEfetivo = skip ? 0 : intubado && v.id === "face" && pts !== undefined ? pts * 2 : pts;
      return {
        ...v,
        skip,
        pts: pts === undefined ? null : pts,
        ptsEfetivo: ptsEfetivo === undefined ? null : ptsEfetivo,
        opcaoSel: pts !== undefined ? v.opcoes.find(o => o.pts === pts) : null
      };
    });
    setRes({
      score,
      interp,
      detalhes,
      intubado
    });
  };
  const limpar = () => {
    setSels({});
    setRes(null);
  };

  // score em tempo real
  const liveScore = Object.values(sels).length > 0 ? calcScore() : null;
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDE22 Escala de Dor NIPS \u2014 RN",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#FEF2F2,#FEE2E2)",
      borderRadius: 11,
      border: "1px solid #EF444420"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#F87171,#EF4444)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(239,68,68,0.3)"
    }
  }, "\uD83D\uDE22"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#7F1D1D"
    }
  }, "NIPS \u2014 Neonatal Infant Pain Scale"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#991B1B",
      marginTop: 1
    }
  }, "Escala de Dor no RN \xB7 6 par\xE2metros comportamentais"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIntubado(v => !v);
      setRes(null);
    },
    style: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: 11,
      border: `2px solid ${intubado ? "#7C3AED" : "#E5E7EB"}`,
      background: intubado ? "#F5F3FF" : "white",
      display: "flex",
      alignItems: "center",
      gap: 10,
      transition: "all 0.2s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 20,
      borderRadius: 10,
      background: intubado ? "#7C3AED" : "#D1D5DB",
      position: "relative",
      flexShrink: 0,
      transition: "background 0.2s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 2,
      left: intubado ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "white",
      transition: "left 0.18s",
      boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: intubado ? "#7C3AED" : "#6B7280"
    }
  }, "\uD83E\uDEC1 RN Intubado / Em Ventila\xE7\xE3o Mec\xE2nica"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF"
    }
  }, intubado ? "Ativo: face×2 · choro não pontuado" : "Inativo: avaliação padrão")), intubado && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      padding: "2px 8px",
      borderRadius: 5,
      background: "#7C3AED",
      color: "white",
      fontSize: 10,
      fontWeight: 700
    }
  }, "ATIVO")), intubado && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      padding: "7px 12px",
      borderRadius: 9,
      background: "#F5F3FF",
      border: "1px solid #DDD6FE",
      fontSize: 11,
      color: "#7C3AED",
      fontWeight: 600
    }
  }, "\uD83D\uDCCB Regras: Dobrar a pontua\xE7\xE3o de FACE \xB7 N\xE3o pontuar CHORO (RN n\xE3o chora se intubado)")), NIPS_VARS.map((v, vi) => {
    const isSkipped = intubado && v.id === "choro";
    const isDoubled = intubado && v.id === "face";
    return /*#__PURE__*/React.createElement("div", {
      key: v.id,
      style: {
        marginBottom: 10,
        borderRadius: 12,
        border: `1.5px solid ${isSkipped ? "#E5E7EB" : sels[v.id] !== undefined ? sels[v.id] === 0 ? "#22C55E" : "#EF4444" : "#E5E7EB"}`,
        overflow: "hidden",
        opacity: isSkipped ? 0.4 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 11px",
        background: isSkipped ? "#F9FAFB" : "linear-gradient(90deg,#FEF2F2,#FFF5F5)",
        borderBottom: "1px solid #F3F4F6"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, v.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        color: isSkipped ? "#9CA3AF" : "#111827"
      }
    }, v.label, isDoubled && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 6,
        padding: "1px 6px",
        borderRadius: 4,
        background: "#7C3AED",
        color: "white",
        fontSize: 9,
        fontWeight: 700
      }
    }, "\xD72 se intubado"), isSkipped && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 6,
        padding: "1px 6px",
        borderRadius: 4,
        background: "#9CA3AF",
        color: "white",
        fontSize: 9
      }
    }, "N\xE3o pontua (intubado)"))), sels[v.id] !== undefined && !isSkipped && /*#__PURE__*/React.createElement("span", {
      style: {
        padding: "2px 8px",
        borderRadius: 6,
        background: sels[v.id] === 0 ? "#22C55E" : "#EF4444",
        color: "white",
        fontWeight: 900,
        fontSize: 12
      }
    }, isDoubled ? `${sels[v.id]}×2=${sels[v.id] * 2}` : sels[v.id], " pts")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 11px",
        display: "grid",
        gridTemplateColumns: `repeat(${v.opcoes.length},1fr)`,
        gap: 6,
        background: "white"
      }
    }, v.opcoes.map(op => {
      const isSel = sels[v.id] === op.pts;
      const ptsDisplay = isDoubled ? (op.pts * 2).toString() : op.pts.toString();
      return /*#__PURE__*/React.createElement("button", {
        key: op.pts,
        onClick: () => !isSkipped && setSel(v.id, op.pts),
        disabled: isSkipped,
        style: {
          padding: "9px 6px",
          borderRadius: 10,
          border: `2px solid ${isSel ? op.pts === 0 ? "#22C55E" : "#EF4444" : "#E5E7EB"}`,
          background: isSel ? op.pts === 0 ? "#DCFCE7" : op.pts === 1 && v.opcoes.length === 3 ? "#FEF9C3" : "#FEE2E2" : "#FAFAFA",
          textAlign: "center",
          transition: "all 0.15s",
          cursor: isSkipped ? "not-allowed" : "pointer"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 22,
          marginBottom: 3
        }
      }, op.emoji), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          fontWeight: 800,
          color: isSel ? op.pts === 0 ? "#16A34A" : "#DC2626" : "#374151"
        }
      }, op.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#9CA3AF",
          marginTop: 1,
          lineHeight: 1.3
        }
      }, op.desc), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 5,
          display: "inline-block",
          padding: "2px 9px",
          borderRadius: 6,
          background: isSel ? op.pts === 0 ? "#22C55E" : "#EF4444" : "#E5E7EB",
          color: isSel ? "white" : "#9CA3AF",
          fontWeight: 900,
          fontSize: 12
        }
      }, ptsDisplay, " pt", ptsDisplay !== "1" ? "s" : ""));
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "9px 13px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF"
    }
  }, "PROGRESSO \u2014 ", Object.keys(sels).filter(id => !(intubado && id === "choro")).length, "/", total, " preenchidos"), liveScore !== null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 900,
      color: "#EF4444"
    }
  }, "Score atual: ", liveScore)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: 4,
      background: "#E5E7EB",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 4,
      background: "linear-gradient(90deg,#EF4444,#F87171)",
      width: `${Object.keys(sels).filter(id => !(intubado && id === "choro")).length / total * 100}%`,
      transition: "width 0.3s"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#EF4444,#F87171)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(239,68,68,0.4)"
    }
  }, "\u26A1 Avaliar Dor")), res && /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, res.aviso && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF9C3",
      borderRadius: 10,
      padding: "9px 12px",
      marginBottom: 10,
      border: "1px solid #F59E0B",
      fontSize: 12,
      color: "#92400E",
      fontWeight: 600
    }
  }, "\u26A0\uFE0F ", res.aviso), !res.aviso && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.interp.bg,
      borderRadius: 16,
      padding: "14px 16px",
      marginBottom: 12,
      border: `2px solid ${res.interp.cor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      marginBottom: 6
    }
  }, res.interp.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 52,
      fontWeight: 900,
      color: res.interp.cor,
      lineHeight: 1,
      marginBottom: 4
    }
  }, res.score, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: res.interp.cor + "99"
    }
  }, "/7")), res.intubado && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: res.interp.cor + "99",
      marginBottom: 4
    }
  }, "Score corrigido (RN intubado)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: "5px 18px",
      borderRadius: 20,
      background: res.interp.cor,
      color: "white",
      fontWeight: 900,
      fontSize: 13,
      marginBottom: 6
    }
  }, res.interp.nivel.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "9px 13px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 7
    }
  }, "\uD83D\uDCCA ESCALA NIPS \u2014 0 a 7"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 22,
      borderRadius: 7,
      overflow: "hidden",
      background: "linear-gradient(90deg,#DCFCE7 0%,#ECFCCB 28%,#FEF9C3 42%,#FFF7ED 57%,#FEE2E2 71%,#FCA5A5 86%,#FEE2E2 100%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${Math.min(96, res.score / 7 * 100)}%`,
      width: 3,
      height: "100%",
      background: res.interp.cor,
      transform: "translateX(-50%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: `${Math.min(93, res.score / 7 * 100)}%`,
      transform: "translate(-50%,-50%)",
      background: res.interp.cor,
      color: "white",
      borderRadius: 5,
      padding: "1px 7px",
      fontSize: 11,
      fontWeight: 900,
      whiteSpace: "nowrap"
    }
  }, res.score)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 9,
      color: "#9CA3AF",
      marginTop: 3
    }
  }, ["0", "1", "2", "3", "4", "5", "6", "7"].map(v => /*#__PURE__*/React.createElement("span", {
    key: v
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: 4,
      marginTop: 8
    }
  }, [["0", "Sem dor", "#16A34A", "#DCFCE7"], ["1–2", "Leve", "#65A30D", "#ECFCCB"], ["3", "Moderada", "#D97706", "#FEF9C3"], ["4–5", "Intensa", "#EA580C", "#FFF7ED"], ["6–7", "Muito intensa", "#DC2626", "#FEE2E2"]].map(([r, l, c, bg]) => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      background: bg,
      borderRadius: 7,
      padding: "4px 5px",
      textAlign: "center",
      border: `1px solid ${c}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 900,
      color: c
    }
  }, r), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      color: c,
      fontWeight: 600
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 7
    }
  }, "\uD83D\uDD0D DETALHAMENTO"), res.detalhes.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "7px 10px",
      borderRadius: 9,
      marginBottom: 5,
      background: d.skip ? "#F9FAFB" : d.ptsEfetivo === 0 ? "#DCFCE7" : d.ptsEfetivo && d.ptsEfetivo > 0 ? "#FEE2E2" : "#F9FAFB",
      border: `1px solid ${d.skip ? "#E5E7EB" : d.ptsEfetivo === 0 ? "#86EFAC" : d.ptsEfetivo && d.ptsEfetivo > 0 ? "#FCA5A5" : "#E5E7EB"}`,
      opacity: d.skip ? 0.45 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      flexShrink: 0
    }
  }, d.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#111827"
    }
  }, d.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6B7280"
    }
  }, d.skip ? "Não pontuado (intubado)" : d.opcaoSel ? `${d.opcaoSel.emoji} ${d.opcaoSel.label} — ${d.opcaoSel.desc}` : "")), !d.skip && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "3px 9px",
      borderRadius: 7,
      background: d.ptsEfetivo === 0 ? "#22C55E" : "#EF4444",
      color: "white",
      fontWeight: 900,
      fontSize: 13,
      minWidth: 32,
      textAlign: "center"
    }
  }, d.ptsEfetivo), d.skip && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "3px 9px",
      borderRadius: 7,
      background: "#9CA3AF",
      color: "white",
      fontSize: 10,
      fontWeight: 700
    }
  }, "\u2014")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#7F1D1D,#991B1B)",
      borderRadius: 14,
      padding: "13px 15px",
      marginBottom: 12,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.65)",
      fontWeight: 700,
      marginBottom: 6
    }
  }, "\uD83D\uDC8A CONDUTA RECOMENDADA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.75,
      color: "rgba(255,255,255,0.93)"
    }
  }, res.interp.conduta)), res.score > 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF2F2",
      borderRadius: 11,
      padding: "9px 13px",
      marginBottom: 12,
      border: "2px solid #EF4444"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "#DC2626",
      marginBottom: 3
    }
  }, "\uD83D\uDE91 ALERTA DE TRANSPORTE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#374151",
      lineHeight: 1.6
    }
  }, "NIPS ", ">", " 3 \u2192 ", /*#__PURE__*/React.createElement("b", null, "transportar com analgesia adequada"), /*#__PURE__*/React.createElement("br", null), res.intubado ? "RN intubado → manter VM durante transporte." : "Se RN recebendo opioides → <b>transportar intubado</b>.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0FDF4",
      borderRadius: 11,
      padding: "9px 13px",
      border: "1px solid #86EFAC"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#15803D",
      marginBottom: 6
    }
  }, "\uD83C\uDF3F MEDIDAS N\xC3O FARMACOL\xD3GICAS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 5
    }
  }, [["🍬", "Sacarose 25%", "0,5mL VO 2min antes do procedimento"], ["👐", "Contenção", "Enrolamento, swaddling"], ["🤱", "Canguru", "Contato pele a pele com os pais"], ["🍼", "Sucção", "Sucção não nutritiva (chupeta)"], ["💡", "Ambiente", "Reduzir luz e ruído"], ["🛏️", "Posição", "Decúbito ventral ou lateral em ninho"]].map(([e, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      background: "white",
      borderRadius: 8,
      padding: "6px 8px",
      display: "flex",
      gap: 6,
      alignItems: "flex-start",
      border: "1px solid #DCFCE7"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      flexShrink: 0
    }
  }, e), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#15803D"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#6B7280",
      lineHeight: 1.3
    }
  }, d)))))))));
}

// ── ESCORE TRANSFUSIONAL CALCULATOR ──────────────────────────────────────────
// Tabela 33.3 — Indicação de Transfusão Sanguínea (Hemácias)
// Critérios baseados em assistência respiratória, tempo de vida, FiO2/MAP e Hb/Ht

function avaliarTransfusao(assist, diasVida, fio2, map, hb, ht) {
  const diasN = parseFloat(diasVida);
  const fio2N = parseFloat(fio2);
  const mapN = parseFloat(map);
  const hbN = parseFloat(hb);
  const htN = parseFloat(ht);
  let indicado = false,
    motivo = "",
    nivel = "",
    cor = "",
    bg = "",
    emoji = "";
  let limHb = null,
    limHt = null,
    conduta = "",
    obs = "";
  if (assist === "vm") {
    if (diasN < 28) {
      if (fio2N >= 0.30) {
        limHb = 12;
        limHt = 40;
        if (!isNaN(hbN) && hbN < 12 || !isNaN(htN) && htN < 40) {
          indicado = true;
          motivo = "VM < 28 dias + FiO₂ ≥ 0,30";
        }
      } else {
        limHb = 11;
        limHt = 35;
        if (!isNaN(hbN) && hbN < 11 || !isNaN(htN) && htN < 35) {
          indicado = true;
          motivo = "VM < 28 dias + FiO₂ < 0,30";
        }
      }
    } else {
      // ≥ 28 dias — VAFO MAP > 14 ou ≤ 14
      if (mapN > 14 || fio2N > 0.40) {
        limHb = 10;
        limHt = 30;
        if (!isNaN(hbN) && hbN < 10 || !isNaN(htN) && htN < 30) {
          indicado = true;
          motivo = "VM ≥ 28 dias + FiO₂ > 0,40 ou MAP > 14";
          obs = "*VAFO com MAP > 14 cmH₂O";
        }
      } else {
        limHb = 8;
        limHt = 25;
        if (!isNaN(hbN) && hbN <= 8 || !isNaN(htN) && htN < 25) {
          indicado = true;
          motivo = "VM ≥ 28 dias + FiO₂ < 0,40 e MAP ≤ 14";
          obs = "**VAFO com MAP ≤ 14 cmH₂O";
        }
      }
    }
  } else if (assist === "cpap") {
    if (diasN <= 1) {
      limHb = 12;
      limHt = 40;
      if (!isNaN(hbN) && hbN < 12 || !isNaN(htN) && htN < 40) {
        indicado = true;
        motivo = "CPAP ≤ 24h de vida";
      }
    } else if (diasN < 28) {
      limHb = 10;
      limHt = 30;
      if (!isNaN(hbN) && hbN < 10 || !isNaN(htN) && htN < 30) {
        indicado = true;
        motivo = "CPAP 1–28 dias de vida";
      }
    } else {
      limHb = 8.5;
      limHt = 25;
      if (!isNaN(hbN) && hbN < 8.5 || !isNaN(htN) && htN < 25) {
        indicado = true;
        motivo = "CPAP ≥ 28 dias de vida";
      }
    }
  } else {
    // espontânea
    if (fio2N >= 0.21) {
      limHb = 8.5;
      limHt = 25;
      if (!isNaN(hbN) && hbN < 8.5 || !isNaN(htN) && htN < 25) {
        indicado = true;
        motivo = "Resp. Espontânea + FiO₂ ≥ 0,21";
        obs = "*Associado a sintomas clínicos (ver abaixo)";
      }
    } else {
      // ar ambiente
      limHb = 7;
      limHt = 20;
      if (!isNaN(hbN) && hbN < 7 || !isNaN(htN) && htN < 20) {
        indicado = true;
        motivo = "Resp. Espontânea em ar ambiente";
        obs = "*Associado a sintomas clínicos";
      }
    }
  }
  if (indicado) {
    const gravHb = !isNaN(hbN) ? hbN < limHb - 4 ? "grave" : hbN < limHb - 2 ? "moderada" : "leve" : null;
    nivel = gravHb === "grave" ? "Anemia grave — Transfusão urgente" : gravHb === "moderada" ? "Anemia moderada — Transfusão indicada" : "Anemia leve — Transfusão indicada";
    cor = "#DC2626";
    bg = "#FEE2E2";
    emoji = "🩸";
    conduta = `TRANSFUSÃO INDICADA\n• Volume: 10–15 mL/kg de concentrado de hemácias (CH)\n• Tempo de infusão: 3–4 horas\n• Filtrado, irradiado e CMV negativo para RNPT\n• Reavaliação pós-transfusional em 4–6h\n• Solicitar: tipagem e XPROVA, CH irradiado/filtrado\n• Motivo: ${motivo}`;
  } else {
    nivel = "Transfusão NÃO indicada pelos critérios atuais";
    cor = "#16A34A";
    bg = "#DCFCE7";
    emoji = "✅";
    conduta = `Hb/Ht acima dos limiares de transfusão para o perfil atual.\n• Limiar Hb: ${limHb} g/dL · Limiar Ht: ${limHt}%\n• Manter monitoramento clínico e laboratorial\n• Reavaliação se deterioração clínica`;
  }
  return {
    indicado,
    nivel,
    motivo,
    cor,
    bg,
    emoji,
    conduta,
    limHb,
    limHt,
    obs
  };
}
function TransfusaoCalc({
  onClose
}) {
  const [assist, setAssist] = useState(""); // vm | cpap | espontanea
  const [diasVida, setDiasVida] = useState("");
  const [fio2, setFio2] = useState("");
  const [map, setMap] = useState("");
  const [hb, setHb] = useState("");
  const [ht, setHt] = useState("");
  const [peso, setPeso] = useState("");
  const [res, setRes] = useState(null);

  // Sintomas clínicos (para resp. espontânea)
  const [sintomas, setSintomas] = useState({
    apneia: false,
    taqu: false,
    ganho: false,
    cirurgia: false,
    acidose: false
  });
  const toggleS = k => setSintomas(s => ({
    ...s,
    [k]: !s[k]
  }));
  const nSintomas = Object.values(sintomas).filter(Boolean).length;
  const calcular = () => {
    if (!assist) {
      setRes({
        erro: "Selecione a assistência respiratória."
      });
      return;
    }
    if (!hb && !ht) {
      setRes({
        erro: "Informe pelo menos Hb (g/dL) ou Ht (%)."
      });
      return;
    }
    const diasN = parseFloat(diasVida) || 0;
    const fio2N = parseFloat(fio2) || 0;
    const mapN = parseFloat(map) || 0;
    const hbN = parseFloat(hb);
    const htN = parseFloat(ht);
    const pesoN = parseFloat(peso);
    const r = avaliarTransfusao(assist, diasN, fio2N, mapN, hbN, htN);

    // Volume de CH
    let volCH = "",
      volCH15 = "";
    if (!isNaN(pesoN) && pesoN > 0) {
      volCH = (10 * pesoN).toFixed(1);
      volCH15 = (15 * pesoN).toFixed(1);
    }

    // Déficit de Hb (se hb informada)
    let defHb = "";
    if (!isNaN(hbN) && r.limHb && hbN < r.limHb) {
      defHb = (r.limHb - hbN).toFixed(1);
    }

    // Sintomas para resp espontânea
    const sintomasPresentes = assist === "espontanea" && nSintomas > 0;
    setRes({
      ...r,
      volCH,
      volCH15,
      defHb,
      hbN,
      htN,
      pesoN,
      fio2N,
      mapN,
      diasN,
      sintomasPresentes,
      nSintomas,
      assist
    });
  };
  const limpar = () => {
    setAssist("");
    setDiasVida("");
    setFio2("");
    setMap("");
    setHb("");
    setHt("");
    setPeso("");
    setSintomas({
      apneia: false,
      taqu: false,
      ganho: false,
      cirurgia: false,
      acidose: false
    });
    setRes(null);
  };
  const inpS = {
    width: "100%",
    padding: "9px 11px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    background: "#FAFAFA",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    fontWeight: 700
  };
  const lbS = {
    fontSize: 10,
    fontWeight: 700,
    color: "#374151",
    display: "block",
    marginBottom: 3,
    textAlign: "center"
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83E\uDE78 Escore Transfusional \u2014 Indica\xE7\xE3o de Transfus\xE3o",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#FDF2F8,#FCE7F3)",
      borderRadius: 11,
      border: "1px solid #EC489920"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#F472B6,#EC4899)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(236,72,153,0.3)"
    }
  }, "\uD83E\uDE78"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#831843"
    }
  }, "Indica\xE7\xE3o de Transfus\xE3o de Hem\xE1cias"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9D174D",
      marginTop: 1
    }
  }, "Tabela 33.3 \xB7 VM \xB7 CPAP \xB7 Respira\xE7\xE3o Espont\xE2nea"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 6
    }
  }, "1. Assist\xEAncia Respirat\xF3ria"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, [["vm", "🫁 Ventilação Mecânica (VM)", "Inclui VAFO"], ["cpap", "😮‍💨 CPAP Nasal", "CPAP ou O₂ de alto fluxo"], ["espontanea", "🌬️ Respiração Espontânea", "Ar ambiente ou FiO₂ suplementar"]].map(([v, l, sub]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => {
      setAssist(v);
      setRes(null);
    },
    style: {
      padding: "9px 12px",
      borderRadius: 10,
      border: `1.5px solid ${assist === v ? "#EC4899" : "#E5E7EB"}`,
      background: assist === v ? "#FDF2F8" : "white",
      display: "flex",
      alignItems: "center",
      gap: 10,
      transition: "all 0.15s",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      border: `2px solid ${assist === v ? "#EC4899" : "#D1D5DB"}`,
      background: assist === v ? "#EC4899" : "white",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: assist === v ? "#BE185D" : "#374151"
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9CA3AF"
    }
  }, sub)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "2. Dias de vida"), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    min: "0",
    value: diasVida,
    onChange: e => setDiasVida(e.target.value),
    placeholder: "Ex: 5"
  })), (assist === "vm" || assist === "espontanea") && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "FiO\u2082 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(fra\xE7\xE3o 0\u20131)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#7C3AED"
    },
    type: "number",
    step: "0.01",
    min: "0.21",
    max: "1",
    value: fio2,
    onChange: e => setFio2(e.target.value),
    placeholder: "Ex: 0.35"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 2
    }
  }, "0,21 = ar ambiente")), assist === "vm" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "MAP ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(cmH\u2082O)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#0369A1"
    },
    type: "number",
    step: "0.5",
    min: "0",
    value: map,
    onChange: e => setMap(e.target.value),
    placeholder: "Ex: 12"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      textAlign: "center",
      marginTop: 2
    }
  }, "Press\xE3o m\xE9dia via a\xE9rea"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Hb ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(g/dL)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#DC2626",
      fontSize: 16
    },
    type: "number",
    step: "0.1",
    value: hb,
    onChange: e => setHb(e.target.value),
    placeholder: "Ex: 9.5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Ht ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(%) \u2014 opcional")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#EA580C"
    },
    type: "number",
    step: "0.5",
    value: ht,
    onChange: e => setHt(e.target.value),
    placeholder: "Ex: 28"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbS
  }, "Peso ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontWeight: 400
    }
  }, "(kg)")), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#0369A1"
    },
    type: "number",
    step: "0.01",
    value: peso,
    onChange: e => setPeso(e.target.value),
    placeholder: "Ex: 1.2"
  }))), assist === "espontanea" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FDF2F8",
      borderRadius: 11,
      padding: "10px 12px",
      marginBottom: 12,
      border: "1.5px solid #F9A8D4"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#BE185D",
      marginBottom: 8
    }
  }, "\uD83D\uDD34 Sintomas Cl\xEDnicos Associados ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: "#9CA3AF"
    }
  }, "(marque os presentes)")), [["apneia", "😮‍💨", "Apneia ou bradicardia significativa", "≥6 episódios/12h ou 2/24h com VPP, sob metilxantina"], ["taqu", "💓", "Taquicardia ou taquipneia significativa", "FC >180 bpm em 24h ou FR >80 ipm em 24h"], ["ganho", "⚖️", "Ganho de peso inadequado", "<10 g/dia por >4 dias com oferta ≥100 kcal/kg/dia"], ["cirurgia", "🔪", "Intervenção cirúrgica", "Procedimento cirúrgico planejado ou recente"], ["acidose", "⚗️", "Acidose metabólica", "pH <7,2 ou Lactato ≥2,5 mEq/L"]].map(([k, e, l, d]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => toggleS(k),
    style: {
      width: "100%",
      marginBottom: 5,
      padding: "7px 10px",
      borderRadius: 9,
      border: `1.5px solid ${sintomas[k] ? "#EC4899" : "#E5E7EB"}`,
      background: sintomas[k] ? "#FCE7F3" : "white",
      display: "flex",
      alignItems: "center",
      gap: 8,
      transition: "all 0.15s",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      border: `2px solid ${sintomas[k] ? "#EC4899" : "#D1D5DB"}`,
      background: sintomas[k] ? "#EC4899" : "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, sintomas[k] && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white",
      fontSize: 11,
      fontWeight: 900
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      flexShrink: 0
    }
  }, e), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: sintomas[k] ? "#BE185D" : "#374151"
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF",
      lineHeight: 1.3
    }
  }, d)))), nSintomas > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      padding: "5px 9px",
      borderRadius: 7,
      background: "#FCE7F3",
      border: "1px solid #F9A8D4",
      fontSize: 11,
      fontWeight: 700,
      color: "#BE185D"
    }
  }, "\u2713 ", nSintomas, " sintoma", nSintomas > 1 ? "s" : "", " selecionado", nSintomas > 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#EC4899,#F472B6)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(236,72,153,0.4)"
    }
  }, "\u26A1 Avaliar Indica\xE7\xE3o")), res && (res.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 12,
      padding: 14,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", res.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.bg,
      borderRadius: 16,
      padding: "14px 16px",
      marginBottom: 12,
      border: `2px solid ${res.cor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 6
    }
  }, res.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: "5px 20px",
      borderRadius: 20,
      background: res.cor,
      color: "white",
      fontWeight: 900,
      fontSize: 13,
      marginBottom: 8,
      letterSpacing: 0.5
    }
  }, res.indicado ? "TRANSFUSÃO INDICADA" : "NÃO INDICADO"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: res.cor,
      lineHeight: 1.5
    }
  }, res.nivel), res.motivo && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: res.cor + "99",
      marginTop: 4
    }
  }, res.motivo)), res.assist === "espontanea" && res.indicado && !res.sintomasPresentes && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF9C3",
      borderRadius: 11,
      padding: "9px 13px",
      marginBottom: 12,
      border: "1.5px solid #F59E0B"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "#92400E",
      marginBottom: 3
    }
  }, "\u26A0\uFE0F Aten\xE7\xE3o \u2014 Sintomas Cl\xEDnicos"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#92400E",
      lineHeight: 1.6
    }
  }, "Para respira\xE7\xE3o espont\xE2nea, a transfus\xE3o deve estar associada a ", /*#__PURE__*/React.createElement("b", null, "1 ou mais sintomas cl\xEDnicos"), ". Verifique se algum est\xE1 presente.")), res.assist === "espontanea" && res.indicado && res.sintomasPresentes && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 11,
      padding: "8px 12px",
      marginBottom: 12,
      border: "1px solid #FCA5A5"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#DC2626"
    }
  }, "\u2713 ", res.nSintomas, " sintoma", res.nSintomas > 1 ? "s" : "", " cl\xEDnico", res.nSintomas > 1 ? "s" : "", " confirmado", res.nSintomas > 1 ? "s" : "", " \u2014 Indica\xE7\xE3o refor\xE7ada")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF2F2",
      borderRadius: 12,
      padding: "10px 12px",
      textAlign: "center",
      border: "1.5px solid #FECACA"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 3
    }
  }, "LIMIAR Hb"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: "#DC2626"
    }
  }, res.limHb, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "g/dL")), !isNaN(res.hbN) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 3,
      fontWeight: 700,
      color: res.hbN < res.limHb ? "#DC2626" : "#16A34A"
    }
  }, "Atual: ", res.hbN, " g/dL ", res.hbN < res.limHb ? "↓ ABAIXO" : "✓ OK"), res.defHb && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#DC2626",
      marginTop: 2
    }
  }, "D\xE9ficit: ", res.defHb, " g/dL")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFF7ED",
      borderRadius: 12,
      padding: "10px 12px",
      textAlign: "center",
      border: "1.5px solid #FED7AA"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 3
    }
  }, "LIMIAR Ht"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: "#EA580C"
    }
  }, res.limHt, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "%")), !isNaN(res.htN) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 3,
      fontWeight: 700,
      color: res.htN < res.limHt ? "#EA580C" : "#16A34A"
    }
  }, "Atual: ", res.htN, "% ", res.htN < res.limHt ? "↓ ABAIXO" : "✓ OK"))), res.volCH && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#831843,#BE185D)",
      borderRadius: 13,
      padding: "11px 14px",
      marginBottom: 12,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
      marginBottom: 6
    }
  }, "\uD83E\uDE78 VOLUME DE CONCENTRADO DE HEM\xC1CIAS (CH)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.15)",
      borderRadius: 10,
      padding: "9px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)"
    }
  }, "10 mL/kg"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 900,
      lineHeight: 1
    }
  }, res.volCH), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.8)"
    }
  }, "mL")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.15)",
      borderRadius: 10,
      padding: "9px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.7)"
    }
  }, "15 mL/kg"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 900,
      lineHeight: 1
    }
  }, res.volCH15), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.8)"
    }
  }, "mL"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 11,
      color: "rgba(255,255,255,0.8)",
      textAlign: "center"
    }
  }, "Infus\xE3o em 3\u20134h \xB7 CH filtrado, irradiado e CMV negativo")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#1E1B4B,#312E81)",
      borderRadius: 14,
      padding: "13px 15px",
      marginBottom: 12,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.65)",
      fontWeight: 700,
      marginBottom: 6
    }
  }, "\uD83D\uDC8A CONDUTA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      lineHeight: 1.8,
      color: "rgba(255,255,255,0.93)",
      whiteSpace: "pre-line"
    }
  }, res.conduta)), res.obs && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFFBEB",
      borderRadius: 10,
      padding: "7px 12px",
      marginBottom: 12,
      border: "1px solid #FDE68A",
      fontSize: 11,
      color: "#92400E",
      fontWeight: 600
    }
  }, res.obs), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 12,
      padding: "10px 13px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 8
    }
  }, "\uD83D\uDCCB TABELA 33.3 \u2014 REFER\xCANCIA COMPLETA"), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse",
      width: "100%",
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "linear-gradient(90deg,#EC4899,#F472B6)"
    }
  }, ["Assistência", "Tempo de vida", "FiO₂/MAP", "Hb / Ht"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: "6px 8px",
      color: "white",
      fontWeight: 700,
      textAlign: "left",
      whiteSpace: "nowrap"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, [["VM", "< 28 dias", "FiO₂ ≥ 0,30", "Hb < 12 g/dL / Ht < 40%"], ["VM", "< 28 dias", "FiO₂ < 0,30", "Hb < 11 g/dL / Ht < 35%"], ["VM", "≥ 28 dias", "FiO₂ > 0,40 ou MAP > 14", "Hb < 10 g/dL / Ht < 30%*"], ["VM", "≥ 28 dias", "FiO₂ < 0,40 e MAP ≤ 14", "Hb ≤ 8 g/dL / Ht < 25%**"], ["CPAP", "≤ 24h de vida", "—", "Hb < 12 g/dL / Ht < 40%"], ["CPAP", "1–28 dias", "—", "Hb < 10 g/dL / Ht < 30%"], ["CPAP", "≥ 28 dias", "—", "Hb < 8,5 g/dL / Ht < 25%"], ["Resp. Espontânea", "—", "FiO₂ ≥ 0,21", "Hb < 8,5 g/dL / Ht < 25%*"], ["Resp. Espontânea", "—", "Ar ambiente", "Hb < 7 g/dL / Ht < 20%*"]].map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      background: i % 2 === 0 ? "white" : "#FDF2F8"
    }
  }, row.map((cell, j) => /*#__PURE__*/React.createElement("td", {
    key: j,
    style: {
      padding: "5px 7px",
      borderBottom: "1px solid #F3F4F6",
      color: "#374151",
      fontWeight: j === 3 ? 700 : 400
    }
  }, cell))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 9.5,
      color: "#9CA3AF",
      lineHeight: 1.6
    }
  }, "* VAFO com MAP ", ">", " 14 cmH\u2082O \xB7 ** VAFO com MAP \u2264 14 cmH\u2082O", /*#__PURE__*/React.createElement("br", null), "* Resp. espont\xE2nea: associado a \u22651 sintoma cl\xEDnico (apneia/bradicardia, taquicardia/taquipneia, ganho inadequado, cirurgia ou acidose metab\xF3lica)")))));
}

// ── SILVERMAN-ANDERSON CALCULATOR ────────────────────────────────────────────
const SA_VARS = [{
  id: "torax",
  label: "Movimento tórax-abdome",
  icon: "🫁",
  opcoes: [{
    pts: 0,
    emoji: "😌",
    label: "Sincronizados",
    desc: "Movimentos torácico e abdominal simultâneos"
  }, {
    pts: 1,
    emoji: "😬",
    label: "Retardo inspiratório",
    desc: "Expansão torácica com atraso ou lag"
  }, {
    pts: 2,
    emoji: "😣",
    label: "Paradoxal (gangorra)",
    desc: "Abdome expande quando tórax retrai — sinal grave"
  }]
}, {
  id: "retInt",
  label: "Retração intercostal",
  icon: "💪",
  opcoes: [{
    pts: 0,
    emoji: "✅",
    label: "Ausente",
    desc: "Sem retração dos espaços intercostais"
  }, {
    pts: 1,
    emoji: "⚠️",
    label: "Discreta",
    desc: "Leve retração visível nos espaços intercostais"
  }, {
    pts: 2,
    emoji: "🔴",
    label: "Acentuada",
    desc: "Retração intercostal intensa e visível"
  }]
}, {
  id: "retXif",
  label: "Retração xifóidea",
  icon: "🦴",
  opcoes: [{
    pts: 0,
    emoji: "✅",
    label: "Ausente",
    desc: "Sem retração na região xifoide"
  }, {
    pts: 1,
    emoji: "⚠️",
    label: "Discreta",
    desc: "Leve afundamento xifoide"
  }, {
    pts: 2,
    emoji: "🔴",
    label: "Acentuada",
    desc: "Retração xifóidea marcada"
  }]
}, {
  id: "asa",
  label: "Batimento de asa do nariz",
  icon: "👃",
  opcoes: [{
    pts: 0,
    emoji: "✅",
    label: "Ausente",
    desc: "Narinas sem movimento"
  }, {
    pts: 1,
    emoji: "⚠️",
    label: "Discreto",
    desc: "Leve dilatação das narinas"
  }, {
    pts: 2,
    emoji: "🔴",
    label: "Acentuado",
    desc: "Dilatação nasal intensa a cada inspiração"
  }]
}, {
  id: "gemido",
  label: "Gemido expiratório",
  icon: "😮‍💨",
  opcoes: [{
    pts: 0,
    emoji: "✅",
    label: "Ausente",
    desc: "Sem gemido audível"
  }, {
    pts: 1,
    emoji: "⚠️",
    label: "Audível c/ estetoscópio",
    desc: "Gemido detectável apenas com estetoscópio"
  }, {
    pts: 2,
    emoji: "🔴",
    label: "Audível sem estetoscópio",
    desc: "Gemido audível a distância — sinal grave"
  }]
}];
function SilvermanCalc({
  onClose
}) {
  const [sels, setSels] = useState({});
  const [res, setRes] = useState(null);
  const setSel = (id, pts) => {
    setSels(s => ({
      ...s,
      [id]: pts
    }));
    setRes(null);
  };
  const liveScore = SA_VARS.reduce((acc, v) => acc + (sels[v.id] ?? 0), 0);
  const preench = Object.keys(sels).length;
  const calcular = () => {
    if (preench < SA_VARS.length) {
      setRes({
        aviso: `Preencha todos os 5 critérios. (${preench}/5 preenchidos)`
      });
      return;
    }
    const score = liveScore;
    let nivel, cor, bgCor, emoji, conduta;
    if (score === 0) {
      nivel = "Sem desconforto respiratório";
      cor = "#16A34A";
      bgCor = "#DCFCE7";
      emoji = "✅";
      conduta = "Ausência de desconforto respiratório. Manter monitoramento clínico de rotina. Reavaliar se houver mudança clínica.";
    } else if (score <= 3) {
      nivel = "Desconforto leve";
      cor = "#D97706";
      bgCor = "#FEF9C3";
      emoji = "⚠️";
      conduta = "Desconforto leve. Otimizar posicionamento (decúbito prono ou elevação cabeceira 30°). Considerar CPAP se FiO₂ crescente. Reavaliar em 1–2h. Monitorar SpO₂ contínua.";
    } else if (score <= 6) {
      nivel = "Desconforto moderado";
      cor = "#EA580C";
      bgCor = "#FFF7ED";
      emoji = "🔴";
      conduta = "Desconforto moderado. Iniciar CPAP nasal (PEEP 5–7 cmH₂O, FiO₂ para alvo SpO₂ 91–95%). Considerar surfactante se RNPT com SDR. Gasometria arterial urgente. Avisar intensivista.";
    } else if (score <= 9) {
      nivel = "Desconforto grave";
      cor = "#DC2626";
      bgCor = "#FEE2E2";
      emoji = "🚨";
      conduta = "Desconforto grave. Avaliar intubação orotraqueal e ventilação mecânica. Surfactante indicado em RNPT. Gasometria urgente. IOT se: apneia, SpO₂ < 85% com FiO₂ > 0,6, OI crescente.";
    } else {
      nivel = "Desconforto muito grave — Falência respiratória";
      cor = "#7F1D1D";
      bgCor = "#FEE2E2";
      emoji = "🆘";
      conduta = "FALÊNCIA RESPIRATÓRIA. IOT imediata. VM protetora (VC 4–5 ml/kg, FR 40–60). Surfactante urgente. Considerar VAFO se OI > 15. Acionar UTI Neonatal.";
    }
    const detalhes = SA_VARS.map(v => ({
      ...v,
      pts: sels[v.id] ?? 0,
      opcaoSel: v.opcoes[sels[v.id] ?? 0]
    }));
    setRes({
      score,
      nivel,
      cor,
      bgCor,
      emoji,
      conduta,
      detalhes
    });
  };
  const limpar = () => {
    setSels({});
    setRes(null);
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83E\uDEC1 Silverman-Anderson",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#F5F3FF,#EDE9FE)",
      borderRadius: 12,
      border: "1px solid #8B5CF620"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#8B5CF6,#7C3AED)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(139,92,246,0.3)"
    }
  }, "\uD83E\uDEC1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#4C1D95"
    }
  }, "Escore de Desconforto Respirat\xF3rio"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6D28D9",
      marginTop: 1
    }
  }, "5 crit\xE9rios \xB7 Pontua\xE7\xE3o 0\u201310"))), SA_VARS.map((v, vi) => /*#__PURE__*/React.createElement("div", {
    key: v.id,
    style: {
      marginBottom: 10,
      borderRadius: 13,
      border: `1.5px solid ${sels[v.id] !== undefined ? sels[v.id] === 0 ? "#22C55E" : sels[v.id] === 1 ? "#F59E0B" : "#EF4444" : "#E5E7EB"}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      background: sels[v.id] !== undefined ? "linear-gradient(90deg,#F5F3FF,#EDE9FE)" : "#F9FAFB",
      borderBottom: "1px solid #F3F4F6"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, v.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "#111827"
    }
  }, vi + 1, ". ", v.label)), sels[v.id] !== undefined && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 8px",
      borderRadius: 6,
      background: sels[v.id] === 0 ? "#22C55E" : sels[v.id] === 1 ? "#F59E0B" : "#EF4444",
      color: "white",
      fontWeight: 900,
      fontSize: 12
    }
  }, sels[v.id], " pts")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6,
      background: "white"
    }
  }, v.opcoes.map(op => {
    const isSel = sels[v.id] === op.pts;
    return /*#__PURE__*/React.createElement("button", {
      key: op.pts,
      onClick: () => setSel(v.id, op.pts),
      style: {
        padding: "9px 6px",
        borderRadius: 10,
        border: `2px solid ${isSel ? op.pts === 0 ? "#22C55E" : op.pts === 1 ? "#F59E0B" : "#EF4444" : "#E5E7EB"}`,
        background: isSel ? op.pts === 0 ? "#DCFCE7" : op.pts === 1 ? "#FEF9C3" : "#FEE2E2" : "#FAFAFA",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.15s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        marginBottom: 3
      }
    }, op.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: isSel ? op.pts === 0 ? "#16A34A" : op.pts === 1 ? "#D97706" : "#DC2626" : "#374151"
      }
    }, op.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8.5,
        color: "#9CA3AF",
        marginTop: 2,
        lineHeight: 1.3
      }
    }, op.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 5,
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 6,
        background: isSel ? op.pts === 0 ? "#22C55E" : op.pts === 1 ? "#F59E0B" : "#EF4444" : "#E5E7EB",
        color: isSel ? "white" : "#9CA3AF",
        fontWeight: 900,
        fontSize: 11
      }
    }, op.pts, " pt", op.pts !== 1 ? "s" : ""));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F5F3FF",
      borderRadius: 11,
      padding: "8px 12px",
      marginBottom: 12,
      border: "1px solid #DDD6FE",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#7C3AED"
    }
  }, "Score atual \xB7 ", preench, "/5 crit\xE9rios"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: "#7C3AED"
    }
  }, liveScore, "/10")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 12,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 12,
      border: "none",
      background: "linear-gradient(90deg,#8B5CF6,#7C3AED)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(139,92,246,0.4)"
    }
  }, "\u26A1 Avaliar")), res && /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeInUp 0.3s ease"
    }
  }, res.aviso && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF9C3",
      borderRadius: 10,
      padding: "9px 12px",
      marginBottom: 10,
      border: "1px solid #F59E0B",
      fontSize: 12,
      color: "#92400E",
      fontWeight: 600
    }
  }, "\u26A0\uFE0F ", res.aviso), !res.aviso && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.bgCor,
      borderRadius: 16,
      padding: "14px",
      marginBottom: 12,
      border: `2px solid ${res.cor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      marginBottom: 5
    }
  }, res.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 44,
      fontWeight: 900,
      color: res.cor,
      lineHeight: 1
    }
  }, res.score, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      color: res.cor + "80"
    }
  }, "/10")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      margin: "6px 0",
      padding: "4px 18px",
      borderRadius: 20,
      background: res.cor,
      color: "white",
      fontWeight: 800,
      fontSize: 12
    }
  }, res.nivel.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "9px 12px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 7
    }
  }, "\uD83D\uDCCA ESCALA 0\u201310"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 20,
      borderRadius: 7,
      overflow: "hidden",
      background: "linear-gradient(90deg,#DCFCE7 0%,#FEF9C3 30%,#FFF7ED 60%,#FEE2E2 80%,#FCA5A5 100%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${Math.min(97, res.score / 10 * 100)}%`,
      width: 3,
      height: "100%",
      background: res.cor,
      transform: "translateX(-50%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: `${Math.min(93, res.score / 10 * 100)}%`,
      transform: "translate(-50%,-50%)",
      background: res.cor,
      color: "white",
      borderRadius: 5,
      padding: "1px 6px",
      fontSize: 11,
      fontWeight: 900
    }
  }, res.score)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)",
      gap: 4,
      marginTop: 8
    }
  }, [["0", "Sem DR", "#16A34A", "#DCFCE7"], ["1–3", "Leve", "#D97706", "#FEF9C3"], ["4–6", "Moderado", "#EA580C", "#FFF7ED"], ["7–9", "Grave", "#DC2626", "#FEE2E2"], ["10", "Muito grave", "#7F1D1D", "#FEE2E2"]].map(([r, l, c, bg]) => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      background: bg,
      borderRadius: 7,
      padding: "4px 4px",
      textAlign: "center",
      border: `1px solid ${c}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 900,
      color: c
    }
  }, r), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      color: c,
      fontWeight: 600
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 7
    }
  }, "\uD83D\uDD0D CRIT\xC9RIOS"), res.detalhes.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "7px 10px",
      borderRadius: 9,
      marginBottom: 5,
      background: d.pts === 0 ? "#DCFCE7" : d.pts === 1 ? "#FEF9C3" : "#FEE2E2",
      border: `1px solid ${d.pts === 0 ? "#86EFAC" : d.pts === 1 ? "#FDE68A" : "#FCA5A5"}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      flexShrink: 0
    }
  }, d.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#111827"
    }
  }, d.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6B7280"
    }
  }, d.opcaoSel.emoji, " ", d.opcaoSel.label, " \u2014 ", d.opcaoSel.desc)), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "3px 9px",
      borderRadius: 7,
      background: d.pts === 0 ? "#22C55E" : d.pts === 1 ? "#F59E0B" : "#EF4444",
      color: "white",
      fontWeight: 900,
      fontSize: 13,
      minWidth: 28,
      textAlign: "center"
    }
  }, d.pts)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#4C1D95,#6D28D9)",
      borderRadius: 14,
      padding: "13px 15px",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.65)",
      fontWeight: 700,
      marginBottom: 6
    }
  }, "\uD83D\uDC8A CONDUTA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.75,
      color: "rgba(255,255,255,0.93)"
    }
  }, res.conduta)))));
}

// ── APGAR CALCULATOR ──────────────────────────────────────────────────────────
const APGAR_VARS = [{
  id: "cor",
  label: "Cor / Aparência",
  icon: "🎨",
  opcoes: [{
    pts: 0,
    emoji: "🔵",
    label: "Azul / Pálido total",
    desc: "Cianose generalizada ou palidez total"
  }, {
    pts: 1,
    emoji: "🫐",
    label: "Corpo rosado, extremidades azuis",
    desc: "Acrocianose — corpo rosado mas mãos e pés azuis"
  }, {
    pts: 2,
    emoji: "🌹",
    label: "Rosado (todo o corpo)",
    desc: "Sem cianose — coloração normal em todo o corpo"
  }]
}, {
  id: "fc",
  label: "FC — Frequência Cardíaca",
  icon: "❤️",
  opcoes: [{
    pts: 0,
    emoji: "💔",
    label: "Ausente",
    desc: "Sem batimentos cardíacos detectáveis"
  }, {
    pts: 1,
    emoji: "💛",
    label: "< 100 bpm",
    desc: "Frequência cardíaca lenta"
  }, {
    pts: 2,
    emoji: "❤️",
    label: "≥ 100 bpm",
    desc: "Frequência cardíaca normal"
  }]
}, {
  id: "reflex",
  label: "Reflexo / Irritabilidade",
  icon: "⚡",
  opcoes: [{
    pts: 0,
    emoji: "😶",
    label: "Sem resposta",
    desc: "Nenhuma resposta a estímulos"
  }, {
    pts: 1,
    emoji: "😏",
    label: "Caretas / gemidos",
    desc: "Resposta mínima — grimace ou gemido"
  }, {
    pts: 2,
    emoji: "😭",
    label: "Choro vigoroso / tosse",
    desc: "Resposta vigorosa ao estímulo"
  }]
}, {
  id: "tono",
  label: "Tônus Muscular",
  icon: "💪",
  opcoes: [{
    pts: 0,
    emoji: "😴",
    label: "Flácido",
    desc: "Sem tônus — hipotonia grave"
  }, {
    pts: 1,
    emoji: "🤏",
    label: "Alguma flexão",
    desc: "Flexão parcial dos membros"
  }, {
    pts: 2,
    emoji: "💪",
    label: "Ativo — boa flexão",
    desc: "Movimentos ativos e tônus adequado"
  }]
}, {
  id: "resp",
  label: "Respiração",
  icon: "🌬️",
  opcoes: [{
    pts: 0,
    emoji: "😶",
    label: "Ausente",
    desc: "Sem movimentos respiratórios"
  }, {
    pts: 1,
    emoji: "😮‍💨",
    label: "Fraca / Irregular",
    desc: "Choro fraco, respiração irregular ou superficial"
  }, {
    pts: 2,
    emoji: "😮",
    label: "Choro vigoroso",
    desc: "Choro forte, respiração regular e efetiva"
  }]
}];
function ApgarCalc({
  onClose
}) {
  const [momento, setMomento] = useState("1"); // 1, 5, 10 min
  const [sels1, setSels1] = useState({});
  const [sels5, setSels5] = useState({});
  const [sels10, setSels10] = useState({});
  const [res, setRes] = useState(null);
  const getSels = () => momento === "1" ? sels1 : momento === "5" ? sels5 : sels10;
  const setSels = (id, pts) => {
    if (momento === "1") setSels1(s => ({
      ...s,
      [id]: pts
    }));else if (momento === "5") setSels5(s => ({
      ...s,
      [id]: pts
    }));else setSels10(s => ({
      ...s,
      [id]: pts
    }));
    setRes(null);
  };
  const sels = getSels();
  const liveScore = APGAR_VARS.reduce((acc, v) => acc + (sels[v.id] ?? 0), 0);
  const preench = Object.keys(sels).length;
  const calcScore = s => APGAR_VARS.reduce((acc, v) => acc + (s[v.id] ?? 0), 0);
  const getInterp = score => {
    if (score >= 7) return {
      nivel: "Normal",
      cor: "#16A34A",
      bgCor: "#DCFCE7",
      emoji: "✅",
      conduta: "Apgar normal. Cuidados de rotina. Manter aquecimento, estimulação suave e contato pele a pele."
    };
    if (score >= 4) return {
      nivel: "Depressão leve-moderada",
      cor: "#EA580C",
      bgCor: "#FFF7ED",
      emoji: "⚠️",
      conduta: "Depressão neonatal leve-moderada. Iniciar reanimação: aspiração, estimulação e VPP com máscara se FR < 30 ou sem choro após 30s. Ventilação com O₂ 21%. Monitorar SpO₂."
    };
    return {
      nivel: "Depressão grave",
      cor: "#DC2626",
      bgCor: "#FEE2E2",
      emoji: "🚨",
      conduta: "Depressão neonatal grave. VPP imediata + compressões torácicas se FC < 60 após 30s de VPP efetiva. Intubação se sem melhora. Adrenalina EV/IO se FC < 60 após IOT. Acionar neonatologista."
    };
  };
  const calcular = () => {
    if (preench < APGAR_VARS.length) {
      setRes({
        aviso: `Preencha todos os 5 critérios (${preench}/5).`
      });
      return;
    }
    const score = liveScore;
    const interp = getInterp(score);
    const detalhes = APGAR_VARS.map(v => ({
      ...v,
      pts: sels[v.id] ?? 0,
      opcaoSel: v.opcoes[sels[v.id] ?? 0]
    }));
    // Calcular outros momentos se disponíveis
    const sc1 = Object.keys(sels1).length === 5 ? calcScore(sels1) : null;
    const sc5 = Object.keys(sels5).length === 5 ? calcScore(sels5) : null;
    const sc10 = Object.keys(sels10).length === 5 ? calcScore(sels10) : null;
    setRes({
      score,
      interp,
      detalhes,
      sc1,
      sc5,
      sc10,
      momento
    });
  };
  const limpar = () => {
    setSels1({});
    setSels5({});
    setSels10({});
    setRes(null);
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDC76 Escala de Apgar",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#FFFBEB,#FEF3C7)",
      borderRadius: 12,
      border: "1px solid #F59E0B20"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#F59E0B,#D97706)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(245,158,11,0.3)"
    }
  }, "\uD83D\uDC76"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#78350F"
    }
  }, "Avalia\xE7\xE3o do Rec\xE9m-Nascido"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#92400E",
      marginTop: 1
    }
  }, "5 crit\xE9rios \xB7 0\u201310 pontos \xB7 1\u2032 \xB7 5\u2032 \xB7 10\u2032"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 6
    }
  }, "Momento de Avalia\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, [["1", "1′ minuto"], ["5", "5′ minutos"], ["10", "10′ minutos"]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => {
      setMomento(v);
      setRes(null);
    },
    style: {
      flex: 1,
      padding: "9px 6px",
      borderRadius: 11,
      border: `1.5px solid ${momento === v ? "#F59E0B" : "#E5E7EB"}`,
      background: momento === v ? "linear-gradient(135deg,#FFFBEB,#FEF3C7)" : "white",
      color: momento === v ? "#92400E" : "#6B7280",
      fontWeight: momento === v ? 800 : 500,
      fontSize: 12,
      textAlign: "center"
    }
  }, l, [["1", sels1], ["5", sels5], ["10", sels10]].find(([mv]) => mv === v)?.[1] && Object.keys([["1", sels1], ["5", sels5], ["10", sels10]].find(([mv]) => mv === v)[1]).length === 5 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: "#F59E0B",
      lineHeight: 1
    }
  }, calcScore([["1", sels1], ["5", sels5], ["10", sels10]].find(([mv]) => mv === v)[1])))))), APGAR_VARS.map((v, vi) => /*#__PURE__*/React.createElement("div", {
    key: v.id,
    style: {
      marginBottom: 10,
      borderRadius: 13,
      border: `1.5px solid ${sels[v.id] !== undefined ? "#F59E0B30" : "#E5E7EB"}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      background: sels[v.id] !== undefined ? "#FFFBEB" : "#F9FAFB",
      borderBottom: "1px solid #F3F4F6"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, v.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "#111827"
    }
  }, vi + 1, ". ", v.label)), sels[v.id] !== undefined && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 8px",
      borderRadius: 6,
      background: "#F59E0B",
      color: "white",
      fontWeight: 900,
      fontSize: 12
    }
  }, sels[v.id], " pts")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6,
      background: "white"
    }
  }, v.opcoes.map(op => {
    const isSel = sels[v.id] === op.pts;
    return /*#__PURE__*/React.createElement("button", {
      key: op.pts,
      onClick: () => setSels(v.id, op.pts),
      style: {
        padding: "9px 5px",
        borderRadius: 10,
        border: `2px solid ${isSel ? "#F59E0B" : "#E5E7EB"}`,
        background: isSel ? "#FFFBEB" : "#FAFAFA",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.15s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        marginBottom: 3
      }
    }, op.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: isSel ? "#92400E" : "#374151"
      }
    }, op.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8.5,
        color: "#9CA3AF",
        marginTop: 2,
        lineHeight: 1.3
      }
    }, op.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 5,
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 6,
        background: isSel ? "#F59E0B" : "#E5E7EB",
        color: isSel ? "white" : "#9CA3AF",
        fontWeight: 900,
        fontSize: 11
      }
    }, op.pts, " pt", op.pts !== 1 ? "s" : ""));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFFBEB",
      borderRadius: 11,
      padding: "8px 12px",
      marginBottom: 12,
      border: "1px solid #FDE68A",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#92400E"
    }
  }, preench, "/5 crit\xE9rios \xB7 ", momento, "\u2032 minuto"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: "#F59E0B"
    }
  }, liveScore, "/10")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 12,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 12,
      border: "none",
      background: "linear-gradient(90deg,#F59E0B,#FBBF24)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(245,158,11,0.4)"
    }
  }, "\u26A1 Avaliar Apgar")), res && /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeInUp 0.3s ease"
    }
  }, res.aviso && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF9C3",
      borderRadius: 10,
      padding: "9px 12px",
      marginBottom: 10,
      border: "1px solid #F59E0B",
      fontSize: 12,
      color: "#92400E",
      fontWeight: 600
    }
  }, "\u26A0\uFE0F ", res.aviso), !res.aviso && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.interp.bgCor,
      borderRadius: 16,
      padding: "14px",
      marginBottom: 12,
      border: `2px solid ${res.interp.cor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      marginBottom: 5
    }
  }, res.interp.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      fontWeight: 900,
      color: res.interp.cor,
      lineHeight: 1
    }
  }, res.score, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      color: res.interp.cor + "80"
    }
  }, "/10")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: res.interp.cor + "99",
      marginBottom: 5
    }
  }, "Apgar ", res.momento, "\u2032"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: "4px 18px",
      borderRadius: 20,
      background: res.interp.cor,
      color: "white",
      fontWeight: 800,
      fontSize: 12
    }
  }, res.interp.nivel.toUpperCase())), (res.sc1 !== null || res.sc5 !== null || res.sc10 !== null) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 12
    }
  }, [["1′", res.sc1], ["5′", res.sc5], ["10′", res.sc10]].filter(([, v]) => v !== null).map(([label, score]) => {
    const interp = getInterp(score);
    return /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        flex: 1,
        background: interp.bgCor,
        borderRadius: 11,
        padding: "9px 6px",
        textAlign: "center",
        border: `1.5px solid ${interp.cor}30`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: interp.cor,
        fontWeight: 700
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 900,
        color: interp.cor
      }
    }, score), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: interp.cor + "99"
      }
    }, interp.nivel));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "9px 12px",
      marginBottom: 12,
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 20,
      borderRadius: 7,
      overflow: "hidden",
      background: "linear-gradient(90deg,#FEE2E2 0%,#FFF7ED 40%,#DCFCE7 70%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: `${Math.min(97, res.score / 10 * 100)}%`,
      width: 3,
      height: "100%",
      background: res.interp.cor,
      transform: "translateX(-50%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: `${Math.min(93, res.score / 10 * 100)}%`,
      transform: "translate(-50%,-50%)",
      background: res.interp.cor,
      color: "white",
      borderRadius: 5,
      padding: "1px 6px",
      fontSize: 11,
      fontWeight: 900
    }
  }, res.score)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 9,
      color: "#9CA3AF",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#DC2626",
      fontWeight: 700
    }
  }, "0\u20133 Grave"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#EA580C",
      fontWeight: 700
    }
  }, "4\u20136 Moderado"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#16A34A",
      fontWeight: 700
    }
  }, "7\u201310 Normal"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 7
    }
  }, "\uD83D\uDD0D CRIT\xC9RIOS"), res.detalhes.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "7px 10px",
      borderRadius: 9,
      marginBottom: 5,
      background: d.pts === 2 ? "#DCFCE7" : d.pts === 1 ? "#FEF9C3" : "#FEE2E2",
      border: `1px solid ${d.pts === 2 ? "#86EFAC" : d.pts === 1 ? "#FDE68A" : "#FCA5A5"}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      flexShrink: 0
    }
  }, d.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#111827"
    }
  }, d.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6B7280"
    }
  }, d.opcaoSel.emoji, " ", d.opcaoSel.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "3px 9px",
      borderRadius: 7,
      background: d.pts === 2 ? "#22C55E" : d.pts === 1 ? "#F59E0B" : "#EF4444",
      color: "white",
      fontWeight: 900,
      fontSize: 13,
      minWidth: 28,
      textAlign: "center"
    }
  }, d.pts)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#78350F,#92400E)",
      borderRadius: 14,
      padding: "13px 15px",
      marginBottom: 12,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.65)",
      fontWeight: 700,
      marginBottom: 6
    }
  }, "\uD83D\uDC8A CONDUTA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.75,
      color: "rgba(255,255,255,0.93)"
    }
  }, res.interp.conduta)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFFBEB",
      borderRadius: 11,
      padding: "9px 12px",
      border: "1px solid #FDE68A"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#92400E",
      marginBottom: 5
    }
  }, "\uD83D\uDCCB REFER\xCANCIA"), [["7–10", "Normal", "#16A34A", "#DCFCE7"], ["4–6", "Depressão leve–moderada", "#EA580C", "#FFF7ED"], ["0–3", "Depressão grave", "#DC2626", "#FEE2E2"]].map(([r, l, c, bg]) => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "5px 8px",
      borderRadius: 8,
      marginBottom: 4,
      background: bg,
      border: `1px solid ${c}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 36,
      padding: "2px 5px",
      borderRadius: 5,
      background: c,
      color: "white",
      fontWeight: 900,
      fontSize: 10,
      textAlign: "center"
    }
  }, r), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: c
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "#9CA3AF",
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "Apgar 5\u2032 \u2265 7 ap\xF3s depress\xE3o no 1\u2032: recupera\xE7\xE3o adequada.", /*#__PURE__*/React.createElement("br", null), "Apgar 5\u2032 ", "<", " 7: reavaliar aos 10\u2032 e registrar todos os momentos.")))));
}

// ── ANTIBIÓTICOS NEONATAIS ─────────────────────────────────────────────────────
const ANTIBIOTICOS = [{
  id: "ampicilina",
  nome: "Ampicilina",
  icon: "💊",
  cor: "#4F6EF7",
  bg: "#EEF1FF",
  doses: [{
    ig: "<29 sem",
    dias: "0–28 dias",
    dose: 50,
    intervalo: 12
  }, {
    ig: "<29 sem",
    dias: ">28 dias",
    dose: 50,
    intervalo: 8
  }, {
    ig: "29–36 sem",
    dias: "0–7 dias",
    dose: 50,
    intervalo: 12
  }, {
    ig: "29–36 sem",
    dias: ">7 dias",
    dose: 50,
    intervalo: 8
  }, {
    ig: "≥37 sem",
    dias: "0–7 dias",
    dose: 50,
    intervalo: 8
  }, {
    ig: "≥37 sem",
    dias: ">7 dias",
    dose: 50,
    intervalo: 6
  }],
  apresentacao: "250mg/5mL ou 500mg/frasco",
  via: "EV/IM",
  reconstituicao: "Diluir em SF0,9% — concentração máx 100mg/mL (EV lento 15–30min)",
  obs: "Sepse neonatal: 50mg/kg/dose. Meningite: 100mg/kg/dose. Sempre combinar com Gentamicina na sepse."
}, {
  id: "gentamicina",
  nome: "Gentamicina",
  icon: "🟢",
  cor: "#16A34A",
  bg: "#DCFCE7",
  doses: [{
    ig: "<29 sem",
    dias: "0–7 dias",
    dose: 5,
    intervalo: 48
  }, {
    ig: "<29 sem",
    dias: "8–28 dias",
    dose: 4,
    intervalo: 36
  }, {
    ig: "<29 sem",
    dias: ">28 dias",
    dose: 4,
    intervalo: 24
  }, {
    ig: "29–34 sem",
    dias: "0–7 dias",
    dose: 4.5,
    intervalo: 36
  }, {
    ig: "29–34 sem",
    dias: ">7 dias",
    dose: 4,
    intervalo: 24
  }, {
    ig: "≥35 sem",
    dias: "0–7 dias",
    dose: 4,
    intervalo: 24
  }, {
    ig: "≥35 sem",
    dias: ">7 dias",
    dose: 4,
    intervalo: 24
  }],
  apresentacao: "10mg/mL ou 40mg/mL",
  via: "EV",
  reconstituicao: "Diluir em SF0,9% — infundir em 30min",
  obs: "⚠️ Nefrotóxica e ototóxica. Monitorar nível sérico (pico/vale). Vale <2 mcg/mL; Pico 5–10 mcg/mL. Ajustar em RN com função renal comprometida."
}, {
  id: "vancomicina",
  nome: "Vancomicina",
  icon: "🔵",
  cor: "#0369A1",
  bg: "#F0F9FF",
  doses: [{
    ig: "<29 sem",
    dias: "0–14 dias",
    dose: 15,
    intervalo: 24
  }, {
    ig: "<29 sem",
    dias: ">14 dias",
    dose: 15,
    intervalo: 18
  }, {
    ig: "29–35 sem",
    dias: "0–14 dias",
    dose: 15,
    intervalo: 18
  }, {
    ig: "29–35 sem",
    dias: ">14 dias",
    dose: 15,
    intervalo: 12
  }, {
    ig: "≥36 sem",
    dias: "todos",
    dose: 15,
    intervalo: 12
  }],
  apresentacao: "500mg/frasco",
  via: "EV",
  reconstituicao: "Diluir em SF0,9% — conc. 5mg/mL — infundir em 60min (mín). Risco de Red Man Syndrome se rápida.",
  obs: "⚠️ Monitorar nível sérico. Vale ideal 10–15 mcg/mL (sepse) ou 15–20 (meningite). Nefrotóxica. Indicada para MRSA/coagulase negativo."
}, {
  id: "oxacilina",
  nome: "Oxacilina",
  icon: "🟠",
  cor: "#EA580C",
  bg: "#FFF7ED",
  doses: [{
    ig: "<34 sem",
    dias: "todos",
    dose: 50,
    intervalo: 12
  }, {
    ig: "≥34 sem",
    dias: "0–7 dias",
    dose: 50,
    intervalo: 8
  }, {
    ig: "≥34 sem",
    dias: ">7 dias",
    dose: 50,
    intervalo: 6
  }],
  apresentacao: "500mg/frasco",
  via: "EV/IM",
  reconstituicao: "Diluir em SF0,9% — EV lento 10–15min",
  obs: "S. aureus sensível à meticilina. Sepse: 50mg/kg/dose. Osteomielite/artrite: 50mg/kg/dose."
}, {
  id: "metronidazol",
  nome: "Metronidazol",
  icon: "🟣",
  cor: "#7C3AED",
  bg: "#F5F3FF",
  doses: [{
    ig: "<29 sem",
    dias: "todos",
    dose: 7.5,
    intervalo: 48
  }, {
    ig: "29–34 sem",
    dias: "0–7 dias",
    dose: 7.5,
    intervalo: 24
  }, {
    ig: "29–34 sem",
    dias: ">7 dias",
    dose: 7.5,
    intervalo: 12
  }, {
    ig: "≥35 sem",
    dias: "todos",
    dose: 7.5,
    intervalo: 12
  }],
  apresentacao: "5mg/mL (frasco 100mL pronto)",
  via: "EV",
  reconstituicao: "Pronto para uso — infundir em 30–60min",
  obs: "Anaeróbios, ECN, Clostridium. Dose carga: 15mg/kg. Manutenção: 7,5mg/kg/dose."
}, {
  id: "aciclovir",
  nome: "Aciclovir",
  icon: "❤️",
  cor: "#EC4899",
  bg: "#FDF2F8",
  doses: [{
    ig: "todos",
    dias: "HSV (pele/mucosa)",
    dose: 20,
    intervalo: 8
  }, {
    ig: "todos",
    dias: "HSV (SNC/disseminado)",
    dose: 20,
    intervalo: 8
  }],
  apresentacao: "250mg/frasco",
  via: "EV",
  reconstituicao: "Diluir em SF0,9% — conc. 7mg/mL — infundir em 60min",
  obs: "Herpes neonatal. Dose: 20mg/kg/dose 8/8h. Pele/olhos/boca: 14 dias. SNC/disseminado: 21 dias. Hidratação adequada — nefrotóxico."
}];
function AntibioticosCalc({
  onClose
}) {
  const [abId, setAbId] = useState("ampicilina");
  const [ig, setIg] = useState("");
  const [dias, setDias] = useState("");
  const [peso, setPeso] = useState("");
  const [meningite, setMeningite] = useState(false);
  const [res, setRes] = useState(null);
  const ab = ANTIBIOTICOS.find(a => a.id === abId) || ANTIBIOTICOS[0];
  const calcular = () => {
    const igN = parseFloat(ig),
      diasN = parseFloat(dias),
      pesoN = parseFloat(peso);
    if (isNaN(igN) || isNaN(diasN) || isNaN(pesoN)) {
      setRes({
        erro: "Preencha IG, dias de vida e peso."
      });
      return;
    }

    // Seleciona dose conforme IG e dias
    let doseInfo = null;
    for (const d of ab.doses) {
      let igOk = false;
      if (d.ig === "todos") igOk = true;else if (d.ig.includes("≥37") || d.ig.includes("≥36") || d.ig.includes("≥35")) igOk = igN >= parseInt(d.ig);else if (d.ig.includes("<29")) igOk = igN < 29;else if (d.ig.includes("29–36") || d.ig.includes("29–34") || d.ig.includes("29–35")) igOk = igN >= 29 && igN <= parseInt(d.ig.split("–")[1]);else if (d.ig.includes("34")) igOk = igN < 34;
      let diasOk = false;
      if (d.dias === "todos") diasOk = true;else if (d.dias.startsWith(">")) diasOk = diasN > parseInt(d.dias.replace(">", "").replace(" dias", ""));else if (d.dias.startsWith("0–")) {
        const max = parseInt(d.dias.split("–")[1]);
        diasOk = diasN <= max;
      } else if (d.dias.includes("–")) {
        const [mn, mx] = d.dias.split("–").map(x => parseInt(x));
        diasOk = diasN >= mn && diasN <= mx;
      } else if (d.dias.includes("HSV")) diasOk = true;
      if (igOk && diasOk) {
        doseInfo = d;
        break;
      }
    }
    if (!doseInfo) doseInfo = ab.doses[ab.doses.length - 1];
    let doseMgKg = doseInfo.dose;
    if (meningite && (ab.id === "ampicilina" || ab.id === "oxacilina")) doseMgKg = 100;
    const doseMg = parseFloat((doseMgKg * pesoN).toFixed(1));
    const intervalo = doseInfo.intervalo;
    const doseDia = parseFloat((doseMg * (24 / intervalo)).toFixed(1));

    // Volume de preparo por apresentação
    let volPreparo = "";
    if (ab.id === "gentamicina") {
      const conc = 10; // mg/mL padrão neonatal
      volPreparo = `${(doseMg / conc).toFixed(2)} mL (sol. ${conc}mg/mL)`;
    } else if (ab.id === "vancomicina") {
      volPreparo = `${(doseMg / 5).toFixed(1)} mL (sol. 5mg/mL)`;
    } else if (ab.id === "metronidazol") {
      volPreparo = `${(doseMg / 5).toFixed(1)} mL (pronto 5mg/mL)`;
    } else if (ab.id === "aciclovir") {
      volPreparo = `${(doseMg / 7).toFixed(1)} mL (sol. 7mg/mL)`;
    } else {
      volPreparo = `${doseMg}mg — reconstituir conforme disponibilidade`;
    }
    setRes({
      doseMgKg,
      doseMg,
      doseDia,
      intervalo,
      volPreparo,
      doseInfo,
      ab,
      pesoN,
      igN,
      diasN,
      meningite
    });
  };
  const limpar = () => {
    setIg("");
    setDias("");
    setPeso("");
    setMeningite(false);
    setRes(null);
  };
  const inpS = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1.5px solid #E8EDFF",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    background: "#F8FAFF",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    fontWeight: 700
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDC8A Antibi\xF3ticos Neonatais",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#EEF1FF,#E0E7FF)",
      borderRadius: 12,
      border: "1px solid #4F6EF720"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, "\uD83D\uDC8A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#1E1B4B"
    }
  }, "Doses Ajustadas por IG e Idade"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#4338CA",
      marginTop: 1
    }
  }, "Ampicilina \xB7 Gentamicina \xB7 Vancomicina \xB7 Oxacilina \xB7 Metronidazol \xB7 Aciclovir"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 6
    }
  }, "Antibi\xF3tico"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 6
    }
  }, ANTIBIOTICOS.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    onClick: () => {
      setAbId(a.id);
      setRes(null);
    },
    style: {
      padding: "8px 10px",
      borderRadius: 10,
      border: `1.5px solid ${abId === a.id ? a.cor : "#E5E7EB"}`,
      background: abId === a.id ? a.bg : "white",
      display: "flex",
      alignItems: "center",
      gap: 7,
      transition: "all 0.15s",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, a.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: abId === a.id ? a.cor : "#374151"
    }
  }, a.nome), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF"
    }
  }, a.via)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, "IG (sem)"), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    min: "22",
    max: "44",
    value: ig,
    onChange: e => setIg(e.target.value),
    placeholder: "Ex: 32"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, "Dias de vida"), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    min: "0",
    value: dias,
    onChange: e => setDias(e.target.value),
    placeholder: "Ex: 5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, "Peso (kg)"), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#4F6EF7"
    },
    type: "number",
    step: "0.01",
    value: peso,
    onChange: e => setPeso(e.target.value),
    placeholder: "Ex: 1.2"
  }))), (ab.id === "ampicilina" || ab.id === "oxacilina") && /*#__PURE__*/React.createElement("button", {
    onClick: () => setMeningite(v => !v),
    style: {
      width: "100%",
      padding: "9px 12px",
      borderRadius: 10,
      border: `1.5px solid ${meningite ? "#DC2626" : "#E5E7EB"}`,
      background: meningite ? "#FEE2E2" : "white",
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      border: `2px solid ${meningite ? "#DC2626" : "#D1D5DB"}`,
      background: meningite ? "#DC2626" : "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, meningite && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white",
      fontSize: 11,
      fontWeight: 900
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: meningite ? "#DC2626" : "#374151"
    }
  }, "\uD83E\uDDE0 Meningite (dose dobrada: 100mg/kg/dose)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: `linear-gradient(90deg,${ab.cor},${ab.cor}CC)`,
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: `0 4px 14px ${ab.cor}44`
    }
  }, "\u26A1 Calcular Dose")), res && (res.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 10,
      padding: 12,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", res.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeInUp 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${ab.cor},${ab.cor}BB)`,
      borderRadius: 16,
      padding: "14px",
      marginBottom: 12,
      color: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
      marginBottom: 4
    }
  }, ab.nome, " \xB7 ", res.igN, " sem \xB7 ", res.diasN, " dias \xB7 ", res.pesoN, "kg"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.15)",
      borderRadius: 10,
      padding: "9px 6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,0.7)"
    }
  }, "Dose/kg"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 900
    }
  }, res.doseMgKg), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10
    }
  }, "mg/kg")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.15)",
      borderRadius: 10,
      padding: "9px 6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,0.7)"
    }
  }, "Dose total"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 900
    }
  }, res.doseMg), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10
    }
  }, "mg")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.15)",
      borderRadius: 10,
      padding: "9px 6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,0.7)"
    }
  }, "Intervalo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 900
    }
  }, res.intervalo), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10
    }
  }, "horas")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0F9FF",
      borderRadius: 12,
      padding: "11px 13px",
      marginBottom: 12,
      border: "1px solid #BAE6FD"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#0369A1",
      marginBottom: 4
    }
  }, "\uD83E\uDDEA PREPARO / VOLUME"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#0C4A6E"
    }
  }, res.volPreparo), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#0369A1",
      marginTop: 4
    }
  }, ab.reconstituicao)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F5F3FF",
      borderRadius: 11,
      padding: "10px",
      textAlign: "center",
      border: "1px solid #DDD6FE"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#7C3AED",
      fontWeight: 700
    }
  }, "Total/dia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: "#7C3AED"
    }
  }, res.doseDia, " mg"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF"
    }
  }, (24 / res.intervalo).toFixed(0), "x ao dia")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0FDF4",
      borderRadius: 11,
      padding: "10px",
      textAlign: "center",
      border: "1px solid #86EFAC"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#16A34A",
      fontWeight: 700
    }
  }, "Via"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: "#16A34A"
    }
  }, ab.via), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF"
    }
  }, "Administra\xE7\xE3o"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFFBEB",
      borderRadius: 11,
      padding: "10px 13px",
      border: "1px solid #FDE68A"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#92400E",
      marginBottom: 4
    }
  }, "\u26A0\uFE0F OBSERVA\xC7\xD5ES"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#78350F",
      lineHeight: 1.7
    }
  }, ab.obs)))));
}

// ── BALANÇO HÍDRICO ────────────────────────────────────────────────────────────
function BalancoHidricoCalc({
  onClose
}) {
  const [peso, setPeso] = useState("");
  const [tipo, setTipo] = useState("rnpt");
  const [foto, setFoto] = useState(false);
  const [radiant, setRadiant] = useState(false);
  // Entradas
  const [evVol, setEvVol] = useState("");
  const [enteralVol, setEnteralVol] = useState("");
  const [medVol, setMedVol] = useState("");
  // Saídas
  const [diureseVol, setDiureseVol] = useState("");
  const [fezes, setFezes] = useState("");
  const [drenos, setDrenos] = useState("");
  // Período
  const [horas, setHoras] = useState("24");
  const [res, setRes] = useState(null);
  const calcular = () => {
    const pesoN = parseFloat(peso);
    if (isNaN(pesoN) || pesoN <= 0) {
      setRes({
        erro: "Informe o peso."
      });
      return;
    }
    const h = parseFloat(horas) || 24;
    const entradas = (parseFloat(evVol) || 0) + (parseFloat(enteralVol) || 0) + (parseFloat(medVol) || 0);
    const saidas = (parseFloat(diureseVol) || 0) + (parseFloat(fezes) || 0) + (parseFloat(drenos) || 0);

    // Perdas insensíveis estimadas
    let pi = tipo === "rnpt" ? 40 : 20;
    if (foto) pi += pi * 0.3;
    if (radiant) pi += pi * 0.5;
    const piPeriodo = parseFloat((pi * pesoN * (h / 24)).toFixed(1));
    const totalSaidas = parseFloat((saidas + piPeriodo).toFixed(1));
    const balanco = parseFloat((entradas - totalSaidas).toFixed(1));
    const diureseH = !isNaN(parseFloat(diureseVol)) && parseFloat(diureseVol) > 0 ? parseFloat((parseFloat(diureseVol) / pesoN / h).toFixed(2)) : null;
    let balStatus, balCor, balBg, balEmoji, balObs;
    if (balanco > 20 * pesoN) {
      balStatus = "Balanço muito positivo";
      balCor = "#DC2626";
      balBg = "#FEE2E2";
      balEmoji = "🔴";
      balObs = "Avaliar sobrecarga hídrica. Considerar restrição hídrica ou furosemida.";
    } else if (balanco > 10 * pesoN) {
      balStatus = "Balanço positivo";
      balCor = "#D97706";
      balBg = "#FEF9C3";
      balEmoji = "⚠️";
      balObs = "Balanço positivo moderado. Manter monitoramento.";
    } else if (balanco >= -5 * pesoN) {
      balStatus = "Balanço equilibrado";
      balCor = "#16A34A";
      balBg = "#DCFCE7";
      balEmoji = "✅";
      balObs = "Balanço adequado. Manter esquema atual.";
    } else if (balanco >= -15 * pesoN) {
      balStatus = "Balanço negativo";
      balCor = "#D97706";
      balBg = "#FEF9C3";
      balEmoji = "⚠️";
      balObs = "Avaliar hidratação. Aumentar oferta se sem contraindicação.";
    } else {
      balStatus = "Balanço muito negativo";
      balCor = "#DC2626";
      balBg = "#FEE2E2";
      balEmoji = "🚨";
      balObs = "Déficit hídrico significativo. Repor perdas urgente.";
    }
    const entradasKg = parseFloat((entradas / pesoN).toFixed(1));
    const totalSaidasKg = parseFloat((totalSaidas / pesoN).toFixed(1));
    const balancoKg = parseFloat((balanco / pesoN).toFixed(1));
    setRes({
      entradas,
      saidas,
      piPeriodo,
      totalSaidas,
      balanco,
      diureseH,
      balStatus,
      balCor,
      balBg,
      balEmoji,
      balObs,
      pesoN,
      h,
      entradasKg,
      totalSaidasKg,
      balancoKg
    });
  };
  const limpar = () => {
    setPeso("");
    setEvVol("");
    setEnteralVol("");
    setMedVol("");
    setDiureseVol("");
    setFezes("");
    setDrenos("");
    setHoras("24");
    setFoto(false);
    setRadiant(false);
    setRes(null);
  };
  const inpS = {
    width: "100%",
    padding: "9px 11px",
    borderRadius: 10,
    border: "1.5px solid #E8EDFF",
    fontSize: 13,
    color: "#111827",
    outline: "none",
    background: "#F8FAFF",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    fontWeight: 700
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\u2696\uFE0F Balan\xE7o H\xEDdrico",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#EDFDF5,#D1FAE5)",
      borderRadius: 12,
      border: "1px solid #22C55E20"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#22C55E,#16A34A)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, "\u2696\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#14532D"
    }
  }, "Controle H\xEDdrico Neonatal"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#15803D",
      marginTop: 1
    }
  }, "Entradas \xB7 Sa\xEDdas \xB7 Perdas Insens\xEDveis \xB7 Balan\xE7o"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, "Peso (kg)"), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#16A34A"
    },
    type: "number",
    step: "0.01",
    value: peso,
    onChange: e => setPeso(e.target.value),
    placeholder: "Ex: 1.2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, "Tipo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, [["rnpt", "RNPT"], ["rnt", "RNT"]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setTipo(v),
    style: {
      flex: 1,
      padding: "9px 4px",
      borderRadius: 9,
      border: `1.5px solid ${tipo === v ? "#22C55E" : "#E5E7EB"}`,
      background: tipo === v ? "#DCFCE7" : "white",
      color: tipo === v ? "#16A34A" : "#6B7280",
      fontWeight: tipo === v ? 700 : 500,
      fontSize: 11
    }
  }, l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, "Per\xEDodo (h)"), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    value: horas,
    onChange: e => setHoras(e.target.value),
    placeholder: "24"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 12
    }
  }, [[foto, setFoto, "☀️ Fototerapia", "+30% PI"], [radiant, setRadiant, "🌡️ Berço radiante", "+50% PI"]].map(([v, sv, l, sub], i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => sv(x => !x),
    style: {
      flex: 1,
      padding: "7px 9px",
      borderRadius: 10,
      border: `1.5px solid ${v ? "#F59E0B" : "#E5E7EB"}`,
      background: v ? "#FFFBEB" : "white",
      display: "flex",
      alignItems: "center",
      gap: 6,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 3,
      border: `2px solid ${v ? "#F59E0B" : "#D1D5DB"}`,
      background: v ? "#F59E0B" : "white",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, v && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white",
      fontSize: 9,
      fontWeight: 900
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: v ? "#92400E" : "#374151"
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      color: "#9CA3AF"
    }
  }, sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0FDF4",
      borderRadius: 12,
      padding: "10px 12px",
      marginBottom: 10,
      border: "1px solid #86EFAC"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#16A34A",
      marginBottom: 8
    }
  }, "\uD83D\uDCE5 ENTRADAS (mL)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 7
    }
  }, [["💧 EV (mL)", evVol, setEvVol], ["🍼 Enteral (mL)", enteralVol, setEnteralVol], ["💊 Medicações (mL)", medVol, setMedVol]].map(([l, v, sv]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, l), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.1",
    value: v,
    onChange: e => sv(e.target.value),
    placeholder: "0"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF2F2",
      borderRadius: 12,
      padding: "10px 12px",
      marginBottom: 12,
      border: "1px solid #FCA5A5"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#DC2626",
      marginBottom: 8
    }
  }, "\uD83D\uDCE4 SA\xCDDAS MENSURADAS (mL)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 7
    }
  }, [["💧 Diurese (mL)", diureseVol, setDiureseVol], ["💩 Fezes (mL)", fezes, setFezes], ["🩸 Drenos/perdas (mL)", drenos, setDrenos]].map(([l, v, sv]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, l), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "0.1",
    value: v,
    onChange: e => sv(e.target.value),
    placeholder: "0"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#22C55E,#4ADE80)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(34,197,94,0.4)"
    }
  }, "\u26A1 Calcular Balan\xE7o")), res && (res.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 10,
      padding: 12,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", res.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeInUp 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.balBg,
      borderRadius: 16,
      padding: "14px",
      marginBottom: 12,
      border: `2px solid ${res.balCor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      marginBottom: 4
    }
  }, res.balEmoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      fontWeight: 900,
      color: res.balCor,
      lineHeight: 1
    }
  }, res.balanco > 0 ? "+" : "", res.balanco, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "mL")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: res.balCor + "99",
      marginBottom: 4
    }
  }, "(", res.balanco > 0 ? "+" : "", res.balancoKg, " mL/kg) \u2014 ", res.h, "h"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: "4px 16px",
      borderRadius: 20,
      background: res.balCor,
      color: "white",
      fontWeight: 800,
      fontSize: 11
    }
  }, res.balStatus.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 12
    }
  }, [{
    l: "📥 Total Entradas",
    v: `${res.entradas} mL`,
    s: `${res.entradasKg} mL/kg`,
    cor: "#16A34A",
    bg: "#DCFCE7"
  }, {
    l: "📤 Saídas mensuradas",
    v: `${res.saidas} mL`,
    s: "Diurese+fezes+drenos",
    cor: "#DC2626",
    bg: "#FEE2E2"
  }, {
    l: "💨 Perdas insensíveis",
    v: `${res.piPeriodo} mL`,
    s: `${res.tipo === "rnpt" ? "40" : "20"}ml/kg/dia${res.foto ? "+foto" : ""}${res.radiant ? "+radiante" : ""}`,
    cor: "#D97706",
    bg: "#FEF9C3"
  }, {
    l: "📤 Total Saídas",
    v: `${res.totalSaidas} mL`,
    s: `${res.totalSaidasKg} mL/kg`,
    cor: "#EF4444",
    bg: "#FEE2E2"
  }].map(p => /*#__PURE__*/React.createElement("div", {
    key: p.l,
    style: {
      background: p.bg,
      borderRadius: 11,
      padding: "9px 11px",
      border: `1px solid ${p.cor}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      color: p.cor,
      marginBottom: 2
    }
  }, p.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: p.cor
    }
  }, p.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#9CA3AF"
    }
  }, p.s)))), res.diureseH !== null && /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.diureseH >= 1 && res.diureseH <= 3 ? "#DCFCE7" : res.diureseH < 0.5 ? "#FEE2E2" : "#FEF9C3",
      borderRadius: 11,
      padding: "9px 13px",
      marginBottom: 12,
      border: "1px solid #E5E7EB",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, "\uD83D\uDCA7"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151"
    }
  }, "D\xE9bito urin\xE1rio"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: res.diureseH >= 1 && res.diureseH <= 3 ? "#16A34A" : res.diureseH < 0.5 ? "#DC2626" : "#D97706"
    }
  }, res.diureseH, " mL/kg/h"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6B7280"
    }
  }, res.diureseH < 0.5 ? "🚨 Oligúria grave" : res.diureseH < 1 ? "⚠️ Oligúria" : res.diureseH <= 3 ? "✅ Normal" : res.diureseH <= 5 ? "⚠️ Poliúria leve" : "🔴 Poliúria grave"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 11,
      padding: "9px 13px",
      border: "1px solid #E5E7EB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 4
    }
  }, "\uD83D\uDC8A CONDUTA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#374151",
      lineHeight: 1.7
    }
  }, res.balObs)))));
}

// ── CORREÇÃO DE SÓDIO ──────────────────────────────────────────────────────────
function CorrecaoNaCalc({
  onClose
}) {
  const [na, setNa] = useState("");
  const [naAlvo, setNaAlvo] = useState("140");
  const [peso, setPeso] = useState("");
  const [tipo, setTipo] = useState("hipo"); // hipo | hiper
  const [res, setRes] = useState(null);
  const calcular = () => {
    const naN = parseFloat(na),
      naAlvoN = parseFloat(naAlvo),
      pesoN = parseFloat(peso);
    if (isNaN(naN) || isNaN(pesoN)) {
      setRes({
        erro: "Preencha Na⁺ atual e peso."
      });
      return;
    }
    if (tipo === "hipo") {
      // Hiponatremia: déficit de sódio
      const deficit = parseFloat(((naAlvoN - naN) * pesoN * 0.6).toFixed(1));
      const nacl3pct = parseFloat((deficit / 0.513).toFixed(1)); // NaCl 3% = 0,513 mEq/mL
      const nacl20pct = parseFloat((deficit / 3.4).toFixed(1)); // NaCl 20% = 3,4 mEq/mL
      const velMax = parseFloat((0.5 * pesoN * 0.6 / 0.513).toFixed(1)); // máx 0,5 mEq/kg/h de NaCl 3%

      let nivel, cor, bg, emoji, conduta;
      if (naN >= 130) {
        nivel = "Hiponatremia leve";
        cor = "#D97706";
        bg = "#FEF9C3";
        emoji = "⚠️";
        conduta = "Restrição hídrica. Considerar ajuste da oferta de sódio. Repetir Na⁺ em 6–12h.";
      } else if (naN >= 125) {
        nivel = "Hiponatremia moderada";
        cor = "#EA580C";
        bg = "#FFF7ED";
        emoji = "🔴";
        conduta = "NaCl hipertônico se sintomático (convulsão). Elevar Na⁺ no máx 0,5 mEq/kg/h. Sem ultrapassar +10 mEq/L/24h (risco de mielinólise).";
      } else {
        nivel = "Hiponatremia grave";
        cor = "#DC2626";
        bg: "#FEE2E2";
        emoji = "🚨";
        conduta = "NaCl 3% urgente se convulsão ativa: 2–4 mL/kg em bólus. Objetivo: elevar 5 mEq/L. Monitorar Na⁺ a cada 2–4h. Não ultrapassar +10–12 mEq/L/24h.";
      }
      setRes({
        tipo: "hipo",
        naN,
        naAlvoN,
        pesoN,
        deficit,
        nacl3pct,
        nacl20pct,
        velMax,
        nivel,
        cor,
        bg,
        emoji,
        conduta
      });
    } else {
      // Hipernatremia: excesso de sódio / déficit de água livre
      const defAguaL = parseFloat((pesoN * 0.6 * (naN / naAlvoN - 1) * 1000).toFixed(0));
      const velCorr = parseFloat((defAguaL / 48).toFixed(1)); // máx 48h
      let nivel, cor, bg, emoji, conduta;
      if (naN <= 155) {
        nivel = "Hipernatremia leve";
        cor: "#D97706";
        bg = "#FEF9C3";
        emoji = "⚠️";
        conduta = "Reposição de água livre VO/SNG. Corrigir lentamente: máx −0,5 mEq/L/h ou −10–12 mEq/L/24h.";
      } else if (naN <= 165) {
        nivel = "Hipernatremia moderada";
        cor = "#EA580C";
        bg = "#FFF7ED";
        emoji = "🔴";
        conduta = "Água livre EV (SG5%) ou enteral. Corrigir em 48–72h. Monitorar Na⁺ a cada 4–6h. Risco de edema cerebral se correção rápida.";
      } else {
        nivel = "Hipernatremia grave";
        cor = "#DC2626";
        bg = "#FEE2E2";
        emoji = "🚨";
        conduta = "Hipernatremia grave. Reposição EV lenta de água livre. Nunca corrigir mais que −10 mEq/L/24h. Avaliar causa base. Monitorar Na⁺ 2/2h.";
      }
      cor = cor || "#DC2626";
      bg = bg || "#FEE2E2";
      setRes({
        tipo: "hiper",
        naN,
        naAlvoN,
        pesoN,
        defAguaL,
        velCorr,
        nivel,
        cor,
        bg,
        emoji,
        conduta
      });
    }
  };
  const limpar = () => {
    setNa("");
    setNaAlvo("140");
    setPeso("");
    setRes(null);
  };
  const inpS = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1.5px solid #E8EDFF",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    background: "#F8FAFF",
    fontFamily: "inherit",
    boxSizing: "border-box",
    textAlign: "center",
    fontWeight: 700
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83E\uDDC2 Corre\xE7\xE3o de Dist\xFArbios do S\xF3dio",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 14,
      padding: "9px 13px",
      background: "linear-gradient(135deg,#ECFEFF,#CFFAFE)",
      borderRadius: 12,
      border: "1px solid #06B6D420"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: "linear-gradient(135deg,#06B6D4,#0EA5E9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, "\uD83E\uDDC2"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#164E63"
    }
  }, "Corre\xE7\xE3o de Na\u207A"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#0E7490",
      marginTop: 1
    }
  }, "Hiponatremia \xB7 Hipernatremia \xB7 Dose e Velocidade"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 12
    }
  }, [["hipo", "⬇️ Hiponatremia (Na <135)"], ["hiper", "⬆️ Hipernatremia (Na >145)"]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => {
      setTipo(v);
      setNaAlvo(v === "hipo" ? "140" : "140");
      setRes(null);
    },
    style: {
      flex: 1,
      padding: "9px 8px",
      borderRadius: 10,
      border: `1.5px solid ${tipo === v ? "#06B6D4" : "#E5E7EB"}`,
      background: tipo === v ? "#ECFEFF" : "white",
      color: tipo === v ? "#0E7490" : "#6B7280",
      fontWeight: tipo === v ? 700 : 500,
      fontSize: 11
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, "Na\u207A atual (mEq/L)"), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: tipo === "hipo" ? "#DC2626" : "#D97706"
    },
    type: "number",
    step: "1",
    value: na,
    onChange: e => setNa(e.target.value),
    placeholder: tipo === "hipo" ? "Ex: 125" : "Ex: 158"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, "Na\u207A alvo (mEq/L)"), /*#__PURE__*/React.createElement("input", {
    style: inpS,
    type: "number",
    step: "1",
    value: naAlvo,
    onChange: e => setNaAlvo(e.target.value),
    placeholder: "140"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#374151",
      display: "block",
      marginBottom: 3,
      textAlign: "center"
    }
  }, "Peso (kg)"), /*#__PURE__*/React.createElement("input", {
    style: {
      ...inpS,
      color: "#0369A1"
    },
    type: "number",
    step: "0.01",
    value: peso,
    onChange: e => setPeso(e.target.value),
    placeholder: "Ex: 1.5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: limpar,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 10,
      border: "1.5px solid #E5E7EB",
      background: "white",
      color: "#374151",
      fontWeight: 700,
      fontSize: 13
    }
  }, "\uD83D\uDD04 Limpar"), /*#__PURE__*/React.createElement("button", {
    onClick: calcular,
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#06B6D4,#22D3EE)",
      color: "white",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "0 4px 14px rgba(6,182,212,0.4)"
    }
  }, "\u26A1 Calcular Corre\xE7\xE3o")), res && (res.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEE2E2",
      borderRadius: 10,
      padding: 12,
      color: "#DC2626",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", res.erro) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeInUp 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: res.bg,
      borderRadius: 16,
      padding: "13px",
      marginBottom: 12,
      border: `2px solid ${res.cor}40`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      marginBottom: 4
    }
  }, res.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 900,
      color: res.cor
    }
  }, res.nivel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: res.cor + "90",
      marginTop: 3
    }
  }, "Na\u207A atual: ", res.naN, " \u2192 alvo: ", res.naAlvoN, " mEq/L \xB7 \u0394: ", Math.abs(res.naAlvoN - res.naN), " mEq/L")), res.tipo === "hipo" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0F9FF",
      borderRadius: 12,
      padding: "11px 13px",
      marginBottom: 12,
      border: "1px solid #BAE6FD"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#0369A1",
      marginBottom: 8
    }
  }, "\uD83D\uDC89 REPOSI\xC7\xC3O DE S\xD3DIO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }
  }, [{
    l: "Déficit total de Na⁺",
    v: `${res.deficit} mEq`
  }, {
    l: "NaCl 3% (0,513 mEq/mL)",
    v: `${res.nacl3pct} mL`
  }, {
    l: "NaCl 20% (3,4 mEq/mL)",
    v: `${res.nacl20pct} mL`
  }, {
    l: "Vel. máx NaCl 3%",
    v: `${res.velMax} mL/h`
  }].map(p => /*#__PURE__*/React.createElement("div", {
    key: p.l,
    style: {
      background: "white",
      borderRadius: 9,
      padding: "8px",
      textAlign: "center",
      border: "1px solid #BAE6FD"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "#0369A1",
      fontWeight: 700,
      marginBottom: 2
    }
  }, p.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 900,
      color: "#0C4A6E"
    }
  }, p.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 10,
      color: "#0369A1",
      fontWeight: 700
    }
  }, "\u26A0\uFE0F F\xF3rmula: D\xE9ficit = (Na alvo \u2212 Na atual) \xD7 peso \xD7 0,6")), res.tipo === "hiper" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFF7ED",
      borderRadius: 12,
      padding: "11px 13px",
      marginBottom: 12,
      border: "1px solid #FED7AA"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#C2410C",
      marginBottom: 8
    }
  }, "\uD83D\uDCA7 REPOSI\xC7\xC3O DE \xC1GUA LIVRE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }
  }, [{
    l: "Déficit de água livre",
    v: `${res.defAguaL} mL`
  }, {
    l: "Velocidade (48h)",
    v: `${res.velCorr} mL/h`
  }].map(p => /*#__PURE__*/React.createElement("div", {
    key: p.l,
    style: {
      background: "white",
      borderRadius: 9,
      padding: "8px",
      textAlign: "center",
      border: "1px solid #FED7AA"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "#C2410C",
      fontWeight: 700,
      marginBottom: 2
    }
  }, p.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 900,
      color: "#7C2D12"
    }
  }, p.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 10,
      color: "#C2410C",
      fontWeight: 700
    }
  }, "\u26A0\uFE0F F\xF3rmula: D\xE9ficit = Peso \xD7 0,6 \xD7 (Na atual/Na alvo \u2212 1) \xD7 1000")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#164E63,#0E7490)",
      borderRadius: 13,
      padding: "12px 14px",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.65)",
      fontWeight: 700,
      marginBottom: 5
    }
  }, "\uD83D\uDC8A CONDUTA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      lineHeight: 1.75,
      color: "rgba(255,255,255,0.93)"
    }
  }, res.conduta)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      background: "#FEF9C3",
      borderRadius: 10,
      padding: "8px 12px",
      border: "1px solid #FDE68A",
      fontSize: 11,
      color: "#92400E",
      fontWeight: 600
    }
  }, "\u26A0\uFE0F M\xE1xima velocidade de corre\xE7\xE3o: \xB10,5 mEq/L/h ou \xB110\u201312 mEq/L/24h para evitar complica\xE7\xF5es neurol\xF3gicas."))));
}

// ── SEÇÃO GRID ─ (update handleClick and modal renders) ───────────────────────
// ── ABERTURA DE CALCULADORA (compartilhado: grid, busca, Home) ───────────────
// Mapeia um item -> uma calculadora pelo título. "detail" = card só de texto.
function resolveCalc(item) {
  const t = (item && item.title || "").toLowerCase();
  if (t.includes("rodwell")) return "rodwell";
  if (t.includes("hiperbilirrubin")) return "bilirubin";
  if (t.includes("oxygenation") || t.includes("oxigenação") || t.includes("oi)")) return "oi";
  if (t.includes("gasometria") || t.includes("gasometry")) return "gaso";
  if (t.includes("tfg") || t.includes("filtração") || t.includes("glomerular")) return "tfg";
  if (t.includes("hidrat") || t.includes("venosa") || t.includes("venócl") || t.includes("venoclise")) return "venoclise";
  if (t.includes("droga") || t.includes("infusão") || t.includes("contínua") || t.includes("bic") || t.includes("vasoativ")) return "drogas";
  if (t.includes("snappe")) return "snappe";
  if (t.includes("dor") || t.includes("nips") || t.includes("pipp") || t.includes("n-pass")) return "nips";
  if (t.includes("transfus")) return "transfusao";
  if (t.includes("silverman")) return "silverman";
  if (t.includes("apgar")) return "apgar";
  if (t.includes("antibiótico") || t.includes("antibiotic") || t.includes("gentamicina") || t.includes("ampicilina") || t.includes("vancomicina")) return "antibioticos";
  if (t.includes("balanço") || t.includes("balanc") || t.includes("hídrico")) return "balanco";
  if (t.includes("sódio") || t.includes("sodio") || t.includes("hiponatremia") || t.includes("hipernatremia") || t.includes("correção de na") || t.includes("na+")) return "corrigena";
  return "detail";
}
function CalcHost({
  item,
  onClose
}) {
  if (!item) return null;
  switch (resolveCalc(item)) {
    case "rodwell":
      return /*#__PURE__*/React.createElement(RodwellCalc, {
        item: item,
        onClose: onClose
      });
    case "bilirubin":
      return /*#__PURE__*/React.createElement(BilirubinCalc, {
        onClose: onClose
      });
    case "oi":
      return /*#__PURE__*/React.createElement(OICalc, {
        onClose: onClose
      });
    case "gaso":
      return /*#__PURE__*/React.createElement(GasometriaCalc, {
        onClose: onClose
      });
    case "tfg":
      return /*#__PURE__*/React.createElement(TFGCalc, {
        onClose: onClose
      });
    case "venoclise":
      return /*#__PURE__*/React.createElement(VenocliseCalc, {
        onClose: onClose
      });
    case "drogas":
      return /*#__PURE__*/React.createElement(DrogasCalc, {
        onClose: onClose
      });
    case "snappe":
      return /*#__PURE__*/React.createElement(SNAPPECalc, {
        onClose: onClose
      });
    case "nips":
      return /*#__PURE__*/React.createElement(NIPSCalc, {
        onClose: onClose
      });
    case "transfusao":
      return /*#__PURE__*/React.createElement(TransfusaoCalc, {
        onClose: onClose
      });
    case "silverman":
      return /*#__PURE__*/React.createElement(SilvermanCalc, {
        onClose: onClose
      });
    case "apgar":
      return /*#__PURE__*/React.createElement(ApgarCalc, {
        onClose: onClose
      });
    case "antibioticos":
      return /*#__PURE__*/React.createElement(AntibioticosCalc, {
        onClose: onClose
      });
    case "balanco":
      return /*#__PURE__*/React.createElement(BalancoHidricoCalc, {
        onClose: onClose
      });
    case "corrigena":
      return /*#__PURE__*/React.createElement(CorrecaoNaCalc, {
        onClose: onClose
      });
    default:
      return /*#__PURE__*/React.createElement(Modal, {
        title: item.title,
        onClose: onClose
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 50,
          height: 50,
          borderRadius: 14,
          background: item.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          border: `2px solid ${item.color}22`,
          flexShrink: 0
        }
      }, item.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 800,
          color: item.color
        }
      }, item.title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#6B7280"
        }
      }, item.sub))), /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#F9FAFB",
          borderRadius: 12,
          padding: 14,
          fontSize: 13,
          color: "#374151",
          lineHeight: 1.8,
          whiteSpace: "pre-wrap",
          maxHeight: 320,
          overflowY: "auto"
        }
      }, item.content || "Sem conteúdo adicional."));
  }
}
function SectionGrid({
  items,
  isGestor,
  onEdit,
  onDelete,
  onAdd,
  cols = 3,
  section,
  favs = [],
  onToggleFav,
  onOpenItem
}) {
  const [open, setOpen] = useState(null);
  const visible = isGestor ? items : items.filter(i => i.active !== false);
  const handleClick = item => {
    if (section && onOpenItem) onOpenItem(section, item);
    setOpen(item);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols},1fr)`,
      gap: 10
    }
  }, visible.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: "score-card",
    style: {
      background: item.bg,
      borderRadius: 16,
      padding: "13px 10px",
      cursor: "pointer",
      textAlign: "center",
      border: `1.5px solid ${item.color}18`,
      boxShadow: `0 2px 12px ${item.color}14`,
      position: "relative",
      opacity: item.active === false ? 0.5 : 1
    },
    onClick: () => handleClick(item)
  }, section && onToggleFav && (() => {
    const fav = favs.includes(favKey(section, item.id));
    return /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        onToggleFav(section, item.id);
      },
      title: fav ? "Remover dos favoritos" : "Adicionar aos favoritos",
      style: {
        position: "absolute",
        top: 4,
        left: 4,
        width: 22,
        height: 22,
        borderRadius: 6,
        border: "none",
        lineHeight: 1,
        padding: 0,
        cursor: "pointer",
        background: fav ? "rgba(245,158,11,0.18)" : "rgba(148,163,184,0.14)",
        color: fav ? "#F59E0B" : "#94A3B8",
        fontSize: 12
      }
    }, fav ? "★" : "☆");
  })(), isGestor && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 5,
      right: 5,
      display: "flex",
      gap: 2
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onEdit(item),
    style: {
      width: 21,
      height: 21,
      borderRadius: 5,
      border: "none",
      background: "rgba(79,110,247,0.15)",
      color: "#4F6EF7",
      fontSize: 10
    }
  }, "\u270F"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete(item.id),
    style: {
      width: 21,
      height: 21,
      borderRadius: 5,
      border: "none",
      background: "rgba(239,68,68,0.15)",
      color: "#EF4444",
      fontSize: 10
    }
  }, "\u2715")), item.active === false && isGestor && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 30,
      left: 5,
      background: "#FEE2E2",
      color: "#DC2626",
      fontSize: 8,
      fontWeight: 700,
      borderRadius: 4,
      padding: "2px 4px"
    }
  }, "OFF"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 5
    }
  }, item.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: item.color,
      lineHeight: 1.3,
      marginBottom: 3
    }
  }, item.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "#94A3B8",
      lineHeight: 1.3
    }
  }, item.sub))), isGestor && onAdd && /*#__PURE__*/React.createElement("div", {
    onClick: onAdd,
    style: {
      background: "white",
      borderRadius: 13,
      padding: "11px 9px",
      cursor: "pointer",
      textAlign: "center",
      border: "2px dashed #D1D5DB",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      minHeight: 95,
      transition: "border-color 0.2s"
    },
    onMouseEnter: e => e.currentTarget.style.borderColor = "#4F6EF7",
    onMouseLeave: e => e.currentTarget.style.borderColor = "#D1D5DB"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      color: "#9CA3AF"
    }
  }, "\uFF0B"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#9CA3AF",
      fontWeight: 700
    }
  }, "Adicionar"))), open && /*#__PURE__*/React.createElement(CalcHost, {
    item: open,
    onClose: () => setOpen(null)
  }));
}

// ── TABLES SECTION ────────────────────────────────────────────────────────────
function TablesSection({
  tables,
  isGestor,
  onUpdate
}) {
  const [editing, setEditing] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [open, setOpen] = useState(null);
  const save = t => {
    const u = tables.find(x => x.id === t.id) ? tables.map(x => x.id === t.id ? t : x) : [...tables, t];
    onUpdate(u);
    setEditing(null);
    setShowNew(false);
  };
  const del = id => onUpdate(tables.filter(t => t.id !== id));
  if (tables.length === 0 && !isGestor) return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: "#9CA3AF",
      padding: 40,
      fontSize: 13
    }
  }, "Nenhuma tabela dispon\xEDvel.");
  return /*#__PURE__*/React.createElement("div", null, tables.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      background: "white",
      borderRadius: 14,
      border: "1.5px solid #E5E7EB",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 14px",
      background: "#F9FAFB",
      borderBottom: open === t.id ? "1px solid #E5E7EB" : "none",
      cursor: "pointer"
    },
    onClick: () => setOpen(open === t.id ? null : t.id)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontWeight: 700,
      fontSize: 13,
      color: "#111827"
    }
  }, t.title || "Tabela sem título"), isGestor && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditing(t),
    style: {
      padding: "3px 8px",
      borderRadius: 6,
      border: "none",
      background: "#EEF1FF",
      color: "#4F6EF7",
      fontSize: 11,
      fontWeight: 700
    }
  }, "\u270F Editar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => del(t.id),
    style: {
      padding: "3px 8px",
      borderRadius: 6,
      border: "none",
      background: "#FEE2E2",
      color: "#EF4444",
      fontSize: 11
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontSize: 13
    }
  }, open === t.id ? "▲" : "▼")), open === t.id && /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse",
      width: "100%",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, t.headers.map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      padding: "7px 10px",
      background: "#EEF1FF",
      color: "#4F6EF7",
      fontWeight: 700,
      textAlign: "left",
      borderBottom: "2px solid #4F6EF7"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, t.rows.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri,
    style: {
      background: ri % 2 === 0 ? "white" : "#FAFAFA"
    }
  }, row.map((cell, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    style: {
      padding: "7px 10px",
      borderBottom: "1px solid #E5E7EB",
      color: "#374151"
    }
  }, cell))))))))), isGestor && /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowNew(true),
    style: {
      width: "100%",
      padding: 11,
      borderRadius: 12,
      border: "2px dashed #4F6EF7",
      background: "#EEF1FF",
      color: "#4F6EF7",
      fontWeight: 800,
      fontSize: 13
    }
  }, "+ Nova Tabela"), (editing || showNew) && /*#__PURE__*/React.createElement(TableEditor, {
    table: editing,
    onSave: save,
    onClose: () => {
      setEditing(null);
      setShowNew(false);
    }
  }));
}

// ── SECTION CARD WRAPPER ──────────────────────────────────────────────────────
function Card({
  title,
  sub,
  icon,
  children,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 20,
      padding: "16px 16px",
      boxShadow: "0 4px 20px rgba(79,110,247,0.06)",
      border: "1px solid rgba(79,110,247,0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 12,
      background: accent || "linear-gradient(135deg,#EEF1FF,#E0E7FF)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 14,
      color: "#0F172A",
      letterSpacing: -0.2
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "#94A3B8",
      marginTop: 1
    }
  }, sub))), children);
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
// Faixa de mini-cards que ABREM a calculadora (não só navegam).
function QuickRow({
  title,
  entries,
  onLaunch
}) {
  if (!entries || entries.length === 0) return null;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#64748B",
      marginBottom: 10,
      letterSpacing: 0.5
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }
  }, entries.map(({
    sec,
    item
  }) => /*#__PURE__*/React.createElement("div", {
    key: sec + ":" + item.id,
    className: "score-card",
    style: {
      background: item.bg || "#EEF1FF",
      borderRadius: 14,
      padding: "12px 10px",
      cursor: "pointer",
      border: `1.5px solid ${item.color || "#4F6EF7"}18`,
      boxShadow: `0 2px 10px ${item.color || "#4F6EF7"}12`
    },
    onClick: () => onLaunch(sec, item)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      marginBottom: 5
    }
  }, item.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: item.color || "#111827",
      lineHeight: 1.3
    }
  }, item.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#94A3B8",
      marginTop: 2,
      lineHeight: 1.3
    }
  }, item.sub)))));
}
function HomePage({
  db,
  isGestor,
  hist,
  favs,
  onEdit,
  onDelete,
  onAdd,
  onNavigate,
  onLaunch
}) {
  const counts = {
    scores: (db.scores || []).filter(s => s.active !== false).length,
    calculos: (db.calculos || []).filter(s => s.active !== false).length,
    medicacoes: (db.medicacoes || []).filter(s => s.active !== false).length,
    doencas: (db.doencas || []).filter(s => s.active !== false).length,
    vacinas: (db.vacinas || []).filter(s => s.active !== false).length
  };

  // Recentes (do histórico) — resolve pelo db atual, com fallback ao salvo
  const recentes = (hist || []).slice(0, 4).map(e => {
    const cur = (db[e.sec] || []).find(x => x.id === e.id);
    return {
      sec: e.sec,
      item: cur || {
        id: e.id,
        title: e.title,
        sub: e.sub,
        icon: e.icon,
        color: e.color,
        bg: e.bg
      }
    };
  });
  // Favoritos
  const favoritos = [];
  FAV_SECTIONS.forEach(s => (db[s.key] || []).forEach(it => {
    if ((favs || []).includes(favKey(s.key, it.id))) favoritos.push({
      sec: s.key,
      item: it
    });
  }));
  const SECTIONS = [{
    id: "scores",
    icon: "📋",
    label: "Scores",
    sub: "Avaliações e escalas",
    cor: "#4F6EF7",
    bg: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
    count: counts.scores,
    emoji: "🧠"
  }, {
    id: "calculos",
    icon: "🧮",
    label: "Cálculos",
    sub: "Ferramentas clínicas",
    cor: "#22C55E",
    bg: "linear-gradient(135deg,#22C55E,#16A34A)",
    count: counts.calculos,
    emoji: "⚡"
  }, {
    id: "medicacoes",
    icon: "💊",
    label: "Medicações",
    sub: "Calculadoras de dose",
    cor: "#F97316",
    bg: "linear-gradient(135deg,#F97316,#EA580C)",
    count: counts.medicacoes,
    emoji: "💊"
  }, {
    id: "doencas",
    icon: "🧬",
    label: "Doenças Neonatais",
    sub: "Protocolos e condutas",
    cor: "#EC4899",
    bg: "linear-gradient(135deg,#EC4899,#BE185D)",
    count: counts.doencas,
    emoji: "🧬"
  }, {
    id: "vacinas",
    icon: "💉",
    label: "Vacinas",
    sub: "Calendário e doses",
    cor: "#8B5CF6",
    bg: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
    count: counts.vacinas,
    emoji: "💉"
  }, {
    id: "grafico",
    icon: "📈",
    label: "Curvas de Crescimento",
    sub: "Percentis OMS",
    cor: "#06B6D4",
    bg: "linear-gradient(135deg,#06B6D4,#0284C7)",
    count: null,
    emoji: "📊"
  }];

  // Primeiros 4 de scores / cálculos (para quem ainda não tem histórico)
  const topScores = (db.scores || []).filter(s => s.active !== false).slice(0, 4).map(item => ({
    sec: "scores",
    item
  }));
  const topCalcs = (db.calculos || []).filter(s => s.active !== false).slice(0, 4).map(item => ({
    sec: "calculos",
    item
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      animation: "fadeInUp 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#1a2550,#0f1a3d)",
      borderRadius: 20,
      padding: "18px 20px",
      color: "white",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 120,
      height: 120,
      borderRadius: "50%",
      background: "rgba(79,110,247,0.15)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -30,
      right: 30,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(124,158,255,0.1)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.55)",
      fontWeight: 600,
      marginBottom: 4
    }
  }, "UTI NEONATAL \xB7 NeoCalc"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      lineHeight: 1.2,
      marginBottom: 2
    }
  }, "\uD83D\uDC76 Ol\xE1, Dr. Rodrigo!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.5)"
    }
  }, "Toque na \uD83D\uDD0D para buscar, ou escolha abaixo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 14,
      flexWrap: "wrap"
    }
  }, [["📋", counts.scores, "Scores"], ["🧮", counts.calculos, "Cálculos"], ["🧬", counts.doencas, "Doenças"]].map(([e, n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      background: "rgba(255,255,255,0.1)",
      borderRadius: 20,
      padding: "4px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, e), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#7C9EFF"
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.5)"
    }
  }, l))))), /*#__PURE__*/React.createElement(QuickRow, {
    title: "\uD83D\uDD50 RECENTES",
    entries: recentes,
    onLaunch: onLaunch
  }), /*#__PURE__*/React.createElement(QuickRow, {
    title: "\u2B50 FAVORITOS",
    entries: favoritos.slice(0, 6),
    onLaunch: onLaunch
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#64748B",
      marginBottom: 10,
      letterSpacing: 0.5
    }
  }, "SE\xC7\xD5ES"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, SECTIONS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    onClick: () => onNavigate(s.id),
    className: "card-hover",
    style: {
      background: s.bg,
      borderRadius: 18,
      padding: "16px 14px",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      color: "white",
      boxShadow: `0 6px 24px ${s.cor}30`,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -15,
      right: -10,
      fontSize: 52,
      opacity: 0.18,
      lineHeight: 1
    }
  }, s.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      marginBottom: 8
    }
  }, s.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      lineHeight: 1.2,
      marginBottom: 3
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.65)"
    }
  }, s.sub), s.count !== null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 20,
      background: "rgba(255,255,255,0.2)",
      fontSize: 11,
      fontWeight: 700
    }
  }, s.count, " dispon\xEDveis"))))), recentes.length === 0 && /*#__PURE__*/React.createElement(QuickRow, {
    title: "\u26A1 SCORES",
    entries: topScores,
    onLaunch: onLaunch
  }), recentes.length === 0 && /*#__PURE__*/React.createElement(QuickRow, {
    title: "\u26A1 C\xC1LCULOS",
    entries: topCalcs,
    onLaunch: onLaunch
  }));
}
function FullSection({
  title,
  sub,
  icon,
  items,
  section,
  isGestor,
  onEdit,
  onDelete,
  onAdd,
  cols,
  favs,
  onToggleFav,
  onOpenItem
}) {
  const [busca, setBusca] = useState("");
  const filtered = (items || []).filter(i => {
    if (!busca) return true;
    return norm((i.title || "") + " " + (i.sub || "")).includes(norm(busca));
  });
  const ativos = filtered.filter(i => i.active !== false);
  const inativos = isGestor ? filtered.filter(i => i.active === false) : [];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeInUp 0.28s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      boxShadow: "0 4px 14px rgba(79,110,247,0.3)"
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: "#0F172A",
      letterSpacing: -0.3
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#94A3B8",
      marginTop: 1
    }
  }, sub, " \xB7 ", ativos.length, " dispon\xEDveis"))), isGestor && /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    style: {
      padding: "8px 14px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#4F6EF7,#7C9EFF)",
      color: "white",
      fontWeight: 800,
      fontSize: 12,
      boxShadow: "0 2px 10px rgba(79,110,247,0.3)"
    }
  }, "+ Novo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "white",
      borderRadius: 12,
      padding: "9px 14px",
      marginBottom: 14,
      border: "1.5px solid #E8EDFF",
      boxShadow: "0 2px 8px rgba(79,110,247,0.06)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#94A3B8",
      fontSize: 14
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    value: busca,
    onChange: e => setBusca(e.target.value),
    placeholder: `Buscar em ${title}...`,
    style: {
      border: "none",
      background: "none",
      outline: "none",
      fontSize: 13,
      color: "#374151",
      width: "100%",
      fontFamily: "inherit"
    }
  }), busca && /*#__PURE__*/React.createElement("button", {
    onClick: () => setBusca(""),
    style: {
      background: "none",
      border: "none",
      color: "#94A3B8",
      fontSize: 16,
      cursor: "pointer",
      padding: 0,
      lineHeight: 1
    }
  }, "\u2715")), ativos.length === 0 && !isGestor && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 20px",
      color: "#94A3B8",
      fontSize: 13
    }
  }, busca ? `Nenhum resultado para "${busca}"` : "Nenhum item disponível."), ativos.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 20,
      padding: "14px",
      boxShadow: "0 4px 20px rgba(79,110,247,0.06)",
      border: "1px solid rgba(79,110,247,0.08)",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(SectionGrid, {
    items: ativos.map(i => ({
      ...i,
      active: true
    })),
    isGestor: isGestor,
    cols: cols,
    section: section,
    favs: favs,
    onToggleFav: onToggleFav,
    onOpenItem: onOpenItem,
    onEdit: onEdit,
    onDelete: onDelete,
    onAdd: onAdd
  })), inativos.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 16,
      padding: "12px",
      border: "1.5px dashed #E5E7EB",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9CA3AF",
      marginBottom: 10
    }
  }, "\uD83D\uDD12 INATIVOS (vis\xEDvel s\xF3 para o gestor)"), /*#__PURE__*/React.createElement(SectionGrid, {
    items: inativos,
    isGestor: isGestor,
    cols: cols,
    section: section,
    favs: favs,
    onToggleFav: onToggleFav,
    onOpenItem: onOpenItem,
    onEdit: onEdit,
    onDelete: onDelete,
    onAdd: onAdd
  })));
}

// ── PÁGINA DE FAVORITOS ───────────────────────────────────────────────────────
function FavoritesPage({
  db,
  favs,
  isGestor,
  onToggleFav,
  onOpenItem,
  onEdit,
  onDelete
}) {
  const groups = FAV_SECTIONS.map(s => ({
    ...s,
    items: (db[s.key] || []).filter(it => favs.includes(favKey(s.key, it.id)))
  })).filter(g => g.items.length > 0);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeInUp 0.28s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: "linear-gradient(135deg,#F59E0B,#F97316)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      boxShadow: "0 4px 14px rgba(245,158,11,0.3)"
    }
  }, "\u2B50"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: "#0F172A",
      letterSpacing: -0.3
    }
  }, "Favoritos"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#94A3B8",
      marginTop: 1
    }
  }, total, " ", total === 1 ? "item marcado" : "itens marcados", " \xB7 salvo neste navegador"))), total === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "48px 22px",
      color: "#94A3B8",
      fontSize: 13,
      lineHeight: 1.7,
      background: "white",
      borderRadius: 20,
      border: "1px solid rgba(79,110,247,0.08)",
      boxShadow: "0 4px 20px rgba(79,110,247,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 10,
      color: "#F59E0B"
    }
  }, "\u2606"), "Nenhum favorito ainda.", /*#__PURE__*/React.createElement("br", null), "Toque na estrela no canto de qualquer card em", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "Scores, C\xE1lculos, Medica\xE7\xF5es, Doen\xE7as"), " ou ", /*#__PURE__*/React.createElement("b", null, "Vacinas"), ".") : groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.key,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, g.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "#64748B",
      letterSpacing: 0.4
    }
  }, g.label.toUpperCase()), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#94A3B8"
    }
  }, "(", g.items.length, ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 20,
      padding: "14px",
      boxShadow: "0 4px 20px rgba(79,110,247,0.06)",
      border: "1px solid rgba(79,110,247,0.08)"
    }
  }, /*#__PURE__*/React.createElement(SectionGrid, {
    items: g.items.map(i => ({
      ...i,
      active: true
    })),
    isGestor: isGestor,
    cols: g.cols,
    section: g.key,
    favs: favs,
    onToggleFav: onToggleFav,
    onOpenItem: onOpenItem,
    onEdit: it => onEdit(g.key, it),
    onDelete: id => onDelete(g.key, id),
    onAdd: null
  })))));
}

// ── PÁGINA DE HISTÓRICO ───────────────────────────────────────────────────────
function HistoryPage({
  hist,
  db,
  onClear,
  onNavigate,
  onLaunch
}) {
  // usa o título/ícone atual do db se o item ainda existe; senão, o que foi salvo
  const rows = hist.map(e => {
    const cur = (db[e.sec] || []).find(x => x.id === e.id);
    return {
      ...e,
      title: cur && cur.title || e.title,
      sub: cur && cur.sub || e.sub,
      icon: cur && cur.icon || e.icon,
      color: cur && cur.color || e.color || "#4F6EF7",
      bg: cur && cur.bg || e.bg || "#EEF1FF"
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeInUp 0.28s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      boxShadow: "0 4px 14px rgba(79,110,247,0.3)"
    }
  }, "\uD83D\uDD50"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: "#0F172A",
      letterSpacing: -0.3
    }
  }, "Hist\xF3rico"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#94A3B8",
      marginTop: 1
    }
  }, rows.length, " ", rows.length === 1 ? "item recente" : "itens recentes", " \xB7 salvo neste navegador"))), rows.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: onClear,
    style: {
      padding: "8px 14px",
      borderRadius: 10,
      border: "1.5px solid #FEE2E2",
      background: "#FEF2F2",
      color: "#EF4444",
      fontWeight: 700,
      fontSize: 12,
      cursor: "pointer"
    }
  }, "Limpar hist\xF3rico")), rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "48px 22px",
      color: "#94A3B8",
      fontSize: 13,
      lineHeight: 1.7,
      background: "white",
      borderRadius: 20,
      border: "1px solid rgba(79,110,247,0.08)",
      boxShadow: "0 4px 20px rgba(79,110,247,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 10
    }
  }, "\uD83D\uDD50"), "Nada por aqui ainda.", /*#__PURE__*/React.createElement("br", null), "Os \xFAltimos scores e c\xE1lculos que voc\xEA abrir aparecem nesta lista.") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 20,
      padding: "6px",
      boxShadow: "0 4px 20px rgba(79,110,247,0.06)",
      border: "1px solid rgba(79,110,247,0.08)"
    }
  }, rows.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: e.sec + ":" + e.id + ":" + e.ts,
    onClick: () => onLaunch ? onLaunch(e.sec, e) : onNavigate(e.sec),
    className: "nav-item",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 12px",
      borderRadius: 14,
      cursor: "pointer",
      borderBottom: i < rows.length - 1 ? "1px solid #F1F5F9" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      background: e.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 19,
      flexShrink: 0,
      border: `1.5px solid ${e.color}22`
    }
  }, e.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: e.color,
      lineHeight: 1.3,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, e.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "#94A3B8",
      lineHeight: 1.3,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, SEC_LABEL[e.sec] || e.sec, " \xB7 ", e.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#CBD5E1",
      fontWeight: 700,
      flexShrink: 0
    }
  }, timeAgo(e.ts))))));
}

// ── BUSCA GLOBAL ──────────────────────────────────────────────────────────────
const SEARCH_SECS = [["scores", "Score"], ["calculos", "Cálculo"], ["medicacoes", "Medicação"], ["doencas", "Doença"], ["vacinas", "Vacina"]];
function SearchOverlay({
  db,
  onClose,
  onPick
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    return () => clearTimeout(t);
  }, []);
  const needle = norm(q.trim());
  let results = [];
  if (needle) {
    SEARCH_SECS.forEach(([key, label]) => (db[key] || []).forEach(it => {
      if (it.active === false) return;
      const head = norm((it.title || "") + " " + (it.sub || ""));
      if ((head + " " + norm(it.content || "")).includes(needle)) results.push({
        sec: key,
        label,
        item: it,
        strong: head.includes(needle)
      });
    }));
    // título/subtítulo primeiro; casos que batem só no conteúdo por último
    results.sort((a, b) => (b.strong ? 1 : 0) - (a.strong ? 1 : 0));
  }
  const shown = results.slice(0, 12);
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(10,15,40,0.55)",
      zIndex: 1200,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      width: "100%",
      maxWidth: 600,
      borderRadius: "0 0 22px 22px",
      maxHeight: "82vh",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 16px 56px rgba(0,0,0,0.32)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "16px 18px",
      borderBottom: "1px solid #EEF1FF"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      color: "#94A3B8"
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    value: q,
    onChange: e => setQ(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && shown[0]) onPick(shown[0]);else if (e.key === "Escape") onClose();
    },
    placeholder: "Buscar score, c\xE1lculo, medica\xE7\xE3o, doen\xE7a, vacina...",
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: 15,
      color: "#111827",
      fontFamily: "inherit",
      background: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "#F3F4F6",
      border: "none",
      borderRadius: 8,
      padding: "4px 9px",
      fontSize: 11,
      color: "#6B7280",
      fontWeight: 800,
      cursor: "pointer"
    }
  }, "ESC")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      padding: "6px"
    }
  }, !needle && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "26px 20px",
      textAlign: "center",
      color: "#CBD5E1",
      fontSize: 12.5
    }
  }, "Digite para buscar em todas as se\xE7\xF5es."), needle && shown.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "26px 20px",
      textAlign: "center",
      color: "#94A3B8",
      fontSize: 13
    }
  }, "Nada encontrado para \u201C", q, "\u201D."), shown.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.sec + ":" + r.item.id,
    onClick: () => onPick(r),
    className: "nav-item",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "10px 12px",
      borderRadius: 12,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: r.item.bg || "#EEF1FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 17,
      flexShrink: 0
    }
  }, r.item.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: r.item.color || "#111827",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, r.item.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "#94A3B8",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, r.label, " \xB7 ", r.item.sub)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "#CBD5E1",
      flexShrink: 0
    }
  }, "\u21B5"))))));
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
function App() {
  const hashNav = () => {
    try {
      return (location.hash || "").replace(/^#\/?/, "") || "home";
    } catch {
      return "home";
    }
  };
  const [session, setSession] = useState(() => loadSess());
  const [db, setDb] = useState(() => loadDB());
  const [nav, setNav] = useState(hashNav);
  const [sideOpen, setSideOpen] = useState(() => {
    try {
      return window.innerWidth >= 768 && JSON.parse(localStorage.getItem("neocalc_sidebar_v1") || "false");
    } catch {
      return false;
    }
  });
  const [editItem, setEditItem] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [addSection, setAddSection] = useState(null);
  const [showUsers, setShowUsers] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [toast, setToast] = useState(null);
  const [favs, setFavs] = useState(() => loadFavs());
  const [searchOpen, setSearchOpen] = useState(false);
  const [launch, setLaunch] = useState(null); // item aberto via busca/Home/histórico
  const pollRef = useRef();
  const [hist, setHist] = useState(() => loadHist());

  // Rota por hash: back/forward do navegador e refresh preservam a tela
  useEffect(() => {
    const onHash = () => setNav(hashNav());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  // Lembra sidebar aberta/fechada (só desktop)
  useEffect(() => {
    if (window.innerWidth >= 768) {
      try {
        localStorage.setItem("neocalc_sidebar_v1", JSON.stringify(sideOpen));
      } catch {}
    }
  }, [sideOpen]);
  // Atalho "/" abre a busca (quando não se está digitando num campo)
  useEffect(() => {
    const onKey = e => {
      const tag = (e.target && e.target.tagName || "").toLowerCase();
      if (e.key === "/" && tag !== "input" && tag !== "textarea" && tag !== "select") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const toggleFav = useCallback((sec, id) => {
    const k = favKey(sec, id);
    setFavs(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);
  }, []);
  const logHist = useCallback((sec, item) => {
    setHist(prev => {
      const entry = {
        sec,
        id: item.id,
        title: item.title,
        sub: item.sub,
        icon: item.icon,
        color: item.color,
        bg: item.bg,
        ts: Date.now()
      };
      return [entry, ...prev.filter(e => !(e.sec === sec && e.id === item.id))].slice(0, HIST_MAX);
    });
  }, []);
  const clearHist = useCallback(() => setHist([]), []);
  // localStorage sempre espelha o estado já commitado (evita corrida com o updater)
  useEffect(() => {
    saveFavs(favs);
  }, [favs]);
  useEffect(() => {
    saveHist(hist);
  }, [hist]);
  const isGestor = session?.role === "gestor";

  // Detecta mobile (largura < 768px)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  useEffect(() => {
    pollRef.current = setInterval(() => {
      const fresh = loadDB();
      if (fresh.lastUpdated !== db.lastUpdated) setDb(fresh);
    }, 1500);
    return () => clearInterval(pollRef.current);
  }, [db.lastUpdated]);
  const persist = useCallback(d => {
    const u = {
      ...d,
      lastUpdated: Date.now()
    };
    setDb(u);
    saveDB(u);
  }, []);
  const showT = (msg, type = "ok") => {
    setToast({
      msg,
      type
    });
    setTimeout(() => setToast(null), 2500);
  };
  const saveItem = (sec, item) => {
    const list = db[sec] || [];
    const upd = list.find(x => x.id === item.id) ? list.map(x => x.id === item.id ? {
      ...x,
      ...item
    } : x) : [...list, {
      ...item,
      id: Date.now()
    }];
    persist({
      ...db,
      [sec]: upd
    });
    setEditItem(null);
    setEditSection(null);
    setAddSection(null);
    showT("Salvo com sucesso!");
  };
  const delItem = (sec, id) => {
    persist({
      ...db,
      [sec]: (db[sec] || []).filter(x => x.id !== id)
    });
    showT("Item removido.", "err");
  };
  if (!session) return /*#__PURE__*/React.createElement(Login, {
    onLogin: s => {
      setSession(s);
    }
  });
  const tabs = db.tabs || DEFAULT_DB.tabs;

  // Navegar (grava no hash) e fechar sidebar no mobile
  const navigate = id => {
    setNav(id);
    try {
      if (hashNav() !== id) location.hash = "#/" + id;
    } catch {}
    if (isMobile) setSideOpen(false);
  };
  // Abrir uma calculadora de qualquer lugar (busca, Home, histórico)
  const launchItem = (sec, item) => {
    if (sec) navigate(sec);
    if (sec && item) logHist(sec, item);
    setLaunch(item);
    setSearchOpen(false);
  };
  const renderPage = () => {
    if (nav === "home") return /*#__PURE__*/React.createElement(HomePage, {
      db: db,
      isGestor: isGestor,
      hist: hist,
      favs: favs,
      onEdit: (s, it) => {
        setEditSection(s);
        setEditItem(it);
      },
      onDelete: delItem,
      onAdd: s => setAddSection(s),
      onNavigate: navigate,
      onLaunch: launchItem
    });
    if (nav === "favoritos") return /*#__PURE__*/React.createElement(FavoritesPage, {
      db: db,
      favs: favs,
      isGestor: isGestor,
      onToggleFav: toggleFav,
      onOpenItem: logHist,
      onEdit: (s, it) => {
        setEditSection(s);
        setEditItem(it);
      },
      onDelete: delItem
    });
    if (nav === "historico") return /*#__PURE__*/React.createElement(HistoryPage, {
      hist: hist,
      db: db,
      onClear: clearHist,
      onNavigate: navigate,
      onLaunch: launchItem
    });
    if (nav === "scores") return /*#__PURE__*/React.createElement(FullSection, {
      title: "Scores",
      sub: "Avalia\xE7\xF5es e escalas neonatais",
      icon: "\uD83D\uDCCB",
      items: db.scores,
      section: "scores",
      isGestor: isGestor,
      favs: favs,
      onToggleFav: toggleFav,
      onOpenItem: logHist,
      onEdit: it => {
        setEditSection("scores");
        setEditItem(it);
      },
      onDelete: id => delItem("scores", id),
      onAdd: () => setAddSection("scores"),
      cols: 3
    });
    if (nav === "calculos") return /*#__PURE__*/React.createElement(FullSection, {
      title: "C\xE1lculos",
      sub: "Ferramentas de c\xE1lculo",
      icon: "\uD83E\uDDEE",
      items: db.calculos,
      section: "calculos",
      isGestor: isGestor,
      favs: favs,
      onToggleFav: toggleFav,
      onOpenItem: logHist,
      onEdit: it => {
        setEditSection("calculos");
        setEditItem(it);
      },
      onDelete: id => delItem("calculos", id),
      onAdd: () => setAddSection("calculos"),
      cols: 3
    });
    if (nav === "grafico") return /*#__PURE__*/React.createElement("div", {
      style: {
        animation: "fadeIn 0.3s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 26
      }
    }, "\uD83D\uDCC8"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        fontWeight: 800,
        color: "#111827"
      }
    }, "Gr\xE1fico de Crescimento"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#9CA3AF"
      }
    }, "Curvas OMS"))), /*#__PURE__*/React.createElement(Card, {
      title: "Gr\xE1fico de Crescimento",
      sub: "Curvas de crescimento (OMS)",
      icon: "\uD83D\uDCC8"
    }, /*#__PURE__*/React.createElement(GrowthChartSVG, null)));
    if (nav === "medicacoes") return /*#__PURE__*/React.createElement(FullSection, {
      title: "Medica\xE7\xF5es",
      sub: "Calculadoras de medica\xE7\xF5es",
      icon: "\uD83D\uDC8A",
      items: db.medicacoes,
      section: "medicacoes",
      isGestor: isGestor,
      favs: favs,
      onToggleFav: toggleFav,
      onOpenItem: logHist,
      onEdit: it => {
        setEditSection("medicacoes");
        setEditItem(it);
      },
      onDelete: id => delItem("medicacoes", id),
      onAdd: () => setAddSection("medicacoes"),
      cols: 2
    });
    if (nav === "doencas") return /*#__PURE__*/React.createElement(FullSection, {
      title: "Doen\xE7as Neonatais",
      sub: "Protocolos e orienta\xE7\xF5es",
      icon: "\uD83E\uDDEC",
      items: db.doencas,
      section: "doencas",
      isGestor: isGestor,
      favs: favs,
      onToggleFav: toggleFav,
      onOpenItem: logHist,
      onEdit: it => {
        setEditSection("doencas");
        setEditItem(it);
      },
      onDelete: id => delItem("doencas", id),
      onAdd: () => setAddSection("doencas"),
      cols: 4
    });
    if (nav === "vacinas") return /*#__PURE__*/React.createElement(FullSection, {
      title: "Vacinas",
      sub: "Calend\xE1rio e dose",
      icon: "\uD83D\uDC89",
      items: db.vacinas,
      section: "vacinas",
      isGestor: isGestor,
      favs: favs,
      onToggleFav: toggleFav,
      onOpenItem: logHist,
      onEdit: it => {
        setEditSection("vacinas");
        setEditItem(it);
      },
      onDelete: id => delItem("vacinas", id),
      onAdd: () => setAddSection("vacinas"),
      cols: 2
    });
    const curTab = tabs.find(t => t.id === nav) || {
      icon: "📌",
      label: "Seção"
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        animation: "fadeIn 0.3s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 26
      }
    }, curTab.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        fontWeight: 800,
        color: "#111827"
      }
    }, curTab.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#9CA3AF"
      }
    }, "Se\xE7\xE3o personalizada"))), /*#__PURE__*/React.createElement(Card, {
      title: "Tabelas",
      sub: "Tabelas e refer\xEAncias desta se\xE7\xE3o",
      icon: "\uD83D\uDCCA"
    }, /*#__PURE__*/React.createElement(TablesSection, {
      tables: db.tabelas || [],
      isGestor: isGestor,
      onUpdate: t => {
        persist({
          ...db,
          tabelas: t
        });
        showT("Tabelas atualizadas!");
      }
    })), isGestor && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        padding: 14,
        background: "#EEF1FF",
        borderRadius: 14,
        border: "1.5px solid #4F6EF7",
        fontSize: 13,
        color: "#4F6EF7",
        fontWeight: 600
      }
    }, "\uD83D\uDCA1 Use o painel do gestor para adicionar itens a qualquer se\xE7\xE3o."));
  };

  // No mobile: sidebar é drawer overlay por cima do conteúdo
  // No desktop: sidebar empurra o conteúdo (layout flex)
  const sidebarW = isMobile ? 260 : sideOpen ? 222 : 60;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "#F0F4FF",
      fontFamily: "'Nunito','Segoe UI',sans-serif",
      position: "relative"
    }
  }, toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type
  }), isMobile && sideOpen && /*#__PURE__*/React.createElement("div", {
    onClick: () => setSideOpen(false),
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 40,
      transition: "opacity 0.25s"
    }
  }), (!isMobile || sideOpen) && /*#__PURE__*/React.createElement("aside", {
    style: {
      width: isMobile ? 270 : sidebarW,
      background: "linear-gradient(160deg,#1a2550 0%,#0f1a3d 60%,#0a1128 100%)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      zIndex: isMobile ? 50 : 10,
      boxShadow: "4px 0 32px rgba(10,20,70,0.5)",
      position: isMobile ? "fixed" : "relative",
      top: isMobile ? 0 : "auto",
      left: isMobile ? 0 : "auto",
      height: isMobile ? "100vh" : "auto",
      overflow: "hidden",
      borderRight: "1px solid rgba(79,110,247,0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "calc(16px + env(safe-area-inset-top, 0px)) 14px 16px",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 13,
      background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 21,
      flexShrink: 0,
      boxShadow: "0 4px 14px rgba(79,110,247,0.4)"
    }
  }, "\uD83D\uDC76"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "white",
      fontWeight: 900,
      fontSize: 15,
      lineHeight: 1.1,
      letterSpacing: -0.3
    }
  }, "NeoCalc"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "rgba(255,255,255,0.35)",
      fontSize: 9.5,
      marginTop: 1
    }
  }, "C\xE1lculos e Scores")), isMobile && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSideOpen(false),
    style: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 9,
      width: 30,
      height: 30,
      color: "rgba(255,255,255,0.6)",
      fontSize: 16,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, "\u2715"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      padding: "10px 10px",
      overflowY: "auto"
    }
  }, tabs.filter(t => !PLACEHOLDER_TABS.includes(t.id)).map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    onClick: () => navigate(t.id),
    className: "nav-item",
    title: t.label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 13,
      cursor: "pointer",
      marginBottom: 3,
      background: nav === t.id ? "linear-gradient(135deg,#4F6EF7,#7C3AED)" : "transparent",
      color: nav === t.id ? "white" : "rgba(255,255,255,0.58)",
      fontWeight: nav === t.id ? 700 : 500,
      fontSize: 13,
      boxShadow: nav === t.id ? "0 4px 14px rgba(79,110,247,0.35)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      flexShrink: 0,
      filter: nav === t.id ? "none" : "grayscale(0.3)"
    }
  }, t.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, t.label))), isGestor && /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      setShowTabs(true);
      if (isMobile) setSideOpen(false);
    },
    className: "nav-item",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 12px",
      borderRadius: 12,
      cursor: "pointer",
      marginTop: 8,
      border: "1px dashed rgba(255,255,255,0.18)",
      color: "rgba(255,255,255,0.38)",
      fontSize: 11,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, "\u2699\uFE0F"), /*#__PURE__*/React.createElement("span", null, "Gerenciar Abas"))), isGestor && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 11px",
      borderTop: "1px solid rgba(255,255,255,0.07)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(79,110,247,0.18)",
      borderRadius: 12,
      padding: "9px 11px",
      border: "1px solid rgba(79,110,247,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "rgba(255,255,255,0.8)",
      fontSize: 11,
      fontWeight: 700,
      marginBottom: 1
    }
  }, "\uD83D\uDC68\u200D\u2695\uFE0F Modo Gestor"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 9.5
    }
  }, "Dr. Rodrigo Cahuana")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      // padding-top extra pela área do notch/status bar em PWA instalado (iOS)
      padding: "calc(10px + env(safe-area-inset-top, 0px)) calc(16px + env(safe-area-inset-right, 0px)) 10px calc(16px + env(safe-area-inset-left, 0px))",
      display: "flex",
      alignItems: "center",
      gap: 10,
      borderBottom: "1px solid rgba(79,110,247,0.1)",
      flexShrink: 0,
      boxShadow: "0 4px 24px rgba(79,110,247,0.08)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSideOpen(v => !v),
    "aria-label": "Menu",
    style: {
      background: "none",
      border: "none",
      fontSize: 22,
      color: "#4F6EF7",
      padding: "8px 10px",
      margin: "-4px 0",
      borderRadius: 9,
      lineHeight: 1,
      flexShrink: 0,
      cursor: "pointer"
    }
  }, "\u2630"), isMobile && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontWeight: 800,
      fontSize: 15,
      color: "#111827",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, tabs.find(t => t.id === nav)?.label || "NeoCalc"), !isMobile && /*#__PURE__*/React.createElement("div", {
    onClick: () => setSearchOpen(true),
    title: "Buscar  ( / )",
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#F3F4F6",
      borderRadius: 12,
      padding: "7px 13px",
      maxWidth: 380,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9CA3AF",
      fontSize: 13
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#9CA3AF",
      flex: 1
    }
  }, "Buscar c\xE1lculo ou score..."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#CBD5E1",
      fontWeight: 800,
      border: "1px solid #E5E7EB",
      borderRadius: 5,
      padding: "1px 5px"
    }
  }, "/")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "linear-gradient(135deg,#DCFCE7,#BBF7D0)",
      borderRadius: 20,
      padding: "5px 11px",
      border: "1px solid #86EFAC",
      flexShrink: 0,
      boxShadow: "0 2px 8px rgba(34,197,94,0.2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "live-dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      fontWeight: 800,
      color: "#15803D",
      letterSpacing: 0.5
    }
  }, "AO VIVO")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexShrink: 0
    }
  }, isGestor && /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowPanel(v => !v),
    style: {
      padding: "6px 10px",
      borderRadius: 9,
      border: "none",
      background: showPanel ? "#1E2D6E" : "linear-gradient(90deg,#4F6EF7,#7C9EFF)",
      color: "white",
      fontWeight: 800,
      fontSize: 11,
      boxShadow: "0 2px 10px rgba(79,110,247,0.3)"
    }
  }, "\u2699\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: "linear-gradient(135deg,#4F6EF7,#EC4899)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      flexShrink: 0
    }
  }, session.avatar || "👤"), !isMobile && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#111827"
    }
  }, session.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "#9CA3AF"
    }
  }, isGestor ? "Gestor" : "UTI Neonatal")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      clearSess();
      setSession(null);
    },
    style: {
      padding: "4px 8px",
      borderRadius: 8,
      border: "1.5px solid #FEE2E2",
      background: "#FEF2F2",
      color: "#EF4444",
      fontSize: 10,
      fontWeight: 700,
      flexShrink: 0
    }
  }, "Sair"))), showPanel && isGestor && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(90deg,#1E2D6E,#2D4299)",
      padding: "8px 14px",
      display: "flex",
      gap: 5,
      alignItems: "center",
      flexWrap: "wrap",
      borderBottom: "1px solid rgba(255,255,255,0.1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.65)",
      fontSize: 10,
      fontWeight: 700,
      marginRight: 2
    }
  }, "\u2699\uFE0F"), [["👥 Usuários", () => setShowUsers(true)], ["🗂️ Abas", () => setShowTabs(true)], ["📋 +Score", () => setAddSection("scores")], ["🧮 +Cálculo", () => setAddSection("calculos")], ["💊 +Medicação", () => setAddSection("medicacoes")], ["🧬 +Doença", () => setAddSection("doencas")], ["💉 +Vacina", () => setAddSection("vacinas")]].map(([l, fn], i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: fn,
    style: {
      padding: "4px 9px",
      borderRadius: 7,
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(255,255,255,0.08)",
      color: "rgba(255,255,255,0.85)",
      fontSize: 10,
      fontWeight: 700,
      cursor: "pointer"
    },
    onMouseEnter: e => e.currentTarget.style.background = "rgba(255,255,255,0.2)",
    onMouseLeave: e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"
  }, l))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: isMobile ? "14px 12px calc(84px + env(safe-area-inset-bottom, 0px))" : "18px 22px 24px",
      background: "#F0F4FF"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-enter",
    key: nav
  }, renderPage())), isMobile && /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: "calc(60px + env(safe-area-inset-bottom, 0px))",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(79,110,247,0.12)",
      display: "flex",
      zIndex: 45,
      boxShadow: "0 -4px 20px rgba(79,110,247,0.08)"
    }
  }, [{
    id: "home",
    icon: "🏠",
    label: "Home"
  }, {
    id: "scores",
    icon: "📋",
    label: "Scores"
  }, {
    id: "calculos",
    icon: "🧮",
    label: "Cálculos"
  }, {
    id: "__search",
    icon: "🔍",
    label: "Buscar"
  }, {
    id: "favoritos",
    icon: "⭐",
    label: "Favoritos"
  }].map(t => {
    const active = t.id !== "__search" && nav === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => t.id === "__search" ? setSearchOpen(true) : navigate(t.id),
      style: {
        flex: 1,
        border: "none",
        background: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        cursor: "pointer",
        color: active ? "#4F6EF7" : "#94A3B8",
        paddingTop: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 19,
        filter: active ? "none" : "grayscale(0.4)"
      }
    }, t.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: active ? 800 : 600
      }
    }, t.label));
  }))), (editItem || addSection) && /*#__PURE__*/React.createElement(ItemEditor, {
    item: editItem,
    section: editSection || addSection,
    onSave: form => saveItem(editSection || addSection, form),
    onClose: () => {
      setEditItem(null);
      setEditSection(null);
      setAddSection(null);
    }
  }), showUsers && /*#__PURE__*/React.createElement(UserManager, {
    onClose: () => setShowUsers(false)
  }), showTabs && /*#__PURE__*/React.createElement(TabManager, {
    tabs: db.tabs || DEFAULT_DB.tabs,
    onSave: t => {
      persist({
        ...db,
        tabs: t
      });
      setShowTabs(false);
      showT("Abas atualizadas!");
    },
    onClose: () => setShowTabs(false)
  }), searchOpen && /*#__PURE__*/React.createElement(SearchOverlay, {
    db: db,
    onClose: () => setSearchOpen(false),
    onPick: r => launchItem(r.sec, r.item)
  }), launch && /*#__PURE__*/React.createElement(CalcHost, {
    item: launch,
    onClose: () => setLaunch(null)
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render( /*#__PURE__*/React.createElement(App, null));
