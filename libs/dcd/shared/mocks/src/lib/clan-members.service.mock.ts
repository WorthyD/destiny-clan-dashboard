import { Injectable } from '@angular/core';
import { Destiny2Service, GroupsV2GroupMember, GroupV2Service } from 'bungie-api-angular';
import { Observable, of } from 'rxjs';
//import { DBObject, StoreId } from '../app-indexed-db';

export class ClanMembersServiceMock implements ClanMembersServiceInterface {
  getClanMembersSerialized(clanId: string): Observable<GroupsV2GroupMember[]> {
    //console.log('returning');
    return of([]);
  }
}
