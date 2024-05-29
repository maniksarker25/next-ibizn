/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontSize: {
        title: '66px',
        subtitle: '22px'
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"]
      },
      
      colors: {
        primary: "#0080ff",
        secondary: "#2f2f30",
        hover: "#00afff",
        light: "#f1f2f2",
        gray:'#b2b2b2'
      },
    },
    
  },
  plugins: [require("flowbite/plugin")],
};
