
import { Action } from '@ngrx/store';

import { IRole } from '../../role/role.model';
import { IRoleCreateBody, IRoleUpdateBody } from '../../role/role-api.service';

import { IActionMetadata } from '../../../@shared/helpers/utils/store-action-metadata-factory';
import { ISocketMessage } from '../../../@shared/lib/socket-io/socket-types';

export enum ActionTypes {
    RemoveRole                    = '[Role] Remove Role',
    CreateRole                    = '[Role View] Create Role',
    UpdateRole                    = '[Role View] Update Role',
    DeleteRole                    = '[Role View] Delete Role',
    LoadRole                      = '[Role View] Load Role',
    LoadAllRoles                  = '[Role] Load All Roles',
    APICreateRoleSuccess          = '[Role API] Created Role Success',
    APICreateRoleError            = '[Role API] Created Role Error',
    APIUpdateRoleSuccess          = '[Role API] Updated Role Success',
    APIUpdateRoleError            = '[Role API] Updated Role Error',
    APIDeleteRoleSuccess          = '[Role API] Deleted Role Success',
    APIDeleteRoleError            = '[Role API] Deleted Role Error',
    APILoadRoleSuccess            = '[Role API] Loaded Role Success',
    APILoadRoleError              = '[Role API] Loaded Role Error',
    APILoadAllRolesSuccess        = '[Role API] Loaded All Roles Success',
    APILoadAllRolesError          = '[Role API] Loaded All Roles Error',
    ServerEventUpdateRoles        = '[Server Event] Update Roles',
    NoOp                          = '[User] No Operation'
}

export class RemoveRole implements Action {
    readonly type = ActionTypes.RemoveRole;

    constructor(public payload: {
        roleId: string,
        meta?: IActionMetadata
    }) {}
}

export class CreateRole implements Action {
    readonly type = ActionTypes.CreateRole;

    constructor(public payload: {
        role: IRoleCreateBody,
        meta?: IActionMetadata
    }) {}
}

export class UpdateRole implements Action {
    readonly type = ActionTypes.UpdateRole;

    constructor(public payload: {
        roleId: string,
        role: IRoleUpdateBody,
        meta?: IActionMetadata
    }) {}
}

export class DeleteRole implements Action {
    readonly type = ActionTypes.DeleteRole;

    constructor(public payload: {
        roleId: string,
        meta?: IActionMetadata
    }) {}
}

export class LoadRole implements Action {
    readonly type = ActionTypes.LoadRole;

    constructor(public payload: {
        id: string,
        meta?: IActionMetadata
    }) {}
}

export class LoadAllRoles implements Action {
    readonly type = ActionTypes.LoadAllRoles;

    constructor(public payload: { meta?: IActionMetadata } = {}) {}
}

export class APICreateRoleSuccess implements Action {
    readonly type = ActionTypes.APICreateRoleSuccess;

    constructor(public payload: {
        role: IRole,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APICreateRoleError implements Action {
    readonly type = ActionTypes.APICreateRoleError;

    constructor(public payload: {
        error: Error,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIUpdateRoleSuccess implements Action {
    readonly type = ActionTypes.APIUpdateRoleSuccess;

    constructor(public payload: {
        role: IRole,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIUpdateRoleError implements Action {
    readonly type = ActionTypes.APIUpdateRoleError;

    constructor(public payload: {
        error: Error,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIDeleteRoleSuccess implements Action {
    readonly type = ActionTypes.APIDeleteRoleSuccess;

    constructor(public payload: {
        id: string,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIDeleteRoleError implements Action {
    readonly type = ActionTypes.APIDeleteRoleError;

    constructor(public payload: {
        error: Error,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APILoadRoleSuccess implements Action {
    readonly type = ActionTypes.APILoadRoleSuccess;

    constructor(public payload: {
        role: IRole,
        meta?: IActionMetadata
    }) {}
}

export class APILoadRoleError implements Action {
    readonly type = ActionTypes.APILoadRoleError;

    constructor(public payload: {
        error: Error,
        meta?: IActionMetadata
    }) {}
}

export class APILoadAllRolesSuccess implements Action {
    readonly type = ActionTypes.APILoadAllRolesSuccess;

    constructor(public payload: {
        roles: IRole[],
        meta?: IActionMetadata
    }) {}
}

export class APILoadAllRolesError implements Action {
    readonly type = ActionTypes.APILoadAllRolesError;

    constructor(public payload: {
        error: Error,
        meta?: IActionMetadata
    }) {}
}

export class ServerEventUpdateRoles implements Action {
    readonly type = ActionTypes.ServerEventUpdateRoles;

    constructor(public payload: { message: ISocketMessage }) {}
}

export class NoOp implements Action {
    readonly type = ActionTypes.NoOp;
}

export type ActionsUnion =  RemoveRole |
                            CreateRole |
                            UpdateRole |
                            DeleteRole |
                            LoadRole |
                            LoadAllRoles |
                            APICreateRoleSuccess |
                            APICreateRoleError |
                            APIUpdateRoleSuccess |
                            APIUpdateRoleError |
                            APIDeleteRoleSuccess |
                            APIDeleteRoleError |
                            APILoadRoleSuccess |
                            APILoadRoleError |
                            APILoadAllRolesSuccess |
                            APILoadAllRolesError |
                            ServerEventUpdateRoles |
                            NoOp;


