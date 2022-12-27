import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivitiesDashboardComponent } from './activities-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesDashboardComponent
  }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ActivitiesDashboardRoutingModule {}
