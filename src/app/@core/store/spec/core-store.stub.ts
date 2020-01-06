import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import { IActionMetadata } from '../../../@shared/helpers/utils/store-action-metadata-factory';

import {IUser} from '../../user/user.model';
import {IUserRegisterBody, IUserUpdateBody} from '../../user/user-api.service';

import {IRole} from '../../role/role.model';
import {IRoleCreateBody, IRoleUpdateBody} from '../../role/role-api.service';

import {IUserGroup} from '../../user-group/user-group.model';
import {IUserGroupCreateBody, IUserGroupUpdateBody} from '../../user-group/user-group-api.service';

@Injectable()
export class CoreStoreServiceStub {

  protected clientId: string;

  constructor(
    private users: { [key: string]: IUser },
    private userGroups: { [key: string]: IUserGroup },
    private roles: { [key: string]: IRole }
  ) {}

  selectAllUsers(): Observable<{ [key: string]: IUser }> {
    return of(this.users);
  }

  selectUser(userId: string): Observable<IUser> {
    const firstKey = Object.keys(this.users)[0];
    return of(this.users[firstKey]);
  }

  selectSessionUser(): Observable<IUser> {
    const firstKey = Object.keys(this.users)[0];
    return of(this.users[firstKey]);
  }

  selectAllRoles(): Observable<{ [key: string]: IRole }> {
    return of(this.roles);
  }

  selectRole(roleId: string): Observable<IRole> {
    const firstKey = Object.keys(this.roles)[0];
    return of(this.roles[firstKey]);
  }

  selectAllUserGroups(): Observable<{ [key: string]: IUserGroup }> {
    return of(this.userGroups);
  }

  selectUserGroup(userGroupId: string): Observable<IUserGroup> {
    const firstKey = Object.keys(this.userGroups)[0];
    return of(this.userGroups[firstKey]);
  }

  selectClientId(): Observable<string> {
    return of('1');
  }

  loadAllUsers(): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  createUser(user: IUserRegisterBody): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  updateUser(userId: string, user: IUserUpdateBody): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  deleteUser(userId: string): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  loadAllRoles(): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  createRole(role: IRoleCreateBody): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  updateRole(roleId: string, role: IRoleUpdateBody): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  deleteRole(roleId: string): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  loadAllUserGroups(): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  createUserGroup(userGroup: IUserGroupCreateBody): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  updateUserGroup(userGroupId: string, userGroup: IUserGroupUpdateBody): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  deleteUserGroup(userGroupId: string): IActionMetadata {
    return {
      clientId: '1',
      eventId: '2'
    };
  }

  setSession(user: IUser): void {}

  unsetSession(): void {}

  setClientId(clientId: string): void {}

}
