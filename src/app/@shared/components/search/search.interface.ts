
export type ISearchWeightFn = (searchStr: string, propValue: any, propType: ISearchPropertyType ) => number;

export interface ISearchPropertyMetadata {
    propType: ISearchPropertyType;
    weightFn?: ISearchWeightFn;
    weightScalar?: number;
}

export type ISearchPropertyType = 'string'|'number'|'string_array'|'number_array'|'object'|'object_array';
