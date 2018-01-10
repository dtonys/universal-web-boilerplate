'use strict';

module.exports = {
  'extends': 'eslint-config-airbnb',
  'env': {
    'browser': true,
    'node': true,
  },
  'parser': 'babel-eslint',
  'rules': {
    // eslint-config-airbnb-base/rules/best-practices.js
    'block-scoped-var': 'warn',
    'class-methods-use-this': 'off',
    'curly': ['warn', 'multi-line'],
    'dot-notation': 'off',
    'guard-for-in': 'off',
    'no-case-declarations': 'warn',
    'no-implicit-coercion': ['warn', {
      boolean: false,
      number: true,
      string: true,
      allow: [],
    }],
    'no-multi-spaces': [
      'warn', {
        'exceptions': {
          'VariableDeclarator': true,
          'ImportDeclaration': true
        }
      }
    ],
    'no-param-reassign': 'off',
    'no-useless-concat': 'off',
    'prefer-destructuring': 'off',

    // eslint-config-airbnb-base/rules/errors.js
    'no-console': 'warn',

    // eslint-config-airbnb-base/rules/node.js
    'global-require': 'off',

    // eslint-config-airbnb-base/rules/style.js
    'array-bracket-spacing': [ 'warn', 'always' ],
    'brace-style': [ 'warn', 'stroustrup', {
      'allowSingleLine': true
    }],
    'camelcase': 'warn',
    'comma-dangle': [ 'warn', 'always-multiline' ],
    'computed-property-spacing': 'off',
    'func-names': 'warn',
    'id-length': [
      'warn', {
        'min': 2,
        'exceptions': [ '_', '$', 'i', 'j', 'k', 'x', 'y', 'e', 't' ]
      }
    ],
    'indent': [ 'warn', 2, {
      'SwitchCase': 1
    }],
    'linebreak-style': [ 'warn', 'unix' ],
    'lines-around-directive': 'off',
    'max-len': [ 'warn', 250, 4, { 'ignoreComments': true } ],
    'newline-per-chained-call': 'off',
    'no-bitwise': 'off',
    'no-continue': 'off',
    'no-mixed-operators': 'off',
    'no-multiple-empty-lines': [
      'warn', {
        'max': 2,
        'maxEOF': 1
      }
    ],
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-trailing-spaces': [
      'warn', {
        'skipBlankLines': true
      }
    ],
    'no-underscore-dangle': 'off',
    'object-curly-spacing': [ 'warn', 'always' ],
    'padded-blocks': 'off',
    'quotes': [ 'warn', 'single', 'avoid-escape' ],
    'space-before-blocks': 'warn',
    'space-before-function-paren': [ 'warn', {
      'anonymous': 'always',
      'named': 'never'
    }],
    'space-in-parens': 'off',
    'spaced-comment': 'warn',
    'keyword-spacing': 'warn',

    // eslint-config-airbnb-base/rules/variables.js
    'no-shadow': 'warn',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'warn',
    'no-useless-escape': 'off',

    // eslint-config-airbnb-base/rules/es6.js
    'arrow-body-style': 'off',
    'arrow-parens': [ 'warn', 'always' ],
    'no-var': 'warn',
    'object-shorthand': 'off',
    'prefer-arrow-callback': 'warn',
    'prefer-template': 'off',

    // eslint-config-airbnb-base/rules/imports.js
    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': [ 'error', {
      'allowComputed': false
    }],
    'import/no-extraneous-dependencies': [ 'error', {
      'devDependencies': true
    }],
    'import/newline-after-import': 'off',
    'import/imports-first': 'off',
    'import/no-unresolved': [ 'error', {} ],
    'import/no-named-as-default': 'error',
    'import/extensions': [ 'warn', 'always', {
      '': 'never',
      'js': 'never',
    }],
    'import/no-deprecated': 'warn',

    // eslint-config-airbnb/rules/react.js
    "react/prop-types": "warn",
    "react/forbid-prop-types": "off",
    "react/forbid-foreign-prop-types": "off",
    "react/no-unused-prop-types": "off",
    "react/react-in-jsx-scope": "error",
    "react/jsx-filename-extension": [ "warn", { "extensions": [ ".js", ".jsx" ] } ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-quotes": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-curly-spacing": "off",
    "react/jsx-indent": "off",
    "react/self-closing-comp": [ "warn", { "component": true, "html": false } ],
    "react/no-multi-comp": "off",
    "react/sort-comp": "off",
    "react/prefer-stateless-function": "warn",
    "react/no-children-prop": "off",
    "react/no-danger-with-children": "error",
    "jsx-quotes": "error",

    // eslint-config-airbnb/rules/react-a11y.js
    "jsx-a11y/img-redundant-alt": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/no-static-element-interactions": "off",

  },
  'plugins': [
    'import',
  ],
  'settings': {
    'import/ignore': [
      'node_modules',
      '\\.(scss|less|css)$',
    ],
    'import/resolver': {
      'node': {
        'moduleDirectory': [
          'node_modules',
          './src',
        ],
      },
    },
  },
};
