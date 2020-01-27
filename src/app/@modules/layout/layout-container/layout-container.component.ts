import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-layout-container',
    templateUrl: './layout-container.component.html',
    styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent implements OnInit {

	url: string[];

    constructor(
		private location: Location,
		private router: Router
	) {}

    ngOnInit() {
		this.setUrl();

		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd)
				this.setUrl();
		});
    }

    setUrl() {
		this.url = this.location.path().split('/').filter(s => s);
	}

    get showAppLayout(): boolean {
    	if (this.url && this.url[0] && (
			this.url[0] === 'login' ||
			( this.url[0] === 'users' && this.url[1] === 'register' )
		))
    		return false;
    	return true;
	}

}
