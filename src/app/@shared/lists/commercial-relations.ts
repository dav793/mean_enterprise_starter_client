
const list = [
    {id: '1', name: "Mantiene relaciones comerciales locales y en el exterior",riskLevel:4},
    {id: '2', name: "Mantiene solo relaciones comerciales locales",riskLevel:2}
];

class CommercialRelationsUtility {

    constructor() { }

    getList(): {id: string, name: string, riskLevel: number}[] {
        return list;
    }

    getOptionsList(): {key: string, label: string}[] {
        return this.getList().map(elem => ({key: elem.id, label: elem.name}));
    }

}

export const CommercialRelations = new CommercialRelationsUtility();
