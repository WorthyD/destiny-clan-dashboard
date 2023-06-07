import { moduleMetadata } from '@storybook/angular';
import { BungieInfoModule } from './bungie-info.module';
import { BungieInfoComponent } from './bungie-info.component';
import { USER } from './_MOCK_BUNGIE_INFO';
import { StorybookModule } from '../../storybook/storybook.module';

export default {
  title: 'Clan Member / Bungie Info',
  decorators: [
    moduleMetadata({
      imports: [BungieInfoModule, StorybookModule]
    })
  ]
};

export const base = () => ({
  component: BungieInfoComponent,
  template: `
        <lib-bungie-info [bungieInfo]="bungieInfo" [isLoading]="isLoading"></lib-bungie-info>
   `,
  props: {
    bungieInfo: USER,
    isLoading: false
  }
});

export const loading = () => ({
  component: BungieInfoComponent,
  template: `
        <lib-bungie-info [bungieInfo]="bungieInfo" [isLoading]="isLoading"></lib-bungie-info>
   `,
  props: {
    bungieInfo: USER,
    isLoading: true
  }
});
