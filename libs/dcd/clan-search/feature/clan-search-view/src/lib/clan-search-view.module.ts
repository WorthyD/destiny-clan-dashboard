import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanSearchViewComponent } from './clan-search-view.component';
// import { ClanSearchAutocompleteComponent } from '../components/clan-search-autocomplete/clan-search-autocomplete.component';
import { ClanSearchAutocompleteComponent } from '@dcd/clan-search/ui/clan-search-autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { ClanDetailsModule } from '../../clan-details/clan-details.module';
import { ClanDetailComponent } from '@dcd/shared/clan-details/feature';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ClanSearchService } from '@dcd/clan-search/data-access';

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
    ClanDetailComponent,
    // ClanDetailsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ClanSearchService]
})
export class ClanSearchViewModule {}
