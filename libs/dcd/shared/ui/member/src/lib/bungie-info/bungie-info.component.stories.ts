import type { Meta, StoryObj } from '@storybook/angular';
import { BungieInfoComponent } from './bungie-info.component';
import { BungieInfo } from '@dcd/shared/models';
import { getFakeStaticBungieInfo } from '@dcd/shared/mocks';

const meta: Meta<BungieInfoComponent> = {
  component: BungieInfoComponent,
  title: 'Shared/Member/BungieInfoComponent'
};
export default meta;
type Story = StoryObj<BungieInfoComponent>;

export const Loading: Story = {
  args: {
    isLoading: true
  }
};

export const Primary: Story = {
  args: {
    isLoading: false,
    bungieInfo: getFakeStaticBungieInfo() as BungieInfo
  }
};
