
const list = [
    {id: '1', name: 'USD', fullName: 'US Dollar', symbol: '$'},
    {id: '2', name: 'CRC', fullName: 'Costa Rica Colon', symbol: '₡'},
    {id: '3', name: 'EUR', fullName: 'Euro', symbol: '€'}
];

class CurrenciesUtility {

    constructor() { }

    getList(): {id: string, name: string, fullName: string, symbol: string}[] {
        return list;
    }

    getOptionsList(): {key: string, label: string}[] {
        return this.getList().map(elem => ({key: elem.id, label: elem.name}));
    }

    getDefaultCurrency(): {id: string, name: string, fullName: string, symbol: string} {
        return this.getList()[0];
    }

}

export const Currencies = new CurrenciesUtility();
