import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07110d",
        foreground: "#f6f7f2",
        panel: "#0d1713",
        line: "rgba(255,255,255,0.08)",
        whatsapp: "#25d366",
        mint: "#8ff7b0",
        lime: "#d8ff74",
      },
      boxShadow: {
        glow: "0 0 80px rgba(37, 211, 102, 0.14)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
