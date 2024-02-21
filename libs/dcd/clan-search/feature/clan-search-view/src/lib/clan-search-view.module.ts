import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanSearchViewComponent } from './clan-search-view.component';
// import { ClanSearchAutocompleteComponent } from '../components/clan-search-autocomplete/clan-search-autocomplete.component';
import { ClanSearchAutocompleteComponent } from '@destiny-clan-dashboard/clan-search/ui/clan-search-autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { ClanDetailsModule } from '../../clan-details/clan-details.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ClanSearchService } from '@destiny-clan-dashboard/clan-search/data-access';

@NgModule({
  declarations: [ClanSearchViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClanSearchViewComponent
      }
    ]),
    ClanSearchAutocompleteComponent,
    MatTooltipModule,
    MatCardModule,
    // ClanDetailsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ClanSearchService]
})
export class ClanSearchViewModule {}
