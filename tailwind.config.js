/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				dark: {
					background: "#333",
					text: "#ddd"
				},
				light: {
					background: "#fff",
					text: "#111"
				}
			}
		}
	}
};
