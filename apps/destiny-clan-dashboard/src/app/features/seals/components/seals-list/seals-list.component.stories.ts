import { SealListItem } from '@features/seals/models/seal-list-item';
import { getRandomSLI } from '../../models/__mocks__/seal-list-item';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SealsListComponent } from './seals-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

const list: SealListItem[] = new Array(10).fill('').map((x) => {
  return getRandomSLI();
});

export default {
  title: 'Features / Seals / List view',
  component: SealsListComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterModule.forRoot([])]
    })
  ],
  argTypes: {}
} as Meta;

const Template: Story<SealsListComponent> = (args: SealsListComponent) => ({
  props: args
});
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  sealsList: list
};
export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Loading.args = {
  sealsList: undefined
};
export const Empty = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Empty.args = {
  sealsList: []
};
