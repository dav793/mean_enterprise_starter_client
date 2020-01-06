import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, ContactOperationState } from './contact-state';

@Injectable()
export class ContactStoreService {

	constructor(
		private store: Store<State>
	) {}

	selectContactUpdate(): Observable<ContactOperationState> {
		return this.store.select(state => state.contactModule.contactUpdate);
	}

	selectContactCreate(): Observable<ContactOperationState> {
		return this.store.select(state => state.contactModule.contactCreate);
	}

}
