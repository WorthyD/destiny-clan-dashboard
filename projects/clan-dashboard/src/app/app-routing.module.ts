import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { ClanResolveGuard } from '@core/guards/clan.guard';
import { WrapperComponent } from '@core/layout/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ClanResolveGuard],
    component: WrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/dashboard/dashboard.module').then((module) => module.DashboardModule)
      },
      {
        path: 'roster',
        loadChildren: () => import('./views/roster/roster.module').then((module) => module.RosterModule)
      },
      {
        path: 'recent-activity',
        loadChildren: () =>
          import('./views/recent-activity/recent-activity.module').then((module) => module.RecentActivityModule)
      },
      {
        path: 'config',
        loadChildren: () => import('./views/config/config.module').then((module) => module.ConfigModule)
      }
    ]
  },
  {
    path: 'clan-search',
    // TODO: Clan Guard
    //canActivate: [ClanResolveGuard],
    loadChildren: () => import('./views/clan-search/clan-search.module').then((module) => module.ClanSearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
