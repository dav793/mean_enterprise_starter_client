import { FeatureStoreOperationState, initialFeatureStoreOperationState } from '../../../@core/store/feature-store-types';

export interface State {
    userModule: UserModuleState;
}

export interface UserModuleState {
	userUpdate: FeatureStoreOperationState;
	userCreate: FeatureStoreOperationState;
	userDelete: FeatureStoreOperationState;
	userLoadAll: FeatureStoreOperationState;
}

export const initialUserModuleState = {
	userUpdate: initialFeatureStoreOperationState,
	userCreate: initialFeatureStoreOperationState,
	userDelete: initialFeatureStoreOperationState,
	userLoadAll: initialFeatureStoreOperationState
};
