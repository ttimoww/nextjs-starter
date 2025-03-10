/** @type {import('prettier').Config} */

module.exports = {
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'none',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',
	printWidth: 120,
	importOrder: [
		'^(react/(.*)$)|^(react$)',
		'^(next/(.*)$)|^(next$)',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@/actions/(.*)$',
		'',
		'^@/lib/(.*)$',
		'',
		'^@/services(.*)$',
		'',
		'^@/hooks/(.*)$',
		'',
		'^@/components/ui/(.*)$',
		'',
		'^@/components/(.*)$',
		'',
		'^@/styles/(.*)$',
		'',
		'^[./]'
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	plugins: ['prettier-plugin-embed', '@ianvs/prettier-plugin-sort-imports']
};
