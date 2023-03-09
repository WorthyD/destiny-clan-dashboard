import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityModeDetailComponent } from './activity-mode-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityModeDetailComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityModeDetailRoutingModule {}
