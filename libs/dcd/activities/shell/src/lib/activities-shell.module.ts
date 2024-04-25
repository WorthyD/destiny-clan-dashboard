import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesShellRoutingModule } from './activities-shell-routing.module';
import { ActivitiesService } from '@dcd/activities/data-access';

@NgModule({
  declarations: [],
  providers: [ActivitiesService],
  imports: [CommonModule, ActivitiesShellRoutingModule]
})
export class ActivitiesShellModule {}
