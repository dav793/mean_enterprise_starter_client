import {of} from 'rxjs';
import {catchError, first, map, mergeMap, tap} from 'rxjs/operators';

import Util from '../utils/utils';
import {ErrorCode} from '../../enums/errors';

export interface ICreateOneParams {
    outActionSuccess: any;
    outActionError: any;
    apiRequest: any;
    toastId: any;
}

export function createOne(params: ICreateOneParams) {
    return mergeMap((a: any) => {

        return params.apiRequest(a.payload.instance).pipe(
            map(instance => {

                return {
                    type: params.outActionSuccess,
                    payload: {
                        instance,
                        meta: Object.assign(
                            a.payload.meta,
                            { overrideToastId: params.toastId }
                        )
                    }
                };

            }),
            catchError(error => {

                a.payload.meta.errorCode = Util.getErrorSigFromServerErrorString(error.error) as ErrorCode;

                return of({
                    type: params.outActionError,
                    payload: {
                        error,
                        meta: Object.assign(
                            a.payload.meta,
                            { overrideToastId: params.toastId }
                        )
                    }
                });

            })
        );

    });
}
