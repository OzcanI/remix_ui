/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom_1: '0 2px 16px 0 rgba(0, 0, 0, 0.1)'
      },
      fontSize: {
        title: '22px',
        description: '16px',
        sm_action: '14px',
      },
      colors: {
        "dark-blue-grey": "#1f2a4b",
        "dark-sky-blue": "#4a77e5",
        "cool-grey": "#9ea3b2",
        "cool-grey-2": '#a1a4ad',
      }
    },
  },
  plugins: [],
}
