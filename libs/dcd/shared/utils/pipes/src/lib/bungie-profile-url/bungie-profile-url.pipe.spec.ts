import { MemberProfile } from '@dcd/shared/models';
import { BungieProfileUrlPipe } from './bungie-profile-url.pipe';

describe('BungieProfileUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new BungieProfileUrlPipe();
    expect(pipe).toBeTruthy();
  });
  it('should convert ps name', () => {
    const member = {
      profile: {
        data: {
          userInfo: {
            displayName: 'tacos',
            membershipType: 2,
            membershipId: 1234
          }
        }
      }
    } as MemberProfile;
    const result = 'https://bungie.net/en/profile/2/1234';
    const pipe = new BungieProfileUrlPipe();
    expect(pipe.transform(member)).toEqual(result);
  });
});
