import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbfcff",
        offwhite: "#f6f9fc",
        zapier: {
          orange: "#533afd",
          black: "#061b31",
          charcoal: "#273951",
          gray: "#64748d",
          sand: "#e5edf5",
          lightsand: "#f6f9fc",
        },
      },
      fontFamily: {
        display: ["Newsreader", "Noto Serif KR", "Source Sans 3", "Georgia", "serif"],
        sans: ["Source Sans 3", "Helvetica", "Arial", "sans-serif"],
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
