/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        surface: "#fafafa",
        "surface-container-low": "#f4f4f5",
        "surface-container-lowest": "#ffffff",
        primary: "#09090b", // Deep zinc-950 obsidian ink
        "on-primary": "#ffffff",
        secondary: "#18181b", // zinc-900
        outline: "#e4e4e7", // zinc-200 hairline
        "outline-variant": "#f4f4f5", // zinc-100 divider
        "on-surface-variant": "#71717a", // zinc-500 metadata
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2.5rem",
        full: "9999px"
      },
      spacing: {
        "margin-safe": "8vw",
        "element-gap": "4rem",
        "fine-line": "1px",
        "section-gap": "8rem"
      },
      fontFamily: {
        "display-lg": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "display-lg-mobile": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"]
      },
      fontSize: {
        "display-lg": ["68px", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "300" }],
        "body-sm": ["14px", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.75", letterSpacing: "-0.01em", fontWeight: "300" }],
        "headline-md": ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "300" }],
        "label-caps": ["11px", { lineHeight: "1", letterSpacing: "0.15em", fontWeight: "600" }]
      }
    },
  },
  plugins: [],
}
