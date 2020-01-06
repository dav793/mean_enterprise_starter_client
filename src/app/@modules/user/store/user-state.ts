import {ErrorCode} from '../../../@shared/enums/errors';

export interface State {
    userModule: UserModuleState;
}

export interface UserModuleState {
    userSaveSuccessEventId: string;
    userSaveErrorEventId: string;
	userSaveErrorCode: ErrorCode;
	userLoadAllErrorEventId: string;
	userLoadAllErrorCode: ErrorCode;
}

export const initialUserModuleState = {
    userSaveSuccessEventId: null,
    userSaveErrorEventId: null,
	userSaveErrorCode: null,
	userLoadAllErrorEventId: null,
	userLoadAllErrorCode: null
};
