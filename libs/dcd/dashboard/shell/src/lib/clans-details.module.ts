import { NgModule } from '@angular/core';
import { ClansDetailsRoutingModule } from './clans-details-routing.module';
import { ClansDetailsActivitiesService } from '@dcd/dashboard/data-access';

@NgModule({
  imports: [ClansDetailsRoutingModule],
  providers: [ClansDetailsActivitiesService]
})
export class ClansDetailsModule {}
