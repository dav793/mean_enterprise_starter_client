import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  map
} from 'rxjs/operators';

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
	 * dispatch user module's update success event
	 */
	@Effect()
	userUpdateSuccess$ = this.actions$.pipe(
		ofType(UserActions.ActionTypes.APIUpdateUserSuccess),
		map((a: UserActions.APIUpdateUserSuccess) => {

			return {
				type: UserModuleActions.ActionTypes.UserUpdateSuccess,
				payload: {
					userId: a.payload.user._id,
					meta: a.payload.meta
				}
			};

		})
	);

	/**
	 * when global api update error event occurs,
	 * dispatch user module's update error event
	 */
	@Effect()
	userUpdateError$ = this.actions$.pipe(
		ofType(UserActions.ActionTypes.APIUpdateUserError),
		map((a: UserActions.APIUpdateUserError) => {

			return {
				type: UserModuleActions.ActionTypes.UserUpdateError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api update success event occurs,
	 * dispatch user module's create success event
	 */
	@Effect()
	userCreateSuccess$ = this.actions$.pipe(
		ofType(UserActions.ActionTypes.APICreateUserSuccess),
		map((a: UserActions.APIUpdateUserSuccess) => {

			return {
				type: UserModuleActions.ActionTypes.UserCreateSuccess,
				payload: {
					userId: a.payload.user._id,
					meta: a.payload.meta
				}
			};

		})
	);

	/**
	 * when global api update error event occurs,
	 * dispatch user module's save error event
	 */
	@Effect()
	userCreateError$ = this.actions$.pipe(
		ofType(UserActions.ActionTypes.APICreateUserError),
		map((a: UserActions.APICreateUserError) => {

			return {
				type: UserModuleActions.ActionTypes.UserCreateError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api delete success event occurs,
	 * dispatch user module's delete success event
	 */
	@Effect()
	userDeleteSuccess$ = this.actions$.pipe(
		ofType(UserActions.ActionTypes.APIDeleteUserSuccess),
		map((a: UserActions.APIDeleteUserSuccess) => {

			return {
				type: UserModuleActions.ActionTypes.UserDeleteSuccess,
				payload: {
					userId: a.payload.id,
					meta: a.payload.meta
				}
			};

		})
	);

	/**
	 * when global api delete error event occurs,
	 * dispatch user module's delete error event
	 */
	@Effect()
	userDeleteError$ = this.actions$.pipe(
		ofType(UserActions.ActionTypes.APIDeleteUserError),
		map((a: UserActions.APIDeleteUserError) => {

			return {
				type: UserModuleActions.ActionTypes.UserDeleteError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api load-all success event occurs,
	 * dispatch user module's load-all success event
	 */
	@Effect()
	userLoadAllSuccess$ = this.actions$.pipe(
		ofType(UserActions.ActionTypes.APILoadAllUsersSuccess),
		map((a: UserActions.APILoadAllUsersSuccess) => {

			return {
				type: UserModuleActions.ActionTypes.UserLoadAllSuccess,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api load-all error event occurs,
	 * dispatch user module's load-all error event
	 */
	@Effect()
	userLoadAllError$ = this.actions$.pipe(
		ofType(UserActions.ActionTypes.APILoadAllUsersError),
		map((a: UserActions.APILoadAllUsersError) => {

			const meta = setActionMetadataErrorCode(a.payload.error, a.payload.meta);
			return {
				type: UserModuleActions.ActionTypes.UserLoadAllError,
				payload: { meta }
			};

		})
	);

}
