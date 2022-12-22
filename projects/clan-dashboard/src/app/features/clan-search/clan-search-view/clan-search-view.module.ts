import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanSearchViewComponent } from './clan-search-view.component';
import { ClanSearchRoutingModule } from './clan-search-view-routing.module';
import { ClanSearchAutocompleteComponent } from '../components/clan-search-autocomplete/clan-search-autocomplete.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClanDetailsModule } from '../../clan-details/clan-details.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ClanSearchViewComponent],
  imports: [
    CommonModule,
    ClanSearchRoutingModule,
    ClanSearchAutocompleteComponent,
    MatTooltipModule,
    MatCardModule,
    ClanDetailsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ClanSearchViewModule {}
