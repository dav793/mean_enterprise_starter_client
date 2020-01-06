import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserSessionService} from "../../../@core/user/user-session.service";

@Component({
    selector: 'app-layout-nav',
    templateUrl: './layout-nav.component.html',
    styleUrls: ['./layout-nav.component.scss']
})
export class LayoutNavComponent implements OnInit {

    constructor(
    	private userSessionService: UserSessionService,
        private router: Router
    ) { }

    ngOnInit() {}

    onClickUserList() {
        this.router.navigate(['users', 'list']);
    }

    onClickRoles() {
        this.router.navigate(['roles']);
    }

	onClickUserGroups() {
		this.router.navigate(['userGroups']);
	}

	onClickContactList() {
		this.router.navigate(['contacts', 'view', 'new']);
	}

    onClickUserProfile() {
        this.router.navigate(['users']);
    }

    onClickLogIn() {

    }

    onClickLogOut() {
		this.userSessionService.logout().subscribe(() => {
			this.router.navigate(['login']);
		});
    }

}
