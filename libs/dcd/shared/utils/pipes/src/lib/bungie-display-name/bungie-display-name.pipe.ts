import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile } from '@dcd/shared/models';
import { getBungieDisplayName } from '@dcd/shared/utils';

@Pipe({
  name: 'bungieDisplayName',
  standalone: true
})
export class BungieDisplayNamePipe implements PipeTransform {
  transform(member: MemberProfile): unknown {
    return getBungieDisplayName(member);
  }
}
