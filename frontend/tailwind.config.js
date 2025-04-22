/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        slidein:{
          from:{
            opacity:"0",
            transform:"translate(-10px)"
          },
          to:{
            opacity:1,
            transform:"translate(0)"
          }
        }
      },
      animation:{
        slidein:"slidein 1s ease 300ms",
      }
    },
  },
  plugins: [],
}

