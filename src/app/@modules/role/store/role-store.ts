import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, RoleOperationState } from './role-state';

@Injectable()
export class RoleStoreService {

    constructor(
        private store: Store<State>
    ) {}

    selectRoleUpdate(): Observable<RoleOperationState> {
        return this.store.select(state => state.roleModule.roleUpdate);
    }

    selectRoleCreate(): Observable<RoleOperationState> {
        return this.store.select(state => state.roleModule.roleCreate);
    }

}
