import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { IUser } from './user.model';
import { HttpOptionsFactoryService } from '../../@shared/services/http-options-factory.service';

@Injectable()
export class UserApiService {

    constructor(
        private httpOptionsFactory: HttpOptionsFactoryService,
        private http: HttpClient
    ) {}

    getUsers(): Observable<IUser[]> {

        const url = `${environment.api_url}/users`;

        return this.http.get(url, this.getHttpOptions()) as Observable<IUser[]>;

    }

    getUser(userId: string): Observable<IUser> {

        const url = `${environment.api_url}/users/${userId}`;

        return this.http.get(url, this.getHttpOptions()) as Observable<IUser>;

    }

    postUser(userBody: IUserRegisterBody): Observable<IUser> {

        const url = `${environment.api_url}/users`;

        return this.http.post(url, userBody, this.getHttpOptions()) as Observable<IUser>;

    }

    putUser(userId: string, userBody: IUserUpdateBody): Observable<IUser> {

        const url = `${environment.api_url}/users/${userId}`;

        return this.http.put(url, userBody, this.getHttpOptions()) as Observable<IUser>;

    }

    deleteUser(userId: string): Observable<boolean> {

      const url = `${environment.api_url}/users/${userId}`;

      return this.http.delete(url, this.getHttpOptions()) as Observable<boolean>;

    }

	registerUser(userBody: IUserRegisterBody): Observable<IUser> {

		const url = `${environment.api_url}/public/users/register`;

		return this.http.post(url, userBody, this.getHttpOptions()) as Observable<IUser>;

	}

    /**
     * get a session token from API server
     *
     * IMPORTANT: do NOT call this method yourself. If you want to log in, use the method in UserSessionService.
     *
     * @param username
     * @param password
     */
    loginUser(username: string, password: string): Observable<ILoginResponse> {

        const url = `${environment.api_url}/public/users/login`;
        const body = { username, password };

        return this.http.post(url, body) as Observable<ILoginResponse>;

    }

	/**
	 * try to re-log in user as a response to a REQUEST_AUTHENTICATION message received from the server
	 *
	 * @param username
	 * @param password
	 */
	replyLoginUser(username: string, password: string): Observable<any> {

		const url = `${environment.api_url}/public/users/replyLogin`;
		const body = { username, password };

		return this.http.post(url, body, this.getHttpOptions()) as Observable<any>;

	}

    private getHttpOptions() {
        return this.httpOptionsFactory.getDefaultHttpOptions();
    }

}

export interface ILoginResponse {
    uid: string;
    token: string;
}

export interface IUserUpdateBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    roleIds?: string[];
    updatePassword?: boolean;
}

export interface IUserRegisterBody {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    roleIds?: string[];
    password: string;
}
