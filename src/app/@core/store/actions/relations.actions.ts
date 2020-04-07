
import { Action } from '@ngrx/store';

import { IRelationDefinition } from '../../relation/relation-definition.model';
import { IRelationInstance } from '../../relation/relation-instance.model';

import { IActionMetadata } from '../../../@shared/helpers/utils/store-action-metadata-factory';
import { ISocketMessage } from '../../../@shared/lib/socket-io/socket-types';

export enum ActionTypes {
	RemoveRelationDefinition                  	= '[RelationDefinition] Remove RelationDefinition',
	CreateRelationDefinition                  	= '[RelationDefinition] Create RelationDefinition',
	UpdateRelationDefinition                  	= '[RelationDefinition] Update RelationDefinition',
	DeleteRelationDefinition                  	= '[RelationDefinition] Delete RelationDefinition',
	LoadRelationDefinition                    	= '[RelationDefinition] Load RelationDefinition',
	LoadAllRelationDefinitions                	= '[RelationDefinition] Load All RelationDefinitions',
	APICreateRelationDefinitionSuccess        	= '[RelationDefinition API] Created RelationDefinition Success',
	APICreateRelationDefinitionError          	= '[RelationDefinition API] Created RelationDefinition Error',
	APIUpdateRelationDefinitionSuccess        	= '[RelationDefinition API] Updated RelationDefinition Success',
	APIUpdateRelationDefinitionError          	= '[RelationDefinition API] Updated RelationDefinition Error',
	APIDeleteRelationDefinitionSuccess        	= '[RelationDefinition API] Deleted RelationDefinition Success',
	APIDeleteRelationDefinitionError          	= '[RelationDefinition API] Deleted RelationDefinition Error',
	APILoadAllRelationDefinitionsSuccess      	= '[RelationDefinition API] Loaded All RelationDefinitions Success',
	APILoadAllRelationDefinitionsError        	= '[RelationDefinition API] Loaded All RelationDefinitions Error',
	ServerEventUpdateRelationDefinitions      	= '[Server Event] Update RelationDefinitions',
	
	RemoveRelationInstance                  	= '[RelationInstance] Remove RelationInstance',
	CreateRelationInstance                  	= '[RelationInstance] Create RelationInstance',
	UpdateRelationInstance                  	= '[RelationInstance] Update RelationInstance',
	DeleteRelationInstance                  	= '[RelationInstance] Delete RelationInstance',
	LoadRelationInstance                    	= '[RelationInstance] Load RelationInstance',
	LoadAllRelationInstances                	= '[RelationInstance] Load All RelationInstances',
	APICreateRelationInstanceSuccess        	= '[RelationInstance API] Created RelationInstance Success',
	APICreateRelationInstanceError          	= '[RelationInstance API] Created RelationInstance Error',
	APIUpdateRelationInstanceSuccess        	= '[RelationInstance API] Updated RelationInstance Success',
	APIUpdateRelationInstanceError          	= '[RelationInstance API] Updated RelationInstance Error',
	APIDeleteRelationInstanceSuccess        	= '[RelationInstance API] Deleted RelationInstance Success',
	APIDeleteRelationInstanceError          	= '[RelationInstance API] Deleted RelationInstance Error',
	APILoadAllRelationInstancesSuccess      	= '[RelationInstance API] Loaded All RelationInstances Success',
	APILoadAllRelationInstancesError        	= '[RelationInstance API] Loaded All RelationInstances Error',
	ServerEventUpdateRelationInstances      	= '[Server Event] Update RelationInstances',
	
	NoOp                        				= '[RelationDefinition] No Operation'
}

// --- RELATION DEFINITION ---

export class RemoveRelationDefinition implements Action {
	readonly type = ActionTypes.RemoveRelationDefinition;

	constructor(public payload: {
		relationDefinitionId: string,
		meta?: IActionMetadata
	}) {}
}

export class CreateRelationDefinition implements Action {
	readonly type = ActionTypes.CreateRelationDefinition;

	constructor(public payload: {
		relationDefinition: IRelationDefinition,
		meta?: IActionMetadata
	}) {}
}

export class UpdateRelationDefinition implements Action {
	readonly type = ActionTypes.UpdateRelationDefinition;

	constructor(public payload: {
		relationDefinitionId: string,
		relationDefinition: IRelationDefinition,
		meta?: IActionMetadata
	}) {}
}

export class DeleteRelationDefinition implements Action {
	readonly type = ActionTypes.DeleteRelationDefinition;

	constructor(public payload: {
		relationDefinitionId: string,
		meta?: IActionMetadata
	}) {}
}

export class LoadRelationDefinition implements Action {
	readonly type = ActionTypes.LoadRelationDefinition;

	constructor(public payload: {
		id: string,
		meta?: IActionMetadata
	}) {}
}

export class LoadAllRelationDefinitions implements Action {
	readonly type = ActionTypes.LoadAllRelationDefinitions;

	constructor(public payload: { meta?: IActionMetadata } = {}) {}
}

export class APICreateRelationDefinitionSuccess implements Action {
	readonly type = ActionTypes.APICreateRelationDefinitionSuccess;

	constructor(public payload: {
		relationDefinition: IRelationDefinition,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APICreateRelationDefinitionError implements Action {
	readonly type = ActionTypes.APICreateRelationDefinitionError;

	constructor(public payload: {
		error: Error,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIUpdateRelationDefinitionSuccess implements Action {
	readonly type = ActionTypes.APIUpdateRelationDefinitionSuccess;

	constructor(public payload: {
		relationDefinition: IRelationDefinition,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIUpdateRelationDefinitionError implements Action {
	readonly type = ActionTypes.APIUpdateRelationDefinitionError;

	constructor(public payload: {
		error: Error,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIDeleteRelationDefinitionSuccess implements Action {
	readonly type = ActionTypes.APIDeleteRelationDefinitionSuccess;

	constructor(public payload: {
		id: string,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIDeleteRelationDefinitionError implements Action {
	readonly type = ActionTypes.APIDeleteRelationDefinitionError;

	constructor(public payload: {
		error: Error,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APILoadAllRelationDefinitionsSuccess implements Action {
	readonly type = ActionTypes.APILoadAllRelationDefinitionsSuccess;

	constructor(public payload: {
		relationDefinitions: IRelationDefinition[],
		meta?: IActionMetadata
	}) {}
}

export class APILoadAllRelationDefinitionsError implements Action {
	readonly type = ActionTypes.APILoadAllRelationDefinitionsError;

	constructor(public payload: {
		error: Error,
		meta?: IActionMetadata
	}) {}
}

export class ServerEventUpdateRelationDefinitions implements Action {
	readonly type = ActionTypes.ServerEventUpdateRelationDefinitions;

	constructor(public payload: { message: ISocketMessage }) {}
}

// --- RELATION INSTANCE ---

export class RemoveRelationInstance implements Action {
	readonly type = ActionTypes.RemoveRelationInstance;

	constructor(public payload: {
		relationInstanceId: string,
		meta?: IActionMetadata
	}) {}
}

export class CreateRelationInstance implements Action {
	readonly type = ActionTypes.CreateRelationInstance;

	constructor(public payload: {
		relationInstance: IRelationInstance,
		meta?: IActionMetadata
	}) {}
}

export class UpdateRelationInstance implements Action {
	readonly type = ActionTypes.UpdateRelationInstance;

	constructor(public payload: {
		relationInstanceId: string,
		relationInstance: IRelationInstance,
		meta?: IActionMetadata
	}) {}
}

export class DeleteRelationInstance implements Action {
	readonly type = ActionTypes.DeleteRelationInstance;

	constructor(public payload: {
		relationInstanceId: string,
		meta?: IActionMetadata
	}) {}
}

export class LoadRelationInstance implements Action {
	readonly type = ActionTypes.LoadRelationInstance;

	constructor(public payload: {
		id: string,
		meta?: IActionMetadata
	}) {}
}

export class LoadAllRelationInstances implements Action {
	readonly type = ActionTypes.LoadAllRelationInstances;

	constructor(public payload: { meta?: IActionMetadata } = {}) {}
}

export class APICreateRelationInstanceSuccess implements Action {
	readonly type = ActionTypes.APICreateRelationInstanceSuccess;

	constructor(public payload: {
		relationInstance: IRelationInstance,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APICreateRelationInstanceError implements Action {
	readonly type = ActionTypes.APICreateRelationInstanceError;

	constructor(public payload: {
		error: Error,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIUpdateRelationInstanceSuccess implements Action {
	readonly type = ActionTypes.APIUpdateRelationInstanceSuccess;

	constructor(public payload: {
		relationInstance: IRelationInstance,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIUpdateRelationInstanceError implements Action {
	readonly type = ActionTypes.APIUpdateRelationInstanceError;

	constructor(public payload: {
		error: Error,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIDeleteRelationInstanceSuccess implements Action {
	readonly type = ActionTypes.APIDeleteRelationInstanceSuccess;

	constructor(public payload: {
		id: string,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APIDeleteRelationInstanceError implements Action {
	readonly type = ActionTypes.APIDeleteRelationInstanceError;

	constructor(public payload: {
		error: Error,
		overrideToastId?: any,
		meta?: IActionMetadata
	}) {}
}

export class APILoadAllRelationInstancesSuccess implements Action {
	readonly type = ActionTypes.APILoadAllRelationInstancesSuccess;

	constructor(public payload: {
		relationInstances: IRelationInstance[],
		meta?: IActionMetadata
	}) {}
}

export class APILoadAllRelationInstancesError implements Action {
	readonly type = ActionTypes.APILoadAllRelationInstancesError;

	constructor(public payload: {
		error: Error,
		meta?: IActionMetadata
	}) {}
}

export class ServerEventUpdateRelationInstances implements Action {
	readonly type = ActionTypes.ServerEventUpdateRelationInstances;

	constructor(public payload: { message: ISocketMessage }) {}
}


export class NoOp implements Action {
	readonly type = ActionTypes.NoOp;
}

export type ActionsUnion =  	RemoveRelationDefinition |
								CreateRelationDefinition |
								UpdateRelationDefinition |
								DeleteRelationDefinition |
								LoadRelationDefinition |
								LoadAllRelationDefinitions |
								APICreateRelationDefinitionSuccess |
								APICreateRelationDefinitionError |
								APIUpdateRelationDefinitionSuccess |
								APIUpdateRelationDefinitionError |
								APIDeleteRelationDefinitionSuccess |
								APIDeleteRelationDefinitionError |
								APILoadAllRelationDefinitionsSuccess |
								APILoadAllRelationDefinitionsError |
								ServerEventUpdateRelationDefinitions |
								RemoveRelationInstance |
								CreateRelationInstance |
								UpdateRelationInstance |
								DeleteRelationInstance |
								LoadRelationInstance |
								LoadAllRelationInstances |
								APICreateRelationInstanceSuccess |
								APICreateRelationInstanceError |
								APIUpdateRelationInstanceSuccess |
								APIUpdateRelationInstanceError |
								APIDeleteRelationInstanceSuccess |
								APIDeleteRelationInstanceError |
								APILoadAllRelationInstancesSuccess |
								APILoadAllRelationInstancesError |
								ServerEventUpdateRelationInstances |
								NoOp;
