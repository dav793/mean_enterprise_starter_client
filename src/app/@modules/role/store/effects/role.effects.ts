import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import {
  map
} from 'rxjs/operators';

import * as RoleModuleActions from '../actions/role.actions';
import * as RoleActions from '../../../../@core/store/actions/roles.actions';

@Injectable()
export class RoleModuleEffects {

    constructor(
        private actions$: Actions
    ) { }

    /**
     * when global api update success event occurs,
     * dispatch role module's update success event
     */
    @Effect()
    roleUpdateSuccess$ = this.actions$.pipe(
        ofType(RoleActions.ActionTypes.APIUpdateRoleSuccess),
        map((a: RoleActions.APIUpdateRoleSuccess) => {

            return {
                type: RoleModuleActions.ActionTypes.RoleUpdateSuccess,
                payload: {
                    roleId: a.payload.role._id,
                    meta: a.payload.meta
                }
            };

        })
    );

    /**
     * when global api update error event occurs,
     * dispatch role module's update error event
     */
    @Effect()
    roleUpdateError$ = this.actions$.pipe(
        ofType(RoleActions.ActionTypes.APIUpdateRoleError),
        map((a: RoleActions.APIUpdateRoleError) => {

            return {
                type: RoleModuleActions.ActionTypes.RoleUpdateError,
                payload: { meta: a.payload.meta }
            };

        })
    );

    /**
     * when global api update success event occurs,
     * dispatch role module's create success event
     */
    @Effect()
    roleCreateSuccess$ = this.actions$.pipe(
        ofType(RoleActions.ActionTypes.APICreateRoleSuccess),
        map((a: RoleActions.APIUpdateRoleSuccess) => {

            return {
                type: RoleModuleActions.ActionTypes.RoleCreateSuccess,
                payload: {
                    roleId: a.payload.role._id,
                    meta: a.payload.meta
                }
            };

        })
    );

    /**
     * when global api update error event occurs,
     * dispatch role module's save error event
     */
    @Effect()
    roleCreateError$ = this.actions$.pipe(
        ofType(RoleActions.ActionTypes.APICreateRoleError),
        map((a: RoleActions.APICreateRoleError) => {

            return {
                type: RoleModuleActions.ActionTypes.RoleCreateError,
                payload: { meta: a.payload.meta }
            };

        })
    );

    /**
     * when global api delete success event occurs,
     * dispatch role module's delete success event
     */
    @Effect()
    roleDeleteSuccess$ = this.actions$.pipe(
        ofType(RoleActions.ActionTypes.APIDeleteRoleSuccess),
        map((a: RoleActions.APIDeleteRoleSuccess) => {

            return {
                type: RoleModuleActions.ActionTypes.RoleDeleteSuccess,
                payload: {
                    roleId: a.payload.id,
                    meta: a.payload.meta
                }
            };

        })
    );

    /**
     * when global api delete error event occurs,
     * dispatch role module's delete error event
     */
    @Effect()
    roleDeleteError$ = this.actions$.pipe(
        ofType(RoleActions.ActionTypes.APIDeleteRoleError),
        map((a: RoleActions.APIDeleteRoleError) => {

            return {
                type: RoleModuleActions.ActionTypes.RoleDeleteError,
                payload: { meta: a.payload.meta }
            };

        })
    );

}
