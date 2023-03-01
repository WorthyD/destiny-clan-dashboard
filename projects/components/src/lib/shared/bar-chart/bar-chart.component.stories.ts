import { moduleMetadata, Story } from '@storybook/angular';
//import { action } from '@storybook/addon-actions';

//import { BarChartModule } from './bar-chart.module';
import { BarChartComponent } from './bar-chart.component';

// import { withKnobs, select, object, boolean } from '@storybook/addon-knobs';

import { MOCK_GRID_ITEMS, MOCK_GRID_ITEMS2, REAL_DATA, MOCK_GRID_CATEGORIES } from './_MOCK_GRID_ITEMS';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
// import { MaterialModule } from '../../modules/material.module';
//import { LoadingModule } from '../../loading/loading.module';
const events = [MOCK_GRID_ITEMS, MOCK_GRID_ITEMS2.slice(0, 20), MOCK_GRID_CATEGORIES];

export default {
  title: 'Components/Bar Chart',
  component: BarChartComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, NgApexchartsModule]
    })
  ]
};

// <div style="max-width:900px;">
// <lib-bar-chart [convertTo]="'Hours'" [events]="allEvents[eventIndex]"  (cellSelect)="cellSelect($event)"></lib-bar-chart>
// <hr>
// <textarea style="width:100%; height:500px">
// {{allEvents[eventIndex] | json}}
// </textarea>
// </div>
const Template: Story<BarChartComponent> = (args: BarChartComponent) => ({
  props: args
});
export const Primary = Template.bind({});
Primary.args = {
  convertTo: 'Hours',
  events: events[1]
};
// export const base = () => ({
//   //component: BarChartComponent,
//   template: `
//   <div style="max-width:900px;">
//         <textarea style="width:100%; height:500px">
//         {{allEvents[eventIndex] | json}}
//         </textarea>
//   </div>
//    `,
//   props: {
//     allEvents: events,
//     //eventIndex: select('DataSet', [0, 1, 2], 0),
//     cellSelect: action('cell select')
//   }
// });

// export const realData = () => ({
//   component: BarChartComponent,
//   template: `
//   <div>
//         <lib-activity-bar-chart [events]="events" (cellSelect)="cellSelect($event)"></lib-activity-bar-chart>
//         <hr>
//         <textarea style="width:100%; height:500px">
//         </textarea>
//   </div>
//    `,
//   props: {
//     events: REAL_DATA
//   }
// });

// export const loadingTest = () => ({
//   component: BarChartComponent,
//   template: `
//   <div>
//         <lib-activity-bar-chart-story [events]="events" [isLoading]="isLoading"></lib-activity-bar-chart-story>
//   </div>
//    `,
//   props: {
//     events: REAL_DATA
//     //isLoading: boolean('Is Loading', true)
//   }
// });
