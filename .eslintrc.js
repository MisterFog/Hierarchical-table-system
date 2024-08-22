module.exports = {
  env: {
    browser: true,
    es6: true,
    es2017: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: '.',
    createDefaultProgram: true,
  },
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'react', 'prettier'],
  rules: {
    'no-nested-ternary': 'off',
    // '@typescript-eslint/no-unused-vars-experimental': 'error',
    // '@typescript-eslint/no-unused-vars': ['error'],
    // 'no-unused-vars': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'off',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit',
        },
      },
    ],
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-constructor',
          'protected-constructor',
          'private-constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
        ],
      },
    ],
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/prefer-namespace-keyword': 'warn',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    '@typescript-eslint/object-curly-spacing': 'error',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/destructuring-assignment': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'quote-props': ['warn', 'as-needed'],
    'import/no-named-as-default': 0,
    'import/no-cycle': 'off',
    'object-shorthand': 'warn',
    'sort-keys': 'off',
    'use-isnan': 'error',
    'import/order': 'error',
    'import/no-extraneous-dependencies': 'off',
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-quotes': ['warn', 'prefer-double'],
    'no-param-reassign': 'error',
    'no-shadow': 'off',
    radix: 'error',
    'default-case': 'error',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 0,
    eqeqeq: 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'warn',
    'no-undef-init': 'error',
    'no-fallthrough': 'error',
    'dot-notation': 'off',
    'no-caller': 'error',
    'no-bitwise': 'error',
    'no-console': 'off',
    'no-new-wrappers': 'error',
    'no-multiple-empty-lines': 'warn',
    'no-debugger': 'error',
    'constructor-super': 'error',
    'no-duplicate-case': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-irregular-whitespace': [
      'warn',
      {
        skipStrings: false,
      },
    ],
    'no-restricted-imports': [
      'warn',
      {
        name: 'rxjs/Rx',
        message: "Please don't use that. Regards, Your Team",
      },
    ],
    'no-labels': 'error',
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    curly: 'error',
    complexity: 'off',
    'eol-last': ['error', 'always'],
    'guard-for-in': 'error',
    'spaced-comment': ['error', 'always'],
    'arrow-parens': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': [0],
    'react/prop-types': [
      0,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/require-default-props': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'never',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['singleline-const', 'let', 'var'],
        next: ['singleline-const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: ['expression'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: 'export',
        next: 'export',
      },
      {
        blankLine: 'always',
        prev: 'function',
        next: 'function',
      },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
