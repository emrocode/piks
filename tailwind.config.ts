import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        piks: {
          100: "#fefefe",
          200: "#ededed",
          300: "#d9580d",
          400: "#73280d",
          500: "#260b09",
        },
      },
      fontFamily: {
        sans: ["Noto Sans"],
      },
      gridTemplateColumns: {
        wrapper: "repeat(auto-fill,minmax(10rem,1fr))",
        emojis: "repeat(auto-fill,minmax(3rem,1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
