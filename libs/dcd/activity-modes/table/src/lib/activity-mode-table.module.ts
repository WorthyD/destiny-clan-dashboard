import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityModeTableComponent } from './activity-mode-table.component';
// import { ActivityModeTableRoutingModule } from './activity-mode-table-routes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TableViewComponent } from '@dcd/shared/ui/table-view';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { RouterModule } from '@angular/router';
import { BungieDateTimePipe, PlaytimePipe } from '@dcd/shared/utils/pipes';

@NgModule({
  declarations: [ActivityModeTableComponent],
  exports: [ActivityModeTableComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    BungieDateTimePipe,
    MatIconModule,
    TableViewComponent,
    RouterModule,
    BungieDateTimePipe
  ],
  providers: [BungieDateTimePipe, PlaytimePipe]
})
export class ActivityModeTableModule {}
