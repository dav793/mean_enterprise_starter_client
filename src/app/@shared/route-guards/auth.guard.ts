import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserSessionProviderService } from '../../@core/user/user-session-provider.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private userSessionService: UserSessionProviderService, private router: Router) {}

	/**
	 * allow route activation if a valid, unexpired session token is found
	 *
	 * @param next next
	 * @param state state
	 */
  	canActivate(
    	next: ActivatedRouteSnapshot,
    	state: RouterStateSnapshot): Observable<boolean> | boolean
	{
		const session = this.userSessionService.getSessionData();
		if (!session || session.expired) {
			this.router.navigate(['login']);
			return false;
		}

		return true;
	}
  
}
