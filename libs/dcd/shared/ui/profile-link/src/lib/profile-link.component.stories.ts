import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ProfileLinkComponent } from './profile-link.component';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<ProfileLinkComponent> = {
  component: ProfileLinkComponent,
  title: 'ProfileLinkComponent',
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule.withRoutes([])]
    })
  ]
};
export default meta;
type Story = StoryObj<ProfileLinkComponent>;

export const Primary: Story = {
  args: {
    profile: {
      profile: {
        data: {
          userInfo: {
            bungieGlobalDisplayName: 'Test',
            bungieGlobalDisplayNameCode: 1234,
            membershipType: 3,
            membershipId: 123
          }
        }
      }
    }
  }
};
