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
      siveca: "SiVeCa",
      systems: "Systems",
      approach: "Approach",
      about: "About",
      contact: "Contact",
      cv: "CV",
    },
    hero: {
      title: "Designing clarity in complex systems",
      subtitle: "From real-world complexity to decision-ready systems.",
      statement1: "We don’t design dashboards.",
      statement2: "We design how decisions get made.",
      scroll: "Scroll",
      cta: {
        cv: "View CV",
      },
    },
    featured: {
      eyebrow: "Featured project",
      platform: "Environmental Intelligence Platform",
      title1: "We don’t measure particles.",
      title2: "We translate invisible systems.",
      subtitle: "From fragmented environmental data to decision-ready systems.",
      projectName: "SiVeCa",
      projectKicker: "Built and tested in real-world environments.",
      projectBody:
        "A system for making irreversible decisions — where confidence comes from structure, not intuition.",
      cards: {
        problem: "Problem",
        system: "System",
        outcome: "Outcome",
      },
      problemBody:
        "Environmental programs generate constant signals, but decisions lag behind. Data arrives without meaning, context lives in too many places, and accountability breaks when conditions shift.",
      systemBody:
        "SiVeCa connects sensors, environmental variables, regulatory frameworks, and user decisions — turning raw readings into an interpretable chain from signal → implication → response.",
      outcomeBody:
        "A shift from monitoring to intelligence: clearer thresholds, faster alignment, and decisions that hold up under scrutiny — because the structure is explicit.",
    },
    systems: {
      title: "Systems I work on",
      intro: "I work across systems where clarity is critical:",
      items: [
        "Behavioral data systems (wellness)",
        "Trust-driven platforms (real estate)",
        "Experience-driven products (wine)",
      ],
    },
    approach: {
      title: "How I think — a loop, not a checklist",
      subtitle: "Most products fail at the structure level, not the interface.",
      blocks: [
        {
          title: "Frame",
          text: "Name the user, the risk, and the decision the product optimizes for — in language stakeholders can stress-test.",
        },
        {
          title: "Model",
          text: "Map objects, states, and handoffs. What stays visible; what sits one deliberate layer deeper.",
        },
        {
          title: "Prototype",
          text: "Flows and copy as one surface. Can people explain what happened — not only that they clicked through?",
        },
        {
          title: "Ship",
          text: "Instrument for learning, tighten edge cases, leave patterns that make the next release faster.",
        },
      ],
    },
    about: {
      title: "Grounded in how systems actually behave",
      body:
        "I work with teams in regulated, technical, and politically sensitive spaces — where ambiguity has a cost and every session has to earn trust.",
      pillars: [
        {
          title: "Systems",
          body: "Incentives, constraints, and feedback loops first — so the product scales without losing coherence.",
        },
        {
          title: "Product",
          body: "Scope, sequencing, and the narrative teams need when trade-offs are unavoidable.",
        },
        {
          title: "Environment",
          body: "Durable patterns, accessible defaults, and honest lifecycle thinking for work that leaves a footprint.",
        },
      ],
    },
    contact: {
      title: "Let’s build something that holds under pressure.",
      body:
        "For collaborations, advisory work, or deep dives on systems-heavy products — send context and timeline.",
    },
    footer: {
      tagline: "Designing clarity in complex systems",
    },
    cv: {
      title: "CV",
      role: "Product Designer | Systems Thinking | SaaS & Environmental Data",
      location: "Mexico (Remote-ready / Open to relocation)",
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
        experience: "Experience",
        projects: "Projects",
        education: "Education",
        focus: "Focus areas",
      },
      summary:
        "Product Designer with a background in Digital Design Engineering, combining systems thinking, UX/UI, and data-driven product development. Experienced in translating complex environments — including environmental data, digital platforms, and operational workflows — into intuitive and actionable solutions. Strong in bridging technical systems, user experience, and real-world operations. Currently focused on building SaaS platforms and environmental intelligence systems with global applications.",
      skills: [
        "Product Design (UX/UI)",
        "SaaS Product Development",
        "Systems Thinking",
        "Data Visualization",
        "Environmental Data Interpretation",
        "SEO Strategy",
        "Content Writing",
        "Product Strategy",
        "User Research",
        "Figma, Notion, AI",
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
            "Designed and developed the SiVeCa platform website, positioning it as an environmental data-driven product",
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
      projects: [
        {
          title: "SiVeCa — Environmental Intelligence Platform",
          bullets: [
            "Designed and developed a platform for environmental monitoring and decision-making",
            "Translated complex environmental data into clear, user-centered interfaces",
            "Built a functional system aligned with regulatory frameworks (NOM standards)",
            "Developed a compliance-oriented calculator for environmental metrics",
            "Applied SEO and content strategy to position the platform in environmental and industrial sectors",
            "Defined product vision toward a scalable SaaS environmental intelligence system",
            "Positioned the platform as an Environmental Intelligence SaaS concept",
          ],
        },
      ],
      education: [
        {
          title: "CETYS Universidad",
          detail: "B.S. Digital Design Engineering",
          period: "2011 – 2016",
        },
      ],
      focus: [
        "Data-Driven Product Design",
        "Environmental Intelligence Systems",
        "SaaS Platforms & Digital Tools",
        "Complex System Interfaces",
        "Translating Data into Decision-Making",
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
      siveca: "SiVeCa",
      systems: "Sistemas",
      approach: "Enfoque",
      about: "Acerca",
      contact: "Contacto",
      cv: "CV",
    },
    hero: {
      title: "Diseñando claridad en sistemas complejos",
      subtitle: "De la complejidad real a sistemas listos para decidir.",
      statement1: "No diseñamos dashboards.",
      statement2: "Diseñamos cómo se toman decisiones.",
      scroll: "Scroll",
      cta: {
        cv: "Ver CV",
      },
    },
    featured: {
      eyebrow: "Proyecto destacado",
      platform: "Plataforma de Inteligencia Ambiental",
      title1: "No medimos partículas.",
      title2: "Traducimos sistemas invisibles.",
      subtitle: "De datos ambientales fragmentados a sistemas listos para decidir.",
      projectName: "SiVeCa",
      projectKicker: "Construido y probado en entornos reales.",
      projectBody:
        "Un sistema para tomar decisiones irreversibles — donde la confianza viene de la estructura, no de la intuición.",
      cards: {
        problem: "Problema",
        system: "Sistema",
        outcome: "Resultado",
      },
      problemBody:
        "Los programas ambientales generan señales constantes, pero las decisiones se quedan atrás. Los datos llegan sin significado, el contexto vive en demasiados lugares y la rendición de cuentas se rompe cuando cambian las condiciones.",
      systemBody:
        "SiVeCa conecta sensores, variables ambientales, marcos regulatorios y decisiones de usuario — transformando lecturas crudas en una cadena interpretable de señal → implicación → respuesta.",
      outcomeBody:
        "Un cambio de monitoreo a inteligencia: umbrales más claros, alineación más rápida y decisiones que resisten el escrutinio — porque la estructura es explícita.",
    },
    systems: {
      title: "Sistemas en los que trabajo",
      intro: "Trabajo en sistemas donde la claridad es crítica:",
      items: [
        "Sistemas de datos conductuales (bienestar)",
        "Plataformas basadas en confianza (bienes raíces)",
        "Productos guiados por experiencia (vino)",
      ],
    },
    approach: {
      title: "Cómo pienso — un ciclo, no una checklist",
      subtitle: "La mayoría de los productos fallan en la estructura, no en la interfaz.",
      blocks: [
        {
          title: "Enmarcar",
          text: "Definir el usuario, el riesgo y la decisión que el producto optimiza — en un lenguaje que el equipo y stakeholders puedan poner a prueba.",
        },
        {
          title: "Modelar",
          text: "Mapear objetos, estados y traspasos. Qué queda visible; qué vive una capa deliberada más abajo.",
        },
        {
          title: "Prototipar",
          text: "Flujos y copy como una sola superficie. ¿Las personas pueden explicar qué pasó — no solo que hicieron clic?",
        },
        {
          title: "Lanzar",
          text: "Instrumentar para aprender, cerrar edge cases, dejar patrones que hagan el siguiente release más rápido.",
        },
      ],
    },
    about: {
      title: "Con base en cómo se comportan los sistemas en la vida real",
      body:
        "Trabajo con equipos en espacios regulados, técnicos y políticamente sensibles — donde la ambigüedad tiene un costo y cada sesión tiene que ganarse la confianza.",
      pillars: [
        {
          title: "Sistemas",
          body: "Primero incentivos, restricciones y loops de feedback — para que el producto escale sin perder coherencia.",
        },
        {
          title: "Producto",
          body: "Alcance, secuencia y la narrativa que los equipos necesitan cuando los trade-offs son inevitables.",
        },
        {
          title: "Entorno",
          body: "Patrones durables, defaults accesibles y pensamiento honesto de ciclo de vida para trabajo que deja huella.",
        },
      ],
    },
    contact: {
      title: "Construyamos algo que resista la presión.",
      body:
        "Para colaboraciones, trabajo advisory o deep dives en productos intensivos en sistemas — envía contexto y timeline.",
    },
    footer: {
      tagline: "Diseñando claridad en sistemas complejos",
    },
    cv: {
      title: "CV",
      role: "Product Designer | Systems Thinking | Environmental Data & SaaS",
      location: "México (Remoto / Abierta a reubicación)",
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
        experience: "Experiencia",
        projects: "Proyectos",
        education: "Educación",
        focus: "Áreas de enfoque",
      },
      summary:
        "Product Designer con formación en Digital Design Engineering, combinando pensamiento sistémico, UX/UI y desarrollo de producto basado en datos. Experiencia traduciendo entornos complejos — incluyendo datos ambientales, plataformas digitales y flujos operativos — en soluciones intuitivas y accionables. Fuerte conectando sistemas técnicos, experiencia de usuario y operaciones del mundo real. Actualmente enfocada en construir plataformas SaaS y sistemas de inteligencia ambiental con aplicaciones globales.",
      skills: [
        "Product Design (UX/UI)",
        "Desarrollo de producto SaaS",
        "Pensamiento sistémico",
        "Visualización de datos",
        "Interpretación de datos ambientales",
        "Estrategia SEO",
        "Redacción de contenido",
        "Estrategia de producto",
        "Investigación de usuarios",
        "Figma, Notion, AI",
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
            "Diseñé y desarrollé el sitio del producto SiVeCa, posicionándolo como un producto impulsado por datos ambientales",
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
      projects: [
        {
          title: "SiVeCa — Plataforma de Inteligencia Ambiental",
          bullets: [
            "Diseñé y desarrollé una plataforma para monitoreo ambiental y toma de decisiones",
            "Traduje datos ambientales complejos en interfaces claras centradas en el usuario",
            "Construí un sistema funcional alineado con marcos regulatorios (normas NOM)",
            "Desarrollé una calculadora orientada a cumplimiento para métricas ambientales",
            "Apliqué SEO y estrategia de contenido para posicionar la plataforma en sectores ambientales e industriales",
            "Definí visión de producto hacia un sistema SaaS escalable de inteligencia ambiental",
            "Posicioné la plataforma como concepto de SaaS de Inteligencia Ambiental",
          ],
        },
      ],
      education: [
        {
          title: "CETYS Universidad",
          detail: "Lic. Digital Design Engineering",
          period: "2011 – 2016",
        },
      ],
      focus: [
        "Diseño de producto basado en datos",
        "Sistemas de inteligencia ambiental",
        "Plataformas SaaS y herramientas digitales",
        "Interfaces de sistemas complejos",
        "Traducir datos en toma de decisiones",
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

