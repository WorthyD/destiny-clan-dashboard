import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SealsDashboardComponent } from './seals-dashboard.component';
import { SealsDashboardRoutingModule } from './seals-dashboard-routing.module';
import { SealsListComponent } from '../components/seals-list/seals-list.component';

@NgModule({
  declarations: [SealsDashboardComponent],
  imports: [CommonModule, SealsDashboardRoutingModule, SealsListComponent]
})
export class SealsDashboardModule {}
