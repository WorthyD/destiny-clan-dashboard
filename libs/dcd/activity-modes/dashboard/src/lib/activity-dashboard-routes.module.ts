import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityModeDashboardComponent } from './activity-mode-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityModeDashboardComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityModeDashboardRoutingModule {}
