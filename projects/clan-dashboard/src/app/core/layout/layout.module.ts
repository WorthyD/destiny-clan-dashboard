import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [WrapperComponent],
  imports: [CommonModule, RouterModule, NotificationsComponent]
})
export class LayoutModule {}
