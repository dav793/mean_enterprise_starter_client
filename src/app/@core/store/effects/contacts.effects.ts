
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {EMPTY, of} from 'rxjs';
import {
	map,
	tap,
	mergeMap,
	catchError, first
} from 'rxjs/operators';

import { ToasterService } from '../../../@shared/lib/ngx-toastr/toaster.service';

import { ContactApiService } from '../../contact/contact-api.service';
import { IContact } from '../../contact/contact.model';

import * as ContactsActions from '../actions/contacts.actions';

import { ofTypes } from '../../../@shared/helpers/operators/of-types';
import { storeActionMetadataSingleton as ActionMetadataFactory } from '../../../@shared/helpers/utils/store-action-metadata-factory';

import { CoreStoreService } from '../core-store';

@Injectable()
export class ContactsEffects {

	constructor(
		private actions$: Actions,
		private contactApiService: ContactApiService,
		private toaster: ToasterService,
		private store: CoreStoreService
	) {}

	/**
	 * when server event update contacts occurs,
	 * dispatch load all contacts event
	 */
	@Effect()
	serverEventUpdateContacts = this.actions$.pipe(
		ofType(ContactsActions.ActionTypes.ServerEventUpdateContacts),
		mergeMap((a: ContactsActions.ServerEventUpdateContacts) => {

			let clientId = null;
			if (a.payload && a.payload.message && a.payload.message.clientId)
				clientId = a.payload.message.clientId;

			const meta = ActionMetadataFactory.create(clientId);
			meta.forceFetch = true;

			return of({
				type: ContactsActions.ActionTypes.LoadAllContacts,
				payload: { meta }
			});

		})
	);

	/**
	 * when store load all contacts event occurs,
	 * if contacts not in store, fetch contacts from server api and dispatch either success or error event.
	 * otherwise do nothing
	 */
	@Effect()
	loadAllContacts = this.actions$.pipe(
		ofType(ContactsActions.ActionTypes.LoadAllContacts),
		mergeMap((a: ContactsActions.LoadAllContacts) => this.store.selectAllContacts().pipe(
			first(),
			mergeMap(allContacts => {

				if (!a.payload.meta.forceFetch && Object.keys(allContacts).length > 0)
					return of({                           // already loaded in store; do nothing
						type: ContactsActions.ActionTypes.NoOp
					});
				else
					return this.contactApiService.getContacts().pipe(
						tap(() => console.log(`fetched contacts from API server`)),
						map((contacts: IContact[]) => {

							return {
								type: ContactsActions.ActionTypes.APILoadAllContactsSuccess,
								payload: { contacts, meta: a.payload.meta }
							};

						}),
						catchError(e => {

							return of({
								type: ContactsActions.ActionTypes.APILoadAllContactsError,
								payload: { error: e, meta: a.payload.meta }
							});

						})
					);

			})
		))
	);

	/**
	 * when store update contact event occurs,
	 * update contact with server api and dispatch either success or error event
	 */
	@Effect()
	updateContact = this.actions$.pipe(
		ofType(ContactsActions.ActionTypes.UpdateContact),
		mergeMap((a: ContactsActions.UpdateContact) => {

			const toast = this.toaster.showSaving();

			return this.contactApiService.putContact(a.payload.contactId, a.payload.contact).pipe(
				tap(contact => console.log(`saved contact ${contact._id} to API server`)),  // @todo: replace with real logging
				map(contact => {

					return {
						type: ContactsActions.ActionTypes.APIUpdateContactSuccess,
						payload: {
							contact,
							overrideToastId: toast.toastId,
							meta: a.payload.meta
						}
					};

				}),
				catchError(error => {

					return of({
						type: ContactsActions.ActionTypes.APIUpdateContactError,
						payload: {
							error,
							overrideToastId: toast.toastId,
							meta: a.payload.meta
						}
					});

				})
			);

		})
	);

	/**
	 * when store create contact event occurs,
	 * create contact with server api and dispatch either success or error event
	 */
	@Effect()
	createContact = this.actions$.pipe(
		ofType(ContactsActions.ActionTypes.CreateContact),
		mergeMap((a: ContactsActions.CreateContact) => {

			const toast = this.toaster.showSaving();

			return this.contactApiService.postContact(a.payload.contact).pipe(
				tap(contact => console.log(`saved new contact ${contact._id} to API server`)),
				map(contact => {

					return {
						type: ContactsActions.ActionTypes.APICreateContactSuccess,
						payload: {
							contact,
							overrideToastId: toast.toastId,
							meta: a.payload.meta
						}
					};

				}),
				catchError(error => {

					return of({
						type: ContactsActions.ActionTypes.APICreateContactError,
						payload: {
							error,
							overrideToastId: toast.toastId,
							meta: a.payload.meta
						}
					});

				})
			);

		})
	);

	/**
	 * when store delete contact event occurs,
	 * delete contact with server api and dispatch either success or error event
	 */
	@Effect()
	deleteContact = this.actions$.pipe(
		ofType(ContactsActions.ActionTypes.DeleteContact),
		mergeMap((a: ContactsActions.DeleteContact) => {

			const toast = this.toaster.showSaving();

			return this.contactApiService.deleteContact(a.payload.contactId).pipe(
				tap(() => console.log(`deleted contact ${a.payload.contactId} to API server`)),
				map(() => {

					return {
						type: ContactsActions.ActionTypes.APIDeleteContactSuccess,
						payload: {
							id: a.payload.contactId,
							overrideToastId: toast.toastId,
							meta: a.payload.meta
						}
					};

				}),
				catchError(error => {

					return of({
						type: ContactsActions.ActionTypes.APIDeleteContactError,
						payload: {
							error,
							overrideToastId: toast.toastId,
							meta: a.payload.meta
						}
					});

				})
			);

		})
	);

	/**
	 * when any modification server api success event occurs,
	 * show toast message
	 */
	@Effect({dispatch: false})
	saveSuccess$ = this.actions$.pipe(
		ofTypes([
			ContactsActions.ActionTypes.APICreateContactSuccess,
			ContactsActions.ActionTypes.APIUpdateContactSuccess,
			ContactsActions.ActionTypes.APIDeleteContactSuccess
		]),
		tap((a: any) => {

			if (a.payload && a.payload.overrideToastId)
				this.toaster.clearById(a.payload.overrideToastId);

			this.toaster.showSaved();

		})
	);

	@Effect({dispatch: false})
	handleContactDeleteError$ = this.actions$.pipe(
		ofType(ContactsActions.ActionTypes.APIDeleteContactError),
		tap((a: any) => {
			if (a.payload.error.error.startsWith('ReferencedContact')) {
				const toast = this.toaster.showError(
					'Contacto ha sido aplicado a uno o más cuentas',
					'No se pudo eliminar'
				);
			}
		})
	);

	@Effect({dispatch: false})
	logError$ = this.actions$.pipe(
		ofTypes([
			ContactsActions.ActionTypes.APICreateContactError,
			ContactsActions.ActionTypes.APIUpdateContactError,
			ContactsActions.ActionTypes.APIDeleteContactError,
			ContactsActions.ActionTypes.APILoadAllContactsError
		]),
		tap((a: any) => {
			console.error(a.payload.error);

			if (a.payload && a.payload.overrideToastId)
				this.toaster.clearById(a.payload.overrideToastId);

			const toast = this.toaster.chooseToast(a.payload.error);
		})
	);

}
