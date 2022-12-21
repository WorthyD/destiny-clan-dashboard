import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClanSearchViewComponent } from './clan-search-view.component';

const routes: Routes = [
  {
    path: '',
    component: ClanSearchViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClanSearchRoutingModule {}
