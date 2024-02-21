import { Route } from '@angular/router';
import { ClanResolveGuard } from './core/guards/clan.guard';
import { WrapperComponent } from './core/layout/wrapper/wrapper.component';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [ClanResolveGuard],
    component: WrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/clans-details/clans-details-shell/clans-details.module').then((module) => module.ClansDetailsModule)
      },
      {
        path: 'roster',
        //loadChildren: () => import('./views/roster/roster.module').then((module) => module.RosterModule)

        loadChildren: () => import('./features/clans-roster/clans-roster-shell/clans-roster.module').then((module) => module.ClansRosterModule)
      },
      {
        path: 'seals',
        loadChildren: () => import('./features/seals/seals-shell/seals-routing.module').then((module) => module.SealsRoutingModule)
      },
      {
        path: 'activities',
        loadChildren: () => import('./features/activities/activities-shell/activities-shell.module').then((module) => module.ActivitiesShellModule)
      },
      {
        path: 'player',
        loadChildren: () => import('./features/player/player-shell/player-shell.module').then((module) => module.PlayerShellModule)
      },
      {
        path: 'activity-modes',
        loadChildren: () => import('./features/activity-modes/activity-mode-shell/activity-mode-shell.module').then((module) => module.ActivityModeShellModule)
      },
      {
        path: 'config',
        loadChildren: () => import('./views/config/config.module').then((module) => module.ConfigModule)
      },
      {
        path: 'sandbox',
        loadChildren: () => import('./features/sandbox/sandbox-shell/sandbox-shell.module').then((module) => module.SandboxShellModule)
      }
    ]
  },
  {
    path: 'home',
    // TODO: Clan Guard
    //canActivate: [ClanResolveGuard],
    loadChildren: () => import('@destiny-clan-dashboard/clan-search/feature/shell').then((module) => module.ClanSearchModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
