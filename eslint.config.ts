import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  pluginVue.configs['flat/vue2-recommended'],
  vueTsConfigs.recommendedTypeChecked,
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'semi': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single'],
      'vue/multi-word-component-names': 'off',
      'indent': ['error', 2],
    },
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
);
