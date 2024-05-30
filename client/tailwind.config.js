// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [flowbite.plugin(), require("tailwindcss-animated")],
};
