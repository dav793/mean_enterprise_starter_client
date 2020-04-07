import {of} from 'rxjs';
import {catchError, first, map, mergeMap, tap} from 'rxjs/operators';

import Util from '../utils/utils';
import {ErrorCode} from '../../enums/errors';

export interface ILoadAllParams {
    outActionSuccess: any;
    outActionError: any;
    outActionNoOp: any;
    storeSelector: any;
    apiRequest: any;
}

export function loadAll(params: ILoadAllParams) {
    return mergeMap((a: any) => params.storeSelector().pipe(
        first(),
        mergeMap(allResources => {

            if (!a.payload.meta.forceFetch && Object.keys(allResources).length > 0)
                return of({                           // already loaded in store; do nothing
                    type: params.outActionNoOp
                });
            else
                return params.apiRequest().pipe(
                    map((instances: any[]) => {

                        return {
                            type: params.outActionSuccess,
                            payload: { instances, meta: a.payload.meta }
                        };

                    }),
                    catchError(error => {

                        a.payload.meta.errorCode = Util.getErrorSigFromServerErrorString(error.error) as ErrorCode;

                        return of({
                            type: params.outActionError,
                            payload: { error, meta: a.payload.meta }
                        });

                    })
                );

        })
    ));
}
