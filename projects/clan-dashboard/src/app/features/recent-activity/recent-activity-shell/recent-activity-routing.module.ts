import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../recent-activity-dashboard/recent-activity.module').then((module) => module.RecentActivityModule)
  }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class RecentActivityRoutingModule {}
