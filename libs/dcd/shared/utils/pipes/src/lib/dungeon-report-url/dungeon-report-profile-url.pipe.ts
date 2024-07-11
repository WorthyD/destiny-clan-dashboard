import { Pipe, PipeTransform } from '@angular/core';
import { getDungeonReportUrl } from './base-dungeon-report';
import { MemberProfile } from '@dcd/shared/models';
@Pipe({
  name: 'dungeonReportProfileUrl',
  standalone: true
})
export class DungeonReportProfileUrlPipe implements PipeTransform {
  transform(value: MemberProfile): string {
    return getDungeonReportUrl(
      value.profile?.data?.userInfo?.membershipType ?? 0,
      value.profile?.data?.userInfo?.displayName ?? '',
      value.profile?.data?.userInfo?.membershipId ?? 0
    );
  }
}
