import { RaidReportUrlPipe } from './raid-report-url.pipe';

describe('RaidReportUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new RaidReportUrlPipe();
    expect(pipe).toBeTruthy();
  });

  it('should conver ps name', () => {
    const member = {
      destinyUserInfo: {
        displayName: 'tacos',
        membershipType: 2
      }
    };
    const result = 'https://raid.report/ps/tacos';
    const pipe = new RaidReportUrlPipe();
    expect(pipe.transform(member)).toEqual(result);
  });
  it('should conver xbox name', () => {
    const member = {
      destinyUserInfo: {
        displayName: 'tacos',
        membershipType: 1
      }
    };
    const result = 'https://raid.report/xb/tacos';
    const pipe = new RaidReportUrlPipe();
    expect(pipe.transform(member)).toEqual(result);
  });
  it('should conver pc name', () => {
    const member = {
      destinyUserInfo: {
        displayName: 'tacos',
        membershipId: 1234,
        membershipType: 3
      }
    };
    const result = 'https://raid.report/pc/1234';
    const pipe = new RaidReportUrlPipe();
    expect(pipe.transform(member)).toEqual(result);
  });
});
