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
        aqBase: "#032316",       // Deep base background
        aqButton: "#25AC4C",     // Vibrant button color
        aqGlow: "#064E34",       // Secondary tint for card/box layers
      },
      boxShadow: {
        // Soft neon glow effect using your colors
        'btnGlow': '0 0 15px rgba(37, 172, 76, 0.4)',
        'cardGlow': '0 0 25px rgba(6, 78, 52, 0.6)',
      }
    },
  },
  plugins: [],
};
export default config;