import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile } from '@dcd/shared/models';
import { getProfileUrl } from '@dcd/shared/utils/url-helpers';
@Pipe({
  name: 'profileUrl',
  standalone: true
})
export class ProfileUrlPipe implements PipeTransform {
  transform(memberProfile: MemberProfile): string {
    return getProfileUrl(memberProfile);
  }
}
