/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "1/8": "10%",
        "7/8": "90%",
      },
      width: {
        "1/8": "10%",
        "7/8": "90%",
      },
      colors: {
        "mc-bg":     "#030C1A",
        "mc-dark":   "#060F1E",
        "mc-panel":  "#08121E",
        "mc-blue":   "#00D4FF",
        "mc-bdark":  "#004A66",
        "mc-green":  "#00FF88",
        "mc-amber":  "#F6C90E",
        "mc-red":    "#FF4444",
        "mc-text":   "#C8D8E8",
        "mc-dim":    "#3D5166",
        // backward compat aliases
        "cyan-400":  "#00D4FF",
        "sky-950":   "#030C1A",
        "sky-900":   "#060F1E",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Share Tech Mono'", "monospace"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "scan-line": "scanLine 8s linear infinite",
        "glitch": "glitch 0.4s steps(2) infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%":   { textShadow: "2px 0 #00D4FF, -2px 0 #FF4444" },
          "25%":  { textShadow: "-2px 0 #00D4FF, 2px 0 #FF4444" },
          "50%":  { textShadow: "2px 0 #FF4444, -2px 0 #00D4FF" },
          "75%":  { textShadow: "-2px 0 #FF4444, 2px 0 #00D4FF" },
          "100%": { textShadow: "none" },
        },
      },
    },
  },
  plugins: [],
};
