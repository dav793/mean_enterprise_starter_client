import { FeatureStoreOperationState, initialFeatureStoreOperationState } from '../../../@core/store/feature-store-types';
// import {ErrorCode} from '../../../@shared/enums/errors';

export interface State {
	contactModule: ContactModuleState;
}

export interface ContactModuleState {
	contactUpdate: FeatureStoreOperationState;
	contactCreate: FeatureStoreOperationState;
	contactDelete: FeatureStoreOperationState;
	contactLoadAll: FeatureStoreOperationState;
}

export const initialContactModuleState = {
	contactUpdate: initialFeatureStoreOperationState,
	contactCreate: initialFeatureStoreOperationState,
	contactDelete: initialFeatureStoreOperationState,
	contactLoadAll: initialFeatureStoreOperationState,
};
