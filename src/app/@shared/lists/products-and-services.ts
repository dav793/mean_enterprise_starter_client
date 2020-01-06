
const list = [
    {id: "1",name: "Cuentas Escrow",risk1:1,risk2:1,risk3:1,risk4:0,risk5:0,riskSum:3},
    {id: "2",name: "Cuentas de pagos",risk1:1,risk2:1,risk3:1,risk4:0,risk5:0,riskSum:3},
    {id: "3",name: "Fideicomisos",risk1:0,risk2:1,risk3:1,risk4:1,risk5:1,riskSum:4}
];

class ProductsAndServicesUtility {

    constructor() { }

    getList(): {
        id: string,
        name: string,
        risk1: number,
        risk2: number,
        risk3: number,
        risk4: number,
        risk5: number,
        riskSum: number
    }[] {
        return list;
    }

    getOptionsList(): {key: string, label: string}[] {
        return this.getList().map(elem => ({key: elem.id, label: elem.name}));
    }

}

export const ProductsAndServices = new ProductsAndServicesUtility();
