
import { Action } from '@ngrx/store';

import { IUserGroup } from '../../user-group/user-group.model';
import { IUserGroupUpdateBody, IUserGroupCreateBody } from '../../user-group/user-group-api.service';

import { IActionMetadata } from '../../../@shared/helpers/utils/store-action-metadata-factory';
import { ISocketMessage } from '../../../@shared/lib/socket-io/socket-types';

export enum ActionTypes {
    RemoveUserGroup                   = '[User Group] Remove User Group',
    CreateUserGroup                   = '[User Group View] Create User Group',
    UpdateUserGroup                   = '[User Group View] Update User Group',
    DeleteUserGroup                   = '[User Group View] Delete User Group',
    LoadUserGroup                     = '[User Group View] Load User Group',
    LoadAllUserGroups                 = '[User Group] Load All User Groups',
    APICreateUserGroupSuccess         = '[User Group API] Created User Group Success',
    APICreateUserGroupError           = '[User Group API] Created User Group Error',
    APIUpdateUserGroupSuccess         = '[User Group API] Updated User Group Success',
    APIUpdateUserGroupError           = '[User Group API] Updated User Group Error',
    APIDeleteUserGroupSuccess         = '[User Group API] Deleted User Group Success',
    APIDeleteUserGroupError           = '[User Group API] Deleted User Group Error',
    APILoadUserGroupSuccess           = '[User Group API] Loaded User Group Success',
    APILoadUserGroupError             = '[User Group API] Loaded User Group Error',
    APILoadAllUserGroupsSuccess       = '[User Group API] Loaded All User Groups Success',
    APILoadAllUserGroupsError         = '[User Group API] Loaded All User Groups Error',
    ServerEventUpdateUserGroups       = '[Server Event] Update User Groups',
    NoOp                              = '[User Group] No Operation'
}

export class RemoveUserGroup implements Action {
    readonly type = ActionTypes.RemoveUserGroup;

    constructor(public payload: {
        userGroupId: string,
        meta?: IActionMetadata
    }) {}
}

export class CreateUserGroup implements Action {
    readonly type = ActionTypes.CreateUserGroup;

    constructor(public payload: {
        userGroup: IUserGroupCreateBody,
        meta?: IActionMetadata
    }) {}
}

export class UpdateUserGroup implements Action {
    readonly type = ActionTypes.UpdateUserGroup;

    constructor(public payload: {
        userGroupId: string,
        userGroup: IUserGroupUpdateBody,
        meta?: IActionMetadata
    }) {}
}

export class DeleteUserGroup implements Action {
    readonly type = ActionTypes.DeleteUserGroup;

    constructor(public payload: {
        userGroupId: string,
        meta?: IActionMetadata
    }) {}
}

export class LoadUserGroup implements Action {
    readonly type = ActionTypes.LoadUserGroup;

    constructor(public payload: {
        id: string,
        meta?: IActionMetadata
    }) {}
}

export class LoadAllUserGroups implements Action {
    readonly type = ActionTypes.LoadAllUserGroups;

    constructor(public payload: { meta?: IActionMetadata } = {}) {}
}

export class APICreateUserGroupSuccess implements Action {
    readonly type = ActionTypes.APICreateUserGroupSuccess;

    constructor(public payload: {
        userGroup: IUserGroup,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APICreateUserGroupError implements Action {
    readonly type = ActionTypes.APICreateUserGroupError;

    constructor(public payload: {
        error: Error,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIUpdateUserGroupSuccess implements Action {
    readonly type = ActionTypes.APIUpdateUserGroupSuccess;

    constructor(public payload: {
        userGroup: IUserGroup,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIUpdateUserGroupError implements Action {
    readonly type = ActionTypes.APIUpdateUserGroupError;

    constructor(public payload: {
        error: Error,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIDeleteUserGroupSuccess implements Action {
    readonly type = ActionTypes.APIDeleteUserGroupSuccess;

    constructor(public payload: {
        id: string,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIDeleteUserGroupError implements Action {
    readonly type = ActionTypes.APIDeleteUserGroupError;

    constructor(public payload: {
        error: Error,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APILoadUserGroupSuccess implements Action {
    readonly type = ActionTypes.APILoadUserGroupSuccess;

    constructor(public payload: {
        userGroup: IUserGroup,
        meta?: IActionMetadata
    }) {}
}

export class APILoadUserGroupError implements Action {
    readonly type = ActionTypes.APILoadUserGroupError;

    constructor(public payload: {
        error: Error,
        meta?: IActionMetadata
    }) {}
}

export class APILoadAllUserGroupsSuccess implements Action {
    readonly type = ActionTypes.APILoadAllUserGroupsSuccess;

    constructor(public payload: {
        userGroups: IUserGroup[],
        meta?: IActionMetadata
    }) {}
}

export class APILoadAllUserGroupsError implements Action {
    readonly type = ActionTypes.APILoadAllUserGroupsError;

    constructor(public payload: {
        error: Error,
        meta?: IActionMetadata
    }) {}
}

export class ServerEventUpdateUserGroups implements Action {
    readonly type = ActionTypes.ServerEventUpdateUserGroups;

    constructor(public payload: { message: ISocketMessage }) {}
}

export class NoOp implements Action {
    readonly type = ActionTypes.NoOp;
}

export type ActionsUnion =  RemoveUserGroup |
                            CreateUserGroup |
                            UpdateUserGroup |
                            DeleteUserGroup |
                            LoadUserGroup |
                            LoadAllUserGroups |
                            APICreateUserGroupSuccess |
                            APICreateUserGroupError |
                            APIUpdateUserGroupSuccess |
                            APIUpdateUserGroupError |
                            APIDeleteUserGroupSuccess |
                            APIDeleteUserGroupError |
                            APILoadUserGroupSuccess |
                            APILoadUserGroupError |
                            APILoadAllUserGroupsSuccess |
                            APILoadAllUserGroupsError |
                            ServerEventUpdateUserGroups |
                            NoOp;


