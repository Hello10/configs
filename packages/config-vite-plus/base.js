// Shared Vite+ settings. Keep these the same across repos; `pack` and `test`
// stay per repo. See the README for the choices and why they differ from the
// Vite+ defaults.

export const lint = {
	jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
	options: { typeAware: true, typeCheck: true },
	rules: {
		"vite-plus/prefer-vite-plus-imports": "error",
		"no-unused-vars": [
			"warn",
			{ args: "all", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
		],
	},
};

export const fmt = {
	useTabs: true,
	printWidth: 80,
	sortImports: {},
	sortPackageJson: false,
	ignorePatterns: ["**/*.md"],
};

export const staged = { "*": "vp check --fix" };
