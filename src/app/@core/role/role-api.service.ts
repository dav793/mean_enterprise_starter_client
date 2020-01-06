import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { IRole } from '../role/role.model';
import { HttpOptionsFactoryService } from '../../@shared/services/http-options-factory.service';
import { IResourcePermissions } from '../role/role.model';

@Injectable()
export class RoleApiService {

    constructor(
        private httpOptionsFactory: HttpOptionsFactoryService,
        private http: HttpClient
    ) {}

    getRoles(): Observable<IRole[]> {

        const url = `${environment.api_url}/roles`;

        return this.http.get(url, this.getHttpOptions()) as Observable<IRole[]>;

    }

    getRole(roleId: string): Observable<IRole> {

        const url = `${environment.api_url}/roles/${roleId}`;

        return this.http.get(url, this.getHttpOptions()) as Observable<IRole>;

    }

    postRole(roleBody: IRoleCreateBody): Observable<IRole> {

      const url = `${environment.api_url}/roles`;

      return this.http.post(url, roleBody, this.getHttpOptions()) as Observable<IRole>;

    }

    putRole(roleId: string, roleBody: IRoleUpdateBody): Observable<IRole> {

      const url = `${environment.api_url}/roles/${roleId}`;

      return this.http.put(url, roleBody, this.getHttpOptions()) as Observable<IRole>;

    }

    deleteRole(roleId: string): Observable<boolean> {

      const url = `${environment.api_url}/roles/${roleId}`;

      return this.http.delete(url, this.getHttpOptions()) as Observable<boolean>;

    }

    private getHttpOptions() {
        return this.httpOptionsFactory.getDefaultHttpOptions();
    }

}

export interface IRoleUpdateBody {
    name?: string;
    resources?: IResourcePermissions[];
}

export interface IRoleCreateBody {
    name: string;
    resources: IResourcePermissions[];
}
