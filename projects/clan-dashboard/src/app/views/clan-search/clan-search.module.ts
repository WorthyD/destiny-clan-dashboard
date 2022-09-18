import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanSearchComponent } from './clan-search.component';
import { ClanSearchRoutingModule } from './clan-search-routing.module';

@NgModule({
  declarations: [ClanSearchComponent],
  imports: [CommonModule, ClanSearchRoutingModule]
})
export class ClanSearchModule {}
