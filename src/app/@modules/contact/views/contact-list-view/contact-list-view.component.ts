import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of, ReplaySubject, Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, first, mergeMap, switchMap, takeUntil, tap, map, startWith } from 'rxjs/operators';
import { excludeFalsy } from '../../../../@shared/helpers/operators/exclude-falsy';

import {
	IContact,
	Contact,
	IAddress,
	IIdentification
} from '../../../../@core/contact/contact.model';
import { IContactForView } from './contact-for-view.model';

import {
	IToolbarConfig, IToolbarEvent,
	ToolbarItemAlignment,
	ToolbarItemType
} from '../../../../@shared/components/toolbar/toolbar.interface';

import { ISearchPropertyMetadata } from '../../../../@shared/components/search/search.interface';
import { ISortPropertyMetadata } from '../../../../@shared/helpers/utils/sort-utils';

import { CoreStoreService } from '../../../../@core/store/core-store';
import { ContactStoreService, IContactStoreEventInfo } from '../../store/contact-store';
import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

import { ErrorCode } from '../../../../@shared/enums/errors';
import { ViewStatus } from '../../../../@shared/types/view-status';

import { ContactTypes } from '../../../../@shared/lists/contact-types';
import { Genders } from '../../../../@shared/lists/genders';
import { MaritalStatus} from '../../../../@shared/lists/marital-status';
import { Countries } from '../../../../@shared/lists/countries';
import { IdentificationTypes } from '../../../../@shared/lists/identification-types';
import SortUtils from '../../../../@shared/helpers/utils/sort-utils';
import Utils from '../../../../@shared/helpers/utils/utils';

@Component({
	selector: 'app-contact-list-view',
	templateUrl: './contact-list-view.component.html',
	styleUrls: ['./contact-list-view.component.scss']
})
export class ContactListViewComponent implements OnInit, OnDestroy {

	contacts$: Observable<IContact[]>;
	allContacts$ = new BehaviorSubject<IContactForView[]>([]);
    sortedContacts$ = new BehaviorSubject<IContactForView[]>([]);
    filteredContacts$ = new BehaviorSubject<IContactForView[]>([]);
	pageContacts$ = new BehaviorSubject<IContactForView[]>([]);
	
	resetSearch$ = new Subject<void>();

	sortParams: ISortPropertyMetadata;

    searchSorters: { [key: string]: ISearchPropertyMetadata } = {
		_label_fullName: { propType: 'string' },
		_label_alias:    { propType: 'string' },
		_label_date:     { propType: 'string' }
	};

	toolbarConfig: IToolbarConfig = {
		label: 'Contactos',
		itemAlignment: ToolbarItemAlignment.RIGHT,
		items: {
			// create: {
			// 	type: ToolbarItemType.BUTTON,
			// 	label: 'nuevo',
			// 	classes: ['success', 'size-sm'],
			// 	isHidden: true
			// }
		}
	};

	protected contactTypeOptions = ContactTypes.getOptionsList();
	protected genderOptions = Genders.getOptionsList();
	protected maritalStatusOptions = MaritalStatus.getOptionsList();
	protected countryOptions = Countries.getOptionsList();
	protected identificationTypeOptions = IdentificationTypes.getOptionsList();

	protected onDestroy$ = new Subject<void>();
	// protected isLoading = true;
	protected viewStatus: ViewStatus = 'loading';
	// protected subs = [];
	protected errorCode: ErrorCode;
    protected errorSig: string;


	constructor(
		private coreStore: CoreStoreService,
		private contactStore: ContactStoreService,
		private router: Router
	) { }

	ngOnInit() {
		this.loadData().pipe(
            takeUntil(this.onDestroy$)
        ).subscribe(
        	result => {
				if (result)
					this.viewStatus = 'ready';

				this.allContacts$.pipe(
					takeUntil(this.onDestroy$)
				).subscribe(contacts => {

					this.resetSearch$.next();

					this.sortedContacts$.next(
					  this.sortParams ? [...this.sortContacts()] : [...contacts]
					);

				});
			},
			error => {
        		console.error(error);
			}
		);
	}

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	loadData(): Observable<boolean> {
		this.contacts$ = this.getContacts();
		
		return this.contacts$.pipe(
			mergeMap(v=> this.contacts$.pipe(
				map(contacts=> v&& true))
			),
			distinctUntilChanged()
		);

        // return combineLatest(this.contactGroups$, this.roles$).pipe(
        //     map(([contactGroups, roles]) => true),
        //     mergeMap(v => this.contacts$
        //         .pipe( map(contacts => v && true) )
        //     ),
        //     distinctUntilChanged()
        // );

	}
	
    getContacts(): Observable<IContact[]> {
		const meta: IActionMetadata = this.coreStore.loadAllContacts();

		this.contactStore.selectContactLoadAllError('UM_ULA').pipe(
			takeUntil(this.onDestroy$),
			filter(({ eventId }) => eventId === meta.eventId),
			first()
		).subscribe((eventInfo: IContactStoreEventInfo) => {
			this.viewStatus = 'failed';
			this.errorCode = eventInfo.errorCode;
			this.errorSig = eventInfo.errorSig;
		});

		return this.coreStore.selectAllContacts().pipe(
			excludeFalsy,
			distinctUntilChanged(),
			map(contacts => this.addExtrasOnContacts(contacts)),
			tap(contacts => this.allContacts$.next([...contacts as IContactForView[]]))
		);
	}

	addExtrasOnContacts(contacts: IContact[]): IContactForView[] {
        if (!contacts)
            return contacts as IContactForView[];

        // add on contacts the extra properties needed for this view and its children
        let contactsArray = Utils.objectToArray(contacts);
		contactsArray = this.addFullNameOnContacts(contactsArray);
		contactsArray = this.addDatesOnContacts(contactsArray);
        return contactsArray;
    }

	addFullNameOnContacts(contacts: IContact[]): any[] {
        return contacts.map(contact => {
			const currentContact = new Contact(contact);

			if(currentContact.isPhysical()){
				return Object.assign(contact, 
					{_label_fullName: currentContact.firstName + 
									  currentContact.middleName + 
									  currentContact.lastName 
					}
				);
			} else if(currentContact.isCorporate()){
                return Object.assign(contact, { _label_fullName: currentContact.corporateName });
			}
            
        });
	}
	
	addDatesOnContacts(contacts: IContact[]): any[] {
        return contacts.map(contact => {
			const currentContact = new Contact(contact);

			if(currentContact.isPhysical()){
				return Object.assign(contact, {_label_fullName: currentContact.dateOfBirth });
			} else if(currentContact.isCorporate()){
                return Object.assign(contact, { _label_fullName: currentContact.dateOfConstitution });
			}
            
        });
	}

	onPageItemsChange(items: IContactForView[]) {
        this.pageContacts$.next([...items]);
    }

    onSearchItemsChange(items: IContactForView[]) {
        this.filteredContacts$.next([...items]);
    }

    navigateToContactView(contact: IContactForView) {
        this.router.navigate(['contacts', 'view', contact._id]);
	}
	
	setActiveSort(propertyName: string) {
        if (this.sortParams && this.sortParams.property === propertyName) {
            if (this.sortParams.direction === 'desc')
                this.sortParams.direction = 'asc';
            else if (this.sortParams.direction === 'asc')
                this.unsetActiveSort(true);
        }
        else
            this.sortParams = {type: 'string', property: propertyName, direction: 'desc'};

        if (this.sortParams)
            this.sortedContacts$.next(this.sortContacts());

        this.resetSearch$.next();
    }

    unsetActiveSort(updateSortedContacts = false) {
        delete this.sortParams;
        if (updateSortedContacts)
            this.sortedContacts$.next([...this.allContacts$.value]);
    }

    sortContacts() {
        return SortUtils.sortByParams(this.sortParams, this.sortedContacts$.value);
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
