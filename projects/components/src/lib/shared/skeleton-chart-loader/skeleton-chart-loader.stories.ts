import { Meta, Story } from '@storybook/angular';
import { SkeletonChartLoaderComponent } from './skeleton-chart-loader.component';

export default {
  title: 'Components/SkeletonChartLoader',
  component: SkeletonChartLoaderComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {}
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<SkeletonChartLoaderComponent> = (args: SkeletonChartLoaderComponent) => ({
  props: args
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {};
