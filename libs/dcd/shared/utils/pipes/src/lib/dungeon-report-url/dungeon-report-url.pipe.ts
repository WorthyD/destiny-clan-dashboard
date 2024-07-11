import { Pipe, PipeTransform } from '@angular/core';
import { getDungeonReportUrl } from './base-dungeon-report';
import { ClanMember } from '@dcd/shared/models';

@Pipe({
  name: 'dungeonReportUrl',
  standalone: true
})
export class DungeonReportUrlPipe implements PipeTransform {
  transform(value: ClanMember): unknown {
    return getDungeonReportUrl(
      value.destinyUserInfo?.membershipType ?? 0,
      value.destinyUserInfo?.displayName ?? '',
      value.destinyUserInfo?.membershipId ?? 0
    );
  }
}
