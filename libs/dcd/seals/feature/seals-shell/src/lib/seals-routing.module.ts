import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@dcd/seals/feature/seals-dashboard').then((module) => module.SealsDashboardModule)
  },
  {
    path: ':hash',
    loadChildren: () => import('@dcd/seals/feature/seals-details').then((module) => module.SealDetailsModule)
  }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SealsRoutingModule {}
