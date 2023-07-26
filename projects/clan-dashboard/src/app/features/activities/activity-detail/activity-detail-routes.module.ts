import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { ActivitiesDashboardComponent } from './activities-dashboard.component';
import { ActivityDetailComponent } from './activity-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityDetailComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../activity-dashboard/activity-dashboard.module').then((module) => module.ActivityDashboardModule)
      },
      {
        path: 'table',
        loadChildren: () =>
          import('../activity-table/activity-table.module').then((module) => module.ActivityTableModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityDetailRoutingModule {}
