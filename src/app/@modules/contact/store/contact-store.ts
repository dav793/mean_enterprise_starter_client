import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of, zip } from 'rxjs';
import { filter, first, mergeMap } from 'rxjs/operators';
import { excludeFalsy } from '../../../@shared/helpers/operators/exclude-falsy';

import { State } from './contact-state';
import { ErrorCode } from '../../../@shared/enums/errors';
import { FeatureStoreOperationState } from '../../../@core/store/feature-store-types';

@Injectable()
export class ContactStoreService {

	constructor(
		private store: Store<State>
	) {}

	selectContactUpdate(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.contactModule.contactUpdate);
	}

	selectContactCreate(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.contactModule.contactCreate);
	}

	selectContactDelete(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.contactModule.contactDelete);
	}

	selectContactLoadAll(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.contactModule.contactLoadAll);
	}

}

export interface IContactStoreEventInfo {
	eventId: string;
	errorCode: ErrorCode;
	errorSig?: string;
}
