import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ["var(--font-merriweather)"],
        lato: ["var(--font-font-lato)"],
      },
      colors: {
        primary: "#FFCC00",
        secondary: "#086060",
        other: "#B4D7D7",
      },
    },
  },
  plugins: [],
} satisfies Config;
