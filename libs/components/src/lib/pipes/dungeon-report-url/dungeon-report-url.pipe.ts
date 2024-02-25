import { Pipe, PipeTransform } from '@angular/core';
import { getDungeonReportUrl } from './base-dungeon-report';
import { ClanMember } from '@destiny-clan-dashboard/data/models';

@Pipe({
  name: 'dungeonReportUrl',
  standalone: true
})
export class DungeonReportUrlPipe implements PipeTransform {
  transform(value: ClanMember): unknown {
    return getDungeonReportUrl(
      value.destinyUserInfo.membershipType,
      value.destinyUserInfo.displayName,
      value.destinyUserInfo.membershipId
    );
  }
}
