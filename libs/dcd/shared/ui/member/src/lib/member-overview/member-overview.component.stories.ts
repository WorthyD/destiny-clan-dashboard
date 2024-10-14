import type { Meta, StoryObj } from '@storybook/angular';
import {MemberOverviewComponent} from './member-overview.component';
import { getMockMemberProfile } from '@dcd/shared/mocks';

const meta: Meta<MemberOverviewComponent> = {
  component: MemberOverviewComponent,
  title: 'Shared/Member/MemberOverviewComponent'
};
export default meta;
type Story = StoryObj<MemberOverviewComponent>;

export const Primary: Story = {
  args: {
    isLoading: false,
    memberOverview: getMockMemberProfile()
  }
};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};
