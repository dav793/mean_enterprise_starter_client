import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { environment } from '../../../environments/environment';

import { IRelationDefinition } from './relation-definition.model';
import { IRelationInstance } from './relation-instance.model';
import { HttpOptionsFactoryService } from '../../@shared/services/http-options-factory.service';

@Injectable()
export class RelationApiService {

	constructor(
		private httpOptionsFactory: HttpOptionsFactoryService,
		private http: HttpClient
	) {}

	getRelationDefinitions(): Observable<IRelationDefinition[]> {

		const url = `${environment.api_url}/relations/definitions`;

		return this.http.get(url, this.getHttpOptions()) as Observable<IRelationDefinition[]>;

	}

	getRelationInstances(): Observable<IRelationInstance[]> {

		const url = `${environment.api_url}/relations/instances`;

		return this.http.get(url, this.getHttpOptions()) as Observable<IRelationInstance[]>;

	}

	getRelationDefinition(relId: string): Observable<IRelationDefinition> {

		const url = `${environment.api_url}/relations/definitions/${relId}`;

		return this.http.get(url, this.getHttpOptions()) as Observable<IRelationDefinition>;

	}

	getRelationInstance(relId: string): Observable<IRelationInstance> {

		const url = `${environment.api_url}/relations/instances/${relId}`;

		return this.http.get(url, this.getHttpOptions()) as Observable<IRelationInstance>;

	}

	postRelationDefinition(relBody: any): Observable<IRelationDefinition> {
		
		const url = `${environment.api_url}/relations/definitions`;

		return this.http.post(url, relBody, this.getHttpOptions()) as Observable<IRelationDefinition>;

	}

	postRelationInstance(relBody: any): Observable<IRelationInstance> {

		const url = `${environment.api_url}/relations/instances`;

		return this.http.post(url, relBody, this.getHttpOptions()) as Observable<IRelationInstance>;

	}

	putRelationDefinition(relId: string, relBody: any): Observable<IRelationDefinition> {

		const url = `${environment.api_url}/relations/definitions/${relId}`;

		return this.http.put(url, relBody, this.getHttpOptions()) as Observable<IRelationDefinition>;

	}

	putRelationInstance(relId: string, relBody: any): Observable<IRelationInstance> {

		const url = `${environment.api_url}/relations/instances/${relId}`;

		return this.http.put(url, relBody, this.getHttpOptions()) as Observable<IRelationInstance>;

	}

	deleteRelationDefinition(relId: string): Observable<boolean> {

		const url = `${environment.api_url}/relations/definitions/${relId}`;

		return this.http.delete(url, this.getHttpOptions()) as Observable<boolean>;

	}

	deleteRelationInstance(relId: string): Observable<boolean> {

		const url = `${environment.api_url}/relations/instances/${relId}`;

		return this.http.delete(url, this.getHttpOptions()) as Observable<boolean>;

	}

	private getHttpOptions() {
		return this.httpOptionsFactory.getDefaultHttpOptions();
	}

}
