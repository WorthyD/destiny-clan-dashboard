import type { Meta, StoryObj } from '@storybook/angular';
import { CharacterCardComponent } from './character-card.component';
import { getMockCharacter } from '@dcd/shared/mocks';

const meta: Meta<CharacterCardComponent> = {
  component: CharacterCardComponent,
  title: 'Shared/Member/CharacterCardComponent'
};
export default meta;
type Story = StoryObj<CharacterCardComponent>;

export const Primary: Story = {
  args: {
    isLoading: false,
    character: getMockCharacter()
  }
};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};
