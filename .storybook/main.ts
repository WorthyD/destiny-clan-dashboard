import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../apps/**/*.stories.@(js|jsx|ts|tsx)',
    '../libs/**/ui/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  //addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook'
  ],

  staticDirs: [{ from: `${__dirname}/../apps/destiny-clan-dashboard/src/assets`, to: '/assets/' }],

  framework: {
    name: '@storybook/angular',
    options: {}
  },

  // docs: {
  //   autodocs: 'tag'
  // },
  //   previewHead: () => `
  //   <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;&display=swap" rel="stylesheet">
  // <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  // <style>
  //   .story-book-wrapper {
  //   }
  // </style>
  // `
  previewHead: (head) => `
  ${head}
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;&display=swap" rel="stylesheet">
 <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 <style>
   .story-book-wrapper {

   }

 </style>
  `,

  docs: {}
};
export default config;
