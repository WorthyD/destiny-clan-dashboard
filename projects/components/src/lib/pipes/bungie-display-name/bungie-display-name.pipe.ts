import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile } from '@destiny/data/models';
import { getBungieDisplayName } from '@destiny/data/utility';

@Pipe({
  name: 'bungieDisplayName'
})
export class BungieDisplayNamePipe implements PipeTransform {

  transform(member: MemberProfile): unknown {
    return getBungieDisplayName(member);
  }

}
