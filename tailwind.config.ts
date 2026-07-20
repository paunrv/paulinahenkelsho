import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        page: "rgb(var(--ph-bg) / <alpha-value>)",
        surface: "rgb(var(--ph-surface) / <alpha-value>)",
        ink: "rgb(var(--ph-text) / <alpha-value>)",
        muted: "rgb(var(--ph-text-muted) / <alpha-value>)",
        subtle: "rgb(var(--ph-text-subtle) / <alpha-value>)",
        line: "rgb(var(--ph-border) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--ph-accent) / <alpha-value>)",
          soft: "rgb(var(--ph-accent-soft) / <alpha-value>)",
        },
        lavender: {
          DEFAULT: "rgb(var(--ph-accent-2) / <alpha-value>)",
          soft: "rgb(var(--ph-accent-2-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "title-sm": [
          "clamp(1.875rem, 4vw, 2.75rem)",
          { lineHeight: "1.12", letterSpacing: "-0.025em" },
        ],
        "title-md": [
          "clamp(2.25rem, 5vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em" },
        ],
        "title-lg": [
          "clamp(2.75rem, 6.5vw, 4.5rem)",
          { lineHeight: "1.06", letterSpacing: "-0.032em" },
        ],
        "display-sm": [
          "clamp(2.5rem, 6vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        display: [
          "clamp(3rem, 8vw, 5.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.035em" },
        ],
        "display-lg": [
          "clamp(3.25rem, 9vw, 6.25rem)",
          { lineHeight: "1", letterSpacing: "-0.038em" },
        ],
        "display-xl": [
          "clamp(3.5rem, 10vw, 7.5rem)",
          { lineHeight: "0.97", letterSpacing: "-0.04em" },
        ],
      },
      spacing: {
        section: "clamp(5rem, 14vw, 11rem)",
        "section-tight": "clamp(4rem, 10vw, 8rem)",
        gutter: "clamp(1.25rem, 4vw, 2.5rem)",
      },
      borderRadius: {
        surface: "var(--ph-radius)",
      },
      boxShadow: {
        soft: "var(--ph-shadow)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
