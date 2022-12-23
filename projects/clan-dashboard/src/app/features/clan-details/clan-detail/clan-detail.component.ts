import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClanConfig } from '@core/store/clans';
import { ClanDetailService } from '../data-access/clan-detail.service';
import { Observable, tap } from 'rxjs';
import { GroupsV2GroupV2 } from 'bungie-api-angular';

@Component({
  selector: 'app-clan-detail',
  templateUrl: './clan-detail.component.html',
  styleUrls: ['./clan-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClanDetailComponent implements OnChanges {
  // export class ClanDetailComponent {
  @Input() clanConfig: ClanConfig;
  @Input() showAdd: boolean = false;

  constructor(private clanDetailService: ClanDetailService) {}

  clanDetails$: Observable<GroupsV2GroupV2>;
  loading = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clanConfig']) {
      this.loading = true;
      if (this.clanConfig.clanId) {
        this.clanDetails$ = this.clanDetailService
          .getClan(this.clanConfig.clanId)
          .pipe(tap(() => (this.loading = false)));
      }
    }
  }

  removeClan(clanId: string) {
    this.clanDetailService.removeClan(clanId);
  }
  addClan(clanDetail: GroupsV2GroupV2) {
    this.clanDetailService.addClan(clanDetail);
  }
}
