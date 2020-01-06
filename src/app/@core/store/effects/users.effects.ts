
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {of} from 'rxjs';
import {
  map,
  tap,
  mergeMap,
  catchError, first
} from 'rxjs/operators';

import { ofTypes } from '../../../@shared/helpers/operators/of-types';

import { ToasterService } from '../../../@shared/lib/ngx-toastr/toaster.service';

import { UserApiService } from '../../user/user-api.service';
import { IUser } from '../../user/user.model';

import * as UsersActions from '../actions/users.actions';
import { storeActionMetadataSingleton as ActionMetadataFactory } from '../../../@shared/helpers/utils/store-action-metadata-factory';

import { CoreStoreService } from '../core-store';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private userApiService: UserApiService,
        private toaster: ToasterService,
        private store: CoreStoreService
    ) {}

    /**
     * when server event update users occurs,
     * dispatch load all users event
     */
    @Effect()
    serverEventUpdateUsers = this.actions$.pipe(
        ofType(UsersActions.ActionTypes.ServerEventUpdateUsers),
        mergeMap((a: UsersActions.ServerEventUpdateUsers) => {

            let clientId = null;
            if (a.payload && a.payload.message && a.payload.message.clientId)
                clientId = a.payload.message.clientId;

            const meta = ActionMetadataFactory.create(clientId);
            meta.forceFetch = true;

            return of({
                type: UsersActions.ActionTypes.LoadAllUsers,
                payload: { meta }
            });

        })
    );

    /**
     * when store load all users event occurs,
     * if users not in store, fetch users from server api and dispatch either success or error event.
     * otherwise do nothing
     */
    @Effect()
    loadAllUsers = this.actions$.pipe(
        ofType(UsersActions.ActionTypes.LoadAllUsers),
        mergeMap((a: UsersActions.LoadAllUsers) => this.store.selectAllUsers().pipe(
              first(),
              mergeMap(allUsers => {

                  if (!a.payload.meta.forceFetch && Object.keys(allUsers).length > 0)
                      return of({                               // already loaded in store; do nothing
                          type: UsersActions.ActionTypes.NoOp
                      });
                  else
                      return this.userApiService.getUsers().pipe(
                          tap(() => console.log(`fetched users from API server`)),
                          map((users: IUser[]) => {

                              return {
                                  type: UsersActions.ActionTypes.APILoadAllUsersSuccess,
                                  payload: { users, meta: a.payload.meta }
                              };

                          }),
                          catchError(e => {

                              return of({
                                  type: UsersActions.ActionTypes.APILoadAllUsersError,
                                  payload: { error: e, meta: a.payload.meta }
                              });

                          })
                      );

              })
        ))
    );

    /**
     * when store update user event occurs,
     * update user with server api and dispatch either success or error event
     */
    @Effect()
    updateUser = this.actions$.pipe(
        ofType(UsersActions.ActionTypes.UpdateUser),
        mergeMap((a: UsersActions.UpdateUser) => {

            const toast = this.toaster.showSaving();

            return this.userApiService.putUser(a.payload.userId, a.payload.user).pipe(
                tap(user => console.log(`saved user ${user._id} to API server`)),
                map(user => {

                    return {
                        type: UsersActions.ActionTypes.APIUpdateUserSuccess,
                        payload: {
                            user,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    };

                }),
                catchError(error => {

                    return of({
                        type: UsersActions.ActionTypes.APIUpdateUserError,
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
     * when store create user event occurs,
     * create user with server api and dispatch either success or error event
     */
    @Effect()
    createUser = this.actions$.pipe(
        ofTypes([
        	UsersActions.ActionTypes.CreateUser,
			UsersActions.ActionTypes.RegisterUser
		]),
        mergeMap((a: UsersActions.CreateUser | UsersActions.RegisterUser) => {

            const toast = this.toaster.showSaving();

            let operation = this.userApiService.postUser(a.payload.user);
            if (a.type === UsersActions.ActionTypes.RegisterUser)
            	operation = this.userApiService.registerUser(a.payload.user);

            return operation.pipe(
                tap(user => console.log(`saved new user ${user._id} to API server`)),
                map(user => {

                    return {
                        type: UsersActions.ActionTypes.APICreateUserSuccess,
                        payload: {
                            user,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    };

                }),
                catchError(error => {

                    return of({
                        type: UsersActions.ActionTypes.APICreateUserError,
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
     * when store delete user event occurs,
     * delete user with server api and dispatch either success or error event
     */
    @Effect()
    deleteUser = this.actions$.pipe(
        ofType(UsersActions.ActionTypes.DeleteUser),
        mergeMap((a: UsersActions.DeleteUser) => {

            const toast = this.toaster.showSaving();

            return this.userApiService.deleteUser(a.payload.userId).pipe(
                tap(() => console.log(`deleted user ${a.payload.userId} to API server`)),
                map(() => {

                    return {
                        type: UsersActions.ActionTypes.APIDeleteUserSuccess,
                        payload: {
                            id: a.payload.userId,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    };

                }),
                catchError(error => {

                    return of({
                        type: UsersActions.ActionTypes.APIDeleteUserError,
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
            UsersActions.ActionTypes.APICreateUserSuccess,
            UsersActions.ActionTypes.APIUpdateUserSuccess,
            UsersActions.ActionTypes.APIDeleteUserSuccess
        ]),
        tap((a: any) => {

            if (a.payload && a.payload.overrideToastId)
                this.toaster.clearById(a.payload.overrideToastId);

            this.toaster.showSaved();

        })
    );

    /**
     * when any server api error event occurs,
     * log error and show toast message
     */
    @Effect({dispatch: false})
    logError$ = this.actions$.pipe(
        ofTypes([
            UsersActions.ActionTypes.APICreateUserError,
            UsersActions.ActionTypes.APIUpdateUserError,
            UsersActions.ActionTypes.APIDeleteUserError,
            UsersActions.ActionTypes.APILoadAllUsersError
        ]),
        tap((a: any) => {

            console.error(a.payload.error);

            // @todo: log error

            if (a.payload && a.payload.overrideToastId)
                this.toaster.clearById(a.payload.overrideToastId);

            this.toaster.chooseToast(a.payload.error);

        })
    );

}
