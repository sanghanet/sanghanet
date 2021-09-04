module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['jasmine'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:jasmine/recommended',
    ],
    env: {
        jasmine: true,
    },
    rules: {
        'jasmine/missing-expect': 'error',
        '@typescript-eslint/no-explicit-any': 0,
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'arrow-parens': ['error', 'always'],
        'semi': ['error', 'always']
    },
};