import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { IOptionType } from '../../../../@shared/components/form-elements/option-type';
import { Format } from '../../../../@shared/enums/format';

import { testSyncValidator, testAsyncValidator } from '../../../../@shared/validators/template.validator';
import { numberValidator } from '../../../../@shared/validators/number.validator';
import { dateValidator } from '../../../../@shared/validators/date.validator';

import * as moment from 'moment';

@Component({
      selector: 'app-form-inputs',
      templateUrl: './form-inputs.component.html',
      styleUrls: ['./form-inputs.component.css']
})
export class FormInputsComponent implements OnInit {

    form: FormGroup;
    selectOptions: IOptionType[] = [
        { key: '1', label: 'Perro' },
        { key: '2', label: 'Gato' },
        { key: '3', label: 'Tortuga' }
    ];

	arrayValuesModel = [
		{
			text: 'Miami',
			textMulti: ['Hola', 'Adios'],
			select: '1',
			selectMulti: ['1', '2'],
			selectSearch: '1',
			selectSearchMulti: ['1', '2'],
			date: '15/6/2020',
			check: true,
			toggle: true,
			radio: '1'
		},
		{
			text: 'New York',
			textMulti: ['Hola', 'Adios'],
			select: '2',
			selectMulti: ['1', '2'],
			selectSearch: '1',
			selectSearchMulti: ['1', '2'],
			date: '15/6/2020',
			check: true,
			toggle: true,
			radio: '1'
		}
	];

    errorMessages = {
        text: {
            required: 'Campo obligatorio',
            testSync: 'Debe decir \'hello world\'',
            testAsync: 'No dice \'hello world\''
        },
        textMulti: {
            required: 'Campo obligatorio'
        },
        select: {
            required: 'Campo obligatorio'
        },
        selectMulti: {
            required: 'Campo obligatorio'
        },
        selectSearch: {
            required: 'Campo obligatorio'
        },
        selectSearchMulti: {
            required: 'Campo obligatorio'
        },
        date: {
            required: 'Campo obligatorio',
            date: 'No es una fecha válida'
        },
        dateMulti: {
            required: 'Campo obligatorio'
        },
        password: {
            required: 'Campo obligatorio'
        },
        number: {
            required: 'Campo obligatorio',
            number: 'No es un número válido'
        },
		arrayValues: {
        	text: {
				required: 'Campo obligatorio'
			},
			textMulti: {
				required: 'Campo obligatorio'
			},
			select: {
				required: 'Campo obligatorio'
			},
			selectMulti: {
				required: 'Campo obligatorio'
			},
			selectSearch: {
				required: 'Campo obligatorio'
			},
			selectSearchMulti: {
				required: 'Campo obligatorio'
			},
			date: {
				required: 'Campo obligatorio'
			},
			check: {
				required: 'Campo obligatorio'
			},
			toggle: {
				required: 'Campo obligatorio'
			},
			radio: {
				required: 'Campo obligatorio'
			}
		}
    };

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.buildForm();
    }

    buildForm() {

        const group = this.formBuilder.group({
            // text:                 [ '',
            //   [ testSyncValidator() ],
            //   [ testAsyncValidator() ]
            // ],
            text:                 [ '',                           [ Validators.required ] ],
            textMulti:            [ [],                           [ Validators.required ] ],
            // text:                 [ 'pizza',                      [ Validators.required ] ],
            // textMulti:            [ ['pizza', 'burger'],          [ Validators.required ] ],
            select:               [ '',                           [ Validators.required ] ],
            selectMulti:          [ [],                           [ Validators.required ] ],
            // select:               [ '1',                          [ Validators.required ] ],
            // selectMulti:          [ ['1', '2'],                   [ Validators.required ] ],
            selectSearch:         [ '',                           [ Validators.required ] ],
            selectSearchMulti:    [ [],                           [ Validators.required ] ],
            // selectSearch:         [ '1',                          [ Validators.required ] ],
            // selectSearchMulti:    [ ['1', '2'],                   [ Validators.required ] ],
            date:                 [ '',                           [ Validators.required, dateValidator() ] ],
            dateMulti:            [ [],                           [ Validators.required ] ],
            // date:                 [ '12/06/2019',                 [ Validators.required ] ],
            // dateMulti:            [ ['12/06/2019', '21/10/2018'], [ Validators.required ] ],
            password:             [ '',                           [ Validators.required ] ],
            // password:             [ '12345678',                   [ Validators.required ] ],
            number:               [ 100,                          [ Validators.required, numberValidator() ] ],
            check:                [ true,                         [] ],
            toggle:               [ true,                         [] ],
            radio:                [ '2',                          [] ],
			arrayValues: 	 	  this.formBuilder.array([])
        });

		const fArrayVal = this.formBuilder.array(
			this.createArrayGroups(this.arrayValuesModel)
		);
		group.setControl('arrayValues', fArrayVal);

        return group;
    }

    getTypeof(v: any): string {
        return typeof v;
    }

	get formArray(): FormArray {
		return this.form.get('arrayValues') as FormArray;
	}

	createArrayGroups(value: any[]) {
		const arrayGroups = value.map(val => {
			return this.formBuilder.group({
				text:     			[ val.text,    				[ Validators.required ] ],
				textMulti:			[ val.textMulti,			[ Validators.required ] ],
				select:   			[ val.select,     			[ Validators.required ] ],
				selectMulti:   		[ val.selectMulti,     		[ Validators.required ] ],
				selectSearch:		[ val.selectSearch,			[ Validators.required ] ],
				selectSearchMulti:	[ val.selectSearchMulti,	[ Validators.required ] ],
				date:				[ val.date,					[ Validators.required ] ],
				check:				[ val.check,				[ Validators.required ] ],
				toggle:				[ val.toggle,				[ Validators.required ] ],
				radio:				[ val.radio,				[ Validators.required ] ]
			});
		});
		return arrayGroups;
	}

	addArrayValue() {
		const val = {
			text: '',
			textMulti: [],
			select: '',
			selectMulti: [],
			selectSearch: '',
			selectSearchMulti: [],
			date: '',
			check: false,
			toggle: false,
			radio: ''
		};
		this.formArray.push(
			this.formBuilder.group({
				text:     			[ val.text,    				[ Validators.required ] ],
				textMulti:			[ val.textMulti,			[ Validators.required ] ],
				select:  			[ val.select,       		[ Validators.required ] ],
				selectMulti:  		[ val.selectMulti,     		[ Validators.required ] ],
				selectSearch:		[ val.selectSearch,			[ Validators.required ] ],
				selectSearchMulti:	[ val.selectSearchMulti,	[ Validators.required ] ],
				date:				[ val.date,					[ Validators.required ] ],
				check:				[ val.check,				[ Validators.required ] ],
				toggle:				[ val.toggle,				[ Validators.required ] ],
				radio:				[ val.radio,				[ Validators.required ] ]
			})
		);
		this.form.markAsDirty();
	}

	removeArrayValue(index: number) {
		const valuesCopy: any[] = Object.assign([], this.form.value.arrayValues);
		valuesCopy.splice(index, 1);

		const arrayGroups = this.createArrayGroups(valuesCopy);
		const valuesFormArray = this.formBuilder.array(arrayGroups);

		this.form.setControl('arrayValues', valuesFormArray);
		this.form.markAsDirty();
	}

}
