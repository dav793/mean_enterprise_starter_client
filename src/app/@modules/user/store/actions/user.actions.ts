
import { Action } from '@ngrx/store';

import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

export enum ActionTypes {
    UserSaveSuccess = '[User Module] User Save Success',
    UserSaveError = '[User Module] User Save Error',
	UserLoadAllError = '[User Module] User Load All Error',
}

export class UserSaveSuccess implements Action {
    readonly type = ActionTypes.UserSaveSuccess;

    constructor(public payload: {
		meta?: IActionMetadata
    }) {}
}

export class UserSaveError implements Action {
    readonly type = ActionTypes.UserSaveError;

    constructor(public payload: {
		meta?: IActionMetadata
    }) {}
}

export class UserLoadAllError implements Action {
	readonly type = ActionTypes.UserLoadAllError;

	constructor(public payload: {
		meta?: IActionMetadata,
	}) {}
}

export type ActionsUnion =  UserSaveSuccess |
                            UserSaveError |
							UserLoadAllError;
