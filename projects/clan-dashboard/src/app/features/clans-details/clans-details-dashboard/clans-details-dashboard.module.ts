import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansDetailsDashboardComponent } from './clans-details-dashboard.component';
import { ClansDetailsModule } from '../clans-details/clans-details.module';
import { ClansDetailsRoutingModule } from './clans-details-dashboard-routing.module';

@NgModule({
  declarations: [ClansDetailsDashboardComponent],
  imports: [CommonModule, ClansDetailsModule, ClansDetailsRoutingModule]
})
export class ClansDetailsDashboardModule {}
