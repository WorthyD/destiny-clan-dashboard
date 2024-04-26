import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
//import { DirectivesModule } from '@destiny-clan-dashboard/components/shared/directives';
import { ResponsiveSidebarDirective } from '@dcd/shared/utils/directives';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';

import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    NotificationsComponent,
    MatSidenavModule,
    MatListModule,
    ResponsiveSidebarDirective,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SettingsMenuComponent
  ]
})
export class LayoutModule {}
