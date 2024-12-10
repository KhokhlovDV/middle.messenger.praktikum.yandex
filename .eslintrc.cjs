module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: true,
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'airbnb/base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'linebreak-style': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        'operator-linebreak': 'off',
        'implicit-arrow-linebreak': 'off',
        'class-methods-use-this': 'off',
        'no-new': 'off',
        'function-paren-newline': 'off',
    },
    ignorePatterns: ['*.config.js'],
};
