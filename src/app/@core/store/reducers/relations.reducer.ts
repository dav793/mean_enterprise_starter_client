import { RelationsState, initialRelationsState } from '../core-state';
import * as RelationsActions from '../actions/relations.actions';
import Utils from '../../../@shared/helpers/utils/utils';

export function relationsReducer(
	state = initialRelationsState,
	action: RelationsActions.ActionsUnion
): RelationsState {
	switch (action.type) {

		// --- RELATION DEFINITIONS ---

		case RelationsActions.ActionTypes.RemoveRelationDefinition: {
			if (action.payload.relationDefinitionId in state.definitions.all) {
				const all = Object.assign({}, state.definitions.all);
				delete all[action.payload.relationDefinitionId];
				return Object.assign({}, state, { definitions: { all } });
			}
			else
				return state;
		}

		case RelationsActions.ActionTypes.APILoadAllRelationDefinitionsSuccess: {
			const all = Utils.arrayToObject(action.payload.relationDefinitions, '_id');
			return Object.assign({}, state, { definitions: { all } });
		}

		// --- RELATION INSTANCES ---

		case RelationsActions.ActionTypes.RemoveRelationInstance: {
			if (action.payload.relationInstanceId in state.instances.all) {
				const all = Object.assign({}, state.instances.all);
				delete all[action.payload.relationInstanceId];
				return Object.assign({}, state, { instances: { all } });
			}
			else
				return state;
		}

		case RelationsActions.ActionTypes.APILoadAllRelationInstancesSuccess: {
			const all = Utils.arrayToObject(action.payload.relationInstances, '_id');
			return Object.assign({}, state, { instances: { all } });
		}

		default: {
			return state;
		}

	}
}

