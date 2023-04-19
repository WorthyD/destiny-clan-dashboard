import { Pipe, PipeTransform } from '@angular/core';
import { getRaidReportUrl } from './base-raid-report-url';
import { ClanMember } from '@destiny/data/models';

@Pipe({
  name: 'raidReportUrl',
  standalone: true
})
export class RaidReportUrlPipe implements PipeTransform {
  transform(value: ClanMember): string {
    return getRaidReportUrl(
      value.destinyUserInfo.membershipType,
      value.destinyUserInfo.displayName,
      value.destinyUserInfo.membershipId
    );
  }
}
