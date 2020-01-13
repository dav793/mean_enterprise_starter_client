
const list = [
	{id: '1', label: 'Soltero(a)'},
	{id: '2', label: 'Casado(a)'},
	{id: '3', label: 'Separado(a)'},
	{id: '4', label: 'Divorciado(a)'},
	{id: '5', label: 'Viudo(a)'}
];

class MaritalStatusUtility {

	constructor() { }

	getList(): {id: string, label: string}[] {
		return list;
	}

	getOptionsList(): {key: string, label: string}[] {
		return this.getList().map(elem => ({key: elem.id, label: elem.label}));
	}

}

export const MaritalStatus = new MaritalStatusUtility();
