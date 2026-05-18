/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      phone: "420px",
      tablet: "760px",
      laptop: "1040px",
      desktop: "1280px"
    },
    extend: {
      colors: {
        page: "#f5f2ed",
        panel: "#fffaf3",
        ink: "#1f2933",
        muted: "#667085",
        brand: "#315c50",
        accent: "#9b5f43",
        line: "#ded7cd"
      }
    }
  }
};

export default config;
