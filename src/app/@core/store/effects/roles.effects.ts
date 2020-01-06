
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {EMPTY, of} from 'rxjs';
import {
  map,
  tap,
  mergeMap,
  catchError, first
} from 'rxjs/operators';

import { ToasterService } from '../../../@shared/lib/ngx-toastr/toaster.service';

import { RoleApiService } from '../../role/role-api.service';
import { IRole } from '../../role/role.model';

import * as RolesActions from '../actions/roles.actions';

import { ofTypes } from '../../../@shared/helpers/operators/of-types';
import { storeActionMetadataSingleton as ActionMetadataFactory } from '../../../@shared/helpers/utils/store-action-metadata-factory';

import { CoreStoreService } from '../core-store';

@Injectable()
export class RolesEffects {

    constructor(
      private actions$: Actions,
      private roleApiService: RoleApiService,
      private toaster: ToasterService,
      private store: CoreStoreService
    ) {}

    /**
     * when server event update user groups occurs,
     * dispatch load all user groups event
     */
    @Effect()
    serverEventUpdateRoles = this.actions$.pipe(
        ofType(RolesActions.ActionTypes.ServerEventUpdateRoles),
        mergeMap((a: RolesActions.ServerEventUpdateRoles) => {

            let clientId = null;
            if (a.payload && a.payload.message && a.payload.message.clientId)
                clientId = a.payload.message.clientId;

            const meta = ActionMetadataFactory.create(clientId);
            meta.forceFetch = true;

            return of({
                type: RolesActions.ActionTypes.LoadAllRoles,
                payload: { meta }
            });

        })
    );

    /**
     * when store load all roles event occurs,
     * if roles not in store, fetch roles from server api and dispatch either success or error event.
     * otherwise do nothing
     */
    @Effect()
    loadAllRoles = this.actions$.pipe(
        ofType(RolesActions.ActionTypes.LoadAllRoles),
        mergeMap((a: RolesActions.LoadAllRoles) => this.store.selectAllRoles().pipe(
            first(),
            mergeMap(allRoles => {

                if (!a.payload.meta.forceFetch && Object.keys(allRoles).length > 0)
                    return of({                           // already loaded in store; do nothing
                        type: RolesActions.ActionTypes.NoOp
                    });
                else
                    return this.roleApiService.getRoles().pipe(
                        tap(() => console.log(`fetched roles from API server`)),
                        map((roles: IRole[]) => {

                            return {
                              type: RolesActions.ActionTypes.APILoadAllRolesSuccess,
                              payload: { roles, meta: a.payload.meta }
                            };

                        }),
                        catchError(e => {

                            return of({
                              type: RolesActions.ActionTypes.APILoadAllRolesError,
                              payload: { error: e, meta: a.payload.meta }
                            });

                        })
                    );

            })
        ))
    );

    /**
     * when store update role event occurs,
     * update role with server api and dispatch either success or error event
     */
    @Effect()
    updateRole = this.actions$.pipe(
        ofType(RolesActions.ActionTypes.UpdateRole),
        mergeMap((a: RolesActions.UpdateRole) => {

            const toast = this.toaster.showSaving();

            return this.roleApiService.putRole(a.payload.roleId, a.payload.role).pipe(
                tap(role => console.log(`saved role ${role._id} to API server`)),  // @todo: replace with real logging
                map(role => {

                    return {
                        type: RolesActions.ActionTypes.APIUpdateRoleSuccess,
                        payload: {
                            role,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    };

                }),
                catchError(error => {

                    return of({
                        type: RolesActions.ActionTypes.APIUpdateRoleError,
                        payload: {
                            error,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    });

                })
            );

        })
    );

    /**
     * when store create role event occurs,
     * create role with server api and dispatch either success or error event
     */
    @Effect()
    createRole = this.actions$.pipe(
        ofType(RolesActions.ActionTypes.CreateRole),
        mergeMap((a: RolesActions.CreateRole) => {

            const toast = this.toaster.showSaving();

            return this.roleApiService.postRole(a.payload.role).pipe(
                tap(role => console.log(`saved new role ${role._id} to API server`)),
                map(role => {

                    return {
                        type: RolesActions.ActionTypes.APICreateRoleSuccess,
                        payload: {
                            role,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    };

                }),
                catchError(error => {

                    return of({
                        type: RolesActions.ActionTypes.APICreateRoleError,
                        payload: {
                            error,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    });

                })
            );

        })
    );

    /**
     * when store delete role event occurs,
     * delete role with server api and dispatch either success or error event
     */
    @Effect()
    deleteRole = this.actions$.pipe(
        ofType(RolesActions.ActionTypes.DeleteRole),
        mergeMap((a: RolesActions.DeleteRole) => {

            const toast = this.toaster.showSaving();

            return this.roleApiService.deleteRole(a.payload.roleId).pipe(
                tap(() => console.log(`deleted role ${a.payload.roleId} to API server`)),
                map(() => {

                    return {
                        type: RolesActions.ActionTypes.APIDeleteRoleSuccess,
                        payload: {
                            id: a.payload.roleId,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    };

                }),
                catchError(error => {

                    return of({
                        type: RolesActions.ActionTypes.APIDeleteRoleError,
                        payload: {
                            error,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    });

                })
            );

        })
    );

    /**
     * when any modification server api success event occurs,
     * show toast message
     */
    @Effect({dispatch: false})
    saveSuccess$ = this.actions$.pipe(
        ofTypes([
            RolesActions.ActionTypes.APICreateRoleSuccess,
            RolesActions.ActionTypes.APIUpdateRoleSuccess,
            RolesActions.ActionTypes.APIDeleteRoleSuccess
        ]),
        tap((a: any) => {

            if (a.payload && a.payload.overrideToastId)
                this.toaster.clearById(a.payload.overrideToastId);

            this.toaster.showSaved();

        })
    );

    @Effect({dispatch: false})
    handleRoleDeleteError$ = this.actions$.pipe(
        ofType(RolesActions.ActionTypes.APIDeleteRoleError),
        tap((a: any) => {
            if (a.payload.error.error.startsWith('ReferencedRole')) {
                const toast = this.toaster.showError(
                    'Rol ha sido aplicado a uno o más usuarios y/o grupos de usuarios',
                    'No se pudo eliminar'
                );
            }
        })
    );

    @Effect({dispatch: false})
    logError$ = this.actions$.pipe(
        ofTypes([
            RolesActions.ActionTypes.APICreateRoleError,
            RolesActions.ActionTypes.APIUpdateRoleError,
            RolesActions.ActionTypes.APIDeleteRoleError,
            RolesActions.ActionTypes.APILoadAllRolesError
        ]),
        tap((a: any) => {
            console.error(a.payload.error);

            if (a.payload && a.payload.overrideToastId)
                this.toaster.clearById(a.payload.overrideToastId);

            const toast = this.toaster.chooseToast(a.payload.error);
        })
    );

}
