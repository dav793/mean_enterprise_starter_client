import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {ISocketMessage} from '../lib/socket-io/socket-types';

@Injectable()
export class ServerEventStreamService {

    protected _stream$ = new Subject<ISocketMessage>();

    constructor() {}

    get stream$(): Observable<ISocketMessage> {
        return this._stream$.asObservable();
    }

    set stream$(newValue: Observable<ISocketMessage>) {
        newValue.subscribe(msg => this._stream$.next(msg));
    }

}
