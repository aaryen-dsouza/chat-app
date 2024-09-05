/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        chatscreen: "rgba(17, 25, 40, 0.75)",
        searchBar: "rgba(17, 25, 40, 0.50)",
        textSub: "#9e9e9e",
        sendBtn: "#5183fe",
      },
    },
  },
  plugins: [],
};
