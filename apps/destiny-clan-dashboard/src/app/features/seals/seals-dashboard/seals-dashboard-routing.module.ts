import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SealsDashboardComponent } from './seals-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SealsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SealsDashboardRoutingModule {}
