import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { ProfileLinkComponent } from './profile-link.component';
import { StorybookModule } from '../../storybook/storybook.module';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'Components/Profile Link',
  component: ProfileLinkComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule.withRoutes([])]
    })
  ],
  argTypes: {}
} as Meta;

const Template: Story<ProfileLinkComponent> = (args: ProfileLinkComponent) => ({
  props: args
});
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  profile: {
    profile: {
      data: {
        userInfo: {
          bungieGlobalDisplayName: 'Test',
          bungieGlobalDisplayNameCode: '1234',
          membershipType: 3,
          membershipId: 123
        }
      }
    }
  }
};
