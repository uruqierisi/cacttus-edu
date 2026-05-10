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
        purple: {
          DEFAULT: "#8E4897",
          dark: "#5C2F65",
          light: "#B06BBD",
          glow: "rgba(142,72,151,0.3)",
        },
        bg: {
          DEFAULT: "#0F0A14",
          card: "#1A1025",
          border: "rgba(142,72,151,0.2)",
        },
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
      },
      backgroundImage: {
        "purple-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(142,72,151,0.3) 0%, transparent 60%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(142,72,151,0.1) 0%, rgba(92,47,101,0.05) 100%)",
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
