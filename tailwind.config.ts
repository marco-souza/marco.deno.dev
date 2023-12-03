import { type Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  darkMode: "class",
  selfURL: import.meta.url,
  plugins: [daisyui],
  content: [
    "{routes,islands,packages}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "zoom-in": "zoom-in .2s forwards",
      },
      keyframes: {
        "zoom-in": {
          "100%": { transform: "scale(1.1)" },
        },
      },
    },
  },
} as Config;
