
const list = [
	{id:"1",label:"Masculino"},
	{id:"2",label:"Femenino"},
	{id:"3",label:"No especifica"}
];

class GendersUtility {

	constructor() { }

	getList(): {id: string, label: string}[] {
		return list;
	}

	getOptionsList(): {key: string, label: string}[] {
		return this.getList().map(elem => ({key: elem.id, label: elem.label}));
	}

}

export const Genders = new GendersUtility();
