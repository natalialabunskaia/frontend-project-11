import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, stylistic },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      'stylistic/semi': ['error', 'never'],
      'stylistic/comma-dangle': ['error', 'always-multiline'], 
      'stylistic/eol-last': ['error', 'always'],
      'stylistic/spaced-comment': ['error', 'always'],
      'stylistic/arrow-parens': ['error', 'as-needed'],
      'stylistic/padded-blocks': ['error', 'never'],
      'stylistic/operator-linebreak': ['error', 'before'],
      'stylistic/brace-style': ['error', '1tbs'],

    },
  },
])
