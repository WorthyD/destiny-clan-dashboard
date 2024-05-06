// import { moduleMetadata, Story } from '@storybook/angular';
// import { CommonModule } from '@angular/common';

// import { ClanActivityBarChartComponent } from './clan-activity-bar-chart.component';
// import { formatDate } from 'projects/data/src/lib/utility/format-date';
// import { SECONDS_IN_DAY } from 'projects/data/src/lib/models/time';
// const stats = [];

// const today = new Date(new Date().setDate(new Date().getDate() + ((2 + 7 - new Date().getDay()) % 7) - 189));

// for (let i = 0; i < 20; i++) {
//   const d = new Date(today);
//   const d2 = new Date(d.setDate(d.getDate() + i * 7));
//   stats.push({
//     date: formatDate(d2),
//     seconds: Math.floor(Math.random() * SECONDS_IN_DAY + 1)
//   });
// }

// export default {
//   title: 'Features / Clan Details / Clan Activity Bar Chart',
//   component: ClanActivityBarChartComponent,
//   decorators: [
//     moduleMetadata({
//       imports: [CommonModule]
//     })
//   ]
// };

// const Template: Story<ClanActivityBarChartComponent> = (args: ClanActivityBarChartComponent) => ({
//   props: args
// });
// export const Primary = Template.bind({});
// Primary.args = {
//   loading: false,
//   updating: false,
//   events: stats
// };

// export const Loading = Template.bind({});
// Loading.args = {
//   loading: true,
//   updating: false,
//   events: stats
// };

// export const Updating = Template.bind({});
// Updating.args = {
//   loading: false,
//   updating: false,
//   events: stats
// };
