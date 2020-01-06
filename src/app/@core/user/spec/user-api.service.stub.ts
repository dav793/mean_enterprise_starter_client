import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IUser } from '../user.model';
import { ILoginResponse, IUserRegisterBody, IUserUpdateBody } from '../user-api.service';

@Injectable()
export class UserApiServiceStub {

  constructor(private users: IUser[]) {}

  getUsers(): Observable<IUser[]> {
      return of(this.users);
  }

  getUser(userId: string): Observable<IUser> {
      return of(this.users[0]);
  }

  postUser(userBody: IUserRegisterBody): Observable<IUser> {
      return of(this.users[0]);
  }

  putUser(userId: string, userBody: IUserUpdateBody): Observable<IUser> {
      return of(this.users[0]);
  }

  deleteUser(userId: string): Observable<boolean> {
    return of(true);
  }

  loginUser(username: string, password: string): Observable<ILoginResponse> {
      const uid = '123';
      const token = '456';

      return of({
          uid,
          token
      });
  }

}
