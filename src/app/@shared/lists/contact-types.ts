
const list = [
	{id: '1', name: 'Persona física'},
	{id: '2', name: 'Persona jurídica'}
];

class ContactTypesUtility {

	constructor() { }

	getList(): {id: string, name: string}[] {
		return list;
	}

	isPhysicalContact(contactTypeId: string): boolean {
		return contactTypeId === '1';
	}

	isCorporateContact(contactTypeId: string): boolean {
		return contactTypeId === '2';
	}

	getOptionsList(): {key: string, label: string}[] {
		return this.getList().map(elem => ({key: elem.id, label: elem.name}));
	}

}

export const ContactTypes = new ContactTypesUtility();
