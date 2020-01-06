import {Injectable} from '@angular/core';

import {ISessionData} from '../../@core/user/user-session.service';
import {UserSessionProviderService} from '../../@core/user/user-session-provider.service';
import {CoreStoreService} from '../../@core/store/core-store';

@Injectable()
export class HttpOptionsFactoryService {

	clientId: string;
	loggedUserId: string;

	constructor(
		private sessionProviderService: UserSessionProviderService,
		private coreStore: CoreStoreService
	) {

		// load client id
		this.coreStore.selectClientId().subscribe(
			cid => this.clientId = cid
		);

		// load logged user id
		this.coreStore.selectSessionUser().subscribe(
			user => this.loggedUserId = user && '_id' in user ? user._id : null
		);

	}

	/**
	 * contains:
	 *  - client-specific headers
	 */
	public getDefaultHttpOptions() {
		return {
			headers: this.createDefaultHeaders()
		};
	}

	/**
	 * adds the following headers:
	 *  - Authorization : bearer token
	 *  - App-Client-Id : (custom header) socket id of originating client
	 *
	 */
	private createDefaultHeaders() {
		const headers = {};

		if (this.loggedUserId)
			headers['App-User-Id'] = this.loggedUserId;

		if (this.clientId)
			headers['App-Client-Id'] = this.clientId;

		const sessionData: ISessionData = this.sessionProviderService.getSessionData();
		if (sessionData && sessionData.uid && sessionData.token)
			headers['Authorization'] = `Bearer ${sessionData.token}`;

		return headers;
	}

}
