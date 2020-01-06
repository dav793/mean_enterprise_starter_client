import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

import { IRole } from '../../role/role.model';
import { IRoleCreateBody, IRoleUpdateBody } from '../role-api.service';

@Injectable()
export class RoleApiServiceStub {

  constructor(
    private roles: IRole[]
  ) {}

  getRoles(): Observable<IRole[]> {
    return of(this.roles);
  }

  getRole(roleId: string): Observable<IRole> {
    return of(this.roles[0]);
  }

  postRole(roleBody: IRoleCreateBody): Observable<IRole> {
    return of(this.roles[0]);
  }

  putRole(roleId: string, roleBody: IRoleUpdateBody): Observable<IRole> {
    return of(this.roles[0]);
  }

  deleteRole(roleId: string): Observable<boolean> {
    return of(true);
  }

}
