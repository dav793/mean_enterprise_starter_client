

const list = [
	{id:"1",label:"Passport"},
	{id:"2",label:"Costa Rican National"},
	{id:"3",label:"Costa Rican Resident"},
	{id:"4",label:"DIMEX"}
];

class IdentificationTypesUtility {

	constructor() { }

	getList(): {id: string, label: string}[] {
		return list;
	}

	getOptionsList(): {key: string, label: string}[] {
		return this.getList().map(elem => ({key: elem.id, label: elem.label}));
	}

}

export const IdentificationTypes = new IdentificationTypesUtility();
