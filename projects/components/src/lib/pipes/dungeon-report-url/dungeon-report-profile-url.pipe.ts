import { Pipe, PipeTransform } from '@angular/core';
import { getDungeonReportUrl } from './base-dungeon-report';
import { MemberProfile } from '@destiny/data/models';

@Pipe({
  name: 'dungeonReportProfileUrl',
  standalone: true
})
export class DungeonReportProfileUrlPipe implements PipeTransform {
  transform(value: MemberProfile): string {
    return getDungeonReportUrl(
      value.profile.data.userInfo.membershipType,
      value.profile.data.userInfo.displayName,
      value.profile.data.userInfo.membershipId
    );
  }
}
