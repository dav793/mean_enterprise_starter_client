import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of, zip } from 'rxjs';
import { filter, first, mergeMap } from 'rxjs/operators';
import { excludeFalsy } from '../../../@shared/helpers/operators/exclude-falsy';

import { State } from './relation-state';
import { ErrorCode } from '../../../@shared/enums/errors';
import { FeatureStoreOperationState } from '../../../@core/store/feature-store-types';

@Injectable()
export class RelationStoreService {

	constructor(
		private store: Store<State>
	) {}

	// --- RELATION DEFINITION ---
	 
	selectRelationDefinitionUpdate(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.relationModule.definition.relationDefinitionUpdate);
	}

	selectRelationDefinitionCreate(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.relationModule.definition.relationDefinitionCreate);
	}

	selectRelationDefinitionDelete(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.relationModule.definition.relationDefinitionDelete);
	}

	selectRelationDefinitionLoadAll(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.relationModule.definition.relationDefinitionLoadAll);
	}
	
	// --- RELATION INSTANCE ---

	selectRelationInstanceUpdate(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.relationModule.instance.relationInstanceUpdate);
	}

	selectRelationInstanceCreate(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.relationModule.instance.relationInstanceCreate);
	}

	selectRelationInstanceDelete(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.relationModule.instance.relationInstanceDelete);
	}

	selectRelationInstanceLoadAll(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.relationModule.instance.relationInstanceLoadAll);
	}

}

export interface IRelationStoreEventInfo {
	eventId: string;
	errorCode: ErrorCode;
	errorSig?: string;
}
