
import {
	ContactModuleState,
	initialContactModuleState,
	ContactOperationState,
	initialContactOperationState
} from '../contact-state';
import * as ContactModuleActions from '../actions/contact.actions';

export function contactModuleReducer(
	state = initialContactModuleState,
	action: ContactModuleActions.ActionsUnion
): ContactModuleState {
	return {
		...state,
		contactUpdate: contactUpdateReducer(state.contactUpdate, action),
		contactCreate: contactCreateReducer(state.contactCreate, action),
		contactDelete: contactDeleteReducer(state.contactDelete, action)
	};
}

export function contactUpdateReducer(
	state = initialContactOperationState,
	action: ContactModuleActions.ActionsUnion
): ContactOperationState {
	switch (action.type) {

		case ContactModuleActions.ActionTypes.ContactUpdateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successContactId: action.payload.contactId,
				errorEventId: null
			});

		}

		case ContactModuleActions.ActionTypes.ContactUpdateError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			const eventId = action.payload.meta.eventId;
			return Object.assign({}, state, {
				successEventId: null,
				successContactId: null,
				errorEventId: eventId
			});

		}

		default: {
			return state;
		}

	}
}

export function contactCreateReducer(
	state = initialContactOperationState,
	action: ContactModuleActions.ActionsUnion
): ContactOperationState {
	switch (action.type) {

		case ContactModuleActions.ActionTypes.ContactCreateSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successContactId: action.payload.contactId,
				errorEventId: null
			});

		}

		case ContactModuleActions.ActionTypes.ContactCreateError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			const eventId = action.payload.meta.eventId;
			return Object.assign({}, state, {
				successEventId: null,
				successContactId: null,
				errorEventId: eventId
			});

		}

		default: {
			return state;
		}

	}
}

export function contactDeleteReducer(
	state = initialContactOperationState,
	action: ContactModuleActions.ActionsUnion
): ContactOperationState {
	switch (action.type) {

		case ContactModuleActions.ActionTypes.ContactDeleteSuccess: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			return Object.assign({}, state, {
				successEventId: action.payload.meta.eventId,
				successContactId: action.payload.contactId,
				errorEventId: null
			});

		}

		case ContactModuleActions.ActionTypes.ContactDeleteError: {

			if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
				console.error('malformed action: eventId is missing');
				return state;
			}

			const eventId = action.payload.meta.eventId;
			return Object.assign({}, state, {
				successEventId: null,
				successContactId: null,
				errorEventId: eventId
			});

		}

		default: {
			return state;
		}

	}
}
