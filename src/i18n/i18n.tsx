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
      about: "About",
      humi: "HUMI",
      contact: "Contact",
      cv: "CV",
    },
    hero: {
      title: "Product design and operational thinking for teams and live workflows",
      subtitle:
        "I help organize complexity across digital products, delivery, and programs—UX and UI, cross-functional coordination, and the structure teams need to execute.",
      statement1: "Creating structure across products, teams, and operations.",
      statement2:
        "Clarity in who decides, what evidence they use, and how the group follows through.",
      scroll: "Scroll",
      cta: {
        cv: "View CV",
      },
    },
    selectedWork: {
      sectionEyebrow: "Selected work",
      sectionTitle: "Products, client programs, startup execution, and events",
      sectionIntro:
        "One thread across these: making workflows legible so people can align, ship, and follow up without losing the plot.",
      siveca: {
        platform: "Web product · monitoring & compliance workflows",
        title1: "SiVeCa — from readings and rules",
        title2: "to screens teams can run.",
        subtitle:
          "A modular web product for programs that reconcile field data, regulation, and sign-off. I owned UX, structure, and much of the product narrative alongside delivery work.",
        projectName: "SiVeCa",
        projectKicker: "Domain-heavy UX treated like any other operations product.",
        projectBody:
          "Decisions had to be traceable: what changed, which threshold applied, and why a response still made sense. The interface and the underlying structure needed to stay aligned.",
        cards: {
          problem: "Friction",
          system: "Structure",
          outcome: "Execution",
        },
        problemBody:
          "Readings and context lived across spreadsheets, chats, and individual memory. When something shifted, it was hard to reconstruct who had agreed to what.",
        systemBody:
          "Flows tied inputs, variables, regulatory references, and roles into one path from signal to documented response—handoffs first, not a single hero screen.",
        outcomeBody:
          "Teams could rehearse decisions with explicit inputs, keep operators and reviewers on the same map, and iterate without rewriting the whole story each release.",
        siteUrl: "https://www.siveca.com.mx/",
        siteLabel: "siveca.com.mx",
      },
      engagements: [
        {
          title: "Cisco",
          meta: "Field & product programs · 2023 – Present",
          body:
            "Technology and infrastructure programs for private and federal clients: on-site operational and safety work, translating requirements into usable workflows, and steady communication through delivery.",
        },
        {
          title: "Trato Hecho",
          meta: "Startup · product & operations",
          body:
            "Early-stage contribution across product direction, site and content, Figma prototypes, light frontend support, and the day-to-day coordination startups rely on to move.",
        },
        {
          title: "Events & programmes",
          meta: "Logistics, participants, run-of-show",
          body:
            "End-to-end coordination for live formats—briefings, schedules, partners or volunteers, participant flow, and on-the-day adjustments when the plan meets reality.",
        },
      ],
    },
    experience: {
      title: "Experience systems",
      intro:
        "Workshops, showcases, and community programmes behave like operational products: timelines, stakeholders, materials, and shared risk in the room. The same habits show up in the selected work above—from SiVeCa through HUMI.",
      items: [
        "Run-of-show and contingency planning so the schedule survives the day",
        "Clear channels for participants, hosts, and partners—before, during, and after",
        "Logistics treated as part of the experience, not an afterthought",
        "Debriefs that turn friction into the next version of the playbook",
      ],
    },
    humi: {
      eyebrow: "Long-term platform",
      title: "HUMI — academy, youth programming, and community infrastructure",
      scale:
        "60+ active students year-round · recurring cohorts · one annual masterclass or special event",
      lead:
        "A long-term academy and community environment built through structure, consistency, and clear human handoffs—not a side project.",
      paragraphs: [
        "For more than fifteen years HUMI has run as a steady, structured place—curricula and training halls alongside the planning, family-facing communication, and handoffs you would expect next to a product roadmap.",
        "Locally it reads as infrastructure: coaching shifts, event support, and mentorship that give younger people paid practice in responsibility. The public face is a taekwondo academy; underneath are the same habits I bring to client work—owned decisions, steady weekly rhythms, and plain language for people who are not operators.",
        "Once a year, one masterclass or special event—a scoped production. Guests rotate by edition; over the years that has included Olympic-level coaches, elite martial artists, and professional UFC athletes, never as a combined roster in the same weekend. I handle contracts, travel, registration, capacity, rehearsal, vendor and security handoffs, and day-of execution.",
      ],
      items: [
        "Season-to-season leadership: staff, standards, and quality bar",
        "Bridge between coaches, families, venues, and safety expectations",
        "Enrollment, billing, and published calendars as repeatable touchpoints",
        "Annual production from scope through run-of-show and on-site adjustments",
        "Community channels that stay legible for non-operators",
        "Paid pathways for young coaches and assistants—teaching, events, and support roles",
      ],
      eventsNote:
        "Guests are chosen per edition for depth; each year is one production held to the same bar as any fixed-window programme.",
      siteUrl: "https://humisite.vercel.app/",
      siteLabel: "humisite.vercel.app",
    },
    approach: {
      title: "How I work with teams",
      subtitle:
        "Iteration, communication, and explicit structure beat one-off inspiration. Many alignment gaps are vocabulary problems between disciplines, not pixel problems.",
      blocks: [
        {
          title: "Listen & align",
          text: "Surface who decides what, by when, and with which inputs. Make trade-offs speakable so stakeholders are not guessing each other's constraints.",
        },
        {
          title: "Structure",
          text: "Turn goals into flows, rituals, and artifacts people reuse: journeys that match operations, ticket-ready UI, or a one-page brief everyone can annotate.",
        },
        {
          title: "Prototype",
          text: "Low or medium fidelity on purpose—enough truth to test coordination, copy, and edge states without polishing a direction you might drop next week.",
        },
        {
          title: "Execute & adapt",
          text: "Stay close during rollout: unblock adoption, capture surprises, adjust messaging and training. Operations feedback is product feedback.",
        },
      ],
    },
    about: {
      title: "Multidisciplinary product practice",
      body:
        "Background in digital design engineering with years between UX, hands-on product work, and operations-side coordination—in startups, venture-adjacent programs, and client delivery. Outside those contracts I lead HUMI, a long-run academy and community platform where scheduling, cohorts, an annual guest programme, and local work opportunities for young coaches run with the same operational rigor as a product roadmap. I translate between specialists and decision-makers so teams can execute without losing intent.",
      pillars: [
        {
          title: "Product",
          body: "Scope, sequencing, and UX craft for software people actually use—not only evaluate in a review.",
        },
        {
          title: "Operations",
          body: "Workflows, documentation, and touchpoints that keep handoffs honest when volume, regulation, or time pressure spike.",
        },
        {
          title: "People",
          body: "Facilitation, async updates, and light rituals so cross-functional groups stay informed without drowning in noise.",
        },
      ],
    },
    contact: {
      title: "Say hello",
      body:
        "If you are building or running something that needs structure—not another slogan—send a short note with what you are working on and how I might help.",
    },
    footer: {
      tagline: "Product, coordination, execution",
      links: [
        { label: "SiVeCa", href: "https://www.siveca.com.mx/" },
        { label: "HUMI", href: "https://humisite.vercel.app/" },
      ],
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
      about: "Acerca",
      humi: "HUMI",
      contact: "Contacto",
      cv: "CV",
    },
    hero: {
      title: "Diseño de producto y pensamiento operativo para equipos y flujos reales",
      subtitle:
        "Ayudo a ordenar la complejidad entre producto digital, entrega y programas—UX/UI, coordinación cross-funcional y la estructura que los equipos necesitan para ejecutar.",
      statement1: "Estructura entre producto, equipos y operaciones.",
      statement2:
        "Claridad en quién decide, con qué evidencia y cómo el grupo da seguimiento.",
      scroll: "Scroll",
      cta: {
        cv: "Ver CV",
      },
    },
    selectedWork: {
      sectionEyebrow: "Trabajo seleccionado",
      sectionTitle: "Productos, programas con clientes, ejecución startup y eventos",
      sectionIntro:
        "Un hilo común: hacer legibles los flujos para que la gente alinee, entregue y dé seguimiento sin perder el hilo.",
      siveca: {
        platform: "Producto web · flujos de monitoreo y cumplimiento",
        title1: "SiVeCa — de lecturas y reglas",
        title2: "a pantallas que el equipo puede operar.",
        subtitle:
          "Producto web modular para programas que concilian datos de campo, normativa y aprobaciones. Lideré UX, estructura y buena parte de la narrativa de producto junto con la entrega.",
        projectName: "SiVeCa",
        projectKicker: "UX con dominio fuerte, tratada como producto operativo.",
        projectBody:
          "Las decisiones debían ser trazables: qué cambió, qué umbral aplicó y por qué una respuesta seguía siendo válida. La interfaz y la estructura subyacente debían mantenerse alineadas.",
        cards: {
          problem: "Fricción",
          system: "Estructura",
          outcome: "Ejecución",
        },
        problemBody:
          "Lecturas y contexto vivían repartidos entre hojas de cálculo, chats y memoria individual. Cuando algo cambiaba, costaba reconstruir quién había acordado qué.",
        systemBody:
          "Los flujos enlazaron insumos, variables, referencias regulatorias y roles en un solo camino de señal a respuesta documentada—primero los traspasos, no una sola pantalla hero.",
        outcomeBody:
          "Los equipos pudieron ensayar decisiones con insumos explícitos, mantener a operadores y revisores en el mismo mapa e iterar sin reescribir toda la historia en cada release.",
        siteUrl: "https://www.siveca.com.mx/",
        siteLabel: "siveca.com.mx",
      },
      engagements: [
        {
          title: "Cisco",
          meta: "Programas de campo y producto · 2023 – Presente",
          body:
            "Programas de tecnología e infraestructura para clientes privados y federales: trabajo operativo y de seguridad en sitio, traducción de requisitos a flujos usables y comunicación constante durante la entrega.",
        },
        {
          title: "Trato Hecho",
          meta: "Startup · producto y operaciones",
          body:
            "Contribución temprana en dirección de producto, sitio y contenido, prototipos en Figma, apoyo ligero a frontend y la coordinación cotidiana que las startups usan para avanzar.",
        },
        {
          title: "Eventos y programas",
          meta: "Logística, participantes, guión del día",
          body:
            "Coordinación de punta a punta para formatos presenciales—briefings, cronogramas, aliados o voluntarios, flujo de participantes y ajustes en el día cuando el plan choca con la realidad.",
        },
      ],
    },
    experience: {
      title: "Sistemas de experiencia",
      intro:
        "Talleres, showcases y programas comunitarios se comportan como productos operativos: tiempos, stakeholders, materiales y riesgo compartido en la sala. Los mismos hábitos aparecen en el trabajo seleccionado de arriba—desde SiVeCa hasta HUMI.",
      items: [
        "Guión del día y planes B para que el cronograma sobreviva a lo imprevisto",
        "Canales claros para participantes, anfitriones y aliados—antes, durante y después",
        "Logística como parte de la experiencia, no como apéndice",
        "Debriefs que convierten la fricción en la siguiente versión del playbook",
      ],
    },
    humi: {
      eyebrow: "Plataforma de largo plazo",
      title: "HUMI — academia, formación juvenil e infraestructura comunitaria",
      scale:
        "60+ alumnos activos durante el año · cohortes recurrentes · una clase magistral o evento especial al año",
      lead:
        "Un entorno comunitario de largo plazo, con estructura, constancia y traspasos humanos claros—no como pasatiempo.",
      paragraphs: [
        "Hace más de quince años HUMI opera como un lugar estable y estructurado—currículos y sala de entrenamiento junto a la planificación, la comunicación con familias y los traspasos que esperarías junto a un roadmap de producto.",
        "A nivel local se lee como infraestructura: turnos de coaching, apoyo a eventos y mentoría que dan a personas jóvenes práctica pagada en responsabilidad. La cara pública es una academia de taekwondo; debajo están los mismos hábitos que llevo a clientes—decisiones con dueño, ritmos semanales firmes y lenguaje claro para quien no vive en la operación.",
        "Una vez al año, una clase magistral o evento especial—producción acotada. Los invitados rotan por edición; a lo largo de los años han incluido entrenadores de nivel olímpico, artistas marciales de élite y atletas profesionales de UFC, nunca el mismo elenco en un solo fin de semana. Llevo contratos y viajes, registro y cupo, ensayo, traspasos con proveedores o seguridad y ejecución el día del evento.",
      ],
      items: [
        "Liderazgo entre temporadas: staff, estándares y vara de calidad",
        "Puente entre instructores, familias, sedes y expectativas de seguridad",
        "Inscripción, cobros y calendarios publicados como puntos de contacto recurrentes",
        "Producción anual: del alcance al guión del día y ajustes en sitio",
        "Canales hacia la comunidad que siguen legibles para quien no es operador",
        "Rutas pagadas para entrenadores jóvenes y asistentes—clases, eventos y roles de apoyo",
      ],
      eventsNote:
        "Los invitados se eligen por edición por profundidad; cada año es una sola producción con la misma vara que cualquier ventana fija.",
      siteUrl: "https://humisite.vercel.app/",
      siteLabel: "humisite.vercel.app",
    },
    approach: {
      title: "Cómo trabajo con equipos",
      subtitle:
        "Iteración, comunicación y estructura explícita ganan a la inspiración suelta. Muchas brechas de alineación son de vocabulario entre disciplinas, no de píxeles.",
      blocks: [
        {
          title: "Escuchar y alinear",
          text: "Dejar claro quién decide qué, para cuándo y con qué insumos. Que los trade-offs se puedan nombrar y los stakeholders no adivinen las restricciones del otro.",
        },
        {
          title: "Estructurar",
          text: "Convertir metas en flujos, rituales y artefactos reutilizables: journeys alineados a operaciones, UI lista para ticket o un brief de una página que todos puedan anotar.",
        },
        {
          title: "Prototipar",
          text: "Baja o media fidelidad a propósito—suficiente verdad para probar coordinación, copy y estados límite sin pulir una dirección que podrías descartar la próxima semana.",
        },
        {
          title: "Ejecutar y adaptar",
          text: "Cerca durante el despliegue: desbloquear adopción, captar sorpresas, ajustar mensajes y capacitación. El feedback de operaciones es feedback de producto.",
        },
      ],
    },
    about: {
      title: "Práctica multidisciplinaria de producto",
      body:
        "Formación en ingeniería en diseño digital y años entre UX, producto hands-on y coordinación del lado operaciones—en startups, programas venture-adjacentes y entrega a clientes. Fuera de esos contratos lidero HUMI, una academia y plataforma comunitaria de largo plazo donde cronogramas, cohortes, un programa anual con invitados y oportunidades locales de trabajo para entrenadores jóvenes corren con la misma rigurosidad operativa que un roadmap de producto. Traduzco entre especialistas y quienes deciden para que el equipo ejecute sin perder la intención.",
      pillars: [
        {
          title: "Producto",
          body: "Alcance, secuencia y oficio UX para software que la gente usa de verdad—no solo evalúa en una revisión.",
        },
        {
          title: "Operaciones",
          body: "Flujos, documentación y puntos de contacto que mantienen honestos los traspasos cuando sube el volumen, la norma o la presión de tiempo.",
        },
        {
          title: "Personas",
          body: "Facilitación, actualizaciones async y rituales ligeros para que grupos cross-funcionales se mantengan informados sin ahogarse en ruido.",
        },
      ],
    },
    contact: {
      title: "Di hola",
      body:
        "Si estás construyendo o operando algo que necesita estructura—no otro eslogan—envía una nota breve con en qué trabajas y cómo podría ayudar.",
    },
    footer: {
      tagline: "Producto, coordinación, ejecución",
      links: [
        { label: "SiVeCa", href: "https://www.siveca.com.mx/" },
        { label: "HUMI", href: "https://humisite.vercel.app/" },
      ],
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

