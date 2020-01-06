
export interface ISortPropertyMetadata {
    property: string;
    direction: 'asc'|'desc';
    type: 'string';
}

class SortUtils {

    constructor() {}

    sortByParams(params: ISortPropertyMetadata, items: any[]): any[] {
        if (!params || !params.type)
            return items;

        switch (params.type) {
            case 'string':
                return this.sortByString(params.property, params.direction, items);
            default:
                return items;
        }
    }

    sortByString(property: string, direction: 'asc'|'desc', items: any[]): any[] {
        return items.sort((a, b) => {
            if (direction === 'desc') {
                if (a[property] < b[property]) return -1;
                else if (a[property] > b[property]) return 1;
                else return 0;
            }
            else if (direction === 'asc') {
                if (a[property] < b[property]) return 1;
                else if (a[property] > b[property]) return -1;
                else return 0;
            }
            else
                return 0;
        });
    }

}

export default new SortUtils();
