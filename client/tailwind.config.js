/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0D96B4",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
