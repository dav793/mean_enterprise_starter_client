
const list = [
    {id: "1",name: "Savings and/or salaries",riskLevel:1},
    {id: "2",name: "Business income",riskLevel:1},
    {id: "3",name: "Third party funds",riskLevel:4},
    {id: "4",name: "Investments",riskLevel:2},
    {id: "5",name: "Awards, donations or bonuses",riskLevel:4},
    {id: "6",name: "Sale of Real Estate",riskLevel:1},
    {id: "7",name: "Line of credit",riskLevel:3},
    {id: "8",name: "Bank loan",riskLevel:1},
    {id: "9",name: "Social security and/or pension",riskLevel:1},
    {id: "10",name: "IRA",riskLevel:1},
    {id: "11",name: "Inheritance",riskLevel:2},
    {id: "12",name: "Divorce settlement",riskLevel:2},
    {id: "13",name: "Insurance compensation",riskLevel:1},
    {id: "14",name: "Trust",riskLevel:4},
    {id: "15",name: "Other loans",riskLevel:4},
    {id: "16",name: "Shareholder contributions",riskLevel:3},
    {id: "17",name: "Rentals",riskLevel:1}
];

class OriginOfFundsUtility {

    constructor() { }

    getList(): {id: string, name: string, riskLevel: number}[] {
        return list;
    }

    getOptionsList(): {key: string, label: string}[] {
        return this.getList().map(elem => ({key: elem.id, label: elem.name}));
    }

}

export const OriginOfFunds = new OriginOfFundsUtility();
