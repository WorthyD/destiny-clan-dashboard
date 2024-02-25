import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberTypeComponent } from './member-type.component';
import { PipesModule } from '../pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MemberTypeComponent],
  exports: [MemberTypeComponent],
  imports: [CommonModule, PipesModule, MatIconModule]
})
export class IconsModule {}
