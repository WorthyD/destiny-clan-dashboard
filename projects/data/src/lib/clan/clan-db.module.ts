import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanDetailsService } from './clan-details/clan-details.service';
import { ClanDatabase } from './clan-database';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ClanDetailsService, ClanDatabase]
})
export class ClanDbModule {}
