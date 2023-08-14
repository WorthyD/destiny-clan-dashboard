// import { setCompodocJson } from '@storybook/addon-docs/angular';
//import docJson from '../documentation.json';
//setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
//  docs: { inlineStories: true }
};

import { componentWrapperDecorator } from '@storybook/angular';

export const decorators = [
  componentWrapperDecorator(
    (story) =>
      `<div class="mat-typography content-wrapper story-book-wrapper" style="padding:1rem; margin:-1rem;">${story}</div>`
  )
];
