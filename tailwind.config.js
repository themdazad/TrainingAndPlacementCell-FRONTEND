/** @type {import('tailwindcss').Config} */
import {heroui} from "@heroui/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "logo-cloud": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 4rem))" },
        },
        "scroll-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        "logo-cloud": "logo-cloud 30s linear infinite", // Adjust duration and timing as needed for your design.
        "scroll-up": "scroll-up 20s linear infinite",
      },
    },
  },

  darkMode: "class",
  plugins: [heroui()],
};
