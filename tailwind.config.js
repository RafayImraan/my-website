/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0f0f0f",
        border: "#1a1a1a",
        accent: "#00e5ff",
        "accent-glow": "rgba(0, 229, 255, 0.15)",
        "accent-2": "#c8a96e",
        "text-primary": "#f0ece3",
        "text-muted": "#6b7280",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      animation: {
        "grid-scroll": "grid-scroll 20s linear infinite",
        "pulse-cyan": "pulse-cyan 4s ease-in-out infinite",
      },
      keyframes: {
        "grid-scroll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "pulse-cyan": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
