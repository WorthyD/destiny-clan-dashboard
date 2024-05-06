// import { moduleMetadata } from '@storybook/angular';
// /// import { ActivityGridComponent } from './activity-grid.component';
// // import { ActivityGridModule } from './activity-grid.module';
// // import {MOCK_GRID_ITEMS} from './_MOCK_GRID_ITEMS';
// // import { ClanWeeklyProgressComponent } from './clan-weekly-progress.component';
// // import { ClanWeeklyProgressModule } from './clan-weekly-progress.module';
// //import { MOCK_WEEKLY_PROGRESS } from './_MOCK_WEEKLY_PROGRESS';
// import { StorybookModule } from '../storybook/storybook.module';
// import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
// import { Component, NgModule } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
// import { registerIcons } from './register-icons';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { IconsModule } from './icons.module';

// @Component({
//   selector: 'lib-icons',
//   template: `
//     <lib-member-type [type]="1"></lib-member-type>
//     <lib-member-type [type]="2"></lib-member-type>
//     <lib-member-type [type]="3"></lib-member-type>
//     <lib-member-type [type]="4"></lib-member-type>
//   `
// })
// class IconComponent {
//   constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
//     registerIcons(iconRegistry, domSanitizer);
//   }
// }

// @NgModule({
//   declarations: [IconComponent],
//   exports: [IconComponent],
//   imports: [CommonModule, MatIconModule, HttpClientModule, IconsModule]
// })
// class IconTestModule {}

// export default {
//   title: 'Icons / Member Type',
//   decorators: [
//     moduleMetadata({
//       imports: [IconTestModule, StorybookModule]
//     })
//   ]
// };

// export const base = () => ({
//   component: IconComponent,
//   template: `
//     <lib-icons></lib-icons>
//    `,
//   props: {}
// });
