/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mainFone: '#212123',
        compTem :'#191919',
        dGrey : '#576067',
        lGrey : '#B8B8B8',
        purpure : '#8B57C6',
        dpurpure : '#6C3EB8'

}
    },  fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [],
}