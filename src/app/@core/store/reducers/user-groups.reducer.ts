
import { UserGroupsState, initialUserGroupsState } from '../core-state';
import * as UserGroupsActions from '../actions/user-groups.actions';
import Utils from '../../../@shared/helpers/utils/utils';

export function userGroupsReducer(
    state = initialUserGroupsState,
    action: UserGroupsActions.ActionsUnion
): UserGroupsState {
    switch (action.type) {

        case UserGroupsActions.ActionTypes.RemoveUserGroup: {
            if (action.payload.userGroupId in state.all) {
                const all = Object.assign({}, state.all);
                delete all[action.payload.userGroupId];
                return { all };
            }
            else
                return state;
        }

        case UserGroupsActions.ActionTypes.APILoadUserGroupSuccess: {
            const all = {};
            all[action.payload.userGroup._id] = action.payload.userGroup;
            return {
                all: Object.assign({}, state.all, all)
            };
        }

        case UserGroupsActions.ActionTypes.APILoadAllUserGroupsSuccess: {
            const all = Utils.arrayToObject(action.payload.userGroups, '_id');
            return { all };
        }

        default: {
          return state;
        }

    }
}
