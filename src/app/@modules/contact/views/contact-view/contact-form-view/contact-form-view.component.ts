import { Component, Input, Output, OnInit, EventEmitter, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { IContact } from '../../../../../@core/contact/contact.model';

import { IOptionType } from '../../../../../@shared/components/form-elements/option-type';
import { ContactTypes } from '../../../../../@shared/lists/contact-types';

@Component({
  selector: 'app-contact-form-view',
  templateUrl: './contact-form-view.component.html',
  styleUrls: ['./contact-form-view.component.css']
})
export class ContactFormViewComponent implements OnInit, OnDestroy, OnChanges {

    @Input() contact$: Observable<IContact>;
	@Input() revert$: Observable<void>;
	@Output() formChanges = new EventEmitter<any|false>();  // emits the form value
	@Output() formValidChanges = new EventEmitter<boolean>();
	@Output() formDirtyChanges = new EventEmitter<boolean>();

    contact: IContact|null;
    contactForm: FormGroup|null;

    identificationsModel = [];
	addressesModel = [];

	contactOption = ContactTypes.getOptionsList();

    protected onDestroy$ = new Subject<void>();
    protected loaderSub: any;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
		if ((changes.contact$ ) && this.contact$ ) {
			this.loadData();
		}
			
		// when revert is defined, handle form reversion
		if (this.revert$)
			this.revert$
				.pipe( takeUntil(this.onDestroy$) )
				.subscribe(() => this.revertForm());
	}
    
    loadData() {
        if (this.loaderSub)
			this.loaderSub.unsubscribe();

		this.loaderSub = this.contact$
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe( contact => {
				if (contact) {
					this.contact = contact;
					this.setupForm();
					this.formDirtyChanges.emit(false);
				}
				else {
					this.contact = null;
					this.formDirtyChanges.emit(false);
				}

            });
    }

    revertForm() {
            this.setupForm();
            this.formDirtyChanges.emit( false );
        }

    setupForm() {
            this.contactForm = this.buildForm(this.contact);
            this.formChanges.emit(this.contactForm.value);
            this.setupOutputs();
    }

    setupOutputs() {
        this.contactForm.valueChanges.pipe(
            takeUntil( this.onDestroy$ ),
            tap( () => this.formValidChanges.emit( this.contactForm.valid ) ),
            tap( () => this.formDirtyChanges.emit( this.contactForm.dirty ) )
        ).subscribe(() => {
            if (this.contactForm.valid)
                this.formChanges.emit(this.contactForm.value);
            else
                this.formChanges.emit(false);
        });
    }


    buildForm(contact: IContact): FormGroup {

		const group = this.formBuilder.group({

            // physical contact properties
            firstName:                [contact.firstName,               [] ],
            middleName:               [contact.middleName,              [] ],
            lastName:                 [contact.lastName,                [] ],
            salutation:               [contact.salutation,              [] ],
            gender:                   [contact.gender,                  [] ],
            maritalStatus:            [contact.maritalStatus,           [] ],
            dateOfBirth:              [contact.dateOfBirth,             [] ],
            countryOfBirth:           [contact.countryOfBirth,          [] ],

            // corporate properties
            corporateName:            [contact.corporateName,           [] ],
            dateOfConstitution:       [contact.dateOfConstitution,      [] ],
            countryOfConstitution:    [contact.countryOfConstitution,   [] ],

            // common properties
            contactType:              [contact.contactType,             [] ],
            alias:                    [contact.alias,                   [] ],
            homeNumber:               [contact.homePhoneNumber,         [] ], 
            mobileNumber:             [contact.mobilePhoneNumber,       [] ],
            workNumber:               [contact.workPhoneNumber,         [] ],
            email:                    [contact.email,                   [] ],
            profession:               [contact.profession,              [] ],
			jobPosition:              [contact.jobPosition,             [] ],
			identifications:          this.formBuilder.array([])            ,
            addresses:                this.formBuilder.array([])            

        });
        
        const fIdentifications = this.formBuilder.array(
            this.createIdentifications(this.identificationsModel)
        );
        group.setControl('identifications', fIdentifications);


        const fAddresses = this.formBuilder.array(
            this.createAddresses(this.addressesModel)
        );
        group.setControl('addresses', fAddresses);

        return group;

    }
  

    get identificationsFormArray(): FormArray {
		return this.contactForm.get('identifications') as FormArray;
    }

	createIdentifications(value: any[]) {
		const arrayGroups = value.map(val => {
			return this.formBuilder.group({
				idType:     			  [ val.idType,    		    [ ] ],
				idNumber:			      [ val.idNumber,	        [ ] ],
				expirationDate:           [ val.expirationDate,     [ ] ],
				expeditedBy:   	          [ val.expeditedBy,        [ ] ],
				isMainId:		          [ val.isMainId,		    [ ] ],
			});
		});
		return arrayGroups;
	}

	addIdentifications() {
		const val = {
			idType: '',
			idNumber: '',
			expirationDate: '',  
			expeditedBy: '',
			isMainId: false 
        };
    
		this.identificationsFormArray.push(
			this.formBuilder.group({
				idType:     			[ val.idType,    			[ ] ],
				idNumber:			    [ val.idNumber,			    [ ] ],
				expirationDate:         [ val.expirationDate,       [ ] ],
				expeditedBy:  		    [ val.expeditedBy,          [ ] ],
				isMainId:		        [ val.isMainId,		        [ ] ],
			})
		);
		this.contactForm.markAsDirty();
	}

	removeIdentifications(index: number) {
		const valuesCopy: any[] = Object.assign([], this.contactForm.value.identifications);
		valuesCopy.splice(index, 1);

		const arrayGroups = this.createIdentifications(valuesCopy);
		const valuesFormArray = this.formBuilder.array(arrayGroups);

		this.contactForm.setControl('identifications', valuesFormArray);
		this.contactForm.markAsDirty();
    }
    

    get addressesFormArray(): FormArray {
		return this.contactForm.get('addresses') as FormArray;
    }

	createAddresses(value: any[]) {
		const addressesArrayGroups = value.map(val => {
			return this.formBuilder.group({
				street:     			[ val.street,   	[ ] ],
				city:	                [ val.city,	        [ ] ],
				state:                  [ val.state,	    [ ] ],
				country:   	            [ val.country,      [ ] ],
				postalCode:		        [ val.postalCode,	[ ] ],
			});
		});
		return addressesArrayGroups;
	}

	addAddresses() {
        const val = {
            street:         '',
            city:           '',
            state:          '',   
            country:        '',
            postalCode:     ''   
        };
    
		this.addressesFormArray.push(
			this.formBuilder.group({
				street:     	    [ val.street,    		[ ] ],
				city:			    [ val.city,			    [ ] ],
				state:              [ val.state,            [ ] ],
				country:  		    [ val.country,          [ ] ],
				postalCode:		    [ val.postalCode,		[ ] ],
			})
		);
		this.contactForm.markAsDirty();
	}

	removeAddresses(index: number) {
		const valuesCopy: any[] = Object.assign([], this.contactForm.value.addresses);
		valuesCopy.splice(index, 1);

		const addressesArrayGroups = this.createAddresses(valuesCopy);
		const addressesFormArray = this.formBuilder.array(addressesArrayGroups);

		this.contactForm.setControl('addresses', addressesFormArray);
		this.contactForm.markAsDirty();
	}

	getContactType(): 'physical'|'corporate'|null {
    	if (this.contactForm) {
    		if (this.contactForm.controls['contactType'].value === '1')
    			return 'physical';
			else if (this.contactForm.controls['contactType'].value === '2')
				return 'corporate';
			else
				return null;
		}
    	else
    		return null;
	}

}
