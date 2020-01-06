import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of, zip } from 'rxjs';
import { filter, first, mergeMap } from "rxjs/operators";
import { excludeFalsy } from '../../../@shared/helpers/operators/exclude-falsy';

import { State } from './user-state';
import { ErrorCode } from '../../../@shared/enums/errors';
@Injectable()
export class UserStoreService {

    constructor(
        private store: Store<State>
    ) {}

    selectUserSaveSuccessEventId(): Observable<string> {
        return this.store.select(state => state.userModule.userSaveSuccessEventId);
    }

	selectUserSaveError(errorSig: string = null): Observable<IUserStoreEventInfo> {
		return zip(

			this.store.select(state => state.userModule.userSaveErrorEventId)
				.pipe(first()),

			this.store.select(state => state.userModule.userSaveErrorCode)
				.pipe(first())

		).pipe(
			mergeMap(([eventId, errorCode]) => of({
				eventId,
				errorCode: errorCode as ErrorCode,
				errorSig: errorSig
			}))
		);
	}

	// @todo: sub this for selectUserSaveError and delete this
    selectUserSaveErrorEventId(): Observable<string> {
        return this.store.select(state => state.userModule.userSaveErrorEventId);
    }

	selectUserLoadAllError(errorSig: string = null): Observable<IUserStoreEventInfo> {
    	return zip(

			this.store.select(state => state.userModule.userLoadAllErrorEventId)
				.pipe(excludeFalsy, first()),

			this.store.select(state => state.userModule.userLoadAllErrorCode)
				.pipe(excludeFalsy, first())

		).pipe(
			mergeMap(([eventId, errorCode]) => of({
				eventId,
				errorCode: errorCode as ErrorCode,
				errorSig: errorSig
			}))
		);
	}

}

export interface IUserStoreEventInfo {
	eventId: string,
	errorCode: ErrorCode,
	errorSig?: string;
}
