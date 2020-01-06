
import { Action } from '@ngrx/store';

import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

export enum ActionTypes {
	UserGroupUpdateSuccess     = '[User Group Module] User Group Update Success',
	UserGroupUpdateError       = '[User Group Module] User Group Update Error',
	UserGroupCreateSuccess     = '[User Group Module] User Group Create Success',
	UserGroupCreateError       = '[User Group Module] User Group Create Error',
	UserGroupDeleteSuccess     = '[User Group Module] User Group Delete Success',
	UserGroupDeleteError       = '[User Group Module] User Group Delete Error'
}

export class UserGroupUpdateSuccess implements Action {
	readonly type = ActionTypes.UserGroupUpdateSuccess;

	constructor(public payload: {
		userGroupId: string,
		meta?: IActionMetadata
	}) {}
}

export class UserGroupUpdateError implements Action {
	readonly type = ActionTypes.UserGroupUpdateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class UserGroupCreateSuccess implements Action {
	readonly type = ActionTypes.UserGroupCreateSuccess;

	constructor(public payload: {
		userGroupId: string,
		meta?: IActionMetadata
	}) {}
}

export class UserGroupCreateError implements Action {
	readonly type = ActionTypes.UserGroupCreateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class UserGroupDeleteSuccess implements Action {
	readonly type = ActionTypes.UserGroupDeleteSuccess;

	constructor(public payload: {
		userGroupId: string,
		meta?: IActionMetadata
	}) {}
}

export class UserGroupDeleteError implements Action {
	readonly type = ActionTypes.UserGroupDeleteError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export type ActionsUnion =  UserGroupUpdateSuccess |
	UserGroupUpdateError |
	UserGroupCreateSuccess |
	UserGroupCreateError |
	UserGroupDeleteSuccess |
	UserGroupDeleteError;
