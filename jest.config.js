module.exports = {
  testMatch: [ "**/__tests__/**/*.spec.[jt]s?(x)"],
	// testMatch: ['<rootDir>/svelte/__tests__/specs/**/*.spec.js'],
	transform: {
		'^.+\\.m?(j|t)s$': 'babel-jest',
		'^.+\\.svelte$': ['svelte-jester', {preprocess: true}],
		// '^.+\\.svelte$': ['svelte-jester'],
		/**
		* transform any svelte components in node_modules with svelte-jester
		*/
		'node_modules/.+\\.svelte$': ['svelte-jester'],
    // 'node_modules/.+\\.m?(j|t)s$': 'babel-jest'
	},
	moduleFileExtensions: ['js', 'svelte'],
	bail: false,
	moduleNameMapper: {
		'^@([A-Z].*)$': '<rootDir>/src/$1'
	},
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect',
		// "<rootDir>/jest.setup.js"
	]
};
