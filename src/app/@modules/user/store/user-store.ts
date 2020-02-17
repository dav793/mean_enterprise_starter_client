import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of, zip } from 'rxjs';
import { filter, first, mergeMap } from 'rxjs/operators';
import { excludeFalsy } from '../../../@shared/helpers/operators/exclude-falsy';

import { State } from './user-state';
import { ErrorCode } from '../../../@shared/enums/errors';
import { FeatureStoreOperationState } from '../../../@core/store/feature-store-types';

@Injectable()
export class UserStoreService {

    constructor(
        private store: Store<State>
    ) {}

	selectUserUpdate(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.userModule.userUpdate);
	}

	selectUserCreate(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.userModule.userCreate);
	}

	selectUserDelete(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.userModule.userDelete);
	}

	selectUserLoadAll(): Observable<FeatureStoreOperationState> {
		return this.store.select(state => state.userModule.userLoadAll);
	}

}

export interface IUserStoreEventInfo {
	eventId: string;
	errorCode: ErrorCode;
	errorSig?: string;
}
