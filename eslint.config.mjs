import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends(
      'next/core-web-vitals',
      'next/typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ),

    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'import/order': 'warn',
      'react/no-array-index-key': 'warn',
      'no-console': 'warn',
      'no-use-before-define': 'error',
      'object-shorthand': 'warn',
    },
  },
]);
