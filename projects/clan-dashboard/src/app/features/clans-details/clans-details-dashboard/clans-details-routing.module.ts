import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClansDetailsComponent } from './clans-details.component';

const routes: Routes = [
  {
    path: '',
    component: ClansDetailsComponent
    // component: null
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClansDetailsRoutingModule {}
