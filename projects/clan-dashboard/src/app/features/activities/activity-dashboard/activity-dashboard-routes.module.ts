import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityDashboardComponent } from './activity-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityDashboardComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesDashboardRoutingModule {}
