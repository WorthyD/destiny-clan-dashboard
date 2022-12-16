import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DirectivesModule } from '@destiny/components/shared/directives';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    RouterModule,
    NotificationsComponent,
    MatSidenavModule,
    MatListModule,
    DirectivesModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SettingsMenuComponent
  ]
})
export class LayoutModule {}
