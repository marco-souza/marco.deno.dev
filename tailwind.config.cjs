const daisyPlugin = require("daisyui");

console.log(daisyPlugin);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [daisyPlugin],
};
