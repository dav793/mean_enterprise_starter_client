
import { ContactsState, initialContactsState } from '../core-state';
import * as ContactsActions from '../actions/contacts.actions';
import Utils from '../../../@shared/helpers/utils/utils';

export function contactsReducer(
	state = initialContactsState,
	action: ContactsActions.ActionsUnion
): ContactsState {
	switch (action.type) {

		case ContactsActions.ActionTypes.RemoveContact: {
			if (action.payload.contactId in state.all) {
				const all = Object.assign({}, state.all);
				delete all[action.payload.contactId];
				return { all };
			}
			else
				return state;
		}

		case ContactsActions.ActionTypes.APILoadAllContactsSuccess: {
			const all = Utils.arrayToObject(action.payload.contacts, '_id');
			return { all };
		}

		default: {
			return state;
		}

	}
}
