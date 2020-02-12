import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IContact } from '../../../../@core/contact/contact.model';


@Component({
  selector: 'app-contact-form-view',
  templateUrl: './contact-form-view.component.html',
  styleUrls: ['./contact-form-view.component.css']
})
export class ContactFormViewComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }


  buildForm(contact: IContact): FormGroup {

		const group = this.formBuilder.group({
			
		});

		return group;

	}

}
