import type { Meta, StoryObj } from '@storybook/angular';
import { PlayerSealComponent } from './player-seal.component';

const meta: Meta<PlayerSealComponent> = {
  component: PlayerSealComponent,
  title: 'Shared/Member/PlayerSealComponent'
};
export default meta;
type Story = StoryObj<PlayerSealComponent>;

export const Primary: Story = {
  args: {
    playerSeal: {
      complete: false,
      gilded: false,
      gildedCount: 3,
      progress: 40,
      sealDescription: 'Complete all Flawless Triumphs.',
      sealImage: '/common/destiny2_content/icons/7d3fd563a549e9b75b8702268081ab70.png',
      sealTitle: 'Flawless'
    }
  }
};
