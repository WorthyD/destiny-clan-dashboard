import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllClansMembersProfiles,
  selectClanMemberProfileStateLoading
} from '@core/store/clans-members-profiles/clan-members-profiles.selectors';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';

@Injectable()
export class ClansRosterService {
  clanProfiles$: Observable<ClanMemberProfile[]> = this.store.select(selectAllClansMembersProfiles); //.pipe(
  clanProfilesLoading$: Observable<boolean> = this.store.select(selectClanMemberProfileStateLoading); //.pipe(

  constructor(private store: Store) {}
}
