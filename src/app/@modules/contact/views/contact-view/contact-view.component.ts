import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of, ReplaySubject, Subject, from, throwError, merge } from 'rxjs';
import { distinctUntilChanged, filter, first, mergeMap, switchMap, takeUntil, tap, map, startWith } from 'rxjs/operators';
import { excludeFalsy } from '../../../../@shared/helpers/operators/exclude-falsy';

import {
	IContact,
	Contact,
	IAddress,
	IIdentification
} from '../../../../@core/contact/contact.model';
import {
	IToolbarConfig, IToolbarEvent,
	ToolbarItemAlignment,
	ToolbarItemType
} from '../../../../@shared/components/toolbar/toolbar.interface';

import { CoreStoreService } from '../../../../@core/store/core-store';
import { ContactStoreService } from '../../store/contact-store';
import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

import { ContactTypes } from '../../../../@shared/lists/contact-types';
import { Genders } from '../../../../@shared/lists/genders';
import { MaritalStatus} from '../../../../@shared/lists/marital-status';
import { Countries } from '../../../../@shared/lists/countries';
import { IdentificationTypes } from '../../../../@shared/lists/identification-types';

import { contactFormErrorMessages } from './form-error-messages';

import { FeatureStoreOperationState } from '../../../../@core/store/feature-store-types';

@Component({
	selector: 'app-contact-view',
	templateUrl: './contact-view.component.html',
	styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit, OnDestroy {

	protected contact$ = new ReplaySubject<IContact|null>(1);
	protected contact: Contact;

	protected selectedContactId: string;
	// protected selectedContact$ = new ReplaySubject<IContact|null>(1);

	protected contactFormValue: any;
	protected contactFormValidChanges$ = new Subject<boolean>();
	protected contactFormDirtyChanges$ = new Subject<boolean>();

	protected contactTypeOptions = ContactTypes.getOptionsList();
	protected genderOptions = Genders.getOptionsList();
	protected maritalStatusOptions = MaritalStatus.getOptionsList();
	protected countryOptions = Countries.getOptionsList();
	protected identificationTypeOptions = IdentificationTypes.getOptionsList();

	protected revertForm$ = new Subject<void>();
	protected onDestroy$ = new Subject<void>();
	protected isLoading = true;
	protected subs = [];

	toolbarConfig: IToolbarConfig = {
		label: 'Contacto',
		itemAlignment: ToolbarItemAlignment.RIGHT,
		items: {
			save: {
				type: ToolbarItemType.BUTTON,
				label: 'guardar',
				classes: ['success', 'size-sm'],
				isHidden: true
			},
			revert: {
				type: ToolbarItemType.BUTTON,
				label: 'revertir',
				classes: ['warn', 'size-sm'],
				isHidden: true
			},
			delete: {
				type: ToolbarItemType.BUTTON,
				label: 'eliminar',
				classes: ['error', 'size-sm'],
				isHidden: true
			}
		}
	};

	constructor(
		private coreStore: CoreStoreService,
		private contactStore: ContactStoreService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {

		// whenever route parameter changes...
		this.route.params.pipe(
			map(params => params.id),
			startWith(null)
		).subscribe(id => {
			if (id !== 'new') 
				this.selectedContactId = id;
			this.loadData().pipe(
				takeUntil(this.onDestroy$)
			).subscribe(() => {
				this.listenChanges();
				this.isLoading = false;
			});
		});

	}

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	loadData(): Observable<boolean> {

		if (this.selectedContactId) { 	// existing contact

			this.coreStore.loadAllContacts();

			this.subs.push(
				this.coreStore.selectContact(this.selectedContactId)
					.pipe(takeUntil(this.onDestroy$))
					.subscribe((ct: IContact) => {
						if (ct !== null)
							this.contact$.next(ct);
					})
			);

		}
		else {							// new contact
			const ct = new Contact({} as IContact);
			this.contact$.next(ct.asInterface());
		}

		return this.contact$.pipe(
			tap(contact => this.contact = new Contact(contact)),
			map(() => true)
		);
		

	}

	deleteContact(selectedContactId: string) {
		if (!selectedContactId)
			return;

		const actionMetadata: IActionMetadata = this.coreStore.deleteContact(selectedContactId);
	}

	saveContact(selectedContactId: string, formValue: any) {
		if (!formValue)
			return;

		let actionMetadata: IActionMetadata;
		if (selectedContactId) {
			actionMetadata = this.coreStore.updateContact(selectedContactId, formValue);
			this.handleUpdateResponse(actionMetadata);
		}
		else {
			actionMetadata = this.coreStore.createContact(formValue);
			this.handleCreateResponse(actionMetadata);
		}
	}


	handleCreateResponse(actionMetadata: IActionMetadata) {

		const responseHandler: Observable<FeatureStoreOperationState> = this.contactStore.selectContactCreate()
		.pipe(
			filter(state => state.successEventId === actionMetadata.eventId),	// when receiving success response...
			first(),
			mergeMap(state => this.contact$.pipe(		// ...wait to receive the updated contact...
				first(),
				map(() => state)
			)),
			takeUntil(this.onDestroy$)
		);

		const errorHandler: Observable<FeatureStoreOperationState> = this.contactStore.selectContactCreate()
			.pipe(
				filter(state => state.errorEventId === actionMetadata.eventId),	// when receiving error response...
				first(),
				mergeMap(state => {
					const err = new Error();
					err.name = actionMetadata.errorCode;
					return throwError(err);				// ...throw error...
				}),
				takeUntil(this.onDestroy$)
			);

		merge(responseHandler, errorHandler).pipe(
			first(),						// wait for either success or error to occur...
			takeUntil(this.onDestroy$)
		).subscribe(
			state => {					// ...handle success
				this.router.navigate(['contacts', 'view', state.successInstanceId]);
			},
			err => console.error(err)		// ...handle error
		);

	}

	handleUpdateResponse(actionMetadata: IActionMetadata) {

		const responseHandler: Observable<FeatureStoreOperationState> = this.contactStore.selectContactUpdate()
			.pipe(
				filter(state => state.successEventId === actionMetadata.eventId),	// when receiving success response...
				first(),
				mergeMap(state => this.contact$.pipe(		// ...wait to receive the updated contact...
					first(),
					map(() => state)
				)),
				takeUntil(this.onDestroy$)
			);

		const errorHandler: Observable<FeatureStoreOperationState> = this.contactStore.selectContactUpdate()
			.pipe(
				filter(state => state.errorEventId === actionMetadata.eventId),	// when receiving error response...
				first(),
				mergeMap(state => {
					const err = new Error();
					err.name = actionMetadata.errorCode;
					return throwError(err);				// ...throw error...
				}),
				takeUntil(this.onDestroy$)
			);

		merge(responseHandler, errorHandler).pipe(
			first(),						// wait for either success or error to occur...
			takeUntil(this.onDestroy$)
		).subscribe(
			state => {					// ...handle success
				this.router.navigate(['contacts', 'view', state.successInstanceId]);
			},
			err => console.error(err)		// ...handle error
		);

	}
	
	onContactFormChange(value: any) {
		if (!value)
			this.contactFormValue = null;
		else
			this.contactFormValue = value;
	}

	onContactFormValidChange(valid: boolean) {
		this.contactFormValidChanges$.next(valid);
	}

	onContactFormDirtyChange(dirty: boolean) {
		this.contactFormDirtyChanges$.next(dirty);
	}


	listenChanges() {
		this.listenFormValidStatusChanges();
		this.listenFormDirtyStatusChanges();
	}

	listenFormValidStatusChanges() {
		this.contactFormValidChanges$
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe(isValid => {

				this.updateToolbarConfigItem('save', {
					isDisabled: !isValid
				});

			});
	}

	listenFormDirtyStatusChanges() {
		this.contactFormDirtyChanges$
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe(isDirty => {

				this.updateToolbarConfigItem('revert', {
					isHidden: !isDirty
				});

				this.updateToolbarConfigItem('save', {
					isHidden: !isDirty
				});

			});
	}


	onToolbarEvent(e: IToolbarEvent) {
		switch (e.itemName) {
			case 'save':
				this.onToolbarSubmit();
				break;
			case 'revert':
				this.onToolbarRevert();
				break;
			case 'delete':
				this.onToolbarDelete();
				break;
		}
	}

	onToolbarSubmit() {
		if (this.contactFormValue)
			this.saveContact(this.selectedContactId, this.contactFormValue);
	}

	onToolbarRevert() {
		this.revertForm$.next();

		this.updateToolbarConfigItem('revert', {
			isHidden: true
		});
	}

	onToolbarDelete() {
		if (!this.selectedContactId)
			return;

		this.deleteContact(this.selectedContactId);
		// this.deselectUserGroup();
	}


	/**
	 * reemplazar la referencia inmutable del toolbar config con otra que contenga las modificaciones
	 * en el item con nombre <itemName> de acuerdo a los pares propiedad-valor en <itemChanges>
	 *
	 * IMPORTANTE: cuando se vaya a modificar los items en el toolbar config, debe hacerse mediante esta función
	 * de forma que el componente toolbar detecte los cambios
	 */
	updateToolbarConfigItem(itemName: string, itemChanges: { [key: string]: any }) {
		Object.assign(this.toolbarConfig.items[itemName], itemChanges);
		this.toolbarConfig = Object.assign({}, this.toolbarConfig);
	}

}