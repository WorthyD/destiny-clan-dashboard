import { Meta, Story } from "@storybook/angular";
import { RenderedViewComponent } from "./rendered-view.component";

export default {
  title: 'Example/View',
  component: RenderedViewComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<RenderedViewComponent> = (args: RenderedViewComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};
