
import Utils from '../../@shared/helpers/utils/utils';
import { EntityTypes } from '../../@shared/lists/entity-types';

export interface IRelationInstance {
	_id: string;
	relationDefinitionId: string;
	entityAId: string;
	entityBId: string;
	userId: string;
	isValid: boolean;
	deleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export class RelationInstance {

	_id: string;

	relationDefinitionId: string;
	entityAId: string;
	entityBId: string;
	userId: string;
	isValid: boolean;
	deleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(private __data: IRelationInstance) {

		this._id = __data._id || '';

		this.relationDefinitionId = __data.relationDefinitionId || '';
		this.entityAId= __data.entityAId || '';
		this.entityBId = __data.entityBId || '';
		this.userId = __data.userId || '';
		this.isValid = __data.isValid || false;
		this.deleted = __data.deleted || false;
		this.createdAt = __data.createdAt || null;
		this.updatedAt = __data.updatedAt || null;

	}

	asInterface(): IRelationInstance {
		return this.__data;
	}

}
