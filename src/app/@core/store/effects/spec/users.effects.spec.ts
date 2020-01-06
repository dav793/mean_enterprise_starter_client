import { InjectionToken } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {ReplaySubject, of, throwError} from 'rxjs';

import { UsersEffects } from '../users.effects';
import * as UsersActions from '../../actions/users.actions';

import { IUser } from '../../../user/user.model';
import { IUserGroup } from '../../../user-group/user-group.model';
import { IRole } from '../../../role/role.model';

import { UserApiService } from '../../../user/user-api.service';
import { UserApiServiceStub } from '../../../user/spec/user-api.service.stub';

import { CoreStoreService } from '../../core-store';
import { CoreStoreServiceStub } from '../../spec/core-store.stub';

import { ToasterService } from '../../../../@shared/lib/ngx-toastr/toaster.service';
import { ToasterServiceMock } from '../../../../@shared/lib/ngx-toastr/toastr.service.mock';

import { SocketMessageType } from '../../../../@shared/lib/socket-io/socket-types';

import { usersStub, usersStubObj } from '../../../user/spec/users.stub';
import { userGroupsStub, userGroupsStubObj } from '../../../user-group/spec/user-groups.stub';
import { rolesStub, rolesStubObj } from '../../../role/spec/roles.stub';

const USERS               = new InjectionToken<IUser[]>('users');
const USERS_OBJ           = new InjectionToken<{ [key: string]: IUser }>('users object');
const USER_GROUPS_OBJ     = new InjectionToken<{ [key: string]: IUserGroup }>('user groups object');
const ROLES_OBJ           = new InjectionToken<{ [key: string]: IRole }>('roles object');

describe('UserEffects', () => {
  let actions: ReplaySubject<any>;    // tslint:disable-line
  let effects: UsersEffects;
  let userApiService: UserApiService;
  let coreStore: CoreStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        provideMockActions(() => actions),
        {
          provide: UserApiService,
          useFactory: (users) => new UserApiServiceStub(users),
          deps: [USERS]
        },
        {
          provide: CoreStoreService,
          useFactory: (users, userGroups, roles) => new CoreStoreServiceStub(users, userGroups, roles),
          deps: [USERS_OBJ, USER_GROUPS_OBJ, ROLES_OBJ]
        },
        { provide: ToasterService, useClass: ToasterServiceMock },
        { provide: USERS, useValue: usersStub },
        { provide: USERS_OBJ, useValue: usersStubObj },
        { provide: USER_GROUPS_OBJ, useValue: userGroupsStubObj },
        { provide: ROLES_OBJ, useValue: rolesStubObj }
      ]
    });

    effects = TestBed.get(UsersEffects);
    userApiService = TestBed.get(UserApiService);
    coreStore = TestBed.get(CoreStoreService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch LoadAllUsers action after ServerEventUpdateUsers action', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.ServerEventUpdateUsers,
      payload: {
        message: {
          type: SocketMessageType.UPDATE_USERS,
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.serverEventUpdateUsers.subscribe(result => {

      expect(result.type).toEqual(UsersActions.ActionTypes.LoadAllUsers);
      expect(result.payload.meta.clientId).toEqual('CLIENT 1');
      expect(result.payload.meta.forceFetch).toEqual(true);

      done();

    });

  });

  it('should dispatch APILoadAllUsersSuccess after LoadAllUsers action if store has no users', (done) => {

    const spy = spyOn(coreStore, 'selectAllUsers').and.returnValue(of({}));

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.LoadAllUsers,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.loadAllUsers.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.APILoadAllUsersSuccess);

        const r = result as any;
        expect(r.payload.users).toBeDefined();
        expect(r.payload.users.length).toEqual(2);
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(r.payload.meta.forceFetch).toBeFalsy();
        expect(coreStore.selectAllUsers).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch NoOp after LoadAllUsers action if store already has users', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.LoadAllUsers,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.loadAllUsers.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.NoOp);
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APILoadAllUsersSuccess after LoadAllUsers action if forceFetch enabled', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.LoadAllUsers,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1',
          forceFetch: true
        }
      }
    });

    effects.loadAllUsers.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.APILoadAllUsersSuccess);

        const r = result as any;
        expect(r.payload.users).toBeDefined();
        expect(r.payload.users.length).toEqual(2);
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(r.payload.meta.forceFetch).toEqual(true);
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APILoadAllUsersError after LoadAllUsers action if api fetch fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(userApiService, 'getUsers').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.LoadAllUsers,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1',
          forceFetch: true
        }
      }
    });

    effects.loadAllUsers.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.APILoadAllUsersError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(userApiService.getUsers).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIUpdateUserSuccess after UpdateUser action if api put success', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.UpdateUser,
      payload: {
        userId: 'ANY',
        user: { firstName: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.updateUser.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.APIUpdateUserSuccess);

        const r = result as any;
        expect(r.payload.user).toBeDefined();
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIUpdateUserError after UpdateUser action if api put fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(userApiService, 'putUser').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.UpdateUser,
      payload: {
        userId: 'ANY',
        user: { firstName: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.updateUser.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.APIUpdateUserError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(userApiService.putUser).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APICreateUserSuccess after CreateUser action if api post success', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.CreateUser,
      payload: {
        user: { firstName: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.createUser.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.APICreateUserSuccess);

        const r = result as any;
        expect(r.payload.user).toBeDefined();
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APICreateUserError after CreateUser action if api post fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(userApiService, 'postUser').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.CreateUser,
      payload: {
        user: { firstName: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.createUser.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.APICreateUserError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(userApiService.postUser).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIDeleteUserSuccess after DeleteUser action if api delete success', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.DeleteUser,
      payload: {
        userId: '01',
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.deleteUser.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.APIDeleteUserSuccess);

        const r = result as any;
        expect(r.payload.id).toEqual('01');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIDeleteUserError after DeleteUser action if api delete fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(userApiService, 'deleteUser').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: UsersActions.ActionTypes.DeleteUser,
      payload: {
        userId: '01',
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.deleteUser.subscribe(
      result => {

        expect(result.type).toEqual(UsersActions.ActionTypes.APIDeleteUserError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(userApiService.deleteUser).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

});
