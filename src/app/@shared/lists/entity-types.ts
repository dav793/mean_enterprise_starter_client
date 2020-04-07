
const list = [
	{id: '1', name: 'Contacto'}
];

class EntityTypesUtility {

	constructor() { }

	getList(): {id: string, name: string}[] {
		return list;
	}

	getOptionsList(): {key: string, label: string}[] {
		return this.getList().map(elem => ({key: elem.id, label: elem.name}));
	}

}

export const EntityTypes = new EntityTypesUtility();
