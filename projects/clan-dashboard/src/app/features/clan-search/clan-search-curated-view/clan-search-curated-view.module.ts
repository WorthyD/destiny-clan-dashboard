import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanSearchCuratedViewComponent } from './clan-search-curated-view.component';
import { ClanDetailsModule } from '@features/clan-details/clan-details.module';
import { ClanSearchRoutingModule } from './clan-search-curated-view-routing.module';

@NgModule({
  declarations: [ClanSearchCuratedViewComponent],
  imports: [CommonModule, ClanDetailsModule, ClanSearchRoutingModule]
})
export class ClanSearchCuratedViewModule {}
