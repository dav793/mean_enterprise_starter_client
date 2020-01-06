import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class LoggerService {

    constructor() {}

    logMessage(message: string) {

        if (!environment.production) {
            console.log(message);
            // console.trace(message);
        }

        // @todo: add remote logging infrastructure

    }

}
