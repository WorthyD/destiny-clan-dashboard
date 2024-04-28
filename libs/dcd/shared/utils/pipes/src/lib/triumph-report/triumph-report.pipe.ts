import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile } from '@dcd/shared/models';
@Pipe({
  name: 'triumphReport',
  standalone: true
})
export class TriumphReportPipe implements PipeTransform {
  readonly baseUrl = 'https://triumph.report/';

  transform(value: MemberProfile): unknown {
    return `${this.baseUrl}${value.profile.data?.userInfo?.membershipType}/${value.profile.data?.userInfo?.membershipId}`;
  }
}
