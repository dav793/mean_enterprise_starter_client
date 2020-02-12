
import Utils from '../../@shared/helpers/utils/utils';
import { ContactTypes } from '../../@shared/lists/contact-types';

export interface IAddress {
	street: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
}

export interface IIdentification {
	idType: string;
	idNumber: string;
	expirationDate: Date;
	expeditedBy: string;
	isMainId: boolean;
}

export interface IContact {
	_id: string;

	// physical contact properties
	firstName: string;
	middleName: string;
	lastName: string;
	salutation: string;
	gender: string;
	maritalStatus: string;
	dateOfBirth: string;
	countryOfBirth: string;

	// corporate contact properties
	corporateName: string;
	dateOfConstitution: string;
	countryOfConstitution: string;

	// common properties
	contactType: string;
	alias: string;
	homePhoneNumber: string;
	mobilePhoneNumber: string;
	workPhoneNumber: string;
	email: string;
	identifications: IIdentification[];
	addresses: IAddress[];
	profession: string;
	jobPosition: string;

	deleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Contact {

	_id: string;

	// common properties
	contactType: string;
	alias?: string;
	homePhoneNumber: string;
	mobilePhoneNumber: string;
	workPhoneNumber: string;
	email: string;
	identifications: IIdentification[];
	addresses: IAddress[];
	profession: string;
	jobPosition: string;
	deleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;

	// physical contact properties
	firstName?: string;
	middleName?: string;
	lastName?: string;
	salutation?: string;
	gender?: string;
	maritalStatus?: string;
	dateOfBirth?: string;
	countryOfBirth?: string;

	// corporate contact properties
	corporateName?: string;
	dateOfConstitution?: string;
	countryOfConstitution?: string;

	constructor(private __data: IContact) {

		this._id = __data._id || '';

		this.contactType = __data.contactType || '';
		this.alias= __data.alias || '';
		this.homePhoneNumber = __data.homePhoneNumber || '';
		this.mobilePhoneNumber = __data.mobilePhoneNumber || '';
		this.workPhoneNumber = __data.workPhoneNumber || '';
		this.email = __data.email || '';
		this.identifications = __data.identifications || [];
		this.addresses = __data.addresses || [];
		this.profession = __data.profession || '';
		this.jobPosition = __data.jobPosition || '';
		this.deleted = __data.deleted || false;
		this.createdAt = __data.createdAt || null;
		this.updatedAt = __data.updatedAt || null;

		if (this.isPhysical()) {

			this.firstName = __data.firstName || '';
			this.middleName = __data.middleName || '';
			this.lastName= __data.lastName || '';
			this.salutation= __data.salutation || '';
			this.gender = __data.gender || '';
			this.maritalStatus = __data.maritalStatus || '';
			this.dateOfBirth = __data.dateOfBirth || '';
			this.countryOfBirth = __data.countryOfBirth || '';

		}
		else if (this.isCorporate()) {

			this.corporateName = __data.corporateName || '';
			this.dateOfConstitution = __data.dateOfConstitution || '';
			this.countryOfConstitution = __data.countryOfConstitution || '';

		}

	}

	asInterface(): IContact {
		return this.__data;
	}

	isPhysical(): boolean {
		return ContactTypes.isPhysicalContact(this.contactType);
	}

	isCorporate(): boolean {
		return ContactTypes.isCorporateContact(this.contactType);
	}

}
