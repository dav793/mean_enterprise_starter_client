import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { environment } from '../../../environments/environment';

import { IContact } from './contact.model';
import { HttpOptionsFactoryService } from '../../@shared/services/http-options-factory.service';

@Injectable()
export class ContactApiService {

	constructor(
		private httpOptionsFactory: HttpOptionsFactoryService,
		private http: HttpClient
	) {}

	getContacts(): Observable<IContact[]> {

		const url = `${environment.api_url}/contacts`;

		return this.http.get(url, this.getHttpOptions()) as Observable<IContact[]>;

	}

	getContact(contactId: string): Observable<IContact> {

		const url = `${environment.api_url}/contacts/${contactId}`;

		return this.http.get(url, this.getHttpOptions()) as Observable<IContact>;

	}

	postContact(contactBody: any): Observable<IContact> {

		if (!contactBody || !contactBody.contactType) {
			const err = new Error('contact body is missing required property \'contactType\'');
			return throwError(err);
		}

		const url = `${environment.api_url}/contacts`;

		return this.http.post(url, contactBody, this.getHttpOptions()) as Observable<IContact>;

	}

	putContact(contactId: string, contactBody: any): Observable<IContact> {

		if (!contactBody || !contactBody.contactType) {
			const err = new Error('contact body is missing required property \'contactType\'');
			return throwError(err);
		}

		const url = `${environment.api_url}/contacts/${contactId}`;

		return this.http.put(url, contactBody, this.getHttpOptions()) as Observable<IContact>;

	}

	deleteContact(contactId: string): Observable<boolean> {

		const url = `${environment.api_url}/contacts/${contactId}`;

		return this.http.delete(url, this.getHttpOptions()) as Observable<boolean>;

	}

	private getHttpOptions() {
		return this.httpOptionsFactory.getDefaultHttpOptions();
	}

}
