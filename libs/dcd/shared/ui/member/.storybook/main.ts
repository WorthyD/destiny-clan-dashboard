import type { StorybookConfig } from '@storybook/angular';
//import { previewHead } from 'storybook-host';
import rootMain from '../../../../../../.storybook/main';

const config: StorybookConfig = {
  ...rootMain,
  stories: ['../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [...rootMain.addons]
  // framework: {
  //   name: '@storybook/angular',
  //   options: {}
  // },
  // previewHead: (head: any) => `
  //  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;&display=swap" rel="stylesheet">
  //  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  //  <style>
  //    .story-book-wrapper {

  //    }

  //  </style>

  //  `
  //  previewHead: previewHead
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
