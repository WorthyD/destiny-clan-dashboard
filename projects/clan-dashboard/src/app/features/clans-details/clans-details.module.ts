import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansDetailsComponent } from './clans-details.component';
import { ClansDetailsService } from './clans-details.service';

@NgModule({
  declarations: [ClansDetailsComponent],
  providers: [ClansDetailsService],
  imports: [CommonModule]
})
export class ClansDetailsModule {}
