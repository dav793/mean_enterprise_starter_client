import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { LocalStorageService } from '../../@shared/services/local-storage.service';
import { ISessionData } from './user-session.service';

import decodeJwt from 'jwt-decode';
import * as moment from 'moment';

/**
 *  the intention of this service is to provide session data to any other part of the app
 *
 *  it constructs a session data object from the environment and local browser storage, if present
 *
 *  why not just put this in UserSessionService, you ask?
 *  because it has to be in its own class to avoid circular dependency between UserSessionService & UserApiService
 */

@Injectable()
export class UserSessionProviderService {

    constructor(
        private localStorageService: LocalStorageService
    ) {}

    getSessionData(): ISessionData|null {
    	const uid = this.getSessionUid();
    	const token = this.getSessionToken();
    	const expired = this.tokenIsExpired(token);

        if (!uid || !token)
          return null;

        return { uid, token, expired };
    }

    private getSessionUid(): string|null {

        // look in env first
        if ('session_uid' in environment && environment.session_uid)
            return environment.session_uid;

        // then look in local storage
        const sessionData = this.localStorageService.getSessionData();
        if (sessionData)
            return sessionData.uid;

        return null;

    }

    private getSessionToken(): string|null {

        // look in env first
        if ('session_token' in environment && environment.session_token)
            return environment.session_token;

        // then look in local storage
        const sessionData = this.localStorageService.getSessionData();
        if (sessionData)
            return sessionData.token;

        return null;

    }

    private tokenIsExpired(token: string): boolean {
    	if (!token)
    		return true;

		const exp = moment(decodeJwt(token).exp*1000);
		if (exp < moment())
			return true;
		return false;
	}

}
