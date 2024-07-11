import { Pipe, PipeTransform } from '@angular/core';
import { getRaidReportUrl } from './base-raid-report-url';
import { MemberProfile } from '@dcd/shared/models';

@Pipe({
  name: 'raidReportProfileUrl',
  standalone: true
})
export class RaidReportProfileUrlPipe implements PipeTransform {
  transform(value: MemberProfile): string {
    return getRaidReportUrl(
      value.profile!.data!.userInfo!.membershipType ?? 0,
      value.profile!.data!.userInfo!.displayName!,
      value.profile!.data!.userInfo!.membershipId!
    );
  }
}
