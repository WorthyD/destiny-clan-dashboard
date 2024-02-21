import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClanSearchComponent } from './clan-search.component';

const routes: Routes = [
  {
    path: '',
    component: ClanSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClanSearchRoutingModule {}
