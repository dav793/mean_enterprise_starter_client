import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import {
	map
} from 'rxjs/operators';

import * as UserGroupModuleActions from '../actions/user-group.actions';
import * as UserGroupActions from '../../../../@core/store/actions/user-groups.actions';

@Injectable()
export class UserGroupModuleEffects {

	constructor(
		private actions$: Actions
	) { }

	/**
	 * when global api update success event occurs,
	 * dispatch group module's update success event
	 */
	@Effect()
	userGroupUpdateSuccess$ = this.actions$.pipe(
		ofType(UserGroupActions.ActionTypes.APIUpdateUserGroupSuccess),
		map((a: UserGroupActions.APIUpdateUserGroupSuccess) => {

			return {
				type: UserGroupModuleActions.ActionTypes.UserGroupUpdateSuccess,
				payload: {
					userGroupId: a.payload.userGroup._id,
					meta: a.payload.meta
				}
			};

		})
	);

	/**
	 * when global api update error event occurs,
	 * dispatch group module's update error event
	 */
	@Effect()
	userGroupUpdateError$ = this.actions$.pipe(
		ofType(UserGroupActions.ActionTypes.APIUpdateUserGroupError),
		map((a: UserGroupActions.APIUpdateUserGroupError) => {

			return {
				type: UserGroupModuleActions.ActionTypes.UserGroupUpdateError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api update success event occurs,
	 * dispatch group module's create success event
	 */
	@Effect()
	userGroupCreateSuccess$ = this.actions$.pipe(
		ofType(UserGroupActions.ActionTypes.APICreateUserGroupSuccess),
		map((a: UserGroupActions.APIUpdateUserGroupSuccess) => {

			return {
				type: UserGroupModuleActions.ActionTypes.UserGroupCreateSuccess,
				payload: {
					userGroupId: a.payload.userGroup._id,
					meta: a.payload.meta
				}
			};

		})
	);

	/**
	 * when global api update error event occurs,
	 * dispatch group module's save error event
	 */
	@Effect()
	userGroupCreateError$ = this.actions$.pipe(
		ofType(UserGroupActions.ActionTypes.APICreateUserGroupError),
		map((a: UserGroupActions.APICreateUserGroupError) => {

			return {
				type: UserGroupModuleActions.ActionTypes.UserGroupCreateError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	/**
	 * when global api delete success event occurs,
	 * dispatch group module's delete success event
	 */
	@Effect()
	userGroupDeleteSuccess$ = this.actions$.pipe(
		ofType(UserGroupActions.ActionTypes.APIDeleteUserGroupSuccess),
		map((a: UserGroupActions.APIDeleteUserGroupSuccess) => {

			return {
				type: UserGroupModuleActions.ActionTypes.UserGroupDeleteSuccess,
				payload: {
					userGroupId: a.payload.id,
					meta: a.payload.meta
				}
			};

		})
	);

	/**
	 * when global api delete error event occurs,
	 * dispatch group module's delete error event
	 */
	@Effect()
	userGroupDeleteError$ = this.actions$.pipe(
		ofType(UserGroupActions.ActionTypes.APIDeleteUserGroupError),
		map((a: UserGroupActions.APIDeleteUserGroupError) => {

			return {
				type: UserGroupModuleActions.ActionTypes.UserGroupDeleteError,
				payload: { meta: a.payload.meta }
			};

		})
	);

}
