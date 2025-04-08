module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  env: {
    node: true,
    es6: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Allow any type for ease of development
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Don't require explicit return types
    'no-unused-vars': 'off', // TypeScript has its own unused vars check
    '@typescript-eslint/no-unused-vars': ['warn', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true 
    }]
  },
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    'test/**/*',
    '*.js'
  ]
};