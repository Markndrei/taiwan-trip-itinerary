import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        ink: "#0D0D0D",
        paper: "#F5F0E8",
        red: "#C0392B",
        vermillion: "#E84923",
        gold: "#D4A017",
        jade: "#1A6B4A",
        mist: "#E8EDF0",
        ash: "#8B8680",
      },
    },
  },
  plugins: [],
};
export default config;