"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type Lang = "en" | "es";

const STORAGE_KEY = "lang";
const COOKIE_KEY = "lang";

const DICT = {
  en: {
    nav: {
      philosophy: "Philosophy",
      building: "Building",
      notes: "Notes",
      focus: "Focus",
      contact: "Contact",
      cv: "CV",
    },
    hero: {
      role: "Product Builder",
      headline: "Building technology people actually adopt.",
      subheadline:
        "I build products by understanding how people work first, then designing technology that naturally fits into their daily lives.",
      ctaWork: "View My Work",
      ctaNotes: "Read My Notes",
    },
    philosophy: {
      headline:
        "Technology should adapt to people\u2014not the other way around.",
      paragraphs: [
        "The best products are not the ones with the most features.",
        "They are the ones people naturally adopt.",
      ],
      lead: "Every product I build starts the same way.",
      principles: ["Listen.", "Understand.", "Simplify.", "Build.", "Iterate."],
    },
    building: {
      eyebrow: "Building",
      title: "Products shaped by real work.",
      labels: {
        problem: "Problem",
        approach: "Approach",
        outcome: "Outcome",
      },
      cases: [
        {
          name: "HUMI",
          subtitle: "Academy operations platform",
          status: "Live in production",
          context: "Live in production",
          problem:
            "Sports organizations deserved software designed around their reality\u2014not generic management systems.",
          approach:
            "Designed an operating system around how academies already run: cohorts, staffing, events, and family communication\u2014with simplicity, onboarding, and adoption as the constraints.",
          outcome:
            "Fifteen years of academy operations now run on a live product shipped in 2025. Same community. Infrastructure people actually use.",
          url: "https://humisite.vercel.app/",
          urlLabel: "Visit site",
        },
        {
          name: "Proof",
          subtitle: "Wine production traceability",
          status: "In development",
          context: "In development",
          problem:
            "Small wineries in Baja California still track production lots across spreadsheets, notebooks, and memory. Traceability breaks between stages.",
          approach:
            "Start with how winemakers already work. Model the full lot pipeline, then let them manage it in plain language instead of learning a new form maze.",
          outcome:
            "In active development with producers in the loop. The measure of success is trust on a busy harvest day\u2014not a feature demo.",
          url: "",
          urlLabel: "",
        },
        {
          name: "SiVeCa",
          subtitle: "Monitoring and compliance workflows",
          status: "",
          context: "In use",
          problem:
            "Monitoring and compliance decisions lived in chats, spreadsheets, and individual memory\u2014with no shared, auditable path.",
          approach:
            "Translate regulatory requirements into product logic people can follow. Give operators and reviewers one clear path from signal to documented response.",
          outcome:
            "A shared, traceable workflow replaced the workarounds. The product holds because the path is clearer than what came before.",
          url: "https://www.siveca.com.mx/",
          urlLabel: "Visit site",
        },
      ],
    },
    notes: {
      eyebrow: "Notes",
      title: "Field notes on product and people.",
      intro:
        "Not a blog. Notes from building\u2014problems, decisions, and what the work taught me.",
      items: [
        "Why I Build",
        "The Hospital That Taught Me More About Product",
        "15 Kilometers of Product Thinking",
        "What Winemakers Taught Me About AI",
      ],
      status: "Notes in progress.",
    },
    focus: {
      eyebrow: "Current focus",
      title: "What I\u2019m exploring now.",
      topics: [
        "AI Product Development",
        "Product Adoption",
        "Systems Thinking",
        "Agentic Systems",
        "Human-centered AI",
      ],
    },
    footer: {
      prompt: "Interested in building technology people actually adopt?",
      cta: "Let\u2019s talk.",
      location: "Mexico",
    },
    cv: {
      title: "CV",
      role: "Product Designer · Product strategy & coordination",
      location: "Mexico (Remote, GMT-7)",
      languages: "Spanish (Native), English (Fluent)",
      actions: {
        download: "Download PDF",
        linkedin: "LinkedIn",
        email: "Email",
        website: "Website",
      },
      sections: {
        summary: "Summary",
        skills: "Skills",
        aiProducts: "AI Products — Built Independently",
        experience: "Experience",
        projects: "Projects",
        education: "Education",
        focus: "Focus areas",
      },
      summary:
        "Product designer (B.S. Digital Design Engineering) working across UX/UI, product structure, and coordination with engineering, clients, and field teams. Recent work spans a web product for monitoring and compliance-style workflows (SiVeCa), infrastructure-related delivery with Cisco, startup product and ops (Trato Hecho), venture-ecosystem support (La Ruta VCC), and live programmes run with the same discipline as shipping software. For more than fifteen years I have also led HUMI, a community academy and operational platform—cohorts, events, staffing, and local work opportunities for young coaches. Figma-led design, clear documentation, and pragmatic use of AI for research and drafts—never as a substitute for judgment.",
      skills: [
        "Product & UX/UI design",
        "Cross-functional coordination (PM, eng, clients, field)",
        "Workflow-heavy interfaces and service patterns",
        "User research and facilitation",
        "Data visualization for operational decisions",
        "Event logistics, run-of-show, participant experience",
        "Prototyping (Figma)",
        "Specs, documentation, content",
        "SEO and product communication",
        "AI-assisted research and drafting",
      ],
      experience: [
        {
          title: "Field & Product Experience — Cisco",
          period: "2023 – Present",
          bullets: [
            "Contributed to technology and infrastructure projects for private and federal clients, supporting real-world system integration into digital environments",
            "Conducted on-site operational and safety analysis, connecting real-world systems with digital product workflows",
            "Supported product design processes by translating technical requirements into user-centered solutions",
            "Managed client communication and follow-up to align product delivery with stakeholder needs",
            "Designed and shipped the SiVeCa product site and core product surfaces as part of broader client delivery work",
          ],
        },
        {
          title: "Product & Operations — Trato Hecho (Startup)",
          period: "2020 – 2021",
          bullets: [
            "Contributed to product development strategy and workflow definition in an early-stage startup",
            "Designed website and digital content aligned with UX and brand positioning",
            "Created UI concepts and prototypes using Figma",
            "Supported frontend prototyping and iterative product improvements",
            "Developed content strategy for social media and product communication",
          ],
        },
        {
          title: "Operations & Product Support — La Ruta VCC",
          period: "",
          bullets: [
            "Supported startup scouting and onboarding processes within a venture ecosystem",
            "Debugged mobile and desktop user flows to improve usability and performance",
            "Managed client onboarding and data integration into digital platforms",
            "Led client acquisition and guided users through product adoption",
            "Bridged communication between users and technical teams",
          ],
        },
      ],
      aiProducts: [
        {
          title: "Proof — AI-integrated wine production traceability platform",
          period: "2025 – Present",
          status: "In active development",
          url: "",
          urlLabel: "",
          bullets: [
            "Designed and built a lot-tracking system covering the full winemaking pipeline (harvest → analysis → fermentation → malolactic → aging → bottling), with an LLM-powered conversational interface for managing production lots via natural language (tool/function calling).",
            "Stack: Supabase (PostgreSQL), REST APIs, LLM API integration, GitHub. Sole designer and builder — data model, workflows, prompts and UX.",
          ],
        },
        {
          title: "Taekwondo Academy Management & Logistics Platform (HUMI)",
          period: "2025 – Present",
          status: "Live in production",
          url: "https://humisite.vercel.app/",
          urlLabel: "Visit site",
          bullets: [
            "Built and deployed a management system for taekwondo academies and inter-academy logistics — currently in daily use by my affiliated organization; roadmap to expand into other activity verticals.",
            "Owned the full cycle: problem discovery with real users, data model, AI-assisted workflows, frontend, deployment and iteration in production.",
          ],
        },
      ],
      projects: [
        {
          title: "SiVeCa — Web product for monitoring & decision workflows",
          bullets: [
            "Technical liaison between CEO and IT across product and delivery decisions",
            "Repository auditing and a parallel technical workstream alongside client delivery",
            "Translated NOM regulatory requirements into product logic and review-heavy flows",
            "Designed and built the company landing site end to end (https://www.siveca.com.mx/)",
            "Structured inputs and outputs so operators and reviewers share a trace from reading to documented action",
            "Owned enough SEO and content for industrial and program audiences to find the product",
          ],
        },
      ],
      education: [
        {
          title: "She Codes",
          detail:
            "Front-End Development Program · HTML · CSS · JS · APIs · GitHub · Bootstrap",
          period: "2021",
        },
        {
          title: "CETYS Universidad",
          detail: "B.S. Digital Design Engineering",
          period: "2011 – 2016",
        },
      ],
      focus: [
        "Product development & UX systems",
        "Product operations and delivery coordination",
        "Startup execution and venture-adjacent programs",
        "Live events as operational experience design",
        "Long-run community platforms (HUMI)",
        "Data-informed interfaces without chart theatre",
      ],
    },
    language: {
      en: "EN",
      es: "ES",
      switchLabel: "Language",
    },
  },
  es: {
    nav: {
      philosophy: "Filosof\u00eda",
      building: "Construyendo",
      notes: "Notas",
      focus: "Enfoque",
      contact: "Contacto",
      cv: "CV",
    },
    hero: {
      role: "Product Builder",
      headline: "Construyendo tecnolog\u00eda que la gente realmente adopta.",
      subheadline:
        "Construyo productos entendiendo primero c\u00f3mo trabaja la gente, y despu\u00e9s dise\u00f1ando tecnolog\u00eda que encaja de forma natural en su d\u00eda a d\u00eda.",
      ctaWork: "Ver mi trabajo",
      ctaNotes: "Leer mis notas",
    },
    philosophy: {
      headline:
        "La tecnolog\u00eda deber\u00eda adaptarse a las personas\u2014no al rev\u00e9s.",
      paragraphs: [
        "Los mejores productos no son los que tienen m\u00e1s funciones.",
        "Son los que la gente adopta de forma natural.",
      ],
      lead: "Cada producto que construyo empieza igual.",
      principles: [
        "Escuchar.",
        "Entender.",
        "Simplificar.",
        "Construir.",
        "Iterar.",
      ],
    },
    building: {
      eyebrow: "Construyendo",
      title: "Productos formados por trabajo real.",
      labels: {
        problem: "Problema",
        approach: "Enfoque",
        outcome: "Resultado",
      },
      cases: [
        {
          name: "HUMI",
          subtitle: "Plataforma de operaciones para academias",
          status: "En producci\u00f3n",
          context: "En producci\u00f3n",
          problem:
            "Las organizaciones deportivas merec\u00edan software dise\u00f1ado alrededor de su realidad\u2014no sistemas gen\u00e9ricos de gesti\u00f3n.",
          approach:
            "Dise\u00f1\u00e9 un sistema operativo alrededor de c\u00f3mo ya corren las academias: cohortes, staff, eventos y comunicaci\u00f3n con familias\u2014con simplicidad, onboarding y adopci\u00f3n como restricciones.",
          outcome:
            "Quince a\u00f1os de operaci\u00f3n de academia ahora corren sobre un producto en vivo entregado en 2025. Misma comunidad. Infraestructura que s\u00ed usan.",
          url: "https://humisite.vercel.app/",
          urlLabel: "Visitar sitio",
        },
        {
          name: "Proof",
          subtitle: "Trazabilidad de producci\u00f3n vin\u00edcola",
          status: "En desarrollo",
          context: "En desarrollo",
          problem:
            "Vin\u00edcolas peque\u00f1as en Baja California a\u00fan rastrean lotes en hojas de c\u00e1lculo, libretas y memoria. La trazabilidad se rompe entre etapas.",
          approach:
            "Empezar por c\u00f3mo ya trabajan los en\u00f3logos. Modelar todo el pipeline del lote y permitir gestionarlo en lenguaje cotidiano, sin aprender un laberinto de formularios.",
          outcome:
            "En desarrollo activo con productores en el ciclo. La medida de \u00e9xito es la confianza en un d\u00eda de cosecha ajetreado\u2014no una demo de funciones.",
          url: "",
          urlLabel: "",
        },
        {
          name: "SiVeCa",
          subtitle: "Flujos de monitoreo y cumplimiento",
          status: "",
          context: "En uso",
          problem:
            "Las decisiones de monitoreo y cumplimiento viv\u00edan en chats, hojas de c\u00e1lculo y memoria individual\u2014sin un camino compartido y auditable.",
          approach:
            "Traducir requisitos regulatorios a l\u00f3gica de producto que la gente pueda seguir. Dar a operadores y revisores un camino claro de la se\u00f1al a la respuesta documentada.",
          outcome:
            "Un flujo compartido y trazable reemplaz\u00f3 los atajos. El producto se sostiene porque el camino es m\u00e1s claro que lo anterior.",
          url: "https://www.siveca.com.mx/",
          urlLabel: "Visitar sitio",
        },
      ],
    },
    notes: {
      eyebrow: "Notas",
      title: "Notas de campo sobre producto y personas.",
      intro:
        "No es un blog. Notas desde la construcci\u00f3n\u2014problemas, decisiones y lo que ense\u00f1\u00f3 el trabajo.",
      items: [
        "Por qu\u00e9 construyo",
        "El hospital que me ense\u00f1\u00f3 m\u00e1s sobre producto",
        "15 kil\u00f3metros de pensamiento de producto",
        "Lo que los en\u00f3logos me ense\u00f1aron sobre IA",
      ],
      status: "Notas en progreso.",
    },
    focus: {
      eyebrow: "Enfoque actual",
      title: "Lo que exploro ahora.",
      topics: [
        "Desarrollo de productos con IA",
        "Adopci\u00f3n de producto",
        "Pensamiento de sistemas",
        "Sistemas ag\u00e9nticos",
        "IA centrada en las personas",
      ],
    },
    footer: {
      prompt: "\u00bfTe interesa construir tecnolog\u00eda que la gente realmente adopte?",
      cta: "Hablemos.",
      location: "M\u00e9xico",
    },
    cv: {
      title: "CV",
      role: "Product Designer · Estrategia de producto y coordinación",
      location: "México (Remoto, GMT-7)",
      languages: "Español (Nativo), Inglés (Fluido)",
      actions: {
        download: "Descargar PDF",
        linkedin: "LinkedIn",
        email: "Email",
        website: "Website",
      },
      sections: {
        summary: "Resumen",
        skills: "Habilidades",
        aiProducts: "Productos de IA — Construidos de forma independiente",
        experience: "Experiencia",
        projects: "Proyectos",
        education: "Educación",
        focus: "Áreas de enfoque",
      },
      summary:
        "Diseñadora de producto (Lic. Digital Design Engineering) en UX/UI, estructura de producto y coordinación con ingeniería, clientes y equipos de campo. Trabajo reciente: producto web para monitoreo y flujos tipo cumplimiento (SiVeCa), entrega ligada a infraestructura con Cisco, producto y operaciones en startup (Trato Hecho), soporte en ecosistema venture (La Ruta VCC) y programas presenciales con la misma disciplina que un release de software. Desde hace más de quince años también lidero HUMI, una academia comunitaria y plataforma operativa—cohortes, eventos, staff y oportunidades locales de trabajo para entrenadores jóvenes. Diseño en Figma, documentación clara y uso pragmático de IA para investigación y borradores—nunca como sustituto del criterio.",
      skills: [
        "Diseño de producto y UX/UI",
        "Coordinación cross-funcional (PM, ingeniería, clientes, campo)",
        "Interfaces con flujos pesados y patrones de servicio",
        "Investigación de usuarios y facilitación",
        "Visualización de datos para decisiones operativas",
        "Logística de eventos, guión del día, experiencia de participantes",
        "Prototipado (Figma)",
        "Especificaciones, documentación, contenido",
        "SEO y comunicación de producto",
        "Investigación y borradores asistidos por IA",
      ],
      experience: [
        {
          title: "Experiencia de campo y producto — Cisco",
          period: "2023 – Presente",
          bullets: [
            "Contribuí en proyectos de tecnología e infraestructura para clientes privados y federales, apoyando la integración de sistemas reales en entornos digitales",
            "Realicé análisis operativos y de seguridad en sitio, conectando sistemas del mundo real con flujos de producto digital",
            "Apoyé procesos de diseño de producto traduciendo requerimientos técnicos en soluciones centradas en el usuario",
            "Gestioné comunicación y seguimiento con clientes para alinear la entrega con necesidades de stakeholders",
            "Diseñé y publiqué el sitio del producto SiVeCa y superficies centrales como parte de la entrega a clientes",
          ],
        },
        {
          title: "Producto y operaciones — Trato Hecho (Startup)",
          period: "2020 – 2021",
          bullets: [
            "Contribuí a la estrategia de desarrollo de producto y definición de flujos en una startup early-stage",
            "Diseñé sitio web y contenido digital alineado a UX y posicionamiento de marca",
            "Creé conceptos UI y prototipos en Figma",
            "Apoyé prototipado frontend e iteraciones de mejora de producto",
            "Desarrollé estrategia de contenido para redes sociales y comunicación de producto",
          ],
        },
        {
          title: "Operaciones y soporte de producto — La Ruta VCC",
          period: "",
          bullets: [
            "Apoyé procesos de scouting y onboarding de startups dentro de un ecosistema de venture",
            "Depuré flujos móviles y desktop para mejorar usabilidad y performance",
            "Gestioné onboarding y la integración de datos en plataformas digitales",
            "Lideré adquisición de clientes y guié a usuarios durante la adopción del producto",
            "Conecté comunicación entre usuarios y equipos técnicos",
          ],
        },
      ],
      aiProducts: [
        {
          title: "Proof — Plataforma de trazabilidad de producción vinícola integrada con IA",
          period: "2025 – Presente",
          status: "En desarrollo activo",
          url: "",
          urlLabel: "",
          bullets: [
            "Diseñé y construí un sistema de seguimiento de lotes que cubre todo el pipeline de elaboración (cosecha → análisis → fermentación → maloláctica → crianza → embotellado), con una interfaz conversacional LLM para gestionar lotes en lenguaje natural (tool/function calling).",
            "Stack: Supabase (PostgreSQL), REST APIs, integración LLM API, GitHub. Diseñadora y constructora única — modelo de datos, flujos, prompts y UX.",
          ],
        },
        {
          title: "Taekwondo Academy Management & Logistics Platform (HUMI)",
          period: "2025 – Presente",
          status: "En producción",
          url: "https://humisite.vercel.app/",
          urlLabel: "Visitar sitio",
          bullets: [
            "Construí y desplegué un sistema de gestión para academias de taekwondo y logística inter-academia — en uso diario por mi organización afiliada; roadmap para expandir a otros verticales de actividad.",
            "Dueña del ciclo completo: discovery con usuarios reales, modelo de datos, flujos asistidos por IA, frontend, despliegue e iteración en producción.",
          ],
        },
      ],
      projects: [
        {
          title: "SiVeCa — Producto web para monitoreo y flujos de decisión",
          bullets: [
            "Enlace técnico entre CEO e IT en decisiones de producto y entrega",
            "Auditoría de repositorios y un workstream técnico paralelo junto a la entrega a clientes",
            "Traduje requisitos regulatorios NOM a lógica de producto y flujos con mucha revisión",
            "Diseñé y construí el sitio landing de la empresa de punta a punta (https://www.siveca.com.mx/)",
            "Organicé entradas y salidas para que operadores y revisores compartan una traza de lectura a acción documentada",
            "Lideré SEO y contenido suficientes para que audiencias industriales y de programa encontraran el producto",
          ],
        },
      ],
      education: [
        {
          title: "She Codes",
          detail:
            "Programa de desarrollo front-end · HTML · CSS · JS · APIs · GitHub · Bootstrap",
          period: "2021",
        },
        {
          title: "CETYS Universidad",
          detail: "Lic. Digital Design Engineering",
          period: "2011 – 2016",
        },
      ],
      focus: [
        "Desarrollo de producto y sistemas de UX",
        "Operaciones de producto y coordinación de entrega",
        "Ejecución en startup y programas venture-adjacentes",
        "Eventos presenciales como diseño operativo de experiencia",
        "Plataformas comunitarias de largo plazo (HUMI)",
        "Interfaces con datos sin teatro de gráficos",
      ],
    },
    language: {
      en: "EN",
      es: "ES",
      switchLabel: "Idioma",
    },
  },
} as const;

type Dictionary = (typeof DICT)[Lang];

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dict: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLang(value: string | undefined): value is Lang {
  return value === "en" || value === "es";
}

function persistLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {}

  try {
    document.cookie = `${COOKIE_KEY}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
  } catch {}

  try {
    document.documentElement.lang = lang;
  } catch {}
}

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const [lang, _setLang] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    _setLang(next);
    persistLang(next);
  }, []);

  const dict = useMemo(() => DICT[lang], [lang]);
  const value = useMemo(() => ({ lang, setLang, dict }), [lang, setLang, dict]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

export function useT() {
  const { dict } = useI18n();
  return dict;
}

export function detectInitialLang(fallback: Lang = "en") {
  if (typeof window === "undefined") return fallback;

  try {
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    const raw = fromStorage ?? undefined;
    if (isLang(raw)) return raw;
  } catch {}

  const navLang = window.navigator.language?.toLowerCase();
  if (navLang?.startsWith("es")) return "es";
  if (navLang?.startsWith("en")) return "en";
  return fallback;
}

