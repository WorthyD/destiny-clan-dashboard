import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../activities-dashboard/activities-dashboard.module').then((module) => module.ActivitiesDashboardModule)
  },
  // TODO: GUARD THIS
  {
    path: ':activityHash',
    loadChildren: () =>
      import('../activity-detail/activity-detail.module').then((module) => module.ActivityDetailModule)
  }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ActivitiesShellRoutingModule {}
