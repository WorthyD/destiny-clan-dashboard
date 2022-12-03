import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansDetailsComponent } from './clans-details.component';
import { ClansDetailsService } from '../data-access/clans-details.service';
import { IconsModule } from '@destiny/components/icons';
import { ClansDetailsRoutingModule } from './clans-details-routing.module';

@NgModule({
  declarations: [ClansDetailsComponent],
  providers: [ClansDetailsService],
  exports: [ClansDetailsComponent],
  imports: [CommonModule, IconsModule, ClansDetailsRoutingModule]
})
export class ClansDetailsModule {}
