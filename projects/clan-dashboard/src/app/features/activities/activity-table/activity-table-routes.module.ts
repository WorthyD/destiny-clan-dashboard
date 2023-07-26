import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityTableComponent } from './activity-table.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityTableComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesTableRoutingModule {}
