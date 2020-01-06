import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

import { IUserGroup } from '../user-group.model';
import { IUserGroupCreateBody, IUserGroupUpdateBody } from '../user-group-api.service';


@Injectable()
export class UserGroupApiServiceStub {

  constructor(
    private userGroups: IUserGroup[]
  ) {}

  getUserGroups(): Observable<IUserGroup[]> {
    return of(this.userGroups);
  }

  getUserGroup(userGroupId: string): Observable<IUserGroup> {
    return of(this.userGroups[0]);
  }

  postUserGroup(userGroupBody: IUserGroupCreateBody): Observable<IUserGroup> {
    return of(this.userGroups[0]);
  }

  putUserGroup(userGroupId: string, userGroupBody: IUserGroupUpdateBody): Observable<IUserGroup> {
    return of(this.userGroups[0]);
  }

  deleteUserGroup(userGroupId: string): Observable<boolean> {
    return of(true);
  }

}
