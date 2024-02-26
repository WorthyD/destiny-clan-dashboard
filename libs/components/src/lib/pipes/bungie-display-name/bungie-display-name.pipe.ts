import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile } from '@destiny-clan-dashboard/data/models';
import { getBungieDisplayName } from '@destiny-clan-dashboard/shared/utils';

@Pipe({
  name: 'bungieDisplayName'
})
export class BungieDisplayNamePipe implements PipeTransform {

  transform(member: MemberProfile): unknown {
    return getBungieDisplayName(member);
  }

}
