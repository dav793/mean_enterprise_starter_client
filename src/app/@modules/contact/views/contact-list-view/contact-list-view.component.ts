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

@Component({
	selector: 'app-contact-list-view',
	templateUrl: './contact-list-view.component.html',
	styleUrls: ['./contact-list-view.component.css']
})
export class ContactListViewComponent implements OnInit, OnDestroy {

	protected contactTypeOptions = ContactTypes.getOptionsList();
	protected genderOptions = Genders.getOptionsList();
	protected maritalStatusOptions = MaritalStatus.getOptionsList();
	protected countryOptions = Countries.getOptionsList();
	protected identificationTypeOptions = IdentificationTypes.getOptionsList();

	protected onDestroy$ = new Subject<void>();
	protected isLoading = true;
	protected subs = [];

	toolbarConfig: IToolbarConfig = {
		label: 'Contactos',
		itemAlignment: ToolbarItemAlignment.RIGHT,
		items: {
			create: {
				type: ToolbarItemType.BUTTON,
				label: 'nuevo',
				classes: ['success', 'size-sm'],
				isHidden: true
			}
		}
	};

	constructor(
		private coreStore: CoreStoreService,
		private contactStore: ContactStoreService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {}

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
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
