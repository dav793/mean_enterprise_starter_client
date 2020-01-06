
const list = [
    {id: "1",name: "Purchase of Real Estate and closing cost payments",riskLevel:null},
    {id: "2",name: "Purchase of vehicles",riskLevel:null},
    {id: "3",name: "Construction payments",riskLevel:null},
    {id: "4",name: "Investments",riskLevel:null},
    {id: "5",name: "Utility bills",riskLevel:null},
    {id: "6",name: "Taxes",riskLevel:null},
    {id: "7",name: "Trust",riskLevel:null}
];

class PurposeOfTransactionsUtility {

    constructor() { }

    getList(): {id: string, name: string, riskLevel: number}[] {
        return list;
    }

    getOptionsList(): {key: string, label: string}[] {
        return this.getList().map(elem => ({key: elem.id, label: elem.name}));
    }

}

export const PurposeOfTransactions = new PurposeOfTransactionsUtility();
