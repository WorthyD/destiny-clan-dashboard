import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansDetailsComponent } from './clans-details.component';
//import { ClansDetailsService } from '../data-access/clans-details.service';
import { ClansDetailsService } from '@dcd/dashboard/data-access';
//import { IconsModule } from '@destiny-clan-dashboard/components/icons';
import { MemberTypeComponent } from '@dcd/shared/ui/icons';
// import { ClanInfoComponent } from '../../../../../../../libs/dcd/dashboard/ui/src/lib/clan-info/clan-info.component';
import { ClanInfoComponent } from '@dcd/dashboard/ui';

@NgModule({
  declarations: [ClansDetailsComponent],
  providers: [ClansDetailsService],
  exports: [ClansDetailsComponent],
  imports: [CommonModule, MemberTypeComponent, ClanInfoComponent]
})
export class ClansDetailsModule {}
