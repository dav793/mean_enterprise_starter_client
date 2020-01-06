
import { RolesState, initialRolesState } from '../core-state';
import * as RolesActions from '../actions/roles.actions';
import Utils from '../../../@shared/helpers/utils/utils';

export function rolesReducer(
    state = initialRolesState,
    action: RolesActions.ActionsUnion
): RolesState {
    switch (action.type) {

        case RolesActions.ActionTypes.RemoveRole: {
            if (action.payload.roleId in state.all) {
                const all = Object.assign({}, state.all);
                delete all[action.payload.roleId];
                return { all };
            }
            else
                return state;
        }

        case RolesActions.ActionTypes.APILoadRoleSuccess: {
            const all = {};
            all[action.payload.role._id] = action.payload.role;
            return {
                all: Object.assign({}, state.all, all)
            };
        }

        case RolesActions.ActionTypes.APILoadAllRolesSuccess: {
            const all = Utils.arrayToObject(action.payload.roles, '_id');
            return { all };
        }

        default: {
            return state;
        }

    }
}
