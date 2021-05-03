module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
	},
	extends: "airbnb-base",
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: [
			"error",
			"tab",
		],
		"no-tabs": 0,
		"no-console": 0,
		"no-underscore-dangle": 0,
		"linebreak-style": [
			"error",
			"unix",
		],
		quotes: [
			"error",
			"double",
		],
		semi: [
			"error",
			"never",
		],
	},
}
