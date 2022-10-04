import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WrapperComponent],
  imports: [CommonModule, RouterModule]
})
export class LayoutModule {}
