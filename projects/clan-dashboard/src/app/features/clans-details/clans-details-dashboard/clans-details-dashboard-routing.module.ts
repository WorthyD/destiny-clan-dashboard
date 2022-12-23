import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClansDetailsDashboardComponent } from './clans-details-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ClansDetailsDashboardComponent
    // component: null
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClansDetailsRoutingModule {}
