import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderedViewComponent } from './rendered-view.component';
import { RenderedViewDynamicCompDirective } from './rendered-view-component.directive';

@NgModule({
  declarations: [RenderedViewComponent, RenderedViewDynamicCompDirective],
  exports: [RenderedViewComponent],
  imports: [CommonModule]
})
export class RenderedViewModule {}
