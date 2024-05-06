import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MemberTypeIconComponent } from './member-type-icon.component';
import { StorybookModule } from 'libs/storybook-host/src/lib/storybook.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

const meta: Meta<MemberTypeIconComponent> = {
  component: MemberTypeIconComponent,
  title: 'Shared/Member/MemberTypeIconComponent',
  decorators: [
    moduleMetadata({
      imports: [StorybookModule ]
    })
  ],
  argTypes: {
    type: {
      options: [1, 2, 3, 4, 5, 10],
      control: { type: 'radio' }
    }
  }
};
export default meta;
type Story = StoryObj<MemberTypeIconComponent>;

export const Primary: Story = {
  args: {
    type: 1
  }
};
