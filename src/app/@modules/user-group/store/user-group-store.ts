import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, UserGroupOperationState } from './user-group-state';

@Injectable()
export class UserGroupStoreService {

	constructor(
		private store: Store<State>
	) {}

	selectUserGroupUpdate(): Observable<UserGroupOperationState> {
		return this.store.select(state => state.userGroupModule.userGroupUpdate);
	}

	selectUserGroupCreate(): Observable<UserGroupOperationState> {
		return this.store.select(state => state.userGroupModule.userGroupCreate);
	}

}
