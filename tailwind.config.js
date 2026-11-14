export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ivory:'#F8F4EC', cream:'#EEE8DC', rose:'#D6A4A7', plum:'#C58F98', lav:'#C9C1D5', brown:'#78665C', ink:'#343235' },
    fontFamily: {
      serif: ['"Cormorant Garamond"','"Noto Serif JP"','serif'],
      jp: ['"Noto Serif JP"','serif'],
      sans: ['Inter','"Noto Sans JP"','system-ui','sans-serif']
    }
  } }
}
