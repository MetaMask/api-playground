module.exports = {
  root: true,

  settings: {
    react: {
      version: 'detect',
    },
  },

  parserOptions: {
    sourceType: 'module',
  },

  extends: ['@metamask/eslint-config'],

  overrides: [
    {
      files: ['*.ts'],
      extends: ['@metamask/eslint-config-typescript'],
    },
    {
      files: ['*.js'],
      rules: {
        'node/exports-style': 'off',
      },
      extends: ['@metamask/eslint-config-nodejs'],
    },
    {
      files: ['gatsby-browser.js', 'gatsby-ssr.js'],
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: ['plugin:react/recommended'],
    },

    {
      files: ['*.test.ts', '*.test.js'],
      extends: ['@metamask/eslint-config-jest'],
    },
  ],

  ignorePatterns: ['!.eslintrc.js', 'dist/', 'public/'],
};
