import { Injectable } from '@angular/core';

import { ILoginResponse } from '../../@core/user/user-api.service';
import { ISessionData } from '../../@core/user/user-session.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class LocalStorageService {

    constructor() {}

    setSessionData(loginResponse: ILoginResponse): void {

        const sessionData: ISessionData = {
            uid: loginResponse.uid,
            token: loginResponse.token
        };

        localStorage.setItem(`${environment.app_id}-session`, JSON.stringify(sessionData));

    }

    getSessionData(): ISessionData|null {

        const sessionData = localStorage.getItem(`${environment.app_id}-session`);
        if (sessionData)
            return JSON.parse(sessionData) as ISessionData;
        return null;

    }

    clearSessionData(): void {
        localStorage.removeItem(`${environment.app_id}-session`);
    }

}
