import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        bg: {
          primary: "#06060F",
          secondary: "#0C0C1A",
          card: "#0F0F1E",
          elevated: "#141425",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          accent: "rgba(79,142,247,0.25)",
          subtle: "rgba(255,255,255,0.04)",
        },
        text: {
          primary: "#F0F2FF",
          secondary: "#7A8299",
          muted: "#4A5168",
          accent: "#4F8EF7",
        },
        accent: {
          DEFAULT: "#4F8EF7",
          dim: "#1E3360",
          glow: "rgba(79,142,247,0.15)",
          bright: "#7EB3FF",
        },
        success: "#34D399",
        warning: "#F59E0B",
        error: "#F87171",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "radial-glow": "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(79,142,247,0.15), transparent)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
      backgroundSize: {
        "grid-sm": "40px 40px",
        "grid-md": "60px 60px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "border-flow": "borderFlow 4s linear infinite",
        "slide-right": "slideRight 0.4s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      boxShadow: {
        "card-default": "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(79,142,247,0.2), 0 0 20px rgba(79,142,247,0.08)",
        "accent-glow": "0 0 30px rgba(79,142,247,0.2)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
