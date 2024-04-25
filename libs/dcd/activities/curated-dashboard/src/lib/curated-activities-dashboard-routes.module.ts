import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CuratedActivitiesDashboardComponent } from './curated-activities-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CuratedActivitiesDashboardComponent
  }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CuratedActivitiesDashboardRoutingModule {}
