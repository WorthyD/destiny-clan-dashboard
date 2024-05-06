import type { StorybookConfig } from '@storybook/angular';
import { previewHead } from '../src/index';

const config: StorybookConfig = {
  stories: [
    //'../../**/ui/**/src/lib/**/*.stories.ts',
    '../**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/angular',
    options: {}
  },
  previewHead: previewHead
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
