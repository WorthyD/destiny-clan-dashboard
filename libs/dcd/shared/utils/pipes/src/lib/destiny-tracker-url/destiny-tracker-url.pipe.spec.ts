import { DestinyTrackerUrlPipe } from './destiny-tracker-url.pipe';

import { MemberProfile } from '@dcd/shared/models';
describe('DestinyTrackerUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new DestinyTrackerUrlPipe();
    expect(pipe).toBeTruthy();
  });
  it('should convert ps name', () => {
    const member = {
      profile: {
        data: {
          userInfo: {
            displayName: 'tacos',
            membershipType: 2
          }
        }
      }
    } as MemberProfile;
    const result = 'https://destinytracker.com/destiny-2/profile/psn/tacos';
    const pipe = new DestinyTrackerUrlPipe();
    expect(pipe.transform(member)).toEqual(result);
  });
  it('should convert xbox name', () => {
    const member = {
      profile: {
        data: {
          userInfo: {
            displayName: 'tacos',
            membershipType: 1
          }
        }
      }
    } as MemberProfile;
    const result = 'https://destinytracker.com/destiny-2/profile/xbl/tacos';
    const pipe = new DestinyTrackerUrlPipe();
    expect(pipe.transform(member)).toEqual(result);
  });
  it('should convert pc name', () => {
    const member = {
      profile: {
        data: {
          userInfo: {
            displayName: 'tacos',
            membershipId: 1234,
            membershipType: 3
          }
        }
      }
    } as MemberProfile;
    const result = 'https://destinytracker.com/destiny-2/profile/steam/1234';
    const pipe = new DestinyTrackerUrlPipe();
    expect(pipe.transform(member)).toEqual(result);
  });
});
