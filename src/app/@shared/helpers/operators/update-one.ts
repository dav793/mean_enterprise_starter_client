import {of} from 'rxjs';
import {catchError, first, map, mergeMap, tap} from 'rxjs/operators';

import Util from '../utils/utils';
import {ErrorCode} from '../../enums/errors';
import {ToasterService} from '../../lib/ngx-toastr/toaster.service';

export interface IUpdateOneParams {
    outActionSuccess: any;
    outActionError: any;
    apiRequest: any;
    toastId: any;
}

export function updateOne(params: IUpdateOneParams) {
    return mergeMap((a: any) => {

        return params.apiRequest(a.payload.id, a.payload.instance).pipe(
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
