/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#500000",
        Recognized: "#BDE7BE",
        Recognized_Border: "#77DD75",
        Not_Recognized: "#FFB6B3",
        Not_Recognized_Border: "#FF6962",
        Renewing_Recognition: "#FAEF9B",
        Renewing_Recognition_Border: "#FFC700",
        Recognized_with_Restrictions: "#BDE7BD",
        Recognized_with_Restrictions_Border: "#77DD76",
        Exempt_from_Recognition: "#ccdbfd",
        Exempt_from_Recognition_Border: "#68b6ef",
        Pending_Recognition: "#FAEF9B",
        Pending_Recognition_Border: "#FFC700",
        Recognized_with_Suspension: "#FAEF9B",
        Recognized_with_Suspension_Border: "#FFC700"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}