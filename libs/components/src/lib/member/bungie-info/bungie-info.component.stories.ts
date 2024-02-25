import { moduleMetadata } from '@storybook/angular';
import { USER } from './_MOCK_BUNGIE_INFO';
import { StorybookModule } from '../../storybook/storybook.module';
import { BungieInfoComponent } from './bungie-info.component';

export default {
  title: 'Clan Member / Bungie Info',
  decorators: [
    moduleMetadata({
      imports: [BungieInfoComponent, StorybookModule]
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
