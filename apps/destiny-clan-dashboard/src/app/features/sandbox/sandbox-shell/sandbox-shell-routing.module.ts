import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupComponent } from '../lookup/lookup.component';

const routes: Routes = [
  {
    path: '',
    component: LookupComponent
    //loadChildren: () => import('../clans-roster-list/clans-roster.module').then((module) => module.ClansRosterModule)
  }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SandboxRoutingModule {}
