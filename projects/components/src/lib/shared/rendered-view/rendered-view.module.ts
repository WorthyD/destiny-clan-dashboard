import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderedViewComponent } from './rendered-view.component';

@NgModule({
  declarations: [RenderedViewComponent],
  exports: [RenderedViewComponent],
  imports: [CommonModule]
})
export class RenderedViewModule {}
