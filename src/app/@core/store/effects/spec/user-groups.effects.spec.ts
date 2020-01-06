import { InjectionToken } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {ReplaySubject, of, throwError} from 'rxjs';

import { UserGroupsEffects } from '../user-groups.effects';
import * as UserGroupsActions from '../../actions/user-groups.actions';

import { IUser } from '../../../user/user.model';
import { IUserGroup } from '../../../user-group/user-group.model';
import { IRole } from '../../../role/role.model';

import { UserGroupApiService } from '../../../user-group/user-group-api.service';
import { UserGroupApiServiceStub } from '../../../user-group/spec/user-group-api.service.stub';

import { CoreStoreService } from '../../core-store';
import { CoreStoreServiceStub } from '../../spec/core-store.stub';

import { ToasterService } from '../../../../@shared/lib/ngx-toastr/toaster.service';
import { ToasterServiceMock } from '../../../../@shared/lib/ngx-toastr/toastr.service.mock';

import { SocketMessageType } from '../../../../@shared/lib/socket-io/socket-types';

import { usersStub, usersStubObj } from '../../../user/spec/users.stub';
import { userGroupsStub, userGroupsStubObj } from '../../../user-group/spec/user-groups.stub';
import { rolesStub, rolesStubObj } from '../../../role/spec/roles.stub';

const USER_GROUPS         = new InjectionToken<IUserGroup[]>('user groups');
const USERS_OBJ           = new InjectionToken<{ [key: string]: IUser }>('users object');
const USER_GROUPS_OBJ     = new InjectionToken<{ [key: string]: IUserGroup }>('user groups object');
const ROLES_OBJ           = new InjectionToken<{ [key: string]: IRole }>('roles object');

describe('UserGroupEffects', () => {
  let actions: ReplaySubject<any>;    // tslint:disable-line
  let effects: UserGroupsEffects;
  let userGroupApiService: UserGroupApiService;
  let coreStore: CoreStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserGroupsEffects,
        provideMockActions(() => actions),
        {
          provide: UserGroupApiService,
          useFactory: (userGroups) => new UserGroupApiServiceStub(userGroups),
          deps: [USER_GROUPS]
        },
        {
          provide: CoreStoreService,
          useFactory: (users, userGroups, roles) => new CoreStoreServiceStub(users, userGroups, roles),
          deps: [USERS_OBJ, USER_GROUPS_OBJ, ROLES_OBJ]
        },
        { provide: ToasterService, useClass: ToasterServiceMock },
        { provide: USER_GROUPS, useValue: userGroupsStub },
        { provide: USERS_OBJ, useValue: usersStubObj },
        { provide: USER_GROUPS_OBJ, useValue: userGroupsStubObj },
        { provide: ROLES_OBJ, useValue: rolesStubObj }
      ]
    });

    effects = TestBed.get(UserGroupsEffects);
    userGroupApiService = TestBed.get(UserGroupApiService);
    coreStore = TestBed.get(CoreStoreService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch LoadAllUserGroups action after ServerEventUpdateUserGroups action', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.ServerEventUpdateUserGroups,
      payload: {
        message: {
          type: SocketMessageType.UPDATE_USER_GROUPS,
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.serverEventUpdateUserGroups.subscribe(result => {

      expect(result.type).toEqual(UserGroupsActions.ActionTypes.LoadAllUserGroups);
      expect(result.payload.meta.clientId).toEqual('CLIENT 1');
      expect(result.payload.meta.forceFetch).toEqual(true);

      done();

    });

  });

  it('should dispatch APILoadAllUserGroupsSuccess after LoadAllUserGroups action if store has no user groups', (done) => {

    const spy = spyOn(coreStore, 'selectAllUserGroups').and.returnValue(of({}));

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.LoadAllUserGroups,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.loadAllUserGroups.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.APILoadAllUserGroupsSuccess);

        const r = result as any;
        expect(r.payload.userGroups).toBeDefined();
        expect(r.payload.userGroups.length).toEqual(2);
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(r.payload.meta.forceFetch).toBeFalsy();
        expect(coreStore.selectAllUserGroups).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch NoOp after LoadAllUserGroups action if store already has user groups', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.LoadAllUserGroups,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.loadAllUserGroups.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.NoOp);
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APILoadAllUserGroupsSuccess after LoadAllUserGroups action if forceFetch enabled', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.LoadAllUserGroups,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1',
          forceFetch: true
        }
      }
    });

    effects.loadAllUserGroups.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.APILoadAllUserGroupsSuccess);

        const r = result as any;
        expect(r.payload.userGroups).toBeDefined();
        expect(r.payload.userGroups.length).toEqual(2);
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(r.payload.meta.forceFetch).toEqual(true);
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APILoadAllUserGroupsError after LoadAllUserGroups action if api fetch fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(userGroupApiService, 'getUserGroups').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.LoadAllUserGroups,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1',
          forceFetch: true
        }
      }
    });

    effects.loadAllUserGroups.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.APILoadAllUserGroupsError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(userGroupApiService.getUserGroups).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIUpdateUserGroupSuccess after UpdateUserGroup action if api put success', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.UpdateUserGroup,
      payload: {
        userGroupId: 'ANY',
        userGroup: { label: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.updateUserGroup.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.APIUpdateUserGroupSuccess);

        const r = result as any;
        expect(r.payload.userGroup).toBeDefined();
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIUpdateUserGroupError after UpdateUserGroup action if api put fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(userGroupApiService, 'putUserGroup').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.UpdateUserGroup,
      payload: {
        userGroupId: 'ANY',
        userGroup: { label: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.updateUserGroup.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.APIUpdateUserGroupError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(userGroupApiService.putUserGroup).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APICreateUserGroupSuccess after CreateUserGroup action if api post success', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.CreateUserGroup,
      payload: {
        userGroup: { label: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.createUserGroup.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.APICreateUserGroupSuccess);

        const r = result as any;
        expect(r.payload.userGroup).toBeDefined();
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APICreateUserGroupError after CreateUserGroup action if api post fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(userGroupApiService, 'postUserGroup').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.CreateUserGroup,
      payload: {
        userGroup: { label: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.createUserGroup.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.APICreateUserGroupError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(userGroupApiService.postUserGroup).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIDeleteUserGroupSuccess after DeleteUserGroup action if api delete success', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.DeleteUserGroup,
      payload: {
        userGroupId: '11',
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.deleteUserGroup.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.APIDeleteUserGroupSuccess);

        const r = result as any;
        expect(r.payload.id).toEqual('11');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIDeleteUserGroupError after DeleteUserGroup action if api delete fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(userGroupApiService, 'deleteUserGroup').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: UserGroupsActions.ActionTypes.DeleteUserGroup,
      payload: {
        userGroupId: '11',
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.deleteUserGroup.subscribe(
      result => {

        expect(result.type).toEqual(UserGroupsActions.ActionTypes.APIDeleteUserGroupError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(userGroupApiService.deleteUserGroup).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

});
