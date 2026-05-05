import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "display-sm": ["clamp(2.5rem,6vw,4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        display: ["clamp(3rem,8vw,5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3.5rem,10vw,7rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
      },
      spacing: {
        section: "clamp(5rem,12vw,10rem)",
        gutter: "clamp(1.25rem,4vw,2.5rem)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
