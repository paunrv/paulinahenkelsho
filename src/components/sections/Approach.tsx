import { Reveal } from "@/components/motion/Reveal";

const blocks = [
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
];

export function Approach() {
  return (
    <section
      id="approach"
      className="border-t border-neutral-200/80 bg-neutral-100 py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <Reveal>
          <h2 className="max-w-3xl font-display text-title-md font-light text-neutral-950 text-balance">
            How I think — a loop, not a checklist
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.65] text-neutral-600">
            Most products fail at the structure level, not the interface.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px bg-neutral-200/90 md:mt-20 md:grid-cols-2">
          {blocks.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.05}>
              <div className="flex h-full flex-col bg-white p-8 md:p-10 lg:p-12">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-2xl font-light tracking-[-0.02em] text-neutral-950">
                  {block.title}
                </h3>
                <p className="mt-4 text-sm leading-[1.65] text-neutral-600">
                  {block.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
