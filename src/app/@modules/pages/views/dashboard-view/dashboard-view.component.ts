import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { HttpOptionsFactoryService } from '../../../../@shared/services/http-options-factory.service';
import { IUser } from '../../../../@core/user/user.model';

@Component({
	selector: 'app-dashboard-view',
	templateUrl: './dashboard-view.component.html',
	styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

	constructor(
		private httpOptionsFactory: HttpOptionsFactoryService,
		private http: HttpClient
	) { }

	ngOnInit() {}

	btnClick() {

		this.sendReqAuthTestRequest().subscribe(
			r => console.log(r),
			e => console.error(e)
		);

	}

	sendReqAuthTestRequest(): Observable<any> {

		const url = `${environment.api_url}/tests`;

		return this.http.get(url, this.getHttpOptions()) as Observable<IUser>;

	}

	private getHttpOptions() {
		return this.httpOptionsFactory.getDefaultHttpOptions();
	}

}
