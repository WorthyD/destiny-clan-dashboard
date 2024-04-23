import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@dcd/clans-roster/clans-roster-list').then((module) => module.ClansRosterModule)
  }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ClansRosterRoutingModule {}
