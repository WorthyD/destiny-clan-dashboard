import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansRecentlyActiveCardComponent } from './clans-recently-active-card.component';
import { ClanMemberCardComponent } from '../components/clan-member-card/clan-member-card.component';
import { PipesModule } from '@destiny-clan-dashboard/components/pipes';



@NgModule({
  declarations: [
    ClansRecentlyActiveCardComponent
  ],
  exports:[ClansRecentlyActiveCardComponent],
  imports: [
    CommonModule,ClanMemberCardComponent,PipesModule
  ]
})
export class ClansRecentlyActiveCardModule { }
