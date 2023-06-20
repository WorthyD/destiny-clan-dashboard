import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile } from '@destiny/data/models';

@Pipe({
  name: 'd2ChecklistUrl',
  standalone: true
})
export class D2ChecklistUrlPipe implements PipeTransform {
  readonly baseUrl = 'https://www.d2checklist.com/';

  transform(value: MemberProfile): unknown {
    return `${this.baseUrl}${value.profile.data?.userInfo?.membershipType}/${value.profile.data?.userInfo?.membershipId}`;
  }
}
