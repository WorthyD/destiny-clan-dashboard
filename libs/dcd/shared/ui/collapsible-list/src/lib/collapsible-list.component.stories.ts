import { StoryFn, moduleMetadata, type Meta } from '@storybook/angular';
import { CollapsibleListComponent } from './collapsible-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<CollapsibleListComponent> = {
  component: CollapsibleListComponent,
  title: 'Shared/UI/CollapsibleListComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule]
    })
  ]
};
export default meta;
const Template: StoryFn<CollapsibleListComponent> = (args: CollapsibleListComponent) => ({
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
export const Primary: StoryFn = Template.bind({});
Primary.args = {
  title: 'Test Title',
  items: ['', '', '']
};
