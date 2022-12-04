import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentActivityComponent } from './recent-activity.component';

const routes: Routes = [
  {
    path: '',
    component: RecentActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentActivityRoutingModule {}
