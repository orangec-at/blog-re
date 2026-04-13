import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fffefb",
        offwhite: "#fffdf9",
        zapier: {
          orange: "#ff4f00",
          black: "#201515",
          charcoal: "#36342e",
          gray: "#939084",
          sand: "#c5c0b1",
          lightsand: "#eceae3",
        },
      },
      fontFamily: {
        display: ["Degular Display", "Inter", "Helvetica", "Arial", "sans-serif"],
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
        serif: ["GT Alpina", "Georgia", "serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        xs: "3px",
        base: "5px",
        lg: "8px",
        pill: "20px",
      },
      boxShadow: {
        "tab-active": "rgb(255, 79, 0) 0px -4px 0px 0px inset",
        "tab-hover": "rgb(197, 192, 177) 0px -4px 0px 0px inset",
      },
    },
  },
  plugins: [],
};

export default config;
