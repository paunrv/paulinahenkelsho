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
      closing2: "I don\u2019t build software. I build clarity.",
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
          name: "SiVeCa",
          context: "Web product \u00b7 Monitoring & compliance workflows",
          problem: "Field data, regulations, and sign-offs lived across spreadsheets, chats, and individual memory. When conditions changed, teams couldn\u2019t reconstruct who agreed to what.",
          approach: "Designed a modular web product that ties inputs, variables, regulatory references, and roles into one traceable path\u2014from signal to documented response.",
          outcome: "Teams can now rehearse decisions with explicit inputs, keep operators and reviewers aligned, and iterate without rewriting the entire story each release.",
          lessons: "Domain-heavy products need the same UX rigor as consumer apps. Traceability is the product.",
          url: "https://www.siveca.com.mx/",
          urlLabel: "siveca.com.mx",
        },
        {
          name: "PROOF",
          context: "Coming soon",
          problem: "",
          approach: "",
          outcome: "",
          lessons: "",
          url: "",
          urlLabel: "",
        },
        {
          name: "HUMI",
          context: "Academy & community platform \u00b7 15+ years",
          problem: "A youth academy with 60+ students needed the operational rigor of a product team\u2014schedules, cohorts, family communication, events\u2014without the overhead of enterprise tools.",
          approach: "Built and run a long-term operational platform: curricula, instructor coordination, enrollment systems, and one annual production with high-level guests, managed end-to-end.",
          outcome: "15+ years of consistent operation. Paid pathways for young coaches. A community that reads as infrastructure, not a side project.",
          lessons: "The best systems are invisible. When operations work, people only see the experience.",
          url: "https://humisite.vercel.app/",
          urlLabel: "humisite.vercel.app",
        },
        {
          name: "Home Exchange",
          context: "Coming soon",
          problem: "",
          approach: "",
          outcome: "",
          lessons: "",
          url: "",
          urlLabel: "",
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
          title: "SiVeCa — Web product for monitoring & decision workflows",
          bullets: [
            "Designed and shipped web surfaces for monitoring, thresholds, and review-heavy tasks",
            "Structured inputs and outputs so operators and reviewers share a trace from reading to documented action",
            "Aligned selected flows with Mexican regulatory references (NOM) where required",
            "Built a compliance-oriented calculator for specific environmental metrics",
            "Owned enough SEO and content for industrial and program audiences to find the product",
            "Captured a credible path toward multi-tenant SaaS without overbuilding the first release",
          ],
        },
        {
          title: "HUMI — Long-term community platform",
          bullets: [
            "Lead operations for a taekwondo academy and youth-development environment with 60+ active students year-round",
            "Maintain recurring workflows: schedules, instructor coordination, family communication, enrollment, and promotions",
            "Plan and deliver one masterclass or special event per year—different high-level guests across editions, with the same operational rigor: contracts, travel, capacity, floor plans, registration, vendor or security coordination, and on-site execution",
            "Coordinate multidisciplinary staff, volunteers, vendors, and safety or venue requirements under fixed clocks",
            "Design work and mentorship paths for young coaches and assistants through teaching, logistics, and operational support",
            "Publish community-facing information that stays legible for non-specialists while preserving operational detail",
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
      statement: "La tecnología debería sentirse como una extensión de nuestras posibilidades.",
      lines: [
        "No como una barrera.",
        "No como un manual.",
        "No como un sistema contra el que luchas.",
      ],
      closing1: "Mi trabajo vive en la intersección entre producto, sistemas, operaciones e IA.",
      closing2: "No construyo software. Construyo claridad.",
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
          name: "SiVeCa",
          context: "Producto web \u00b7 Flujos de monitoreo y cumplimiento",
          problem: "Datos de campo, normativas y aprobaciones viv\u00edan en hojas de c\u00e1lculo, chats y memoria individual. Cuando las condiciones cambiaban, los equipos no pod\u00edan reconstruir qui\u00e9n acord\u00f3 qu\u00e9.",
          approach: "Dise\u00f1\u00e9 un producto web modular que conecta insumos, variables, referencias regulatorias y roles en un camino trazable\u2014de la se\u00f1al a la respuesta documentada.",
          outcome: "Los equipos ahora pueden ensayar decisiones con insumos expl\u00edcitos, mantener alineados a operadores y revisores, e iterar sin reescribir toda la historia en cada release.",
          lessons: "Productos con dominio fuerte necesitan el mismo rigor de UX que apps de consumo. La trazabilidad es el producto.",
          url: "https://www.siveca.com.mx/",
          urlLabel: "siveca.com.mx",
        },
        {
          name: "PROOF",
          context: "Pr\u00f3ximamente",
          problem: "",
          approach: "",
          outcome: "",
          lessons: "",
          url: "",
          urlLabel: "",
        },
        {
          name: "HUMI",
          context: "Academia y plataforma comunitaria \u00b7 15+ a\u00f1os",
          problem: "Una academia juvenil con 60+ alumnos necesitaba el rigor operativo de un equipo de producto\u2014horarios, cohortes, comunicaci\u00f3n con familias, eventos\u2014sin la sobrecarga de herramientas empresariales.",
          approach: "Constru\u00ed y opero una plataforma operativa de largo plazo: curr\u00edculos, coordinaci\u00f3n de instructores, sistemas de inscripci\u00f3n y una producci\u00f3n anual con invitados de alto nivel, gestionada de punta a punta.",
          outcome: "15+ a\u00f1os de operaci\u00f3n consistente. Rutas pagadas para entrenadores j\u00f3venes. Una comunidad que se lee como infraestructura, no como pasatiempo.",
          lessons: "Los mejores sistemas son invisibles. Cuando la operaci\u00f3n funciona, la gente solo ve la experiencia.",
          url: "https://humisite.vercel.app/",
          urlLabel: "humisite.vercel.app",
        },
        {
          name: "Home Exchange",
          context: "Pr\u00f3ximamente",
          problem: "",
          approach: "",
          outcome: "",
          lessons: "",
          url: "",
          urlLabel: "",
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
          title: "SiVeCa — Producto web para monitoreo y flujos de decisión",
          bullets: [
            "Diseñé y publiqué superficies web para monitoreo, umbrales y tareas con mucha revisión",
            "Organicé entradas y salidas para que operadores y revisores compartan una traza de lectura a acción documentada",
            "Alineé flujos seleccionados con referencias regulatorias mexicanas (NOM) donde aplica",
            "Construí una calculadora orientada a cumplimiento para métricas ambientales específicas",
            "Lideré SEO y contenido suficientes para que audiencias industriales y de programa encontraran el producto",
            "Dejé documentada una ruta creíble hacia SaaS multi-tenant sin sobreconstruir el primer release",
          ],
        },
        {
          title: "HUMI — Plataforma comunitaria de largo plazo",
          bullets: [
            "Operación de una academia de taekwondo y entorno de desarrollo juvenil con más de 60 alumnos activos durante el año",
            "Flujos recurrentes: horarios, coordinación de instructores, comunicación con familias, inscripciones y promociones",
            "Planificar y entregar una clase magistral o evento especial al año—invitados de alto nivel distintos según la edición, con la misma rigurosidad operativa: contratos, viajes, cupo, planos, registro, coordinación con proveedores o seguridad y ejecución en sitio",
            "Coordinación de staff multidisciplinario, voluntarios, proveedores y requisitos de seguridad o sede bajo relojes fijos",
            "Rutas de trabajo y mentoría para entrenadores jóvenes y asistentes mediante enseñanza, logística y soporte operativo",
            "Información hacia la comunidad legible para no especialistas sin perder detalle operativo",
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

