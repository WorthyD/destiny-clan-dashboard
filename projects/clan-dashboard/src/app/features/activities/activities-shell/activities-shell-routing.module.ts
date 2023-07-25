import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('../activity-mode-dashboard/activity-mode-dashboard.module').then(
  //       (module) => module.ActivityModeDashboardModule
  //     )
  // },
  {
    path: '',
    loadChildren: () =>
      import('../curated-activities-dashboard/curated-activities-dashboard.module').then(
        (module) => module.CuratedActivitiesDashboardModule
      )
  },
  // {
  //   path: 'mode/:modeType',
  //   loadChildren: () =>
  //     import('../activity-mode-detail/activity-mode-detail.module').then((module) => module.ActivityModeDetailModule)
  // },
  // TODO: GUARD THIS
  {
    path: ':activityHash',
    loadChildren: () =>
      import('../activity-detail/activity-detail.module').then((module) => module.ActivityDetailModule)
  }
  // {
  //   path: ':activityHash',
  //   loadChildren: () =>
  //     import('../activity-dashboard/activity-dashboard.module').then((module) => module.ActivityDashboardModule)
  // }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ActivitiesShellRoutingModule {}
