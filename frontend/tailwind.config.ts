import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bgColor: {
          light: "#fafafa",
          DEFAULT: "#0F1020",
          dark: "#0F1020",
        },
        textColor: {
          light: "#0F1020",
          DEFAULT: "#fafafa",
          dark: "#fafafa",
        },
        main: "#CC3F0C",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
