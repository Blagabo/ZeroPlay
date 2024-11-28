import eslintPluginAstro from "eslint-plugin-astro"
import js from "@eslint/js"
import ts from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import jsxA11y from "eslint-plugin-jsx-a11y"
import globals from "globals"

export default [
	// Configuración genérica
	js.configs.recommended,
	// Configuración para TypeScript
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			"@typescript-eslint": ts,
		},
		languageOptions: {
			parser: tsParser,
		},
		rules: {
			...ts.configs.recommended.rules,
		},
	},
	// Configuración para Astro
	...eslintPluginAstro.configs["jsx-a11y-recommended"],
	// Configuración para JSX accesibilidad
	{
		files: ["**/*.jsx", "**/*.tsx"],
		plugins: {
			"jsx-a11y": jsxA11y,
		},
		rules: {
			...jsxA11y.configs.recommended.rules,
		},
	},
	{
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		ignores: ["node_modules", "dist"],
	},
	{
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
]
