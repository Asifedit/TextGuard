/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                blue: "#0051ff",
                green: "#3deb08",
                sky: "#CAEBF2",
                black: "#A9A9A9",
                red: "#FF3A3F",
                white: "#EFEFEF",
            },
            fontFamily: {
                A: ["Audiowide", "sans-serif"],
                U: ["Unbounded", "sans-serif"],
                M: ["Merienda", "sans-serif"],
                BS: ["Bree Serif", "serif"],
            },
        },
    },
    plugins: [],
};
