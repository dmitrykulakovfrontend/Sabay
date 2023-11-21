import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ["var(--font-merriweather)"],
        lato: ["var(--font-font-lato)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
