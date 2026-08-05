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
      process: "Approach",
      about: "Thinking",
      humi: "HUMI",
      contact: "Contact",
      cv: "CV",
    },
    hero: {
      role: "Product Builder",
      headline: "I design technology people actually adopt.",
      cta: "See what\u2019s in use",
    },
    philosophy: {
      statement: "Technology should adapt to people.",
      lines: [
        "Not the other way around.",
        "Not a barrier.",
        "Not a system you fight against.",
      ],
      closing1: "I work where people, operations, and systems meet.",
      closing2: "I build products that fit real workflows \u2014 so they get used, not abandoned.",
    },
    selectedWork: {
      eyebrow: "In practice",
      title: "Work in the real world.",
      labels: {
        problem: "Problem",
        approach: "Decision",
        outcome: "Adoption",
        lessons: "Tradeoff",
      },
      cases: [
        {
          name: "Proof \u2014 Wine production traceability",
          subtitle: "Personal project \u2014 designed with winemakers, built alone",
          status: "In development",
          context: "In development",
          problem: "",
          approach: "",
          outcome: "",
          lessons: "",
          sections: [
            {
              label: "Problem",
              body: "Wineries in Valle de Guadalupe and Ensenada\u2014Baja California wine country\u2014still track production lots across spreadsheets, notebooks, and memory. Traceability breaks between stages. Small producers have no affordable system built around how they already work.",
            },
            {
              label: "System",
              body: "Proof follows every lot through the winemaking pipeline: harvest (cosecha) \u2192 lab analysis (an\u00e1lisis) \u2192 fermentation (fermentaci\u00f3n) \u2192 malolactic (malol\u00e1ctica) \u2192 aging (crianza) \u2192 bottling (embotellado).\n\nEach stage keeps its own data and state. Lots move with full history, so any bottle can be traced back to its harvest.",
            },
            {
              label: "Interface",
              body: "Instead of asking winemakers to learn a new maze of forms, the system can be managed in plain language\u2014\u201cshow me active lots,\u201d \u201cmove lot X to fermentation,\u201d \u201cstart a new lot.\u201d\n\nAn LLM calls typed tools against the database. It does not invent state. It executes the operations the domain already needs.",
            },
            {
              label: "Build",
              body: "Data model and backend on Supabase (PostgreSQL), exposed through REST APIs. Each operation has a defined tool schema\u2014create lot, list active lots, advance stage, query history.\n\nThe cycle starts with domain research alongside real winemakers, then data model, prompts, interface, and iteration.",
            },
            {
              label: "Status",
              body: "In active development. The question is not whether the technology is impressive\u2014it is whether a producer will trust it on a busy harvest day.",
            },
          ],
          url: "",
          urlLabel: "",
        },
        {
          name: "HUMI \u2014 Academy operations platform",
          subtitle: "Management and logistics for a taekwondo academy",
          status: "Live in production",
          context: "Live in production",
          problem:
            "HUMI has run academy operations for 15+ years\u2014cohorts, staffing, events, family communication\u2014on people and process. That rigor needed a digital layer that matched the work, not another spreadsheet stack.",
          approach:
            "Design the system around existing operations: data model, workflows, and a calm interface that staff can use without changing how the academy already runs. Build and deploy the full product on top of a real organization.",
          outcome:
            "The same 15+ years of operations now run on a live product shipped in 2025. Same community. New infrastructure they actually use.",
          lessons:
            "The best systems disappear into the day. When operations work, people notice the experience\u2014not the software.",
          sections: [],
          url: "https://humisite.vercel.app/",
          urlLabel: "Visit site",
        },
        {
          name: "SiVeCa",
          subtitle: "",
          status: "",
          context: "Monitoring and compliance workflows",
          problem:
            "Leadership and IT needed a shared path for monitoring and compliance decisions\u2014with auditability and NOM alignment\u2014instead of decisions trapped in chats, spreadsheets, and individual memory.",
          approach:
            "Act as technical liaison between CEO and IT: audit repositories, run a parallel technical workstream, and translate NOM requirements into product logic people can follow. Design and ship the public site as part of that system.",
          outcome:
            "Operators and reviewers share a traceable path from signal to documented response. The product is used because the path is clearer than the workarounds it replaced.",
          lessons:
            "In heavy domains, clarity is the product. Traceability only matters if people can follow it under pressure.",
          sections: [],
          url: "https://www.siveca.com.mx/",
          urlLabel: "Visit site",
        },
      ],
    },
    process: {
      eyebrow: "Approach",
      title: "How I build.",
      steps: [
        { name: "Discover", description: "Map the real constraints before choosing a direction." },
        { name: "Listen", description: "Talk to the people closest to the work\u2014not only the ones requesting the tool." },
        { name: "Structure", description: "Turn ambiguity into a system others can navigate without you." },
        { name: "Build", description: "Ship something real into a real workflow. Learn from what breaks." },
        { name: "Document", description: "Make decisions traceable so the next person doesn\u2019t start from zero." },
        { name: "Leave room", description: "Design for the team that inherits it\u2014and for the day you are not in the room." },
      ],
    },
    about: {
      title: "How I think.",
      lead: "I start with people and the work they already do.",
      body: "Most systems fail in adoption, not in code. They ask people to change for the tool\u2014and the tool quietly loses.",
      closing: "I translate messy, real-world complexity\u2014operational, regulatory, technical\u2014into products simple enough to trust.",
      cvLink: "Read full CV",
    },
    writing: {
      eyebrow: "Writing",
      title: "I write about product, systems, and what makes technology stick.",
      status: "Writing in progress.",
    },
    contact: {
      title: "Get in touch.",
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
      work: "Trabajo",
      experience: "Experiencias",
      approach: "Enfoque",
      process: "Enfoque",
      about: "Pensamiento",
      humi: "HUMI",
      contact: "Contacto",
      cv: "CV",
    },
    hero: {
      role: "Product Builder",
      headline: "Diseño tecnología que la gente realmente adopta.",
      cta: "Ver lo que está en uso",
    },
    philosophy: {
      statement: "La tecnolog\u00eda deber\u00eda adaptarse a las personas.",
      lines: [
        "No al rev\u00e9s.",
        "No como una barrera.",
        "No como un sistema contra el que luchas.",
      ],
      closing1: "Trabajo donde se encuentran personas, operaciones y sistemas.",
      closing2: "Construyo productos que encajan en flujos reales \u2014 para que se usen, no se abandonen.",
    },
    selectedWork: {
      eyebrow: "En la pr\u00e1ctica",
      title: "Trabajo en el mundo real.",
      labels: {
        problem: "Problema",
        approach: "Decisi\u00f3n",
        outcome: "Adopci\u00f3n",
        lessons: "Compensaci\u00f3n",
      },
      cases: [
        {
          name: "Proof \u2014 Trazabilidad de producci\u00f3n vin\u00edcola",
          subtitle: "Proyecto personal \u2014 dise\u00f1ado con en\u00f3logos, construido sola",
          status: "En desarrollo",
          context: "En desarrollo",
          problem: "",
          approach: "",
          outcome: "",
          lessons: "",
          sections: [
            {
              label: "Problema",
              body: "Las vin\u00edcolas del Valle de Guadalupe y Ensenada\u2014la regi\u00f3n vin\u00edcola de Baja California\u2014a\u00fan rastrean lotes de producci\u00f3n en hojas de c\u00e1lculo, libretas y memoria. La trazabilidad se rompe entre etapas. Los productores peque\u00f1os no tienen un sistema asequible construido alrededor de c\u00f3mo ya trabajan.",
            },
            {
              label: "Sistema",
              body: "Proof sigue cada lote a trav\u00e9s del pipeline de elaboraci\u00f3n: cosecha \u2192 an\u00e1lisis de laboratorio \u2192 fermentaci\u00f3n \u2192 malol\u00e1ctica \u2192 crianza \u2192 embotellado.\n\nCada etapa conserva sus propios datos y estado. Los lotes avanzan con historial completo, de modo que cualquier botella puede trazarse hasta su cosecha.",
            },
            {
              label: "Interfaz",
              body: "En lugar de pedirles a los en\u00f3logos que aprendan un laberinto nuevo de formularios, el sistema se puede gestionar en lenguaje cotidiano\u2014\u201cmu\u00e9strame lotes activos,\u201d \u201cmueve el lote X a fermentaci\u00f3n,\u201d \u201cinicia un lote nuevo.\u201d\n\nUn LLM llama herramientas tipadas contra la base de datos. No inventa estado. Ejecuta las operaciones que el dominio ya necesita.",
            },
            {
              label: "Construcci\u00f3n",
              body: "Modelo de datos y backend en Supabase (PostgreSQL), expuestos por REST APIs. Cada operaci\u00f3n tiene un esquema de herramientas definido\u2014crear lote, listar activos, avanzar etapa, consultar historial.\n\nEl ciclo empieza con investigaci\u00f3n de dominio junto a en\u00f3logos reales; despu\u00e9s modelo de datos, prompts, interfaz e iteraci\u00f3n.",
            },
            {
              label: "Estado",
              body: "En desarrollo activo. La pregunta no es si la tecnolog\u00eda impresiona\u2014es si un productor confiar\u00e1 en ella un d\u00eda de cosecha ajetreado.",
            },
          ],
          url: "",
          urlLabel: "",
        },
        {
          name: "HUMI \u2014 Plataforma de operaciones para academias",
          subtitle: "Gesti\u00f3n y log\u00edstica para una academia de taekwondo",
          status: "En producci\u00f3n",
          context: "En producci\u00f3n",
          problem:
            "HUMI ha operado una academia durante m\u00e1s de 15 a\u00f1os\u2014cohortes, staff, eventos, comunicaci\u00f3n con familias\u2014sobre personas y proceso. Ese rigor necesitaba una capa digital alineada al trabajo, no otra pila de hojas de c\u00e1lculo.",
          approach:
            "Dise\u00f1ar el sistema alrededor de la operaci\u00f3n existente: modelo de datos, flujos e interfaz calmada que el staff pueda usar sin cambiar c\u00f3mo ya corre la academia. Construir y desplegar el producto completo sobre una organizaci\u00f3n real.",
          outcome:
            "Los mismos 15+ a\u00f1os de operaci\u00f3n ahora corren sobre un producto en vivo entregado en 2025. Misma comunidad. Nueva infraestructura que s\u00ed usan.",
          lessons:
            "Los mejores sistemas se disuelven en el d\u00eda. Cuando la operaci\u00f3n funciona, la gente nota la experiencia\u2014no el software.",
          sections: [],
          url: "https://humisite.vercel.app/",
          urlLabel: "Visitar sitio",
        },
        {
          name: "SiVeCa",
          subtitle: "",
          status: "",
          context: "Flujos de monitoreo y cumplimiento",
          problem:
            "Liderazgo e IT necesitaban un camino compartido para decisiones de monitoreo y cumplimiento\u2014con auditabilidad y alineaci\u00f3n NOM\u2014en lugar de decisiones atrapadas en chats, hojas de c\u00e1lculo y memoria individual.",
          approach:
            "Ser enlace t\u00e9cnico entre CEO e IT: auditar repositorios, llevar un workstream t\u00e9cnico paralelo y traducir requisitos NOM a l\u00f3gica de producto que la gente pueda seguir. Dise\u00f1ar y publicar el sitio p\u00fablico como parte de ese sistema.",
          outcome:
            "Operadores y revisores comparten un camino trazable de la se\u00f1al a la respuesta documentada. El producto se usa porque el camino es m\u00e1s claro que los atajos que reemplaz\u00f3.",
          lessons:
            "En dominios densos, la claridad es el producto. La trazabilidad solo importa si la gente puede seguirla bajo presi\u00f3n.",
          sections: [],
          url: "https://www.siveca.com.mx/",
          urlLabel: "Visitar sitio",
        },
      ],
    },
    process: {
      eyebrow: "Enfoque",
      title: "C\u00f3mo construyo.",
      steps: [
        { name: "Descubrir", description: "Mapear las restricciones reales antes de elegir una direcci\u00f3n." },
        { name: "Escuchar", description: "Hablar con las personas m\u00e1s cercanas al trabajo\u2014no solo con quienes piden la herramienta." },
        { name: "Estructurar", description: "Convertir la ambig\u00fcedad en un sistema que otros puedan navegar sin ti." },
        { name: "Construir", description: "Entregar algo real dentro de un flujo real. Aprender de lo que se rompe." },
        { name: "Documentar", description: "Hacer las decisiones trazables para que la siguiente persona no empiece de cero." },
        { name: "Dejar espacio", description: "Dise\u00f1ar para el equipo que lo hereda\u2014y para el d\u00eda en que no est\u00e1s en la sala." },
      ],
    },
    about: {
      title: "C\u00f3mo pienso.",
      lead: "Empiezo por las personas y el trabajo que ya hacen.",
      body: "La mayor\u00eda de los sistemas fallan en la adopci\u00f3n, no en el c\u00f3digo. Piden que la gente cambie por la herramienta\u2014y la herramienta pierde en silencio.",
      closing: "Traduzco complejidad real\u2014operativa, regulatoria, t\u00e9cnica\u2014en productos lo bastante simples para merecer confianza.",
      cvLink: "Leer CV completo",
    },
    writing: {
      eyebrow: "Escritura",
      title: "Escribo sobre producto, sistemas y lo que hace que la tecnolog\u00eda se quede.",
      status: "Escritura en progreso.",
    },
    contact: {
      title: "Hablemos.",
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

