import { IRelationDefinition } from '../../../../@core/relation/relation-definition.model';

export interface IRelationForView extends IRelationDefinition{
    _label_description: string;
    _label_entityTypeA: string;
    _label_entityTypeB: string;
}
