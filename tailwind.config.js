/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          headlines: "#212529",
          validations: "#6c757d",
          violet: "#8338ec",
          pink: "#ff006e",
          orange: "#fb5607",
          blue: "#3a86ff",
          yellow: "#f7bc30",
          green: "#08a508",
        },
        secondary: {
          pink: "#ff66a8",
          orange: "#fd9a6a",
          blue: "#89b6ff",
          yellow: "#ffd86d",
          headlines: "#343a40",
        },
      },
    },
  },
  plugins: [],
};
