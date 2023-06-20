import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayerOverviewComponent} from './player-overview.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClansDetailsRoutingModule {}
