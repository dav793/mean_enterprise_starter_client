
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {of} from 'rxjs';
import {
  map,
  tap,
  mergeMap,
  catchError, first
} from 'rxjs/operators';

import { ToasterService } from '../../../@shared/lib/ngx-toastr/toaster.service';

import { UserGroupApiService } from '../../user-group/user-group-api.service';
import { IUserGroup } from '../../user-group/user-group.model';

import * as UserGroupsActions from '../actions/user-groups.actions';

import { ofTypes } from '../../../@shared/helpers/operators/of-types';
import { storeActionMetadataSingleton as ActionMetadataFactory } from '../../../@shared/helpers/utils/store-action-metadata-factory';

import { CoreStoreService } from '../core-store';

@Injectable()
export class UserGroupsEffects {

    constructor(
        private actions$: Actions,
        private userGroupApiService: UserGroupApiService,
        private toaster: ToasterService,
        private store: CoreStoreService
    ) {}

    /**
     * when server event update user groups occurs,
     * dispatch load all user groups event
     */
    @Effect()
    serverEventUpdateUserGroups = this.actions$.pipe(
        ofType(UserGroupsActions.ActionTypes.ServerEventUpdateUserGroups),
        mergeMap((a: UserGroupsActions.ServerEventUpdateUserGroups) => {

            let clientId = null;
            if (a.payload && a.payload.message && a.payload.message.clientId)
                clientId = a.payload.message.clientId;

            const meta = ActionMetadataFactory.create(clientId);
            meta.forceFetch = true;

            return of({
                type: UserGroupsActions.ActionTypes.LoadAllUserGroups,
                payload: { meta }
            });

        })
    );

    /**
     * when store load all user groups event occurs,
     * if user groups not in store, fetch user groups from server api and dispatch either success or error event.
     * otherwise do nothing
     */
    @Effect()
    loadAllUserGroups = this.actions$.pipe(
        ofType(UserGroupsActions.ActionTypes.LoadAllUserGroups),
        mergeMap((a: UserGroupsActions.LoadAllUserGroups) => this.store.selectAllUserGroups().pipe(
            first(),
            mergeMap(allUserGroups => {

                if (!a.payload.meta.forceFetch && Object.keys(allUserGroups).length > 0)
                    return of({                                 // already loaded in store; do nothing
                        type: UserGroupsActions.ActionTypes.NoOp
                    });
                else
                    return this.userGroupApiService.getUserGroups().pipe(
                        tap(() => console.log(`fetched user groups from API server`)),
                        map((userGroups: IUserGroup[]) => {

                            return {
                              type: UserGroupsActions.ActionTypes.APILoadAllUserGroupsSuccess,
                              payload: { userGroups, meta: a.payload.meta }
                            };

                        }),
                        catchError(e => {

                            return of({
                              type: UserGroupsActions.ActionTypes.APILoadAllUserGroupsError,
                              payload: { error: e, meta: a.payload.meta }
                            });

                        })
                    );

            })
        ))
    );

    /**
     * when store update user group event occurs,
     * update user group with server api and dispatch either success or error event
     */
    @Effect()
    updateUserGroup = this.actions$.pipe(
        ofType(UserGroupsActions.ActionTypes.UpdateUserGroup),
        mergeMap((a: UserGroupsActions.UpdateUserGroup) => {

            const toast = this.toaster.showSaving();

            return this.userGroupApiService.putUserGroup(a.payload.userGroupId, a.payload.userGroup).pipe(
                tap(userGroup => console.log(`saved user group ${userGroup._id} to API server`)),
                map(userGroup => {

                  return {
                      type: UserGroupsActions.ActionTypes.APIUpdateUserGroupSuccess,
                      payload: {
                          userGroup,
                          overrideToastId: toast.toastId,
                          meta: a.payload.meta
                      }
                  };

                }),
                catchError(error => {

                    return of({
                        type: UserGroupsActions.ActionTypes.APIUpdateUserGroupError,
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
     * when store create user group event occurs,
     * create user group with server api and dispatch either success or error event
     */
    @Effect()
    createUserGroup = this.actions$.pipe(
        ofType(UserGroupsActions.ActionTypes.CreateUserGroup),
        mergeMap((a: UserGroupsActions.CreateUserGroup) => {

            const toast = this.toaster.showSaving();

            return this.userGroupApiService.postUserGroup(a.payload.userGroup).pipe(
                tap(userGroup => console.log(`saved new user group ${userGroup._id} to API server`)),
                map(userGroup => {

                    return {
                        type: UserGroupsActions.ActionTypes.APICreateUserGroupSuccess,
                        payload: {
                            userGroup,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    };

                }),
                catchError(error => {

                    return of({
                        type: UserGroupsActions.ActionTypes.APICreateUserGroupError,
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
     * when store delete user group event occurs,
     * delete user group with server api and dispatch either success or error event
     */
    @Effect()
    deleteUserGroup = this.actions$.pipe(
        ofType(UserGroupsActions.ActionTypes.DeleteUserGroup),
        mergeMap((a: UserGroupsActions.DeleteUserGroup) => {

            const toast = this.toaster.showSaving();

            return this.userGroupApiService.deleteUserGroup(a.payload.userGroupId).pipe(
                tap(() => console.log(`deleted user group ${a.payload.userGroupId} to API server`)),
                map(() => {

                    return {
                        type: UserGroupsActions.ActionTypes.APIDeleteUserGroupSuccess,
                        payload: {
                            id: a.payload.userGroupId,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    };

                }),
                catchError(error => {

                    return of({
                        type: UserGroupsActions.ActionTypes.APIDeleteUserGroupError,
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

	@Effect({dispatch: false})
	handleUserGroupDeleteError$ = this.actions$.pipe(
		ofType(UserGroupsActions.ActionTypes.APIDeleteUserGroupError),
		tap((a: any) => {
			if (a.payload.error.error.startsWith('ReferencedRole')) {
				const toast = this.toaster.showError(
					'Grupo ha sido aplicado a uno o más usuarios',
					'No se pudo eliminar'
				);
			}
		})
	);

    /**
     * when any modification server api success event occurs,
     * show toast message
     */
    @Effect({dispatch: false})
    saveSuccess$ = this.actions$.pipe(
        ofTypes([
            UserGroupsActions.ActionTypes.APICreateUserGroupSuccess,
            UserGroupsActions.ActionTypes.APIUpdateUserGroupSuccess,
            UserGroupsActions.ActionTypes.APIDeleteUserGroupSuccess
        ]),
        tap((a: any) => {

            if (a.payload && a.payload.overrideToastId)
                this.toaster.clearById(a.payload.overrideToastId);

            this.toaster.showSaved();

        })
    );

    @Effect({dispatch: false})
    logError$ = this.actions$.pipe(
        ofTypes([
            UserGroupsActions.ActionTypes.APICreateUserGroupError,
            UserGroupsActions.ActionTypes.APIUpdateUserGroupError,
            UserGroupsActions.ActionTypes.APIDeleteUserGroupError,
            UserGroupsActions.ActionTypes.APILoadUserGroupError,
            UserGroupsActions.ActionTypes.APILoadAllUserGroupsError
        ]),
        tap((a: any) => {
            console.error(a.payload.error);
            const toast = this.toaster.chooseToast(a.payload.error);
        })
    );

}
