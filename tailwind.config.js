/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Audiowide', 'ui-sans-serif', 'system-ui'],
        display: ['"Rajdhani"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        sand: {
          50:  "#f4efe9",
          100: "#efe6da",
          200: "#e4d5c3",
          300: "#d6c2aa",
          400: "#c6a88a",
          500: "#b98b66",   // mid caramel
          600: "#a97955",
          700: "#8f5f40",
          800: "#744c33",
          900: "#5b3a28",
        },
      },
      boxShadow: {
        soft: "0 6px 18px rgba(0,0,0,0.08)",
        card: "0 10px 24px rgba(0,0,0,0.10)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.05)",
      },
      dropShadow: {
        logo: "0 1px 0 rgba(255,255,255,.4)",
      },
      letterSpacing: {
        wider2: ".08em",
      },
    },
  },
  plugins: [],
};
