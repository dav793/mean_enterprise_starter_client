import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, mergeMap, switchMap, takeUntil, tap, map, startWith } from 'rxjs/operators';
import { excludeFalsy } from '../../../../@shared/helpers/operators/exclude-falsy';

import {
	IContact,
	Contact,
	IAddress,
	IIdentification,
	IPhoneNumber,
	ICorporateRepresentative, ICommercialReference
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

	protected formValue: any;
	protected formValidChanges$ = new Subject<boolean>();
	protected formDirtyChanges$ = new Subject<boolean>();
	protected revertForm$ = new Subject<void>();
	protected contactForm: FormGroup;
	protected errorMessages = contactFormErrorMessages;

	protected onDestroy$ = new Subject<void>();
	protected isLoading = true;
	protected subs = [];

	toolbarConfig: IToolbarConfig = {
		label: 'Contact',
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
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {

		// whenever route parameter changes...
		this.route.params.pipe(
			map(params => params.id),
			startWith(null)
		).subscribe(id => {

			// unsubscribe from previous store subscriptions
			for (const i = 0; i < this.subs.length;) {
				this.subs[i].unsubscribe();
				this.subs = this.subs.slice(0, 1);
			}

			// decide whether this is a new or existing contact
			if (id && id !== 'new')
				this.selectedContactId = id;
			else
				this.selectedContactId = null;

			// load data and initialize component
			this.loadData().pipe(
				takeUntil(this.onDestroy$)
			).subscribe(() => {

				this.contactForm = this.buildForm(this.contact);
				// this.listenChanges();
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
			tap(() => this.onFormDirtyChange(false)),    // set dirty: false
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
			actionMetadata = this.coreStore.updateRole(selectedContactId, formValue);
		else
			actionMetadata = this.coreStore.createRole(formValue);

		this.handleCreateResponse(actionMetadata);
	}

	handleCreateResponse(actionMetadata: IActionMetadata) {

		// al capturar la respuesta de creacion del nuevo contacto..
		// this.contactStore.selectContactCreate().pipe(
		// 	filter(state => state.successEventId === actionMetadata.eventId),
		// 	takeUntil(this.onDestroy$),
		// 	first(),
		// 	mergeMap(state => this.contact$.pipe(   // ..espere hasta recibir el nuevo contacto..
		// 		filter(contact => state.successContactId in contact),
		// 		first(),
		// 		map(() => state)
		// 	))
		// ).subscribe(state => {
		//
		// 	// ..y luego seleccione el contacto recien creado
		// 	const contact = this.roles[state.successRoleId];
		// 	this.selectContact(role);
		//
		// });

	}

	onFormChange(value: any) {
		if (!value)
			this.formValue = null;
		else
			this.formValue = value;
	}

	onFormValidChange(valid: boolean) {
		this.formValidChanges$.next(valid);
	}

	onFormDirtyChange(dirty: boolean) {
		this.formDirtyChanges$.next(dirty);
	}

	listenChanges() {
		this.listenFormValidStatusChanges();
		this.listenFormDirtyStatusChanges();
	}

	listenFormValidStatusChanges() {
		this.formValidChanges$
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe(isValid => {

				this.onFormValidChange(isValid);

				this.updateToolbarConfigItem('save', {
					isDisabled: !isValid
				});

			});
	}

	listenFormDirtyStatusChanges() {
		this.formDirtyChanges$
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe(isDirty => {

				this.onFormDirtyChange(isDirty);

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
		if (this.formValue)
			this.saveContact(this.selectedContactId, this.formValue);
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

	buildForm(contact: Contact): FormGroup {

		const group = this.formBuilder.group({

			// common fields
			contactType: 						[contact.contactType, 						[]],
			email: 								[contact.email, 							[]],
			isPep: 								[contact.isPep, 							[]],
			addresses: 							[contact.addresses, 						[]],
			companyActivity: 					[contact.companyActivity, 					[]],
			grossMonthlyIncome: 				[contact.grossMonthlyIncome, 				[]],
			sourcesOfIncome: 					[contact.sourcesOfIncome, 					[]],
			// sourcesOfFunds: 					[contact.sourcesOfFunds, 					[]],
			// otherSourcesOfFunds: 				[contact.otherSourcesOfFunds, 				[]],
			// countriesOfFundsOrigin: 			[contact.countriesOfFundsOrigin, 			[]],
			// purposeOfFunds: 					[contact.purposeOfFunds, 					[]],
			// otherPurposesOfFunds: 				[contact.otherPurposesOfFunds, 				[]],
			// estimatedAmountOfTransactions: 		[contact.estimatedAmountOfTransactions, 	[]],

			// physical contact fields
			firstName: 							[contact.firstName, 						[]],
			middleName: 						[contact.middleName, 						[]],
			lastName: 							[contact.lastName, 							[]],
			mothersMaidenName: 					[contact.mothersMaidenName, 				[]],
			gender: 							[contact.gender, 							[]],
			maritalStatus: 						[contact.maritalStatus, 					[]],
			nationalities: 						[contact.nationalities, 					[]],
			countryOfBirth: 					[contact.countryOfBirth, 					[]],
			birthDate: 							[contact.birthDate, 						[]],
			homePhoneNumber: 					[contact.homePhoneNumber, 					[]],
			mobilePhoneNumber: 					[contact.mobilePhoneNumber, 				[]],
			identifications: 					[this.formBuilder.array([]), 	[]],
			profession: 						[contact.profession, 						[]],
			jobPosition: 						[contact.jobPosition, 						[]],
			companyName: 						[contact.companyName, 						[]],
			companyPhoneNumber: 				[contact.companyPhoneNumber, 				[]],
			companyAddressLine: 				[contact.companyAddressLine, 				[]],

			// corporate contact fields
			corporationName: 					[contact.corporationName, 					[]],
			corporationType: 					[contact.corporationType, 					[]],
			corporationIdNumber: 				[contact.corporationIdNumber, 				[]],
			dateOfConstitution: 				[contact.dateOfConstitution, 				[]],
			countryOfConstitution: 				[contact.countryOfConstitution, 			[]],
			languagesSpoken: 					[contact.languagesSpoken, 					[]],
			phoneNumbers: 						[contact.phoneNumbers, 						[]],
			namesOfPeps: 						[contact.namesOfPeps, 						[]],
			corporateRepresentatives: 			[contact.corporateRepresentatives, 			[]],
			commercialReferences: 				[contact.commercialReferences, 				[]]

		});

		const identificationsFormValue = this.formBuilder.array(
			this.createIdentificationFormGroups(contact.identifications)
		);
		group.setControl('identifications', identificationsFormValue);

		return group;

	}

	createIdentificationFormGroups(identifications: IIdentification[]): FormGroup[] {
		if (!identifications || identifications.length === 0)
			return [];

		const groups = identifications.map(val => {
			return this.formBuilder.group({
				idType: 			[ val.idType,    			[ Validators.required ] ],
				idNumber: 			[ val.idNumber,    			[ Validators.required ] ],
				expirationDate: 	[ val.expirationDate,    	[ Validators.required ] ],
				isMainId: 			[ val.isMainId,    			[ Validators.required ] ]
			});
		});
		return groups;
	}

	addIdentification() {
		this.identifications.push(
			this.formBuilder.group({
				idType: 			[ null,    					[ Validators.required ] ],
				idNumber: 			[ '',    					[ Validators.required ] ],
				expirationDate: 	[ '',    					[ Validators.required ] ],
				isMainId: 			[ false,    				[ Validators.required ] ]
			})
		);
		this.contactForm.markAsDirty();
	}

	removeIdentification(index: number) {
		const valuesCopy: any[] = Object.assign([], this.contactForm.value.identifications);
		valuesCopy.splice(index, 1);

		const arrayGroups = this.createIdentificationFormGroups(valuesCopy);
		const valuesFormArray = this.formBuilder.array(arrayGroups);

		this.contactForm.setControl('identifications', valuesFormArray);
		this.contactForm.markAsDirty();
	}

	get contactType(): string|null {
		if (!this.contactForm)
			return null;

		return this.contactForm.value.contactType || null;
	}

	get identifications(): FormArray {
		return this.contactForm.get('identifications') as FormArray;
	}

	get addresses(): FormArray {
		return this.contactForm.get('addresses') as FormArray;
	}

	showPhysicalContactForm(): boolean {
		if (!this.contactForm)
			return false;

		const physicalContactTypes = ContactTypes.getPhysicalContactList();
		if (this.contactType && physicalContactTypes.filter(type => type.id === this.contactType).length > 0)
			return true;
		return false;
	}

	showCorporateContactForm(): boolean {
		if (!this.contactForm)
			return false;

		const corporateContactTypes = ContactTypes.getCorporateContactList();
		if (this.contactType && corporateContactTypes.filter(type => type.id === this.contactType).length > 0)
			return true;
		return false;
	}

}
