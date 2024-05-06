import type { Meta, StoryObj } from '@storybook/angular';
import { SkeletonChartLoaderComponent } from './skeleton-chart-loader.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SkeletonChartLoaderComponent> = {
  component: SkeletonChartLoaderComponent,
  title: 'SkeletonChartLoaderComponent'
};
export default meta;
type Story = StoryObj<SkeletonChartLoaderComponent>;

export const Primary: Story = {
  args: {}
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/skeleton-chart-loader works!/gi)).toBeTruthy();
  }
};
