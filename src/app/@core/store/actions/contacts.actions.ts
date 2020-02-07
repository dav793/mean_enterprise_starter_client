
import { Action } from '@ngrx/store';

import { IContact } from '../../contact/contact.model';

import { IActionMetadata } from '../../../@shared/helpers/utils/store-action-metadata-factory';
import { ISocketMessage } from '../../../@shared/lib/socket-io/socket-types';

export enum ActionTypes {
	RemoveContact                  	= '[Contact] Remove Contact',
	CreateContact                  	= '[Contact] Create Contact',
	UpdateContact                  	= '[Contact] Update Contact',
	DeleteContact                  	= '[Contact] Delete Contact',
	LoadContact                    	= '[Contact] Load Contact',
	LoadAllContacts                	= '[Contact] Load All Contacts',
	APICreateContactSuccess        	= '[Contact API] Created Contact Success',
	APICreateContactError          	= '[Contact API] Created Contact Error',
	APIUpdateContactSuccess        	= '[Contact API] Updated Contact Success',
	APIUpdateContactError          	= '[Contact API] Updated Contact Error',
	APIDeleteContactSuccess        	= '[Contact API] Deleted Contact Success',
	APIDeleteContactError          	= '[Contact API] Deleted Contact Error',
	APILoadAllContactsSuccess      	= '[Contact API] Loaded All Contacts Success',
	APILoadAllContactsError        	= '[Contact API] Loaded All Contacts Error',
	ServerEventUpdateContacts      	= '[Server Event] Update Contacts',
	NoOp                        	= '[Contact] No Operation'
}

export class RemoveContact implements Action {
	readonly type = ActionTypes.RemoveContact;

	constructor(public payload: {
		contactId: string,
		meta?: IActionMetadata
	}) {}
}

export class CreateContact implements Action {
	readonly type = ActionTypes.CreateContact;

	constructor(public payload: {
		contact: IContact,
		meta?: IActionMetadata
	}) {}
}

export class UpdateContact implements Action {
	readonly type = ActionTypes.UpdateContact;

	constructor(public payload: {
		contactId: string,
		contact: IContact,
		meta?: IActionMetadata
	}) {}
}

export class DeleteContact implements Action {
	readonly type = ActionTypes.DeleteContact;

	constructor(public payload: {
		contactId: string,
		meta?: IActionMetadata
	}) {}
}

export class LoadContact implements Action {
	readonly type = ActionTypes.LoadContact;

	constructor(public payload: {
		id: string,
		meta?: IActionMetadata
	}) {}
}

export class LoadAllContacts implements Action {
	readonly type = ActionTypes.LoadAllContacts;

	constructor(public payload: { meta?: IActionMetadata } = {}) {}
}

export class APICreateContactSuccess implements Action {
	readonly type = ActionTypes.APICreateContactSuccess;

	constructor(public payload: {
		contact: IContact,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APICreateContactError implements Action {
	readonly type = ActionTypes.APICreateContactError;

	constructor(public payload: {
		error: Error,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIUpdateContactSuccess implements Action {
	readonly type = ActionTypes.APIUpdateContactSuccess;

	constructor(public payload: {
		contact: IContact,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIUpdateContactError implements Action {
	readonly type = ActionTypes.APIUpdateContactError;

	constructor(public payload: {
		error: Error,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIDeleteContactSuccess implements Action {
	readonly type = ActionTypes.APIDeleteContactSuccess;

	constructor(public payload: {
		id: string,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIDeleteContactError implements Action {
	readonly type = ActionTypes.APIDeleteContactError;

	constructor(public payload: {
		error: Error,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APILoadAllContactsSuccess implements Action {
	readonly type = ActionTypes.APILoadAllContactsSuccess;

	constructor(public payload: {
		contacts: IContact[],
		meta?: IActionMetadata
	}) {}
}

export class APILoadAllContactsError implements Action {
	readonly type = ActionTypes.APILoadAllContactsError;

	constructor(public payload: {
		error: Error,
		meta?: IActionMetadata
	}) {}
}

export class ServerEventUpdateContacts implements Action {
	readonly type = ActionTypes.ServerEventUpdateContacts;

	constructor(public payload: { message: ISocketMessage }) {}
}

export class NoOp implements Action {
	readonly type = ActionTypes.NoOp;
}

export type ActionsUnion =  	RemoveContact |
								CreateContact |
								UpdateContact |
								DeleteContact |
								LoadContact |
								LoadAllContacts |
								APICreateContactSuccess |
								APICreateContactError |
								APIUpdateContactSuccess |
								APIUpdateContactError |
								APIDeleteContactSuccess |
								APIDeleteContactError |
								APILoadAllContactsSuccess |
								APILoadAllContactsError |
								ServerEventUpdateContacts |
								NoOp;
