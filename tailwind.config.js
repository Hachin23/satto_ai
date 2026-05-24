/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Rails側のビュー（erb）でもTailwindを使えるようにしておく
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    // Vue や TS のソースコードが置かれる場所
    "./app/frontend/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
