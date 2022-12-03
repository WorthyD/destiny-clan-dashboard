import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClansRosterComponent } from './clans-roster.component';

const routes: Routes = [
  {
    path: '',
    component: ClansRosterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClansRosterRoutingModule {}
