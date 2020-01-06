
import { Action } from '@ngrx/store';

import { IUser } from '../../user/user.model';
import { IUserRegisterBody, IUserUpdateBody } from '../../user/user-api.service';

import { IActionMetadata } from '../../../@shared/helpers/utils/store-action-metadata-factory';
import { ISocketMessage } from '../../../@shared/lib/socket-io/socket-types';

export enum ActionTypes {
	RegisterUser				= '[User Register View] Register User',
    RemoveUser                  = '[User] Remove User',
	CreateUser                  = '[User] Create User',
    UpdateUser                  = '[User] Update User',
    DeleteUser                  = '[User] Delete User',
    LoadUser                    = '[User] Load User',
    LoadAllUsers                = '[User] Load All Users',
    APICreateUserSuccess        = '[User API] Created User Success',
    APICreateUserError          = '[User API] Created User Error',
    APIUpdateUserSuccess        = '[User API] Updated User Success',
    APIUpdateUserError          = '[User API] Updated User Error',
    APIDeleteUserSuccess        = '[User API] Deleted User Success',
    APIDeleteUserError          = '[User API] Deleted User Error',
    APILoadAllUsersSuccess      = '[User API] Loaded All Users Success',
    APILoadAllUsersError        = '[User API] Loaded All Users Error',
    ServerEventUpdateUsers      = '[Server Event] Update Users',
    NoOp                        = '[User] No Operation'
}

export class RegisterUser implements Action {
	readonly type = ActionTypes.RegisterUser;

	constructor(public payload: {
		user: IUserRegisterBody,
		meta?: IActionMetadata
	}) {}
}

export class RemoveUser implements Action {
    readonly type = ActionTypes.RemoveUser;

    constructor(public payload: {
        userId: string,
        meta?: IActionMetadata
    }) {}
}

export class CreateUser implements Action {
    readonly type = ActionTypes.CreateUser;

    constructor(public payload: {
        user: IUserRegisterBody,
        meta?: IActionMetadata
    }) {}
}

export class UpdateUser implements Action {
    readonly type = ActionTypes.UpdateUser;

    constructor(public payload: {
        userId: string,
        user: IUserUpdateBody,
        meta?: IActionMetadata
    }) {}
}

export class DeleteUser implements Action {
    readonly type = ActionTypes.DeleteUser;

    constructor(public payload: {
        userId: string,
        meta?: IActionMetadata
    }) {}
}

export class LoadUser implements Action {
    readonly type = ActionTypes.LoadUser;

    constructor(public payload: {
        id: string,
        meta?: IActionMetadata
    }) {}
}

export class LoadAllUsers implements Action {
    readonly type = ActionTypes.LoadAllUsers;

    constructor(public payload: { meta?: IActionMetadata } = {}) {}
}

export class APICreateUserSuccess implements Action {
    readonly type = ActionTypes.APICreateUserSuccess;

    constructor(public payload: {
        user: IUser,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APICreateUserError implements Action {
    readonly type = ActionTypes.APICreateUserError;

    constructor(public payload: {
        error: Error,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIUpdateUserSuccess implements Action {
    readonly type = ActionTypes.APIUpdateUserSuccess;

    constructor(public payload: {
        user: IUser,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIUpdateUserError implements Action {
    readonly type = ActionTypes.APIUpdateUserError;

    constructor(public payload: {
        error: Error,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIDeleteUserSuccess implements Action {
    readonly type = ActionTypes.APIDeleteUserSuccess;

    constructor(public payload: {
        id: string,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APIDeleteUserError implements Action {
    readonly type = ActionTypes.APIDeleteUserError;

    constructor(public payload: {
        error: Error,
        overrideToastId?: any,
        meta?: IActionMetadata
    }) {}
}

export class APILoadAllUsersSuccess implements Action {
    readonly type = ActionTypes.APILoadAllUsersSuccess;

    constructor(public payload: {
        users: IUser[],
        meta?: IActionMetadata
    }) {}
}

export class APILoadAllUsersError implements Action {
    readonly type = ActionTypes.APILoadAllUsersError;

    constructor(public payload: {
        error: Error,
        meta?: IActionMetadata
    }) {}
}

export class ServerEventUpdateUsers implements Action {
    readonly type = ActionTypes.ServerEventUpdateUsers;

    constructor(public payload: { message: ISocketMessage }) {}
}

export class NoOp implements Action {
    readonly type = ActionTypes.NoOp;
}

export type ActionsUnion =  RegisterUser |
							RemoveUser |
                            CreateUser |
                            UpdateUser |
                            DeleteUser |
                            LoadUser |
                            LoadAllUsers |
                            APICreateUserSuccess |
                            APICreateUserError |
                            APIUpdateUserSuccess |
                            APIUpdateUserError |
                            APIDeleteUserSuccess |
                            APIDeleteUserError |
                            APILoadAllUsersSuccess |
                            APILoadAllUsersError |
                            ServerEventUpdateUsers |
                            NoOp;
