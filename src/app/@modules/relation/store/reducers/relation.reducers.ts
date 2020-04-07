
import { FeatureStoreOperationState, initialFeatureStoreOperationState } from '../../../../@core/store/feature-store-types';
import {
	RelationModuleState,
	initialRelationModuleState,
	RelationDefinitionModuleState,
	initialRelationDefinitionModuleState,
	RelationInstanceModuleState,
	initialRelationInstanceModuleState
} from '../relation-state';
import * as RelationModuleActions from '../actions/relation.actions';

export function relationModuleReducer(
	state = initialRelationModuleState,
	action: RelationModuleActions.ActionsUnion
): RelationModuleState {
	return {
		...state,
		definition: relationDefinitionModuleReducer(state.definition, action),
		instance: relationInstanceModuleReducer(state.instance, action)
	};
}

// --- RELATION DEFINITION ---

export function relationDefinitionModuleReducer(
	state = initialRelationDefinitionModuleState,
	action: RelationModuleActions.ActionsUnion
): RelationDefinitionModuleState {
	return {
		...state,
		relationDefinitionUpdate: relationDefinitionUpdateReducer(state.relationDefinitionUpdate, action),
		relationDefinitionCreate: relationDefinitionCreateReducer(state.relationDefinitionCreate, action),
		relationDefinitionDelete: relationDefinitionDeleteReducer(state.relationDefinitionDelete, action),
		relationDefinitionLoadAll: relationDefinitionLoadAllReducer(state.relationDefinitionLoadAll, action)
	};
}

export function relationDefinitionUpdateReducer(
	state = initialFeatureStoreOperationState,
	action: RelationModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case RelationModuleActions.ActionTypes.RelationDefinitionUpdateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.relationDefinitionId,
				errorEventId: null,
				errorCode: null
			});

		}

		case RelationModuleActions.ActionTypes.RelationDefinitionUpdateError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: null,
				successInstanceId: null,
				errorEventId: action.payload.meta.eventId,
				errorCode: action.payload.meta.errorCode
			});

		}

		default: {
			return state;
		}

	}
}

export function relationDefinitionCreateReducer(
	state = initialFeatureStoreOperationState,
	action: RelationModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case RelationModuleActions.ActionTypes.RelationDefinitionCreateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.relationDefinitionId,
				errorEventId: null,
				errorCode: null
			});

		}

		case RelationModuleActions.ActionTypes.RelationDefinitionCreateError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: null,
				successInstanceId: null,
				errorEventId: action.payload.meta.eventId,
				errorCode: action.payload.meta.errorCode
			});

		}

		default: {
			return state;
		}

	}
}

export function relationDefinitionDeleteReducer(
	state = initialFeatureStoreOperationState,
	action: RelationModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case RelationModuleActions.ActionTypes.RelationDefinitionDeleteSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.relationDefinitionId,
				errorEventId: null,
				errorCode: null
			});

		}

		case RelationModuleActions.ActionTypes.RelationDefinitionDeleteError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: null,
				successInstanceId: null,
				errorEventId: action.payload.meta.eventId,
				errorCode: action.payload.meta.errorCode
			});

		}

		default: {
			return state;
		}

	}
}

export function relationDefinitionLoadAllReducer(
	state = initialFeatureStoreOperationState,
	action: RelationModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case RelationModuleActions.ActionTypes.RelationDefinitionLoadAllSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: ', action.payload);
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: null,
				errorEventId: null,
				errorCode: null
			});

		}

		case RelationModuleActions.ActionTypes.RelationDefinitionLoadAllError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId || !action.payload.meta.errorCode) {
				console.error('malformed action: ', action.payload);
				return state;
			}

			return Object.assign({}, state, {
				successEventId: null,
				successInstanceId: null,
				errorEventId: action.payload.meta.eventId,
				errorCode: action.payload.meta.errorCode
			});

		}

		default: {
			return state;
		}

	}
}

// -- RELATION INSTANCE

export function relationInstanceModuleReducer(
	state = initialRelationInstanceModuleState,
	action: RelationModuleActions.ActionsUnion
): RelationInstanceModuleState {
	return {
		...state,
		relationInstanceUpdate: relationInstanceUpdateReducer(state.relationInstanceUpdate, action),
		relationInstanceCreate: relationInstanceCreateReducer(state.relationInstanceCreate, action),
		relationInstanceDelete: relationInstanceDeleteReducer(state.relationInstanceDelete, action),
		relationInstanceLoadAll: relationInstanceLoadAllReducer(state.relationInstanceLoadAll, action)
	};
}

export function relationInstanceUpdateReducer(
	state = initialFeatureStoreOperationState,
	action: RelationModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case RelationModuleActions.ActionTypes.RelationInstanceUpdateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.relationInstanceId,
				errorEventId: null,
				errorCode: null
			});

		}

		case RelationModuleActions.ActionTypes.RelationInstanceUpdateError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: null,
				successInstanceId: null,
				errorEventId: action.payload.meta.eventId,
				errorCode: action.payload.meta.errorCode
			});

		}

		default: {
			return state;
		}

	}
}

export function relationInstanceCreateReducer(
	state = initialFeatureStoreOperationState,
	action: RelationModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case RelationModuleActions.ActionTypes.RelationInstanceCreateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.relationInstanceId,
				errorEventId: null,
				errorCode: null
			});

		}

		case RelationModuleActions.ActionTypes.RelationInstanceCreateError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: null,
				successInstanceId: null,
				errorEventId: action.payload.meta.eventId,
				errorCode: action.payload.meta.errorCode
			});

		}

		default: {
			return state;
		}

	}
}

export function relationInstanceDeleteReducer(
	state = initialFeatureStoreOperationState,
	action: RelationModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case RelationModuleActions.ActionTypes.RelationInstanceDeleteSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.relationInstanceId,
				errorEventId: null,
				errorCode: null
			});

		}

		case RelationModuleActions.ActionTypes.RelationInstanceDeleteError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: null,
				successInstanceId: null,
				errorEventId: action.payload.meta.eventId,
				errorCode: action.payload.meta.errorCode
			});

		}

		default: {
			return state;
		}

	}
}

export function relationInstanceLoadAllReducer(
	state = initialFeatureStoreOperationState,
	action: RelationModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case RelationModuleActions.ActionTypes.RelationInstanceLoadAllSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: ', action.payload);
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: null,
				errorEventId: null,
				errorCode: null
			});

		}

		case RelationModuleActions.ActionTypes.RelationInstanceLoadAllError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId || !action.payload.meta.errorCode) {
				console.error('malformed action: ', action.payload);
				return state;
			}

			return Object.assign({}, state, {
				successEventId: null,
				successInstanceId: null,
				errorEventId: action.payload.meta.eventId,
				errorCode: action.payload.meta.errorCode
			});

		}

		default: {
			return state;
		}

	}
}
