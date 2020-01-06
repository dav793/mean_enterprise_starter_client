
import Utils from '../../@shared/helpers/utils/utils';
import { ContactTypes } from '../../@shared/lists/contact-types';

export interface IAddress {
	street: string,
	city: string,
	state: string,
	country: string,
	postalCode: string
}

export interface IPhoneNumber {
	phoneNumber: string,
	detail: string
}

export interface IIdentification {
	idType: string,
	idNumber: string,
	expirationDate: Date,
	isMainId: boolean
}

export interface ICorporateRepresentative {
	name: string,
	relation: string,
	participationPercentage: number,
	addressLine: string
}

export interface ICommercialReference {
	name: string,
	phoneNumber: string
}

export interface IPhysicalContact {
	_id: string;
	contactType: string,
	firstName: string,
	middleName: string,
	lastName: string,
	mothersMaidenName: string,
	gender: string,
	maritalStatus: string,
	nationalities: string[],
	countryOfBirth: string,
	birthDate: Date,
	homePhoneNumber: string,
	mobilePhoneNumber: string,
	email: string,
	isPep: boolean,
	identifications: IIdentification[],
	addresses: IAddress[],
	profession: string,
	jobPosition: string,
	companyName: string,
	companyActivity: string,
	companyPhoneNumber: string,
	companyAddressLine: string,
	grossMonthlyIncome: number,
	sourcesOfIncome: string,
	sourcesOfFunds: string[],
	otherSourcesOfFunds: string,
	countriesOfFundsOrigin: string[],
	purposeOfFunds: string[],
	otherPurposesOfFunds: string,
	estimatedAmountOfTransactions: string,
	deleted: boolean,
	createdAt?: Date,
	updatedAt?: Date
}

export interface ICorporateContact {
	_id: string;
	contactType: string,
	corporationName: string,
	corporationType: string,
	corporationIdNumber: string,
	dateOfConstitution: Date,
	countryOfConstitution: string,
	email: string,
	languagesSpoken: string[],
	phoneNumbers: IPhoneNumber[],
	isPep: boolean,
	namesOfPeps: string[],
	corporateRepresentatives: ICorporateRepresentative[],
	commercialReferences: ICommercialReference[],
	addresses: IAddress[],
	companyActivity: string,
	grossMonthlyIncome: number,
	sourcesOfIncome: string,
	sourcesOfFunds: string[],
	otherSourcesOfFunds: string,
	countriesOfFundsOrigin: string[],
	purposeOfFunds: string[],
	otherPurposesOfFunds: string,
	estimatedAmountOfTransactions: string,
	deleted: boolean,
	createdAt?: Date,
	updatedAt?: Date
}

export interface IContact {
	_id: string;

	// common properties
	contactType: string,
	email: string,
	isPep: boolean,
	addresses: IAddress[],
	companyActivity: string,
	grossMonthlyIncome: number,
	sourcesOfIncome: string,
	sourcesOfFunds: string[],
	otherSourcesOfFunds: string,
	countriesOfFundsOrigin: string[],
	purposeOfFunds: string[],
	otherPurposesOfFunds: string,
	estimatedAmountOfTransactions: string,
	deleted: boolean,
	createdAt?: Date,
	updatedAt?: Date,

	// physical contact properties
	firstName?: string,
	middleName?: string,
	lastName?: string,
	mothersMaidenName?: string,
	gender?: string,
	maritalStatus?: string,
	nationalities?: string[],
	countryOfBirth?: string,
	birthDate?: Date,
	homePhoneNumber?: string,
	mobilePhoneNumber?: string,
	identifications?: IIdentification[],
	profession?: string,
	jobPosition?: string,
	companyName?: string,
	companyPhoneNumber?: string,
	companyAddressLine?: string,

	// corporate contact properties
	corporationName?: string,
	corporationType?: string,
	corporationIdNumber?: string,
	dateOfConstitution?: Date,
	countryOfConstitution?: string,
	languagesSpoken?: string[],
	phoneNumbers?: IPhoneNumber[],
	namesOfPeps?: string[],
	corporateRepresentatives?: ICorporateRepresentative[],
	commercialReferences?: ICommercialReference[],
}

export class PhysicalContact {

	_id: string;

	// common properties
	contactType: string;
	email: string;
	isPep: boolean;
	addresses: IAddress[];
	companyActivity: string;
	grossMonthlyIncome: number;
	sourcesOfIncome: string;
	sourcesOfFunds: string[];
	otherSourcesOfFunds: string;
	countriesOfFundsOrigin: string[];
	purposeOfFunds: string[];
	otherPurposesOfFunds: string;
	estimatedAmountOfTransactions: string;
	deleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;

	// physical contact properties
	firstName?: string;
	middleName?: string;
	lastName?: string;
	mothersMaidenName?: string;
	gender?: string;
	maritalStatus?: string;
	nationalities?: string[];
	countryOfBirth?: string;
	birthDate?: Date;
	homePhoneNumber?: string;
	mobilePhoneNumber?: string;
	identifications?: IIdentification[];
	profession?: string;
	jobPosition?: string;
	companyName?: string;
	companyPhoneNumber?: string;
	companyAddressLine?: string;

	constructor(private __data: IPhysicalContact) {

		this._id = __data._id || '';

		this.contactType = __data.contactType || '';
		this.email = __data.email || '';
		this.isPep = __data.isPep || false;
		this.addresses = __data.addresses || [];
		this.companyActivity = __data.companyActivity || '';
		this.grossMonthlyIncome = __data.grossMonthlyIncome || 0;
		this.sourcesOfIncome = __data.sourcesOfIncome || '';
		this.sourcesOfFunds = __data.sourcesOfFunds || [];
		this.otherSourcesOfFunds = __data.otherSourcesOfFunds || '';
		this.countriesOfFundsOrigin = __data.countriesOfFundsOrigin || [];
		this.purposeOfFunds = __data.purposeOfFunds || [];
		this.otherPurposesOfFunds = __data.otherPurposesOfFunds || '';
		this.estimatedAmountOfTransactions = __data.estimatedAmountOfTransactions || '';
		this.deleted = __data.deleted || false;
		this.createdAt = __data.createdAt || null;
		this.updatedAt = __data.updatedAt || null;

		if (ContactTypes.isPhysicalContact(this.contactType)) {

			this.firstName = __data.firstName || '';
			this.middleName = __data.middleName || '';
			this.lastName = __data.lastName || '';
			this.mothersMaidenName = __data.mothersMaidenName || '';
			this.gender = __data.gender || '';
			this.maritalStatus = __data.maritalStatus || '';
			this.nationalities = __data.nationalities || [];
			this.countryOfBirth = __data.countryOfBirth || '';
			this.birthDate = __data.birthDate || null;
			this.homePhoneNumber = __data.homePhoneNumber || '';
			this.mobilePhoneNumber = __data.mobilePhoneNumber || '';
			this.identifications = __data.identifications || [];
			this.profession = __data.profession || '';
			this.jobPosition = __data.jobPosition || '';
			this.companyName = __data.companyName || '';
			this.companyPhoneNumber = __data.companyPhoneNumber || '';
			this.companyAddressLine = __data.companyAddressLine || '';

		}

	}

	asInterface(): IPhysicalContact {
		return this.__data;
	}

}

export class CorporateContact {

	_id: string;

	// common properties
	contactType: string;
	email: string;
	isPep: boolean;
	addresses: IAddress[];
	companyActivity: string;
	grossMonthlyIncome: number;
	sourcesOfIncome: string;
	sourcesOfFunds: string[];
	otherSourcesOfFunds: string;
	countriesOfFundsOrigin: string[];
	purposeOfFunds: string[];
	otherPurposesOfFunds: string;
	estimatedAmountOfTransactions: string;
	deleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;

	// corporate contact properties
	corporationName?: string;
	corporationType?: string;
	corporationIdNumber?: string;
	dateOfConstitution?: Date;
	countryOfConstitution?: string;
	languagesSpoken?: string[];
	phoneNumbers?: IPhoneNumber[];
	namesOfPeps?: string[];
	corporateRepresentatives?: ICorporateRepresentative[];
	commercialReferences?: ICommercialReference[];

	constructor(private __data: ICorporateContact) {

		this._id = __data._id || '';

		this.contactType = __data.contactType || '';
		this.email = __data.email || '';
		this.isPep = __data.isPep || false;
		this.addresses = __data.addresses || [];
		this.companyActivity = __data.companyActivity || '';
		this.grossMonthlyIncome = __data.grossMonthlyIncome || 0;
		this.sourcesOfIncome = __data.sourcesOfIncome || '';
		this.sourcesOfFunds = __data.sourcesOfFunds || [];
		this.otherSourcesOfFunds = __data.otherSourcesOfFunds || '';
		this.countriesOfFundsOrigin = __data.countriesOfFundsOrigin || [];
		this.purposeOfFunds = __data.purposeOfFunds || [];
		this.otherPurposesOfFunds = __data.otherPurposesOfFunds || '';
		this.estimatedAmountOfTransactions = __data.estimatedAmountOfTransactions || '';
		this.deleted = __data.deleted || false;
		this.createdAt = __data.createdAt || null;
		this.updatedAt = __data.updatedAt || null;

		if (ContactTypes.isCorporateContact(this.contactType)) {

			this.corporationName = __data.corporationName || '';
			this.corporationType = __data.corporationType || '';
			this.corporationIdNumber = __data.corporationIdNumber || '';
			this.dateOfConstitution = __data.dateOfConstitution || null;
			this.countryOfConstitution = __data.countryOfConstitution || '';
			this.languagesSpoken = __data.languagesSpoken || [];
			this.phoneNumbers = __data.phoneNumbers || [];
			this.namesOfPeps = __data.namesOfPeps || [];
			this.corporateRepresentatives = __data.corporateRepresentatives || [];
			this.commercialReferences = __data.commercialReferences || [];

		}

	}

	asInterface(): ICorporateContact {
		return this.__data;
	}

}

export class Contact {

	_id?: string;

	// common properties
	contactType: string;
	email: string;
	isPep: boolean;
	addresses: IAddress[];
	companyActivity: string;
	grossMonthlyIncome: number;
	sourcesOfIncome: string;
	sourcesOfFunds: string[];
	otherSourcesOfFunds: string;
	countriesOfFundsOrigin: string[];
	purposeOfFunds: string[];
	otherPurposesOfFunds: string;
	estimatedAmountOfTransactions: string;
	deleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;

	// physical contact properties
	firstName?: string;
	middleName?: string;
	lastName?: string;
	mothersMaidenName?: string;
	gender?: string;
	maritalStatus?: string;
	nationalities?: string[];
	countryOfBirth?: string;
	birthDate?: Date;
	homePhoneNumber?: string;
	mobilePhoneNumber?: string;
	identifications?: IIdentification[];
	profession?: string;
	jobPosition?: string;
	companyName?: string;
	companyPhoneNumber?: string;
	companyAddressLine?: string;

	// corporate contact properties
	corporationName?: string;
	corporationType?: string;
	corporationIdNumber?: string;
	dateOfConstitution?: Date;
	countryOfConstitution?: string;
	languagesSpoken?: string[];
	phoneNumbers?: IPhoneNumber[];
	namesOfPeps?: string[];
	corporateRepresentatives?: ICorporateRepresentative[];
	commercialReferences?: ICommercialReference[];

	constructor(private __data: IContact) {

		this._id = __data._id || '';

		this.contactType = __data.contactType || '';
		this.email = __data.email || '';
		this.isPep = __data.isPep || false;
		this.addresses = __data.addresses || [];
		this.companyActivity = __data.companyActivity || '';
		this.grossMonthlyIncome = __data.grossMonthlyIncome || 0;
		this.sourcesOfIncome = __data.sourcesOfIncome || '';
		this.sourcesOfFunds = __data.sourcesOfFunds || [];
		this.otherSourcesOfFunds = __data.otherSourcesOfFunds || '';
		this.countriesOfFundsOrigin = __data.countriesOfFundsOrigin || [];
		this.purposeOfFunds = __data.purposeOfFunds || [];
		this.otherPurposesOfFunds = __data.otherPurposesOfFunds || '';
		this.estimatedAmountOfTransactions = __data.estimatedAmountOfTransactions || '';
		this.deleted = __data.deleted || false;
		this.createdAt = __data.createdAt || null;
		this.updatedAt = __data.updatedAt || null;

		if (ContactTypes.isPhysicalContact(this.contactType)) {

			this.firstName = __data.firstName || '';
			this.middleName = __data.middleName || '';
			this.lastName = __data.lastName || '';
			this.mothersMaidenName = __data.mothersMaidenName || '';
			this.gender = __data.gender || '';
			this.maritalStatus = __data.maritalStatus || '';
			this.nationalities = __data.nationalities || [];
			this.countryOfBirth = __data.countryOfBirth || '';
			this.birthDate = __data.birthDate || null;
			this.homePhoneNumber = __data.homePhoneNumber || '';
			this.mobilePhoneNumber = __data.mobilePhoneNumber || '';
			this.identifications = __data.identifications || [];
			this.profession = __data.profession || '';
			this.jobPosition = __data.jobPosition || '';
			this.companyName = __data.companyName || '';
			this.companyPhoneNumber = __data.companyPhoneNumber || '';
			this.companyAddressLine = __data.companyAddressLine || '';

		}
		else if (ContactTypes.isCorporateContact(this.contactType)) {

			this.corporationName = __data.corporationName || '';
			this.corporationType = __data.corporationType || '';
			this.corporationIdNumber = __data.corporationIdNumber || '';
			this.dateOfConstitution = __data.dateOfConstitution || null;
			this.countryOfConstitution = __data.countryOfConstitution || '';
			this.languagesSpoken = __data.languagesSpoken || [];
			this.phoneNumbers = __data.phoneNumbers || [];
			this.namesOfPeps = __data.namesOfPeps || [];
			this.corporateRepresentatives = __data.corporateRepresentatives || [];
			this.commercialReferences = __data.commercialReferences || [];

		}

	}

	asInterface(): IContact {
		return this.__data;
	}

}

export type IAnyContact = IPhysicalContact | ICorporateContact;
export type AnyContact = PhysicalContact | CorporateContact;
