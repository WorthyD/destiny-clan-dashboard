import { Pipe, PipeTransform } from '@angular/core';
import { getRaidReportUrl } from './base-raid-report-url';
import { MemberProfile } from '@destiny-clan-dashboard/data/models';

@Pipe({
  name: 'raidReportProfileUrl',
  standalone: true
})
export class RaidReportProfileUrlPipe implements PipeTransform {
  transform(value: MemberProfile): string {
    return getRaidReportUrl(
      value.profile.data.userInfo.membershipType,
      value.profile.data.userInfo.displayName,
      value.profile.data.userInfo.membershipId
    );
  }
}
