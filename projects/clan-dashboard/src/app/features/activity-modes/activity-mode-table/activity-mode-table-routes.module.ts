import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityModeTableComponent } from './activity-mode-table.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityModeTableComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityModeTableRoutingModule {}
