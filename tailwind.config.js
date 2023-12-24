/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 3s linear infinite'
			}
		}
	},
	plugins: []
};
