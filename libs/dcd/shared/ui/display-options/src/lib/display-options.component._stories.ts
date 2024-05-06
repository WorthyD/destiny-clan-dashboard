// import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Meta, moduleMetadata, Story } from '@storybook/angular';
// import { Sorter } from '../../data/sorter';
// import { Viewer } from '../../data/viewer';
// import { EXAMPLE_SORTER_METADATA } from '../../__mocks__/ListItemSorter';
// import { EXAMPLE_VIEWER_METADATA } from '../../__mocks__/ListItemViewer';
// import { DisplayOptionsComponent } from './display-options.component';

// export default {
//   title: 'Components/DisplayOptionsComponent',
//   component: DisplayOptionsComponent,
//   decorators: [
//     moduleMetadata({
//       imports: [CommonModule, BrowserAnimationsModule, DisplayOptionsComponent]
//     })
//   ],
//   // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
//   argTypes: {}
// } as Meta;

// // More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
// const Template: Story<DisplayOptionsComponent> = (args: DisplayOptionsComponent) => ({
//   props: args
// });

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/angular/writing-stories/args
// Primary.args = {
//   viewer: new Viewer({ metadata: EXAMPLE_VIEWER_METADATA }),
//   sorter: new Sorter({ metadata: EXAMPLE_SORTER_METADATA })
// };
