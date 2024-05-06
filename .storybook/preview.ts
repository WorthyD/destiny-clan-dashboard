// import { setCompodocJson } from '@storybook/addon-docs/angular';
//import docJson from '../documentation.json';
//setCompodocJson(docJson);
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StorybookModule } from '../libs/storybook-host/src/lib/storybook.module';

export const parameters = {
  //actions: { argTypesRegex: '^on[A-Z].*' },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/
  //   }
  // },
  //  docs: { inlineStories: true }
};

import { applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';

export const decorators = [
  componentWrapperDecorator(
    (story) =>
      `<div class="mat-typography content-wrapper story-book-wrapper" style="padding:1rem; margin:-1rem;">${story}</div>`
  ),
  applicationConfig({
    providers: [importProvidersFrom(HttpClientModule)]
  }),

  moduleMetadata({
    imports: [StorybookModule, BrowserAnimationsModule]
  })
];
