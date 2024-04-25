import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityBreakdownListComponent } from './activity-breakdown-list.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityBreakdownListComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityBreakdownListRoutingModule {}
