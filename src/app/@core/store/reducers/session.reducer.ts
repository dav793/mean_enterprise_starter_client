
import { SessionState, initialSessionState } from '../core-state';
import * as SessionActions from '../actions/session.actions';

export function sessionReducer(
    state = initialSessionState,
    action: SessionActions.ActionsUnion
): SessionState {
    switch (action.type) {

        case SessionActions.ActionTypes.SetSession: {
            if (action.payload.user)
                return Object.assign({}, state, { user: action.payload.user });
            else
                return state;
        }

        case SessionActions.ActionTypes.UnsetSession: {
            return Object.assign({}, state, { user: initialSessionState.user });
        }

        case SessionActions.ActionTypes.SetClientId: {
            if (action.payload.clientId)
                return Object.assign({}, state, { clientId: action.payload.clientId });
            else
                return state;
        }

        default: {
            return state;
        }

    }
}
