// tailwind.config.js

const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            // Tüm linkler
            a: {
              color: theme("colors.gray.700"),
              "&:hover": {
                color: theme("colors.gray.900"),
              },
            },
            // Başlıklar
            h1: {
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: theme("colors.gray.900"),
              // Scroll offset örneği
              scrollMarginTop: "5rem",
            },
            h2: {
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: theme("colors.gray.800"),
              scrollMarginTop: "5rem",
            },
            h3: {
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: theme("colors.gray.800"),
              scrollMarginTop: "5rem",
            },
            h4: {
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: theme("colors.gray.800"),
              scrollMarginTop: "5rem",
            },
            ul: {
              marginLeft: "1.5rem",
              listStyleType: "disc",
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              borderRadius: "0.25rem",
              padding: "0.2rem 0.4rem",
              fontSize: "0.875rem",
            },
            // Responsive tablo stili
            table: {
              width: "100%",
              maxWidth: "100%",
              display: "block",
              overflowX: "auto",
              borderCollapse: "collapse",
            },
          },
        },
      }),
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("@tailwindcss/typography")],
};
