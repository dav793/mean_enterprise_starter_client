
import { FeatureStoreOperationState, initialFeatureStoreOperationState } from '../../../../@core/store/feature-store-types';
import { ContactModuleState, initialContactModuleState } from '../contact-state';
import * as ContactModuleActions from '../actions/contact.actions';

export function contactModuleReducer(
	state = initialContactModuleState,
	action: ContactModuleActions.ActionsUnion
): ContactModuleState {
	return {
		...state,
		contactUpdate: contactUpdateReducer(state.contactUpdate, action),
		contactCreate: contactCreateReducer(state.contactCreate, action),
		contactDelete: contactDeleteReducer(state.contactDelete, action),
		contactLoadAll: contactLoadAllReducer(state.contactLoadAll, action)
	};
}

export function contactUpdateReducer(
	state = initialFeatureStoreOperationState,
	action: ContactModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case ContactModuleActions.ActionTypes.ContactUpdateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.contactId,
				errorEventId: null,
				errorCode: null
			});

		}

		case ContactModuleActions.ActionTypes.ContactUpdateError: {

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

export function contactCreateReducer(
	state = initialFeatureStoreOperationState,
	action: ContactModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case ContactModuleActions.ActionTypes.ContactCreateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.contactId,
				errorEventId: null,
				errorCode: null
			});

		}

		case ContactModuleActions.ActionTypes.ContactCreateError: {

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

export function contactDeleteReducer(
	state = initialFeatureStoreOperationState,
	action: ContactModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case ContactModuleActions.ActionTypes.ContactDeleteSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successInstanceId: action.payload.contactId,
				errorEventId: null,
				errorCode: null
			});

		}

		case ContactModuleActions.ActionTypes.ContactDeleteError: {

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

export function contactLoadAllReducer(
	state = initialFeatureStoreOperationState,
	action: ContactModuleActions.ActionsUnion
): FeatureStoreOperationState {
	switch (action.type) {

		case ContactModuleActions.ActionTypes.ContactLoadAllSuccess: {

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

		case ContactModuleActions.ActionTypes.ContactLoadAllError: {

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
