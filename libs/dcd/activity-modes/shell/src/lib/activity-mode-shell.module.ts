import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityModeShellRoutingModule } from './activity-mode-shell-routing.module';
import { ActivityModeService } from '@dcd/activity-modes/data-access';

@NgModule({
  declarations: [],
  providers: [ActivityModeService],
  imports: [CommonModule, ActivityModeShellRoutingModule]
})
export class ActivityModeShellModule {}
