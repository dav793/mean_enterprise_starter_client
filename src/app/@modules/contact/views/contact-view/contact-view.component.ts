import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
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

@Component({
	selector: 'app-contact-view',
	templateUrl: './contact-view.component.html',
	styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit, OnDestroy {

	protected contact$ = new ReplaySubject<IContact|null>(1);
	protected contact: Contact;
	protected selectedContactId: string;

	protected contactTypeOptions = ContactTypes.getOptionsList();
	protected genderOptions = Genders.getOptionsList();
	protected maritalStatusOptions = MaritalStatus.getOptionsList();
	protected countryOptions = Countries.getOptionsList();
	protected identificationTypeOptions = IdentificationTypes.getOptionsList();

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
		private route: ActivatedRoute
	) { }

	ngOnInit() {

		// whenever route parameter changes...
		this.route.params.pipe(
			map(params => params.id),
			startWith(null)
		).subscribe(id => {});

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
		if (selectedContactId)
			actionMetadata = this.coreStore.updateContact(selectedContactId, formValue);
		else
			actionMetadata = this.coreStore.createContact(formValue);

		this.handleCreateResponse(actionMetadata);
	}

	handleCreateResponse(actionMetadata: IActionMetadata) {



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
