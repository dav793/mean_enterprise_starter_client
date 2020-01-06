import { InjectionToken } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {ReplaySubject, of, throwError} from 'rxjs';

import { RolesEffects } from '../roles.effects';
import * as RolesActions from '../../actions/roles.actions';

import { IUser } from '../../../user/user.model';
import { IUserGroup } from '../../../user-group/user-group.model';
import { IRole } from '../../../role/role.model';

import { RoleApiService } from '../../../role/role-api.service';
import { RoleApiServiceStub } from '../../../role/spec/role-api.service.stub';

import { CoreStoreService } from '../../core-store';
import { CoreStoreServiceStub } from '../../spec/core-store.stub';

import { ToasterService } from '../../../../@shared/lib/ngx-toastr/toaster.service';
import { ToasterServiceMock } from '../../../../@shared/lib/ngx-toastr/toastr.service.mock';

import { SocketMessageType } from '../../../../@shared/lib/socket-io/socket-types';

import { usersStub, usersStubObj } from '../../../user/spec/users.stub';
import { userGroupsStub, userGroupsStubObj } from '../../../user-group/spec/user-groups.stub';
import { rolesStub, rolesStubObj } from '../../../role/spec/roles.stub';

const ROLES               = new InjectionToken<IRole[]>('roles');
const USERS_OBJ           = new InjectionToken<{ [key: string]: IUser }>('users object');
const USER_GROUPS_OBJ     = new InjectionToken<{ [key: string]: IUserGroup }>('user groups object');
const ROLES_OBJ           = new InjectionToken<{ [key: string]: IRole }>('roles object');

describe('RoleEffects', () => {
  let actions: ReplaySubject<any>;    // tslint:disable-line
  let effects: RolesEffects;
  let roleApiService: RoleApiService;
  let coreStore: CoreStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RolesEffects,
        provideMockActions(() => actions),
        {
          provide: RoleApiService,
          useFactory: (roles) => new RoleApiServiceStub(roles),
          deps: [ROLES]
        },
        {
          provide: CoreStoreService,
          useFactory: (users, userGroups, roles) => new CoreStoreServiceStub(users, userGroups, roles),
          deps: [USERS_OBJ, USER_GROUPS_OBJ, ROLES_OBJ]
        },
        { provide: ToasterService, useClass: ToasterServiceMock },
        { provide: ROLES, useValue: rolesStub },
        { provide: USERS_OBJ, useValue: usersStubObj },
        { provide: USER_GROUPS_OBJ, useValue: userGroupsStubObj },
        { provide: ROLES_OBJ, useValue: rolesStubObj }
      ]
    });

    effects = TestBed.get(RolesEffects);
    roleApiService = TestBed.get(RoleApiService);
    coreStore = TestBed.get(CoreStoreService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch LoadAllRoles action after ServerEventUpdateRoles action', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.ServerEventUpdateRoles,
      payload: {
        message: {
          type: SocketMessageType.UPDATE_ROLES,
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.serverEventUpdateRoles.subscribe(result => {

      expect(result.type).toEqual(RolesActions.ActionTypes.LoadAllRoles);
      expect(result.payload.meta.clientId).toEqual('CLIENT 1');
      expect(result.payload.meta.forceFetch).toEqual(true);

      done();

    });

  });

  it('should dispatch APILoadAllRolesSuccess after LoadAllRoles action if store has no roles', (done) => {

    const spy = spyOn(coreStore, 'selectAllRoles').and.returnValue(of({}));

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.LoadAllRoles,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.loadAllRoles.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.APILoadAllRolesSuccess);

        const r = result as any;
        expect(r.payload.roles).toBeDefined();
        expect(r.payload.roles.length).toEqual(1);
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(r.payload.meta.forceFetch).toBeFalsy();
        expect(coreStore.selectAllRoles).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch NoOp after LoadAllRoles action if store already has roles', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.LoadAllRoles,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.loadAllRoles.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.NoOp);
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APILoadAllRolesSuccess after LoadAllRoles action if forceFetch enabled', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.LoadAllRoles,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1',
          forceFetch: true
        }
      }
    });

    effects.loadAllRoles.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.APILoadAllRolesSuccess);

        const r = result as any;
        expect(r.payload.roles).toBeDefined();
        expect(r.payload.roles.length).toEqual(1);
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(r.payload.meta.forceFetch).toEqual(true);
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APILoadAllRolesError after LoadAllRoles action if api fetch fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(roleApiService, 'getRoles').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.LoadAllRoles,
      payload: {
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1',
          forceFetch: true
        }
      }
    });

    effects.loadAllRoles.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.APILoadAllRolesError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(roleApiService.getRoles).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIUpdateRoleSuccess after UpdateRole action if api put success', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.UpdateRole,
      payload: {
        roleId: 'ANY',
        role: { name: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.updateRole.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.APIUpdateRoleSuccess);

        const r = result as any;
        expect(r.payload.role).toBeDefined();
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIUpdateRoleError after UpdateRole action if api put fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(roleApiService, 'putRole').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.UpdateRole,
      payload: {
        userId: 'ANY',
        user: { name: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.updateRole.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.APIUpdateRoleError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(roleApiService.putRole).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APICreateRoleSuccess after CreateRole action if api post success', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.CreateRole,
      payload: {
        user: { name: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.createRole.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.APICreateRoleSuccess);

        const r = result as any;
        expect(r.payload.role).toBeDefined();
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
    const spy = spyOn(roleApiService, 'postRole').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.CreateRole,
      payload: {
        user: { name: 'ANY' },
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.createRole.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.APICreateRoleError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(roleApiService.postRole).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIDeleteRoleSuccess after DeleteRole action if api delete success', (done) => {

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.DeleteRole,
      payload: {
        roleId: '21',
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.deleteRole.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.APIDeleteRoleSuccess);

        const r = result as any;
        expect(r.payload.id).toEqual('21');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        done();

      },
      error => fail(error)
    );

  });

  it('should dispatch APIDeleteRoleError after DeleteRole action if api delete fails', (done) => {

    const err = new Error('any error');
    err.name = 'Any Error';
    const spy = spyOn(roleApiService, 'deleteRole').and.returnValue(throwError(err));

    actions = new ReplaySubject(1);
    actions.next({
      type: RolesActions.ActionTypes.DeleteRole,
      payload: {
        roleId: '21',
        meta: {
          eventId: 'EVENT 1',
          clientId: 'CLIENT 1'
        }
      }
    });

    effects.deleteRole.subscribe(
      result => {

        expect(result.type).toEqual(RolesActions.ActionTypes.APIDeleteRoleError);

        const r = result as any;
        expect(r.payload.error).toBeDefined();
        expect(r.payload.error.name).toEqual('Any Error');
        expect(r.payload.error.message).toEqual('any error');
        expect(r.payload.meta.clientId).toEqual('CLIENT 1');
        expect(r.payload.meta.eventId).toEqual('EVENT 1');
        expect(roleApiService.deleteRole).toHaveBeenCalled();
        done();

      },
      error => fail(error)
    );

  });

});
