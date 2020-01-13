
const list = [
	{id: '1', name: 'Persona física', riskLevel: 1},
	{id: '2', name: 'Persona jurídica', riskLevel: 2},
	{id: '3', name: 'Persona física sin actividad lucrativa', riskLevel: 3},
	{id: '4', name: 'Persona jurídica de estructura compleja', riskLevel: 4}
];

class ContactTypesUtility {

	constructor() { }

	getList(): {id: string, name: string, riskLevel: number}[] {
		return list;
	}

	getPhysicalContactList(): {id: string, name: string, riskLevel: number}[] {
		return list.filter(elem => elem.id === '1' || elem.id === '3');
	}

	getCorporateContactList(): {id: string, name: string, riskLevel: number}[] {
		return list.filter(elem => elem.id === '2' || elem.id === '4');
	}

	isPhysicalContact(contactType: string): boolean {
		const ids = this.getPhysicalContactList().map(elem => elem.id);
		for (const id of ids) {
			if (contactType === id)
				return true;
		}
		return false;
	}

	isCorporateContact(contactType: string): boolean {
		const ids = this.getCorporateContactList().map(elem => elem.id);
		for (const id of ids) {
			if (contactType === id)
				return true;
		}
		return false;
	}

	getOptionsList(): {key: string, label: string}[] {
		return this.getList().map(elem => ({key: elem.id, label: elem.name}));
	}

}

export const ContactTypes = new ContactTypesUtility();
