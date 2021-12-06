module.exports = {
    root: true,
    env: {
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        "ecmaVersion": 7,
        "sourceType": "module"
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'warn',
    },
}

