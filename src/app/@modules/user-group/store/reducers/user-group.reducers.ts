
import {
	UserGroupModuleState,
	initialUserGroupModuleState,
	UserGroupOperationState,
	initialUserGroupOperationState
} from '../user-group-state';
import * as UserGroupModuleActions from '../actions/user-group.actions';

export function userGroupModuleReducer(
	state = initialUserGroupModuleState,
	action: UserGroupModuleActions.ActionsUnion
): UserGroupModuleState {
	return {
		...state,
		userGroupUpdate: userGroupUpdateReducer(state.userGroupUpdate, action),
		userGroupCreate: userGroupCreateReducer(state.userGroupCreate, action),
		userGroupDelete: userGroupDeleteReducer(state.userGroupDelete, action)
	};
}

export function userGroupUpdateReducer(
	state = initialUserGroupOperationState,
	action: UserGroupModuleActions.ActionsUnion
): UserGroupOperationState {
	switch (action.type) {

		case UserGroupModuleActions.ActionTypes.UserGroupUpdateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successUserGroupId: action.payload.userGroupId,
				errorEventId: null
			});

		}

		case UserGroupModuleActions.ActionTypes.UserGroupUpdateError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			const eventId = action.payload.meta.eventId;
			return Object.assign({}, state, {
				successEventId: null,
				successUserGroupId: null,
				errorEventId: eventId
			});

		}

		default: {
			return state;
		}

	}
}

export function userGroupCreateReducer(
	state = initialUserGroupOperationState,
	action: UserGroupModuleActions.ActionsUnion
): UserGroupOperationState {
	switch (action.type) {

		case UserGroupModuleActions.ActionTypes.UserGroupCreateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successUserGroupId: action.payload.userGroupId,
				errorEventId: null
			});

		}

		case UserGroupModuleActions.ActionTypes.UserGroupCreateError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			const eventId = action.payload.meta.eventId;
			return Object.assign({}, state, {
				successEventId: null,
				successUserGroupId: null,
				errorEventId: eventId
			});

		}

		default: {
			return state;
		}

	}
}

export function userGroupDeleteReducer(
	state = initialUserGroupOperationState,
	action: UserGroupModuleActions.ActionsUnion
): UserGroupOperationState {
	switch (action.type) {

		case UserGroupModuleActions.ActionTypes.UserGroupDeleteSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successUserGroupId: action.payload.userGroupId,
				errorEventId: null
			});

		}

		case UserGroupModuleActions.ActionTypes.UserGroupDeleteError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			const eventId = action.payload.meta.eventId;
			return Object.assign({}, state, {
				successEventId: null,
				successUserGroupId: null,
				errorEventId: eventId
			});

		}

		default: {
			return state;
		}

	}
}
