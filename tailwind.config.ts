import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/dialogs/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./*.{html,js,ts,tsx}",
    "./public/**/*.{html,js,ts,tsx}",
  ],
  darkMode: "class", // ✅ Simplified dark mode handling
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "linear-1":
          "linear-gradient(0deg, rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.80))",
        "empty-workspace": "url(/img/en-jerneering-ui/empty-workspace-bg.png)",
      },
      // opacity: {
      //   15: 0.15, // ✅ Corrected numeric value
      // },
      colors: {
        primary: {
          900: "#E09D37",
          600: "#F7C343",
          400: "#FBE09D",
          100: "#FEF9EB",
        },
        nav: { 100: "#F0F0F0" },
        border: {
          100: "#EDEDED",
          200: "#E8E8E8",
          300: "#DBDBDB",
          400: "#8F8F8F",
          500: "#707070",
        },
        background: {
          50: "#F7F7F7",
          100: "#F2F2F2",
          200: "#EDEDED",
        },
        success: {
          50: "#F3FAF7",
          600: "#046C4E",
        },
        error: {
          50: "#FDF2F2",
          600: "#C81E1E",
        },
        sub: {
          400: "#8F8F8F",
          500: "#707070",
        },
        surface: {
          "separator-low": "#E5E5E5",
        },
      },
      fontSize: {
        ...defaultTheme.fontSize,
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "3xl": ["2rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem", { lineHeight: "3.375rem" }],
        "7xl": ["4rem", { lineHeight: "4.75rem" }],
        h3: ["2.5rem", { lineHeight: "3.5rem" }],
        h4: ["2rem", { lineHeight: "3rem" }],
      },
      lineHeight: {
        ...defaultTheme.lineHeight,
        h3: "3.5rem",
        h4: "3rem",
      },
      spacing: {
        ...defaultTheme.spacing,
        "4.5": "1.125rem",
        "7.5": "1.875rem",
        "8.5": "2.125rem",
        "12.5": "3.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "24.5": "6.125rem",
        "30": "7.5rem",
        "42": "10.5rem",
        "50": "12.5rem",
        "76": "19rem",
        "88": "22rem",
        "92": "23rem",
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
        1: "0.063rem",
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        menu: "0px 4px 6px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
        tooltip: "0px 2px 12px rgba(0, 0, 0, 0.1)",
        thumbnail:
          "0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1)",
        "comp-toolbar":
          "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)",
        checkbox: "0px 0px 0px 2px rgba(23, 23, 23, 0.1)",
      },
      gridTemplateColumns: {
        projects: "repeat(auto-fill, minmax(27.5rem, 1fr))",
        "elm-list": "repeat(auto-fill, minmax(9rem, 1fr))",
        "img-list": "repeat(auto-fill, 120px)",
      },
      aspectRatio: {
        "1.85/1": "1.85 / 1",
        "16/10": "16 / 10",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
