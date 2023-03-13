import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDetailComponent } from './player-detail.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PlayerDetailComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule, MatIconModule]
})
export class PlayerDetailModule {}
