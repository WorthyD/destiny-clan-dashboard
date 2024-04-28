import { from, mergeMap, Observable } from 'rxjs';
import { ClanMember } from '@dcd/shared/models';
export class ProfileService {
  // 100 Profiles
  // 104 Profile Progression
  // 200 Characters
  // 202 Character progression
  // 800 Collections
  // 900 Milestones
  // 1100 Metrics
  // 1400 Comendations
  private profileComponents = [100, 104, 200, 202, 800, 900, 1100];
  constructor(private baseAPiKey: string) {}

  protected getProfileId(member: ClanMember) {
    return `${member.destinyUserInfo.membershipType}-${member.destinyUserInfo.membershipId}`;
  }

  protected getProfileFromAPI(membershipType, membershipId) {
    const url = `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${
      membershipId
    }/?components=${this.profileComponents.join(',')}`;

    return new Observable((observer) => {
      fetch(url, { headers: { 'X-API-Key': this.baseAPiKey } })
        .then((response) => response.json())
        .then((data) => {
          if (!data.Response) {
            throw data;
          }
          observer.next(data);
          observer.complete();
        })
        .catch((err) => {
          console.log('error', err);
          observer.error(err);
        });
    });
  }


}
