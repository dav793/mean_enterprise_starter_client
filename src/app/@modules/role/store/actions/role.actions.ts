
import { Action } from '@ngrx/store';

import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

export enum ActionTypes {
  RoleUpdateSuccess     = '[Role Module] Role Update Success',
  RoleUpdateError       = '[Role Module] Role Update Error',
  RoleCreateSuccess     = '[Role Module] Role Create Success',
  RoleCreateError       = '[Role Module] Role Create Error',
  RoleDeleteSuccess     = '[Role Module] Role Delete Success',
  RoleDeleteError       = '[Role Module] Role Delete Error'
}

export class RoleUpdateSuccess implements Action {
    readonly type = ActionTypes.RoleUpdateSuccess;

    constructor(public payload: {
        roleId: string,
        meta?: IActionMetadata
    }) {}
}

export class RoleUpdateError implements Action {
    readonly type = ActionTypes.RoleUpdateError;

    constructor(public payload: {
        meta?: IActionMetadata
    }) {}
}

export class RoleCreateSuccess implements Action {
    readonly type = ActionTypes.RoleCreateSuccess;

    constructor(public payload: {
        roleId: string,
        meta?: IActionMetadata
    }) {}
}

export class RoleCreateError implements Action {
    readonly type = ActionTypes.RoleCreateError;

    constructor(public payload: {
        meta?: IActionMetadata
    }) {}
}

export class RoleDeleteSuccess implements Action {
  readonly type = ActionTypes.RoleDeleteSuccess;

  constructor(public payload: {
    roleId: string,
    meta?: IActionMetadata
  }) {}
}

export class RoleDeleteError implements Action {
  readonly type = ActionTypes.RoleDeleteError;

  constructor(public payload: {
    meta?: IActionMetadata
  }) {}
}

export type ActionsUnion =  RoleUpdateSuccess |
                            RoleUpdateError |
                            RoleCreateSuccess |
                            RoleCreateError |
                            RoleDeleteSuccess |
                            RoleDeleteError;
