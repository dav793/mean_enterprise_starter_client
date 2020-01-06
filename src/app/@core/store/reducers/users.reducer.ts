
import { UsersState, initialUsersState } from '../core-state';
import * as UsersActions from '../actions/users.actions';
import Utils from '../../../@shared/helpers/utils/utils';

export function usersReducer(
    state = initialUsersState,
    action: UsersActions.ActionsUnion
): UsersState {
    switch (action.type) {

        case UsersActions.ActionTypes.RemoveUser: {
            if (action.payload.userId in state.all) {
                const all = Object.assign({}, state.all);
                delete all[action.payload.userId];
                return { all };
            }
            else
                return state;
        }

        // case UsersActions.ActionTypes.APICreateUserSuccess: {
        //     const all = {};
        //     all[action.payload.user._id] = action.payload.user;
        //     return {
        //       all: Object.assign({}, state.all, all)
        //     };
        // }
        //
        // case UsersActions.ActionTypes.APIUpdateUserSuccess: {
        //     const all = {};
        //     all[action.payload.user._id] = action.payload.user;
        //     return {
        //       all: Object.assign({}, state.all, all)
        //     };
        // }
        //
        // case UsersActions.ActionTypes.APIDeleteUserSuccess: {
        //     if (action.payload.id in state.all) {
        //         const all = Object.assign({}, state.all);
        //         delete all[action.payload.id];
        //         return { all };
        //     }
        //     else
        //         return state;
        // }

        case UsersActions.ActionTypes.APILoadAllUsersSuccess: {
            const all = Utils.arrayToObject(action.payload.users, '_id');
            return { all };
        }

        default: {
            return state;
        }

    }
}
