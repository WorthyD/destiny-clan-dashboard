import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ActivityModeCardDetailsComponent } from './activity-mode-card-details.component';
import { CommonModule } from '@angular/common';
import { SPIRE_ACTIVITY } from 'projects/data/src/lib/models/__mocks__/activity-definition';
export default {
  title: 'Features / Activities / Activity Card Details',
  component: ActivityModeCardDetailsComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  decorators: [
    moduleMetadata({
      imports: [CommonModule]
    })
  ],
  argTypes: {}
} as Meta;

const Template: Story<ActivityModeCardDetailsComponent> = (args: ActivityModeCardDetailsComponent) => ({
  props: args
});
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  activityDefinition: SPIRE_ACTIVITY
};
