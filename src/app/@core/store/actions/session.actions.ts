
import { Action } from '@ngrx/store';

import { IUser } from '../../user/user.model';

export enum ActionTypes {
  SetSession                  = '[Session Service] Set Session',
  UnsetSession                = '[Session Service] Unset Session',
  SetClientId                 = '[Socket Service] Set Client Id'
}

export class SetSession implements Action {
  readonly type = ActionTypes.SetSession;

  constructor(public payload: { user: IUser }) {}
}

export class UnsetSession implements Action {
  readonly type = ActionTypes.UnsetSession;
}

export class SetClientId implements Action {
  readonly type = ActionTypes.SetClientId;

  constructor(public payload: { clientId: string }) {}
}

export type ActionsUnion =  SetSession |
                            UnsetSession |
                            SetClientId;


