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
        "7/8": "90%"
      },
      width: {
        "1/8": "10%",
        "7/8": "90%"
      },
      colors: {
        "cyan-400": "#64FFDA",
        "sky-950": "#0a192f",
        "sky-900": "#0d203c"
      }
    },
  },
  plugins: [],
}

