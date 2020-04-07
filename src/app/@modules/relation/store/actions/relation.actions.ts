
import { Action } from '@ngrx/store';

import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

export enum ActionTypes {
	RelationDefinitionUpdateSuccess 		= '[RelationDefinition Module] Relation Definition Update Success',
	RelationDefinitionUpdateError 			= '[RelationDefinition Module] Relation Definition Update Error',
	RelationDefinitionCreateSuccess 		= '[RelationDefinition Module] Relation Definition Create Success',
	RelationDefinitionCreateError 			= '[RelationDefinition Module] Relation Definition Create Error',
	RelationDefinitionDeleteSuccess 		= '[RelationDefinition Module] Relation Definition Delete Success',
	RelationDefinitionDeleteError 			= '[RelationDefinition Module] Relation Definition Delete Error',
	RelationDefinitionLoadAllSuccess 		= '[RelationDefinition Module] Relation Definition Load All Success',
	RelationDefinitionLoadAllError 			= '[RelationDefinition Module] Relation Definition Load All Error',

	RelationInstanceUpdateSuccess 			= '[RelationInstance Module] Relation Instance Update Success',
	RelationInstanceUpdateError 			= '[RelationInstance Module] Relation Instance Update Error',
	RelationInstanceCreateSuccess 			= '[RelationInstance Module] Relation Instance Create Success',
	RelationInstanceCreateError 			= '[RelationInstance Module] Relation Instance Create Error',
	RelationInstanceDeleteSuccess 			= '[RelationInstance Module] Relation Instance Delete Success',
	RelationInstanceDeleteError 			= '[RelationInstance Module] Relation Instance Delete Error',
	RelationInstanceLoadAllSuccess 			= '[RelationInstance Module] Relation Instance Load All Success',
	RelationInstanceLoadAllError 			= '[RelationInstance Module] Relation Instance Load All Error'
}

// --- RELATION DEFINITION ---

export class RelationDefinitionUpdateSuccess implements Action {
	readonly type = ActionTypes.RelationDefinitionUpdateSuccess;

	constructor(public payload: {
		relationDefinitionId: string,
		meta?: IActionMetadata
	}) {}
}

export class RelationDefinitionUpdateError implements Action {
	readonly type = ActionTypes.RelationDefinitionUpdateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class RelationDefinitionCreateSuccess implements Action {
	readonly type = ActionTypes.RelationDefinitionCreateSuccess;

	constructor(public payload: {
		relationDefinitionId: string,
		meta?: IActionMetadata
	}) {}
}

export class RelationDefinitionCreateError implements Action {
	readonly type = ActionTypes.RelationDefinitionCreateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class RelationDefinitionDeleteSuccess implements Action {
	readonly type = ActionTypes.RelationDefinitionDeleteSuccess;

	constructor(public payload: {
		relationDefinitionId: string,
		meta?: IActionMetadata
	}) {}
}

export class RelationDefinitionDeleteError implements Action {
	readonly type = ActionTypes.RelationDefinitionDeleteError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class RelationDefinitionLoadAllSuccess implements Action {
	readonly type = ActionTypes.RelationDefinitionLoadAllSuccess;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class RelationDefinitionLoadAllError implements Action {
	readonly type = ActionTypes.RelationDefinitionLoadAllError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

// --- RELATION INSTANCE ---

export class RelationInstanceUpdateSuccess implements Action {
	readonly type = ActionTypes.RelationInstanceUpdateSuccess;

	constructor(public payload: {
		relationInstanceId: string,
		meta?: IActionMetadata
	}) {}
}

export class RelationInstanceUpdateError implements Action {
	readonly type = ActionTypes.RelationInstanceUpdateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class RelationInstanceCreateSuccess implements Action {
	readonly type = ActionTypes.RelationInstanceCreateSuccess;

	constructor(public payload: {
		relationInstanceId: string,
		meta?: IActionMetadata
	}) {}
}

export class RelationInstanceCreateError implements Action {
	readonly type = ActionTypes.RelationInstanceCreateError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class RelationInstanceDeleteSuccess implements Action {
	readonly type = ActionTypes.RelationInstanceDeleteSuccess;

	constructor(public payload: {
		relationInstanceId: string,
		meta?: IActionMetadata
	}) {}
}

export class RelationInstanceDeleteError implements Action {
	readonly type = ActionTypes.RelationInstanceDeleteError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class RelationInstanceLoadAllSuccess implements Action {
	readonly type = ActionTypes.RelationInstanceLoadAllSuccess;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export class RelationInstanceLoadAllError implements Action {
	readonly type = ActionTypes.RelationInstanceLoadAllError;

	constructor(public payload: {
		meta?: IActionMetadata
	}) {}
}

export type ActionsUnion =  RelationDefinitionUpdateSuccess |
							RelationDefinitionUpdateError |
							RelationDefinitionCreateSuccess |
							RelationDefinitionCreateError |
							RelationDefinitionDeleteSuccess |
							RelationDefinitionDeleteError |
							RelationDefinitionLoadAllSuccess |
							RelationDefinitionLoadAllError |
							RelationInstanceUpdateSuccess |
							RelationInstanceUpdateError |
							RelationInstanceCreateSuccess |
							RelationInstanceCreateError |
							RelationInstanceDeleteSuccess |
							RelationInstanceDeleteError |
							RelationInstanceLoadAllSuccess |
							RelationInstanceLoadAllError;
