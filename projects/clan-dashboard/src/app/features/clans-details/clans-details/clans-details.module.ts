import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansDetailsComponent } from './clans-details.component';
import { ClansDetailsService } from '../data-access/clans-details.service';
import { IconsModule } from '@destiny/components/icons';
import { ClansDetailsRoutingModule } from './clans-details-routing.module';
import { ClanInfoComponent } from '../components/clan-info/clan-info.component';

@NgModule({
  declarations: [ClansDetailsComponent],
  providers: [ClansDetailsService],
  exports: [ClansDetailsComponent],
  imports: [CommonModule, IconsModule, ClanInfoComponent]
})
export class ClansDetailsModule {}
