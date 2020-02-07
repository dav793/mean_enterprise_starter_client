
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
		if (contactTypeId === '1')
			return true;
		return false;
	}

	isCorporateContact(contactTypeId: string): boolean {
		if (contactTypeId === '2')
			return true;
		return false;
	}

	getOptionsList(): {key: string, label: string}[] {
		return this.getList().map(elem => ({key: elem.id, label: elem.name}));
	}

}

export const ContactTypes = new ContactTypesUtility();
