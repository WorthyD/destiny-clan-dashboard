import { Pipe, PipeTransform } from '@angular/core';
import { hasItem } from './has-item';
import { MemberProfile } from '@dcd/shared/models';

@Pipe({
  name: 'inCollectionsTotal',
  standalone: true
})
export class InCollectionsTotalPipe implements PipeTransform {
  transform(memberProfiles: MemberProfile[], collectionHash: number): unknown {
    return memberProfiles.reduce((prev, cur) => {
      const value = hasItem(cur.profileCollectibles?.data?.collectibles[collectionHash]) ? 1 : 0;
      return prev + value;
    }, 0);
  }
}
