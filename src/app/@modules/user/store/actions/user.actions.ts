
import { Action } from '@ngrx/store';

import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

export enum ActionTypes {
    UserUpdateSuccess 		= '[User Module] User Update Success',
    UserUpdateError 		= '[User Module] User Update Error',
	UserCreateSuccess 		= '[User Module] User Create Success',
	UserCreateError 		= '[User Module] User Create Error',
	UserDeleteSuccess 		= '[User Module] User Delete Success',
	UserDeleteError 		= '[User Module] User Delete Error',
	UserLoadAllSuccess 		= '[User Module] User Load All Success',
	UserLoadAllError 		= '[User Module] User Load All Error'
}

export class UserUpdateSuccess implements Action {
	readonly type = ActionTypes.UserUpdateSuccess;

	constructor(public payload: {
		userId: string,
		meta?: IActionMetadata
	}) {}
}

export class UserUpdateError implements Action {
	readonly type = ActionTypes.UserUpdateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class UserCreateSuccess implements Action {
	readonly type = ActionTypes.UserCreateSuccess;

	constructor(public payload: {
		userId: string,
		meta?: IActionMetadata
	}) {}
}

export class UserCreateError implements Action {
	readonly type = ActionTypes.UserCreateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class UserDeleteSuccess implements Action {
	readonly type = ActionTypes.UserDeleteSuccess;

	constructor(public payload: {
		userId: string,
		meta?: IActionMetadata
	}) {}
}

export class UserDeleteError implements Action {
	readonly type = ActionTypes.UserDeleteError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class UserLoadAllSuccess implements Action {
	readonly type = ActionTypes.UserLoadAllSuccess;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class UserLoadAllError implements Action {
	readonly type = ActionTypes.UserLoadAllError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export type ActionsUnion =  UserUpdateSuccess |
                            UserUpdateError |
							UserCreateSuccess |
							UserCreateError |
							UserDeleteSuccess |
							UserDeleteError |
							UserLoadAllSuccess |
							UserLoadAllError;
