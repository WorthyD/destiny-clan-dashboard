import { Meta, Story } from '@storybook/angular';
import { RenderedViewComponent } from './rendered-view.component';
import { TestComponent } from './test/test.component';

export default {
  title: 'Components/View',
  component: RenderedViewComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {}
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<RenderedViewComponent> = (args: RenderedViewComponent) => ({
  props: args
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  text: 'Hello world',
  childrenViews: null
};

export const Children = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Children.args = {
  childrenViews: [
    {
      text: 'Testing'
    },
    {
      text: 'Testing 2'
    }
  ]
};
export const Components = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Components.args = {
  component: TestComponent,
  data: {
    test: 'testing'
  }
};
