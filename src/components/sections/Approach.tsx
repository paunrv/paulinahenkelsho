import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Frame the decision",
    text: "Name the user, the risk, and the decision the product is optimizing for — in language stakeholders can disagree with productively.",
  },
  {
    n: "02",
    title: "Model the system",
    text: "Map objects, states, and handoffs. Design the schema of the experience: what is always visible, what is one deliberate layer deeper.",
  },
  {
    n: "03",
    title: "Prototype the narrative",
    text: "Use flows and copy as one surface. Test whether people can explain back what happened — not just whether they clicked through.",
  },
  {
    n: "04",
    title: "Ship and calibrate",
    text: "Instrument for learning, tighten edge cases, and leave the team with patterns that make the next release faster, not slower.",
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="border-b border-neutral-200/90 bg-white py-section"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
            Approach
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-display-sm font-light text-neutral-950">
            How I think — a loop, not a checklist.
          </h2>
        </Reveal>

        <ol className="mt-16 list-none space-y-px bg-neutral-200 md:mt-20 md:grid md:grid-cols-2 md:gap-px">
          {steps.map((step, i) => (
            <li key={step.n} className="bg-white">
              <Reveal delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col gap-4 px-0 py-8 md:p-10 lg:p-12">
                  <span className="font-mono text-xs tabular-nums text-neutral-400">
                    {step.n}
                  </span>
                  <h3 className="font-display text-xl font-light text-neutral-950 md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
