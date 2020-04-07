
import Utils from '../../@shared/helpers/utils/utils';
import { EntityTypes } from '../../@shared/lists/entity-types';

export interface IRelationDefinition {
	_id: string;
	description: string;
	entityTypeA: string;
	entityTypeB: string;
	deleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export class RelationDefinition {

	_id: string;

	description: string;
	entityTypeA: string;
	entityTypeB: string;
	deleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(private __data: IRelationDefinition) {

		this._id = __data._id || '';

		this.description = __data.description || '';
		this.entityTypeA= __data.entityTypeA || '';
		this.entityTypeB = __data.entityTypeB || '';
		this.deleted = __data.deleted || false;
		this.createdAt = __data.createdAt || null;
		this.updatedAt = __data.updatedAt || null;

	}

	asInterface(): IRelationDefinition {
		return this.__data;
	}

}
