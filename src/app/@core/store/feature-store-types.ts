import {ErrorCode} from '../../@shared/enums/errors';

export interface FeatureStoreOperationState {
	successEventId: string;
	successInstanceId: string;
	errorEventId: string;
	errorCode: ErrorCode;
}

export const initialFeatureStoreOperationState = {
	successEventId: null,
	successInstanceId: null,
	errorEventId: null,
	errorCode: null
};
