/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // La clase .container se define a medida en styles.css; el plugin de Tailwind
  // añadía max-width por breakpoint que estrechaba el contenido entre 640 y 1280px.
  corePlugins: { container: false },
  theme: { extend: {} },
  plugins: [],
}
