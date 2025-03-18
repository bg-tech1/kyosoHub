/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // 背景色
        primary: "#fff5e0",
        // メインボタンの色
        secondary: "#ffbe5c",
        // メインボタンのホバー時
        tertiary: "#ffa84c",
        // 承認ボタンの色
        accept: "#369E59",
        // 拒否ボタンの色
        reject: "#F23635",
      },
    },
  },
  plugins: [],
}