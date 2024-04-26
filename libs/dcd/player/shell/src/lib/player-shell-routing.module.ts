import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import { PlayerDetailComponent } from '@dcd/player/detail';

const routes: Routes = [
  {
    path: ':player-id',
    component: PlayerDetailComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          //import('../player-overview/player-overview.module').then((module) => module.PlayerOverviewModule)
          import('@dcd/player/overview').then((module) => module.PlayerOverviewModule)
      }
    ]
    //loadChildren: () => import('../player-detail/player-detail.module').then((module) => module.PlayerDetailModule)
  }
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('../clans-details-dashboard/clans-details-dashboard.module').then(
  //       (module) => module.ClansDetailsDashboardModule
  //     )
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerShellRoutingModule {}
