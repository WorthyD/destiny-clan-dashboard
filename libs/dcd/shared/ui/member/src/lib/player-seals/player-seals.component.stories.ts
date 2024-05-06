import type { Meta, StoryObj } from '@storybook/angular';
import { PlayerSealsComponent } from './player-seals.component';

const meta: Meta<PlayerSealsComponent> = {
  component: PlayerSealsComponent,
  title: 'Shared/Member/PlayerSealsComponent'
};
export default meta;
type Story = StoryObj<PlayerSealsComponent>;

export const Primary: Story = {
  args: {
    playerSeals: [
      {
        complete: true,
        gilded: true,
        gildedCount: 9,
        progress: 100,
        sealDescription: 'Complete all Season of the Splicer Triumphs.',
        sealImage: '/common/destiny2_content/icons/7d3fd563a549e9b75b8702268081ab70.png',
        sealTitle: 'Splicer'
      },
      {
        complete: true,
        gilded: false,
        gildedCount: 9,
        progress: 100,
        sealDescription: 'Complete all Season of the Splicer Triumphs.',
        sealImage: '/common/destiny2_content/icons/7d3fd563a549e9b75b8702268081ab70.png',
        sealTitle: 'Splicer'
      },
      {
        complete: false,
        gilded: false,
        progress: 17,
        gildedCount: 9,
        sealDescription: 'Beneath Venus, evil stirs…',
        sealImage: '/common/destiny2_content/icons/7d3fd563a549e9b75b8702268081ab70.png',
        sealTitle: 'Vault of Glass'
      },
      {
        complete: false,
        gilded: false,
        progress: 20,
        gildedCount: 9,
        sealDescription: 'Complete all Flawless Triumphs.',
        sealImage: '/common/destiny2_content/icons/7d3fd563a549e9b75b8702268081ab70.png',
        sealTitle: 'Flawless'
      }
    ]
  }
};
