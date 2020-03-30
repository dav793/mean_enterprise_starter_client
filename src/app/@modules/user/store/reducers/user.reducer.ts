
import { FeatureStoreOperationState, initialFeatureStoreOperationState } from '../../../../@core/store/feature-store-types';
import { UserModuleState, initialUserModuleState } from '../user-state';
import * as UserModuleActions from '../actions/user.actions';

export function userModuleReducer(
	state = initialUserModuleState,
	action: UserModuleActions.ActionsUnion
): UserModuleState {
	return {
		...state,
		userUpdate: userUpdateReducer(state.userUpdate, action),
		userCreate: userCreateReducer(state.userCreate, action),
		userDelete: userDeleteReducer(state.userDelete, action),
		userLoadAll: userLoadAllReducer(state.userLoadAll, action)
	};
}

export function userUpdateReducer(
	state = initialFeatureStoreOperationState,
	action: UserModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case UserModuleActions.ActionTypes.UserUpdateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.userId,
				errorEventId: null,
				errorCode: null
			});

		}

		case UserModuleActions.ActionTypes.UserUpdateError: {

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

export function userCreateReducer(
	state = initialFeatureStoreOperationState,
	action: UserModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case UserModuleActions.ActionTypes.UserCreateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.userId,
				errorEventId: null,
				errorCode: null
			});

		}

		case UserModuleActions.ActionTypes.UserCreateError: {

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

export function userDeleteReducer(
	state = initialFeatureStoreOperationState,
	action: UserModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case UserModuleActions.ActionTypes.UserDeleteSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.userId,
				errorEventId: null,
				errorCode: null
			});

		}

		case UserModuleActions.ActionTypes.UserDeleteError: {

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

export function userLoadAllReducer(
	state = initialFeatureStoreOperationState,
	action: UserModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case UserModuleActions.ActionTypes.UserLoadAllSuccess: {

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

		case UserModuleActions.ActionTypes.UserLoadAllError: {

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
