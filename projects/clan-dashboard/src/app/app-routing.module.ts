import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './views/dashboard/dashboard.module';

const routes: Routes = [
  {
    path: '',
    // TODO: Clan Guard
    loadChildren: () => import('./views/dashboard/dashboard.module').then((module) => module.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
