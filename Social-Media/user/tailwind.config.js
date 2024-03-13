/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-img': "url('../../../../assets/img/bg-img.jpg')",
      }
    }
  },
  plugins: [],
}

