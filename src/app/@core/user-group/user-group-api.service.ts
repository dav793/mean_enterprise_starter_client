import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { IUserGroup } from './user-group.model';
import { HttpOptionsFactoryService } from '../../@shared/services/http-options-factory.service';

@Injectable()
export class UserGroupApiService {

    constructor(
        private httpOptionsFactory: HttpOptionsFactoryService,
        private http: HttpClient
    ) {}

    getUserGroups(): Observable<IUserGroup[]> {

        const url = `${environment.api_url}/userGroups`;

        return this.http.get(url, this.getHttpOptions()) as Observable<IUserGroup[]>;

    }

    getUserGroup(userGroupId: string): Observable<IUserGroup> {

        const url = `${environment.api_url}/userGroups/${userGroupId}`;

        return this.http.get(url, this.getHttpOptions()) as Observable<IUserGroup>;

    }

    postUserGroup(userGroupBody: IUserGroupCreateBody): Observable<IUserGroup> {

      const url = `${environment.api_url}/userGroups`;

      return this.http.post(url, userGroupBody, this.getHttpOptions()) as Observable<IUserGroup>;

    }

    putUserGroup(userGroupId: string, userGroupBody: IUserGroupUpdateBody): Observable<IUserGroup> {

      const url = `${environment.api_url}/userGroups/${userGroupId}`;

      return this.http.put(url, userGroupBody, this.getHttpOptions()) as Observable<IUserGroup>;

    }

    deleteUserGroup(userGroupId: string): Observable<boolean> {

      const url = `${environment.api_url}/userGroups/${userGroupId}`;

      return this.http.delete(url, this.getHttpOptions()) as Observable<boolean>;

    }

    private getHttpOptions() {
        return this.httpOptionsFactory.getDefaultHttpOptions();
    }

}

export interface IUserGroupUpdateBody {
    label?: string;
    userIds?: string[];
    roleIds?: string[];
}

export interface IUserGroupCreateBody {
    label: string;
    userIds: string[];
    roleIds: string[];
}
