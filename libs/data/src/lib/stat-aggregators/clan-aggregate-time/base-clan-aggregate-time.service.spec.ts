// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { MemberProfile } from 'bungie-models';
// import { of } from 'rxjs';

import { ClanDatabase } from '../../clan/clan-database';
import { MemberActivityTime } from '@dcd/shared/models';
import { BaseClanAggregateTimeService } from './base-clan-aggregate-time.service';

// import { ClanDatabase, ClanMemberRecentActivityService,  } from '../../clan-db';
// import { MOCK_RESP_ACTIVITIES_COMBINED } from '../../testing-utils/objects/member-activities.mock';
// import { BaseClanAggregateTimeService } from './base-clan-aggregate-time.service';

// const dummyActivities = {
//   activities: [
//     {
//       period: '2020-12-31T02:55:02Z',
//       activityDetails: {
//         referenceId: 788769683,
//         directorActivityHash: 3847433434,
//         instanceId: '7698637287',
//         mode: 25,
//         modes: [5, 25],
//         isPrivate: false,
//         membershipType: 3
//       },
//       values: {
//         activityDurationSeconds: {
//           statId: 'activityDurationSeconds',
//           basic: {
//             value: 266,
//             displayValue: '4m 26s'
//           }
//         },
//         completed: {
//           statId: 'completed',
//           basic: {
//             value: 1,
//             displayValue: 'Yes'
//           }
//         }
//       }
//     },
//     {
//       period: '2020-12-31T02:47:40Z',
//       activityDetails: {
//         referenceId: 1009746517,
//         directorActivityHash: 3847433434,
//         instanceId: '7698602750',
//         mode: 25,
//         modes: [5, 25],
//         isPrivate: false,
//         membershipType: 3
//       },
//       values: {
//         activityDurationSeconds: {
//           statId: 'activityDurationSeconds',
//           basic: {
//             value: 339,
//             displayValue: '5m 39s'
//           }
//         },
//         completed: {
//           statId: 'completed',
//           basic: {
//             value: 1,
//             displayValue: 'Yes'
//           }
//         }
//       }
//     }
//   ]
// };
// // const memberProfile = {
// //   profile: {
// //     data: {
// //       userInfo: {
// //         membershipId: 1,
// //         membershipType: 1
// //       },
// //       dateLastPlayed: new Date()
// //     }
// //   }
// // } as MemberProfile;
class DummyClass extends BaseClanAggregateTimeService {
  public getClanActivityStatsForDuration(memberActivities: MemberActivityTime[], activityMode: any, days = 60) {
    return null;
  }
  public getClanActivityByPlayer(memberActivities: MemberActivityTime[], activityMode: any, days = 60) {
    return null;
  }
}

describe('BaseClanAggregateTimeService', () => {
  //   let service: BaseClanAggregateTimeService;
  //   let activityService: ClanMemberRecentActivityService;
  //   beforeEach(() => {
  //     TestBed.configureTestingModule({
  //       imports: [HttpClientTestingModule],
  //       providers: [ ClanMemberRecentActivityService, ClanDatabase]
  //     });
  //     service = TestBed.inject(BaseClanAggregateTimeService);
  //     //profileService = TestBed.inject(ProfileService);
  //     activityService = TestBed.inject(ClanMemberRecentActivityService);
  //   });
  it('should be created', () => {
    const newDB = new ClanDatabase();
    let service: BaseClanAggregateTimeService = new DummyClass(newDB, '');
    expect(service).toBeTruthy();
  });
});
