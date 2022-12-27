import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        loadChildren: () =>
          import('./features/clans-details/clans-details-shell/clans-details.module').then(
            (module) => module.ClansDetailsModule
          )
      },
      {
        path: 'roster',
        //loadChildren: () => import('./views/roster/roster.module').then((module) => module.RosterModule)

        loadChildren: () =>
          import('./features/clans-roster/clans-roster-shell/clans-roster.module').then(
            (module) => module.ClansRosterModule
          )
      },
      {
        path: 'recent-activity',
        loadChildren: () =>
          import('./features/recent-activity/recent-activity-shell/recent-activity.module').then(
            (module) => module.RecentActivityModule
          )
      },
      {
        path: 'seals',
        loadChildren: () =>
          import('./features/seals/seals-shell/seals-routing.module').then((module) => module.SealsRoutingModule)
      },
      {
        path: 'activities',
        loadChildren: () =>
          import('./features/activities/activities-shell/activities-shell.module').then(
            (module) => module.ActivitiesShellModule
          )
      },

      {
        path: 'config',
        loadChildren: () => import('./views/config/config.module').then((module) => module.ConfigModule)
      },
      {
        path: 'sandbox',
        loadChildren: () =>
          import('./features/sandbox/sandbox-shell/sandbox-shell.module').then((module) => module.SandboxShellModule)
      }
    ]
  },
  {
    path: 'clan-search',
    // TODO: Clan Guard
    //canActivate: [ClanResolveGuard],
    // loadChildren: () => import('./views/clan-search/clan-search.module').then((module) => module.ClanSearchModule)
    loadChildren: () =>
      import('./features/clan-search/clan-search-shell/clan-search-shell.module').then(
        (module) => module.ClanSearchModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
