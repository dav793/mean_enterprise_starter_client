
const list = [
    {id: "1",name: "Efectivo",riskLevel:3},
    {id: "2",name: "Transferencia Internacional",riskLevel:4},
    {id: "3",name: "Transferencia Mismo Banco",riskLevel:1},
    {id: "4",name: "Cheque Internacional",riskLevel:3},
    {id: "5",name: "Cheque local",riskLevel:1},
    {id: "6",name: "Cheque de gerencia",riskLevel:3},
    {id: "7",name: "Transferencia SINPE",riskLevel:1},
    {id: "8",name: "Varios; Múltiple (TF-CK-Efectivo)",riskLevel:4}
];

class MethodsOfPaymentUtility {

    constructor() { }

    getList(): {id: string, name: string, riskLevel: number}[] {
        return list;
    }

    getOptionsList(): {key: string, label: string}[] {
        return this.getList().map(elem => ({key: elem.id, label: elem.name}));
    }

}

export const MethodsOfPayment = new MethodsOfPaymentUtility();
