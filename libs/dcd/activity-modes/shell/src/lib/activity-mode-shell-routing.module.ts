import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ActivityModeResolveGuard } from '../guards/activity-mode.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@dcd/activity-modes/dashboard').then(
        (module) => module.ActivityModeDashboardModule
      )
  },
  //TODO // Guard
  {
    path: ':modeType',
  //  canActivate:[ActivityModeResolveGuard],
    loadChildren: () =>
      import('@dcd/activity-modes/detail').then((module) => module.ActivityModeDetailModule)
      //import('../activity-mode-detail/activity-mode-detail.module').then((module) => module.ActivityModeDetailModule)
  }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ActivityModeShellRoutingModule {}
