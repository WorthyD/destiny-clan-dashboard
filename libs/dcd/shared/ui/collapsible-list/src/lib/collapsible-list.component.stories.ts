import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { StorybookModule } from '../../storybook/storybook.module';
import { CollapsibleListComponent } from './collapsible-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Components/Collapsible List',
  component: CollapsibleListComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule]
    })
  ],
  argTypes: {}
} as Meta;

const Template: Story<CollapsibleListComponent> = (args: CollapsibleListComponent) => ({
  template: `
    <div style="height:300px">
    <lib-collapsible-list [items]="items" [title]="title" [itemTemplate]="itemTemplate">
    <ng-template let-item #itemTemplate>
    <div >
    View
    </div>
    </ng-template>
    </lib-collapsible-list>
    </div>
   `,
  props: args
});
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  title: '',
  items: ['', '', '']
};
