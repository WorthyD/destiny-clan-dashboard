import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanDetailCellComponent } from './components/clan-detail-cell/clan-detail-cell.component';
import { ClanDetailComponent } from './clan-detail/clan-detail.component';

@NgModule({
  declarations: [ClanDetailComponent],
  exports: [ClanDetailComponent],
  imports: [CommonModule, ClanDetailCellComponent]
})
export class ClanDetailsModule {}
