import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { concatMap, filter, first, map, switchMap } from 'rxjs/operators';
import { excludeFalsy } from '../../@shared/helpers/operators/exclude-falsy';

import { IUser } from './user.model';
import { UserApiService, ILoginResponse } from './user-api.service';
import { UserSessionProviderService } from './user-session-provider.service';

import { CoreStoreService } from '../store/core-store';
import { LocalStorageService } from '../../@shared/services/local-storage.service';
import { LoggerService } from '../../@shared/services/logger.service';
import { DialogService } from '../../@shared/services/dialog.service';
import { ServerEventStreamService } from '../../@shared/services/server-event-stream.service';
import { ISocketMessage, SocketMessageType } from '../../@shared/lib/socket-io/socket-types';

import Utils from '../../@shared/helpers/utils/utils';

/**
 *  sole service that is publicly used for user logging in/out
 *  also tries to recreate user session as soon as its first provided somewhere else
 */

@Injectable()
export class UserSessionService {

	constructor(
		private userApiService: UserApiService,
		private userSessionProviderService: UserSessionProviderService,
		private localStorageService: LocalStorageService,
		private logger: LoggerService,
		private coreStore: CoreStoreService,
		private serverEventService: ServerEventStreamService,
		private dialogService: DialogService
	) {
		this.tryLoadSession()
			.subscribe(success => logger.logMessage(`recovered session: ${success}`));

		this.serverEventService.stream$.pipe(
			filter(msg => msg.type === SocketMessageType.REQUEST_AUTHENTICATION)
		).subscribe(
			(message: ISocketMessage) => this.handleRequestAuthenticationAction()
		);
	}

	login(username: string, password: string): Observable<boolean> {
		return this.userApiService.loginUser(username, password).pipe(
			switchMap((res: ILoginResponse) => {
				this.localStorageService.setSessionData(res);
				return this.tryLoadSession();
			})
		);
	}

	logout(): Observable<boolean> {
		this.localStorageService.clearSessionData();
		this.coreStore.unsetSession();
		return of(true);
	}

	/**
	 * a replyLogin is a request that the client makes, which is identical to the normal login request (except for the route),
	 * but is made as a response to a server message of type REQUEST_AUTHENTICATION.
	 */
	replyLogin(username: string, password: string): Observable<boolean> {
		return this.userApiService.replyLoginUser(username, password).pipe(
			map(res => Utils.isEmptyObj(res) ? true : false)			// response is expected to be an empty object ({})
		);
	}

	/**
	 * try to recover user session saved in local storage
	 *
	 * @return an observable which emits true if session was recovered, false otherwise
	 */
	private tryLoadSession(): Observable<boolean> {

		const session: ISessionData = this.userSessionProviderService.getSessionData();
		return of(session).pipe(

			switchMap(ses => {

				if (!ses)
					return of(false);

				return this.userApiService.getUser(ses.uid).pipe(
					switchMap((user: IUser) => {
						this.coreStore.setSession(user);
						return of(true);
					})
				);

			})

		);

	}

	private handleRequestAuthenticationAction() {

		this.dialogService.openLoginDialog({
			title: 'Please confirm this action'
		}).pipe(
			first(),
			concatMap((dialogResponse: {password: string}) => {

				const session: ISessionData = this.userSessionProviderService.getSessionData();
				if (!session || !session.uid)
					return EMPTY;

				return this.coreStore.selectUser(session.uid).pipe(
					switchMap((user: IUser) => {
						// get user from API service if store doesn't have it
						const user$ = user ? of(user) : this.userApiService.getUser(session.uid);
						return user$ as Observable<IUser>;
					}),
					switchMap((user: IUser) => this.replyLogin(user.username, dialogResponse.password))
				);

			})
		).subscribe(
			() => {},
			err => console.error(err)
		);

	}

}

export interface ISessionData {
	uid: string;
	token: string;
	expired?: boolean;
}
