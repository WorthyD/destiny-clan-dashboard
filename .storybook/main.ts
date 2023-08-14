import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../projects/**/*.stories.mdx',
    '../projects/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;