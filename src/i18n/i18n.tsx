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
      work: "Work",
      experience: "Experience",
      approach: "Approach",
      process: "Process",
      about: "About",
      humi: "HUMI",
      contact: "Contact",
      cv: "CV",
    },
    hero: {
      role: "Technical Product Strategist & Systems Designer · Builder of AI-Integrated Products",
      headline: "I build AI-integrated products — from data layer to interface.",
      cta: "View my work",
    },
    philosophy: {
      statement: "Technology should feel like an extension of our possibilities.",
      lines: [
        "Not a barrier.",
        "Not a manual.",
        "Not a system you fight against.",
      ],
      closing1: "My work lives at the intersection of product, systems, operations, and AI.",
      closing2: "I build AI-integrated systems that create clarity.",
    },
    selectedWork: {
      eyebrow: "Selected work",
      title: "Things I\u2019ve built.",
      labels: {
        problem: "Problem",
        approach: "Approach",
        outcome: "Outcome",
        lessons: "Lessons learned",
      },
      cases: [
        {
          name: "Proof \u2014 AI-integrated wine production traceability platform",
          subtitle: "Personal project, sole designer & builder",
          status: "In development",
          context: "In development",
          problem: "",
          approach: "",
          outcome: "",
          lessons: "",
          sections: [
            {
              label: "Problem",
              body: "Wineries in Valle de Guadalupe and Ensenada\u2014Baja California wine country\u2014still track production lots across spreadsheets, notebooks, and memory. Traceability breaks between stages, and small producers have no affordable system built around how they actually work.",
            },
            {
              label: "System",
              body: "Proof tracks every lot through the full winemaking pipeline: harvest (cosecha) \u2192 lab analysis (an\u00e1lisis) \u2192 fermentation (fermentaci\u00f3n) \u2192 malolactic (malol\u00e1ctica) \u2192 aging (crianza) \u2192 bottling (embotellado).\n\nEach stage carries its own data and state. Lots move through the pipeline with full history, so any bottle can be traced back to its harvest.",
            },
            {
              label: "AI layer",
              body: "A conversational management layer sits on top of the system. An LLM interface with tool/function calling lets the winemaker manage production in natural language\u2014\u201cshow me active lots,\u201d \u201cmove lot X to fermentation,\u201d \u201cstart a new lot\u201d\u2014instead of navigating forms.\n\nThe model calls typed tools against the database. It doesn\u2019t guess.",
            },
            {
              label: "Stack",
              body: "Data model and backend on Supabase (PostgreSQL), exposed through REST APIs. LLM API integration with a defined tool schema per operation\u2014create lot, list active lots, advance stage, query history.\n\nI own the full cycle: domain research with real winemakers, data model, tool and prompt design, UX, and iteration.",
            },
            {
              label: "Status",
              body: "In active development. Flagship personal work\u2014and the clearest proof that I can take a messy real-world domain, design the system, and ship an AI-native interface on top of it, end to end, alone.",
            },
          ],
          url: "",
          urlLabel: "",
        },
        {
          name: "HUMI \u2014 Academy Management & Logistics Platform",
          subtitle: "Taekwondo Academy Management & Logistics Platform",
          status: "Live in production",
          context: "Live in production",
          problem:
            "HUMI has run real-world academy operations for 15+ years\u2014cohorts, staffing, events, family communication\u2014on people and process. That rigor needed a digital layer, not another spreadsheet stack.",
          approach:
            "Designed and built an AI-assisted management and logistics platform end to end: data model, AI-assisted workflows, frontend, and deployment\u2014the new digital layer on top of the existing organization.",
          outcome:
            "15+ years of real-world operations now run on a live product I shipped in 2025. Same community, new infrastructure.",
          lessons:
            "The best systems are invisible. When operations work, people only see the experience.",
          sections: [],
          url: "https://humisite.vercel.app/",
          urlLabel: "Visit site",
        },
        {
          name: "SiVeCa",
          subtitle: "",
          status: "",
          context: "Web product \u00b7 Monitoring & compliance workflows",
          problem:
            "Leadership and IT needed a shared technical path for monitoring and compliance decisions\u2014with auditability and NOM alignment\u2014instead of decisions trapped in chats, spreadsheets, and individual memory.",
          approach:
            "Worked as technical liaison between CEO and IT: repository auditing, a parallel technical workstream, and translating NOM regulatory requirements into product logic. Designed and built the company landing site end to end.",
          outcome:
            "Operators and reviewers share a traceable path from signal to documented response. The public site ships the product narrative as finished work.",
          lessons:
            "Domain-heavy products need the same UX rigor as consumer apps. Traceability is the product\u2014and shipping the landing site is part of the system.",
          sections: [],
          url: "https://www.siveca.com.mx/",
          urlLabel: "Visit site",
        },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "How I work.",
      steps: [
        { name: "Discover", description: "Map the real constraints before choosing a direction." },
        { name: "Understand", description: "Talk to the people closest to the problem." },
        { name: "Structure", description: "Turn ambiguity into a system others can navigate." },
        { name: "Build", description: "Ship something real. Learn from what breaks." },
        { name: "Document", description: "Make decisions traceable so the next person doesn\u2019t start from zero." },
        { name: "Scale", description: "Design for the team that inherits it, not the one that built it." },
      ],
    },
    about: {
      title: "How I think.",
      lead: "I work at the intersection where people meet technology.",
      body: "Most systems fail not because of bad code, but because no one translated complexity into something a team could use.",
      closing: "I take complex systems\u2014regulatory, operational, technical\u2014and turn them into products that feel simple.",
      cvLink: "Read full CV",
    },
    writing: {
      eyebrow: "Writing",
      title: "I write about systems, product, and the space between technology and people.",
      status: "Essays coming soon.",
    },
    contact: {
      title: "Let\u2019s connect.",
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
      projects: [
        {
          title: "Taekwondo Academy Management & Logistics Platform (HUMI)",
          bullets: [
            "Designed and built an AI-assisted academy management and logistics platform end to end (data model, AI-assisted workflows, frontend, deployment)",
            "Shipped in 2025 on top of 15+ years of HUMI community and academy operations",
            "Maintain recurring workflows: schedules, instructor coordination, family communication, enrollment, and promotions",
            "Plan and deliver one masterclass or special event per year with full operational rigor: contracts, travel, capacity, registration, vendors, and on-site execution",
            "Coordinate multidisciplinary staff, volunteers, and venue requirements under fixed clocks",
            "Design work and mentorship paths for young coaches through teaching, logistics, and operational support",
          ],
        },
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
      work: "Trabajo",
      experience: "Experiencias",
      approach: "Enfoque",
      process: "Proceso",
      about: "Acerca",
      humi: "HUMI",
      contact: "Contacto",
      cv: "CV",
    },
    hero: {
      role: "Estratega Técnica de Producto y Diseñadora de Sistemas · Constructora de productos integrados con IA",
      headline: "Construyo productos integrados con IA — de la capa de datos a la interfaz.",
      cta: "Ver mi trabajo",
    },
    philosophy: {
      statement: "La tecnolog\u00eda deber\u00eda sentirse como una extensi\u00f3n de nuestras posibilidades.",
      lines: [
        "No como una barrera.",
        "No como un manual.",
        "No como un sistema contra el que luchas.",
      ],
      closing1: "Mi trabajo vive en la intersecci\u00f3n entre producto, sistemas, operaciones e IA.",
      closing2: "Construyo sistemas integrados con IA que crean claridad.",
    },
    selectedWork: {
      eyebrow: "Trabajo seleccionado",
      title: "Lo que he construido.",
      labels: {
        problem: "Problema",
        approach: "Enfoque",
        outcome: "Resultado",
        lessons: "Aprendizaje",
      },
      cases: [
        {
          name: "Proof \u2014 Plataforma de trazabilidad de producci\u00f3n vin\u00edcola integrada con IA",
          subtitle: "Proyecto personal, dise\u00f1adora y constructora \u00fanica",
          status: "En desarrollo",
          context: "En desarrollo",
          problem: "",
          approach: "",
          outcome: "",
          lessons: "",
          sections: [
            {
              label: "Problema",
              body: "Las vin\u00edcolas del Valle de Guadalupe y Ensenada\u2014la regi\u00f3n vin\u00edcola de Baja California\u2014a\u00fan rastrean lotes de producci\u00f3n en hojas de c\u00e1lculo, libretas y memoria. La trazabilidad se rompe entre etapas, y los productores peque\u00f1os no tienen un sistema asequible construido alrededor de c\u00f3mo trabajan de verdad.",
            },
            {
              label: "Sistema",
              body: "Proof rastrea cada lote a trav\u00e9s de todo el pipeline de elaboraci\u00f3n: cosecha \u2192 an\u00e1lisis de laboratorio \u2192 fermentaci\u00f3n \u2192 malol\u00e1ctica \u2192 crianza \u2192 embotellado.\n\nCada etapa carga sus propios datos y estado. Los lotes avanzan con historial completo, de modo que cualquier botella puede trazarse hasta su cosecha.",
            },
            {
              label: "Capa de IA",
              body: "Una capa de gesti\u00f3n conversacional se sienta encima del sistema. Una interfaz LLM con tool/function calling permite al en\u00f3logo gestionar la producci\u00f3n en lenguaje natural\u2014\u201cmu\u00e9strame lotes activos,\u201d \u201cmueve el lote X a fermentaci\u00f3n,\u201d \u201cinicia un lote nuevo\u201d\u2014en lugar de navegar formularios.\n\nEl modelo llama herramientas tipadas contra la base de datos. No adivina.",
            },
            {
              label: "Stack",
              body: "Modelo de datos y backend en Supabase (PostgreSQL), expuestos por REST APIs. Integraci\u00f3n con LLM API y un esquema de herramientas definido por operaci\u00f3n\u2014crear lote, listar activos, avanzar etapa, consultar historial.\n\nSoy due\u00f1a del ciclo completo: investigaci\u00f3n de dominio con en\u00f3logos reales, modelo de datos, dise\u00f1o de tools y prompts, UX e iteraci\u00f3n.",
            },
            {
              label: "Estado",
              body: "En desarrollo activo. Trabajo personal bandera\u2014y la prueba m\u00e1s clara de que puedo tomar un dominio real desordenado, dise\u00f1ar el sistema y entregar una interfaz nativa de IA encima, de punta a punta, sola.",
            },
          ],
          url: "",
          urlLabel: "",
        },
        {
          name: "HUMI \u2014 Plataforma de gesti\u00f3n y log\u00edstica para academias",
          subtitle: "Taekwondo Academy Management & Logistics Platform",
          status: "En producci\u00f3n",
          context: "En producci\u00f3n",
          problem:
            "HUMI ha operado una academia en el mundo real durante m\u00e1s de 15 a\u00f1os\u2014cohortes, staff, eventos, comunicaci\u00f3n con familias\u2014sobre personas y proceso. Ese rigor necesitaba una capa digital, no otra pila de hojas de c\u00e1lculo.",
          approach:
            "Dise\u00f1\u00e9 y constru\u00ed de punta a punta una plataforma de gesti\u00f3n y log\u00edstica asistida por IA: modelo de datos, flujos asistidos por IA, frontend y despliegue\u2014la nueva capa digital sobre la organizaci\u00f3n existente.",
          outcome:
            "M\u00e1s de 15 a\u00f1os de operaci\u00f3n real ahora corren sobre un producto en vivo que entregu\u00e9 en 2025. Misma comunidad, nueva infraestructura.",
          lessons:
            "Los mejores sistemas son invisibles. Cuando la operaci\u00f3n funciona, la gente solo ve la experiencia.",
          sections: [],
          url: "https://humisite.vercel.app/",
          urlLabel: "Visitar sitio",
        },
        {
          name: "SiVeCa",
          subtitle: "",
          status: "",
          context: "Producto web \u00b7 Flujos de monitoreo y cumplimiento",
          problem:
            "Liderazgo e IT necesitaban un camino t\u00e9cnico compartido para decisiones de monitoreo y cumplimiento\u2014con auditabilidad y alineaci\u00f3n NOM\u2014en lugar de decisiones atrapadas en chats, hojas de c\u00e1lculo y memoria individual.",
          approach:
            "Fui enlace t\u00e9cnico entre CEO e IT: auditor\u00eda de repositorios, un workstream t\u00e9cnico paralelo y traducci\u00f3n de requisitos regulatorios NOM a l\u00f3gica de producto. Dise\u00f1\u00e9 y constru\u00ed el sitio landing de la empresa de punta a punta.",
          outcome:
            "Operadores y revisores comparten un camino trazable de la se\u00f1al a la respuesta documentada. El sitio p\u00fablico entrega la narrativa del producto como trabajo terminado.",
          lessons:
            "Productos con dominio fuerte necesitan el mismo rigor de UX que apps de consumo. La trazabilidad es el producto\u2014y publicar el landing es parte del sistema.",
          sections: [],
          url: "https://www.siveca.com.mx/",
          urlLabel: "Visitar sitio",
        },
      ],
    },
    process: {
      eyebrow: "Proceso",
      title: "C\u00f3mo trabajo.",
      steps: [
        { name: "Descubrir", description: "Mapear las restricciones reales antes de elegir una direcci\u00f3n." },
        { name: "Entender", description: "Hablar con las personas m\u00e1s cercanas al problema." },
        { name: "Estructurar", description: "Convertir la ambig\u00fcedad en un sistema que otros puedan navegar." },
        { name: "Construir", description: "Entregar algo real. Aprender de lo que se rompe." },
        { name: "Documentar", description: "Hacer las decisiones trazables para que la siguiente persona no empiece de cero." },
        { name: "Escalar", description: "Dise\u00f1ar para el equipo que lo hereda, no para el que lo construy\u00f3." },
      ],
    },
    about: {
      title: "C\u00f3mo pienso.",
      lead: "Trabajo en la intersecci\u00f3n donde las personas encuentran la tecnolog\u00eda.",
      body: "La mayor\u00eda de los sistemas fallan no por mal c\u00f3digo, sino porque nadie tradujo la complejidad en algo que un equipo pudiera usar.",
      closing: "Tomo sistemas complejos\u2014regulatorios, operativos, t\u00e9cnicos\u2014y los convierto en productos que se sienten simples.",
      cvLink: "Leer CV completo",
    },
    writing: {
      eyebrow: "Escritura",
      title: "Escribo sobre sistemas, producto y el espacio entre la tecnolog\u00eda y las personas.",
      status: "Ensayos pr\u00f3ximamente.",
    },
    contact: {
      title: "Conectemos.",
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
      projects: [
        {
          title: "Taekwondo Academy Management & Logistics Platform (HUMI)",
          bullets: [
            "Diseñé y construí de punta a punta una plataforma de gestión y logística de academias asistida por IA (modelo de datos, flujos asistidos por IA, frontend, despliegue)",
            "Entregada en 2025 sobre más de 15 años de operaciones comunitarias y de academia de HUMI",
            "Flujos recurrentes: horarios, coordinación de instructores, comunicación con familias, inscripciones y promociones",
            "Planificar y entregar una clase magistral o evento especial al año con rigor operativo completo: contratos, viajes, cupo, registro, proveedores y ejecución en sitio",
            "Coordinación de staff multidisciplinario, voluntarios y requisitos de sede bajo relojes fijos",
            "Rutas de trabajo y mentoría para entrenadores jóvenes mediante enseñanza, logística y soporte operativo",
          ],
        },
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

