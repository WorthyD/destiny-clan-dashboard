import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansDetailsComponent } from './clans-details.component';
import { ClansDetailsService } from './clans-details.service';
import { IconsModule } from '@destiny/components/icons';

@NgModule({
  declarations: [ClansDetailsComponent],
  providers: [ClansDetailsService],
  exports: [ClansDetailsComponent],
  imports: [CommonModule, IconsModule]
})
export class ClansDetailsModule {}
