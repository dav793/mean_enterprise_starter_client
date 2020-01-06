
const list = [
    {id: "1", name: "$0 - $10,000", maxUsd: 10000, riskLevel:1},
    {id: "2", name: "$10,001 - $20,000", maxUsd: 20000, riskLevel:1},
    {id: "3", name: "$20,001 - $35,000", maxUsd: 35000, riskLevel:1},
    {id: "4", name: "$35,001 - $50,000", maxUsd: 50000, riskLevel:2},
    {id: "5", name: "$50,001 - $100,000", maxUsd: 100000, riskLevel:2},
    {id: "6", name: "$100,001 - $200,000", maxUsd: 200000, riskLevel:2},
    {id: "7", name: "$200,001 - $300,000", maxUsd: 300000, riskLevel:3},
    {id: "8", name: "$300,001 - $450,000", maxUsd: 450000, riskLevel:3},
    {id: "9", name: "$450,001 - $600,000", maxUsd: 600000, riskLevel:3},
    {id: "10", name: "$600,001 - $800,000", maxUsd: 800000, riskLevel:4},
    {id: "11", name: "$800,001 - $1,000,000", maxUsd: 1000000, riskLevel:4},
    {id: "12", name: "$1,000,001 - $9,999,999", maxUsd: 9999999, riskLevel:4}
];

class ActivityExpectationsUtility {

    constructor() { }

    getList(): {id: string, name: string, maxUsd: number, riskLevel: number}[] {
        return list;
    }

    getOptionsList(): {key: string, label: string}[] {
        return this.getList().map(elem => ({key: elem.id, label: elem.name}));
    }

}

export const ActivityExpectations = new ActivityExpectationsUtility();
