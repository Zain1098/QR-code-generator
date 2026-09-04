import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Stitch Atelier & Editorial Palette
        "canvas-paper": "#F8F7F4",
        "surface-workbench": "#FFFFFF",
        "print-bed": "#F4F2EC",
        "ink-primary": "#18181B",
        "ink-muted": "#71717A",
        "border-hairpin": "#E4E4E7",
        
        // Stitch Darkroom / Dark Atelier Palette
        "dark-canvas": "#121316",
        "dark-surface": "#181a1f",
        "dark-panel": "#1c1d22",
        "dark-border": "#262932",
        "dark-border-strong": "#2a2d35",
        "dark-ink-primary": "#f4f3ef",
        "dark-ink-muted": "#8e929b",
        "dark-accent": "#645efb",
        "dark-accent-hover": "#818cf8",

        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          950: "#1E1B4B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      spacing: {
        hairpin: "1px",
      },
    },
  },
  plugins: [],
};

export default config;
