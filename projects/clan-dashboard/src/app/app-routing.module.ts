import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { ClanResolveGuard } from './views/dashboard/guards/clan.guard';
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
