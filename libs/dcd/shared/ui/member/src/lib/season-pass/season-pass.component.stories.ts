import type { Meta, StoryObj } from '@storybook/angular';
import { SeasonPassComponent } from './season-pass.component';
import { getSeasonProgression, getSeasonMaxProgression } from '@dcd/shared/mocks';

const meta: Meta<SeasonPassComponent> = {
  component: SeasonPassComponent,
  title: 'Shared/Member/SeasonPassComponent'
};
export default meta;
type Story = StoryObj<SeasonPassComponent>;

export const Primary: Story = {
  args: {
    subTitle: '',
    isLoading: false,
    clanMemberSeasonPass: getSeasonProgression()
  }
};

export const Max: Story = {
  args: {
    subTitle: 'Sub title',
    isLoading: false,

    clanMemberSeasonPass: getSeasonMaxProgression()
  }
};

export const Loading: Story = {
  args: {
    subTitle: 'Loading Progress',
    isLoading: true
  }
};
