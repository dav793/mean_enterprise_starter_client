import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
	map
} from 'rxjs/operators';

import * as ContactModuleActions from '../actions/contact.actions';
import * as ContactActions from '../../../../@core/store/actions/contacts.actions';
import { setActionMetadataErrorCode } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

@Injectable()
export class ContactModuleEffects {

	constructor(
		private actions$: Actions
	) { }

	/**
	 * when global api update success event occurs,
	 * dispatch contact module's update success event
	 */
	@Effect()
	contactUpdateSuccess$ = this.actions$.pipe(
		ofType(ContactActions.ActionTypes.APIUpdateContactSuccess),
		map((a: ContactActions.APIUpdateContactSuccess) => {

			return {
				type: ContactModuleActions.ActionTypes.ContactUpdateSuccess,
				payload: {
					contactId: a.payload.contact._id,
					meta: a.payload.meta
				}
			};

		})
	);

	/**
	 * when global api update error event occurs,
	 * dispatch contact module's update error event
	 */
	@Effect()
	contactUpdateError$ = this.actions$.pipe(
		ofType(ContactActions.ActionTypes.APIUpdateContactError),
		map((a: ContactActions.APIUpdateContactError) => {

			return {
				type: ContactModuleActions.ActionTypes.ContactUpdateError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api update success event occurs,
	 * dispatch contact module's create success event
	 */
	@Effect()
	contactCreateSuccess$ = this.actions$.pipe(
		ofType(ContactActions.ActionTypes.APICreateContactSuccess),
		map((a: ContactActions.APIUpdateContactSuccess) => {

			return {
				type: ContactModuleActions.ActionTypes.ContactCreateSuccess,
				payload: {
					contactId: a.payload.contact._id,
					meta: a.payload.meta
				}
			};

		})
	);

	/**
	 * when global api update error event occurs,
	 * dispatch contact module's save error event
	 */
	@Effect()
	contactCreateError$ = this.actions$.pipe(
		ofType(ContactActions.ActionTypes.APICreateContactError),
		map((a: ContactActions.APICreateContactError) => {

			return {
				type: ContactModuleActions.ActionTypes.ContactCreateError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api delete success event occurs,
	 * dispatch contact module's delete success event
	 */
	@Effect()
	contactDeleteSuccess$ = this.actions$.pipe(
		ofType(ContactActions.ActionTypes.APIDeleteContactSuccess),
		map((a: ContactActions.APIDeleteContactSuccess) => {

			return {
				type: ContactModuleActions.ActionTypes.ContactDeleteSuccess,
				payload: {
					contactId: a.payload.id,
					meta: a.payload.meta
				}
			};

		})
	);

	/**
	 * when global api delete error event occurs,
	 * dispatch contact module's delete error event
	 */
	@Effect()
	contactDeleteError$ = this.actions$.pipe(
		ofType(ContactActions.ActionTypes.APIDeleteContactError),
		map((a: ContactActions.APIDeleteContactError) => {

			return {
				type: ContactModuleActions.ActionTypes.ContactDeleteError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api load-all success event occurs,
	 * dispatch contact module's load-all success event
	 */
	@Effect()
	contactLoadAllSuccess$ = this.actions$.pipe(
		ofType(ContactActions.ActionTypes.APILoadAllContactsSuccess),
		map((a: ContactActions.APILoadAllContactsSuccess) => {

			return {
				type: ContactModuleActions.ActionTypes.ContactLoadAllSuccess,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api load-all error event occurs,
	 * dispatch contact module's load-all error event
	 */
	@Effect()
	contactLoadAllError$ = this.actions$.pipe(
		ofType(ContactActions.ActionTypes.APILoadAllContactsError),
		map((a: ContactActions.APILoadAllContactsError) => {

			const meta = setActionMetadataErrorCode(a.payload.error, a.payload.meta);
			return {
				type: ContactModuleActions.ActionTypes.ContactLoadAllError,
				payload: { meta }
			};

		})
	);

}
