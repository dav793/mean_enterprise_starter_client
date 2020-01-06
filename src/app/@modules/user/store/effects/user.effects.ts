import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  map
} from 'rxjs/operators';

import { ofTypes } from '../../../../@shared/helpers/operators/of-types';

import * as UserModuleActions from '../actions/user.actions';
import * as UserActions from '../../../../@core/store/actions/users.actions';
import { setActionMetadataErrorCode } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

@Injectable()
export class UserModuleEffects {

    constructor(
        private actions$: Actions
    ) { }

    /**
     * when global api update success event occurs,
     * dispatch user module's save success event
     */
    @Effect()
    userSaveSuccess$ = this.actions$.pipe(
        ofTypes([
          UserActions.ActionTypes.APIUpdateUserSuccess,
          UserActions.ActionTypes.APICreateUserSuccess,
          UserActions.ActionTypes.APIDeleteUserSuccess
        ]),
        map((a: UserActions.APIUpdateUserSuccess) => {

            return {
                type: UserModuleActions.ActionTypes.UserSaveSuccess,
                payload: { meta: a.payload.meta }
            };

        })
    );

    /**
     * when global api update error event occurs,
     * dispatch user module's save error event
     */
    @Effect()
    userSaveError$ = this.actions$.pipe(
        ofTypes([
          UserActions.ActionTypes.APIUpdateUserError,
          UserActions.ActionTypes.APICreateUserError,
          UserActions.ActionTypes.APIDeleteUserError
        ]),
        map((a: UserActions.APIUpdateUserError) => {

			const meta = setActionMetadataErrorCode(a.payload.error, a.payload.meta);
			return {
				type: UserModuleActions.ActionTypes.UserSaveError,
				payload: { meta }
			};

        })
    );

	/**
	 * when global api load-all error event occurs,
	 * dispatch user module's load-all error event
	 */
	@Effect()
	userLoadAllError$ = this.actions$.pipe(
		ofTypes([
			UserActions.ActionTypes.APILoadAllUsersError
		]),
		map((a: UserActions.APILoadAllUsersError) => {

			const meta = setActionMetadataErrorCode(a.payload.error, a.payload.meta);
			return {
				type: UserModuleActions.ActionTypes.UserLoadAllError,
				payload: { meta }
			};

		})
	);

}
