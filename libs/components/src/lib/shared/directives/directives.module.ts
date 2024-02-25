import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveSidebarDirective } from './responsive-sidebar.directive';

@NgModule({
  declarations: [ResponsiveSidebarDirective],
  exports: [ResponsiveSidebarDirective],
  imports: [CommonModule]
})
export class DirectivesModule {}
