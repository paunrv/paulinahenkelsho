import { Reveal } from "@/components/motion/Reveal";

const pillars = [
  {
    title: "Systems",
    body: "I map incentives, constraints, and feedback loops before pixels — so the product can scale without losing coherence.",
  },
  {
    title: "Product",
    body: "Shipping is a design skill: scope, sequencing, and the narrative you give teams when trade-offs are unavoidable.",
  },
  {
    title: "Environment",
    body: "Digital work has material consequences. I favor durable patterns, accessible defaults, and honest lifecycle thinking.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="border-b border-neutral-200/90 py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
          <Reveal className="md:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              About
            </p>
            <h2 className="mt-4 font-display text-display-sm font-light text-neutral-950">
              Grounded in how things connect.
            </h2>
            <p className="mt-6 text-neutral-600 leading-relaxed">
              I work with teams building in regulated, technical, or politically
              sensitive spaces — where the cost of ambiguity is real, and the
              interface has to earn trust every session.
            </p>
          </Reveal>
          <div className="md:col-span-7">
            <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
              {pillars.map((item, i) => (
                <li key={item.title}>
                  <Reveal delay={i * 0.08}>
                    <div className="grid gap-3 py-8 md:grid-cols-5 md:gap-8 md:py-10">
                      <span className="font-display text-lg font-light text-neutral-950 md:col-span-2">
                        {item.title}
                      </span>
                      <p className="text-sm leading-relaxed text-neutral-600 md:col-span-3">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
