import { FeatureStoreOperationState, initialFeatureStoreOperationState } from '../../../@core/store/feature-store-types';
// import {ErrorCode} from '../../../@shared/enums/errors';

export interface RelationDefinitionModuleState {
	relationDefinitionUpdate: FeatureStoreOperationState;
	relationDefinitionCreate: FeatureStoreOperationState;
	relationDefinitionDelete: FeatureStoreOperationState;
	relationDefinitionLoadAll: FeatureStoreOperationState;
}

export const initialRelationDefinitionModuleState = {
	relationDefinitionUpdate: initialFeatureStoreOperationState,
	relationDefinitionCreate: initialFeatureStoreOperationState,
	relationDefinitionDelete: initialFeatureStoreOperationState,
	relationDefinitionLoadAll: initialFeatureStoreOperationState,
};

export interface RelationInstanceModuleState {
	relationInstanceUpdate: FeatureStoreOperationState;
	relationInstanceCreate: FeatureStoreOperationState;
	relationInstanceDelete: FeatureStoreOperationState;
	relationInstanceLoadAll: FeatureStoreOperationState;
}

export const initialRelationInstanceModuleState = {
	relationInstanceUpdate: initialFeatureStoreOperationState,
	relationInstanceCreate: initialFeatureStoreOperationState,
	relationInstanceDelete: initialFeatureStoreOperationState,
	relationInstanceLoadAll: initialFeatureStoreOperationState,
};

export interface RelationModuleState {
	definition: RelationDefinitionModuleState;
	instance: RelationInstanceModuleState;
}

export const initialRelationModuleState = {
	definition: initialRelationDefinitionModuleState,
	instance: initialRelationInstanceModuleState
};

export interface State {
	relationModule: RelationModuleState;
}
