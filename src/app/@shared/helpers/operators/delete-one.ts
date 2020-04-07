import {of} from 'rxjs';
import {catchError, first, map, mergeMap, tap} from 'rxjs/operators';

import Util from '../utils/utils';
import {ErrorCode} from '../../enums/errors';

export interface IDeleteOneParams {
    outActionSuccess: any;
    outActionError: any;
    apiRequest: any;
    toastId: any;
}

export function deleteOne(params: IDeleteOneParams) {
    return mergeMap((a: any) => {

        return params.apiRequest(a.payload.id).pipe(
            map(() => {

                return {
                    type: params.outActionSuccess,
                    payload: {
                        id: a.payload.id,
                        overrideToastId: params.toastId,
                        meta: a.payload.meta
                    }
                };

            }),
            catchError(error => {

                a.payload.meta.errorCode = Util.getErrorSigFromServerErrorString(error.error) as ErrorCode;

                return of({
                    type: params.outActionError,
                    payload: {
                        error,
                        overrideToastId: params.toastId,
                        meta: a.payload.meta
                    }
                });

            })
        );

    });
}
