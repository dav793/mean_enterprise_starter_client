
import { Action } from '@ngrx/store';

import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

export enum ActionTypes {
	ContactUpdateSuccess     = '[Contact Module] Contact Update Success',
	ContactUpdateError       = '[Contact Module] Contact Update Error',
	ContactCreateSuccess     = '[Contact Module] Contact Create Success',
	ContactCreateError       = '[Contact Module] Contact Create Error',
	ContactDeleteSuccess     = '[Contact Module] Contact Delete Success',
	ContactDeleteError       = '[Contact Module] Contact Delete Error'
}

export class ContactUpdateSuccess implements Action {
	readonly type = ActionTypes.ContactUpdateSuccess;

	constructor(public payload: {
		contactId: string,
		meta?: IActionMetadata
	}) {}
}

export class ContactUpdateError implements Action {
	readonly type = ActionTypes.ContactUpdateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class ContactCreateSuccess implements Action {
	readonly type = ActionTypes.ContactCreateSuccess;

	constructor(public payload: {
		contactId: string,
		meta?: IActionMetadata
	}) {}
}

export class ContactCreateError implements Action {
	readonly type = ActionTypes.ContactCreateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class ContactDeleteSuccess implements Action {
	readonly type = ActionTypes.ContactDeleteSuccess;

	constructor(public payload: {
		contactId: string,
		meta?: IActionMetadata
	}) {}
}

export class ContactDeleteError implements Action {
	readonly type = ActionTypes.ContactDeleteError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export type ActionsUnion =  ContactUpdateSuccess |
	ContactUpdateError |
	ContactCreateSuccess |
	ContactCreateError |
	ContactDeleteSuccess |
	ContactDeleteError;
