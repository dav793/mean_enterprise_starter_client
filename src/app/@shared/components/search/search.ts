
import { ISearchPropertyMetadata } from './search.interface';
import * as stringSimilarity from 'string-similarity';

class Search {

    constructor() {}

    doWeightedSearchByString(searchStr: string, items: any[] , sorters: { [key: string]: ISearchPropertyMetadata }) {

        if (!searchStr || searchStr === '' || !items || items.length === 0 || !sorters)
            return items;

        const weightMap = items.map(item => {
            let itemWeight = 0;

            Object.keys(sorters).forEach(propName => {
                const sorter = sorters[propName];

                if (propName in item) {
                    let weightFn = sorter.weightFn;
                    if (!weightFn)
                        weightFn = this.calculateWeight;  // use default if no weight function was provided

                    let weightScalar = sorter.weightScalar;
                    if (!weightScalar && weightScalar !== 0)
                        weightScalar = 1;

                    itemWeight += weightFn(searchStr, item[propName], sorter.propType) * weightScalar;
                }
            });

            return { weight: itemWeight, item };
        });

        const sortedItems = weightMap
            .sort((a, b) => b.weight - a.weight)
            .map(i => i.item);

        return sortedItems;

    }

    // default weight function
    protected calculateWeight(search, propValue, propType): number {
        switch (propType) {

            case 'string':

                if (typeof search !== 'string' || typeof propValue !== 'string')
                    return 0;
                return stringSimilarity.compareTwoStrings(search, propValue);

            default:
                return 0;

        }
    }

}

export default new Search();
