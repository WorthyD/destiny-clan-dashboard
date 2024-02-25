import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityModeTableComponent } from './activity-mode-table.component';
// import { ActivityModeTableRoutingModule } from './activity-mode-table-routes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TableViewComponent } from '@destiny-clan-dashboard/components/shared/table-view';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PipesModule } from '@destiny-clan-dashboard/components/pipes';
import { RouterModule } from '@angular/router';
import { BungieDateTimePipe } from '@destiny-clan-dashboard/shared/pipes/bungie-date-pipe';

@NgModule({
  declarations: [ActivityModeTableComponent],
  exports: [ActivityModeTableComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    PipesModule,
    MatIconModule,
    TableViewComponent,
    RouterModule,
    BungieDateTimePipe
  ],
  providers: [BungieDateTimePipe]
})
export class ActivityModeTableModule {}
