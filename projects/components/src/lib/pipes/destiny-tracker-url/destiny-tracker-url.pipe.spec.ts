// import { DestinyTrackerUrlPipe } from './destiny-tracker-url.pipe';

// describe('DestinyTrackerUrlPipe', () => {
//   it('create an instance', () => {
//     const pipe = new DestinyTrackerUrlPipe();
//     expect(pipe).toBeTruthy();
//   });
//   it('should convert ps name', () => {
//     const member = {
//       destinyUserInfo: {
//         displayName: 'tacos',
//         membershipType: 2
//       }
//     };
//     const result = 'https://destinytracker.com/destiny-2/profile/psn/tacos';
//     const pipe = new DestinyTrackerUrlPipe();
//     expect(pipe.transform(member)).toEqual(result);
//   });
//   it('should convert xbox name', () => {
//     const member = {
//       destinyUserInfo: {
//         displayName: 'tacos',
//         membershipType: 1
//       }
//     };
//     const result = 'https://destinytracker.com/destiny-2/profile/xbl/tacos';
//     const pipe = new DestinyTrackerUrlPipe();
//     expect(pipe.transform(member)).toEqual(result);
//   });
//   it('should convert pc name', () => {
//     const member = {
//       destinyUserInfo: {
//         displayName: 'tacos',
//         membershipId: 1234,
//         membershipType: 3
//       }
//     };
//     const result = 'https://destinytracker.com/destiny-2/profile/steam/1234';
//     const pipe = new DestinyTrackerUrlPipe();
//     expect(pipe.transform(member)).toEqual(result);
//   });
// });
