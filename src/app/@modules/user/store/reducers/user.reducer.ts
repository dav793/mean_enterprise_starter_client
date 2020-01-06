
import { UserModuleState, initialUserModuleState } from '../user-state';
import * as UserModuleActions from '../actions/user.actions';

export function userModuleReducer(
    state = initialUserModuleState,
    action: UserModuleActions.ActionsUnion
): UserModuleState {
    switch (action.type) {

        case UserModuleActions.ActionTypes.UserSaveSuccess: {

            if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: ', action.payload);
                return state;
            }

            const eventId = action.payload.meta.eventId;
            return Object.assign({}, state, {
            	userSaveSuccessEventId: eventId
            });

        }

        case UserModuleActions.ActionTypes.UserSaveError: {

            if (!action.payload || !action.payload.meta || !action.payload.meta.eventId || !action.payload.meta.errorCode) {
				console.error('malformed action: ', action.payload);
                return state;
            }

            const eventId = action.payload.meta.eventId;
			const errorCode = action.payload.meta.errorCode;
            return Object.assign({}, state, {
            	userSaveErrorEventId: eventId,
				userLoadAllErrorCode: errorCode
            });

        }

		case UserModuleActions.ActionTypes.UserLoadAllError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId || !action.payload.meta.errorCode) {
				console.error('malformed action: ', action.payload);
				return state;
			}

			const eventId = action.payload.meta.eventId;
			const errorCode = action.payload.meta.errorCode;
			return Object.assign({}, state, {
				userLoadAllErrorEventId: eventId,
				userLoadAllErrorCode: errorCode
			});

		}

        default: {
            return state;
        }

    }
}
