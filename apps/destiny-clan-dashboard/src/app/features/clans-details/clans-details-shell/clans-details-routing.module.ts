import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../clans-details-dashboard/clans-details-dashboard.module').then(
        (module) => module.ClansDetailsDashboardModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClansDetailsRoutingModule {}
