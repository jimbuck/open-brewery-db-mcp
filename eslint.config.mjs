import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';

import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

import tsParser from '@typescript-eslint/parser';

import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([{
  extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
  files: ['src/**/*.ts'],
  plugins: {
    '@typescript-eslint': typescriptEslint,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },

    parser: tsParser,
    ecmaVersion: 12,
    sourceType: 'module',
  },

  rules: {
    'max-len': 'off',
    'no-trailing-spaces': 'warn',
    'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true, 'mode': 'minimum' }],
    'semi': ['warn', 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
    'arrow-parens': ['warn', 'as-needed'],
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    'func-style': ['warn', 'declaration'],
    'eqeqeq': ['error'],
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    '@typescript-eslint/explicit-member-accessibility': ['error', { 'accessibility': 'explicit', 'overrides': { 'constructors': 'off' } }],
    '@typescript-eslint/no-non-null-assertion': ['off'],
  },
}]);