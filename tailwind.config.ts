import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F1B33",
          50: "#F2F4F8",
          100: "#E1E6EF",
          700: "#1B2E52",
          800: "#152442",
          900: "#0F1B33",
        },
        teal: {
          DEFAULT: "#0E7C7B",
          50: "#EAF5F5",
          100: "#D2EAE9",
          600: "#0E7C7B",
          700: "#0B6363",
        },
        mint: {
          DEFAULT: "#02C39A",
          50: "#E6FAF4",
          100: "#C8F4E7",
          600: "#02C39A",
          700: "#029A7A",
        },
        offwhite: "#F7F9FB",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 27, 51, 0.04), 0 8px 24px rgba(15, 27, 51, 0.06)",
        lift: "0 2px 4px rgba(15, 27, 51, 0.05), 0 16px 40px rgba(15, 27, 51, 0.10)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 260ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
