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
	// contactLoadAllErrorEventId: string;
	// contactLoadAllErrorCode: ErrorCode;
	contactLoadAllErrorEventId: FeatureStoreOperationState;
	contactLoadAllErrorCode: FeatureStoreOperationState;

}

export const initialContactModuleState = {
	contactUpdate: initialFeatureStoreOperationState,
	contactCreate: initialFeatureStoreOperationState,
	contactDelete: initialFeatureStoreOperationState,
	contactLoadAll: initialFeatureStoreOperationState,
	// contactLoadAllErrorEventId: null,
	contactLoadAllErrorEventId: initialFeatureStoreOperationState,
	contactLoadAllErrorCode: initialFeatureStoreOperationState

};
