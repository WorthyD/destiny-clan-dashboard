import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile } from '@dcd/shared/models';
import { MembershipTypes } from '@dcd/shared/models';
@Pipe({
  name: 'destinyTrackerUrl',
  standalone: true
})
export class DestinyTrackerUrlPipe implements PipeTransform {
  readonly baseUrl = 'https://destinytracker.com/destiny-2/profile';
  transform(value: MemberProfile): string {
    switch (value.profile?.data?.userInfo?.membershipType) {
      case MembershipTypes.Xbox:
        return this.getXBOXUrl(value);
      case MembershipTypes.Psn:
        return this.getPSUrl(value);
      case MembershipTypes.Steam:
        return this.getPCUrl(value);
      case MembershipTypes.Stadia:
        return this.getStadiaUrl(value);
      default:
        return '';
    }
  }
  getPSUrl(value: MemberProfile) {
    return `${this.baseUrl}/psn/${escape(value?.profile?.data?.userInfo?.displayName || '')}`;
  }

  getXBOXUrl(value: MemberProfile) {
    return `${this.baseUrl}/xbl/${escape(value.profile?.data?.userInfo?.displayName || '')}`;
  }

  getPCUrl(value: MemberProfile) {
    return `${this.baseUrl}/steam/${value.profile?.data?.userInfo?.membershipId}`;
  }
  getStadiaUrl(value: MemberProfile) {
    return `${this.baseUrl}/stadia/${value.profile?.data?.userInfo?.membershipId}`;
  }
}
