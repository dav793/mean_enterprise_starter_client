import { Component, Input, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


import { IContact } from '../../../../@core/contact/contact.model';


@Component({
  selector: 'app-contact-form-view',
  templateUrl: './contact-form-view.component.html',
  styleUrls: ['./contact-form-view.component.css']
})
export class ContactFormViewComponent implements OnInit {

	@Input() revert$: Observable<void>;
	@Output() formChanges = new EventEmitter<any|false>();  // emits the form value
	@Output() formValidChanges = new EventEmitter<boolean>();
	@Output() formDirtyChanges = new EventEmitter<boolean>();

  contact: IContact|null;
  contactForm: FormGroup|null;


  protected onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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

      contactType:        [contact.contactType,         [] ],
      alias:              [contact.alias,               [] ],
      homeNumber:         [contact.homePhoneNumber,     [] ], 
      mobileNumber:       [contact.mobilePhoneNumber,   [] ],
      workNumber:         [contact.workPhoneNumber,     [] ],
      email:              [contact.email,               [] ],
      identifications:    [contact.identifications,     [] ],
      adresses:           [contact.addresses,           [] ],    
      profession:         [contact.profession,          [] ],
      jobPosition:        [contact.jobPosition,         [] ]

		});

		return group;

	}

}
