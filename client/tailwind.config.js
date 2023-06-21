/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "blackbg": "#050a11",
        "blue-1": "#00132D",
        "blue-2": "#00193B",
        "blue-3": "#001E45",
        "blue-4": "#002657",
        "blue-5": "#002D67",
        "blue-6": "#00377E"
      },
      padding: {
        "navx": "4rem",
        "navy": "1rem",
        "mobilex": "1rem",
        "mobiley": "1rem"
    }
    },
  },
  plugins: [],
}
