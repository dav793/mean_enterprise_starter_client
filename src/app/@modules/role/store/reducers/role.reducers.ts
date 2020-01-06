
import {
  RoleModuleState,
  initialRoleModuleState,
  RoleOperationState,
  initialRoleOperationState
} from '../role-state';
import * as RoleModuleActions from '../actions/role.actions';

export function roleModuleReducer(
  state = initialRoleModuleState,
  action: RoleModuleActions.ActionsUnion
): RoleModuleState {
    return {
        ...state,
        roleUpdate: roleUpdateReducer(state.roleUpdate, action),
        roleCreate: roleCreateReducer(state.roleCreate, action),
        roleDelete: roleDeleteReducer(state.roleDelete, action)
    };
}

export function roleUpdateReducer(
    state = initialRoleOperationState,
    action: RoleModuleActions.ActionsUnion
): RoleOperationState {
    switch (action.type) {

        case RoleModuleActions.ActionTypes.RoleUpdateSuccess: {

            if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
                console.error('malformed action: eventId is missing');
                return state;
            }

            return Object.assign({}, state, {
                successEventId: action.payload.meta.eventId,
                successRoleId: action.payload.roleId,
                errorEventId: null
            });

        }

        case RoleModuleActions.ActionTypes.RoleUpdateError: {

            if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
                console.error('malformed action: eventId is missing');
                return state;
            }

            const eventId = action.payload.meta.eventId;
            return Object.assign({}, state, {
                successEventId: null,
                successRoleId: null,
                errorEventId: eventId
            });

        }

        default: {
            return state;
        }

    }
}

export function roleCreateReducer(
    state = initialRoleOperationState,
    action: RoleModuleActions.ActionsUnion
): RoleOperationState {
    switch (action.type) {

        case RoleModuleActions.ActionTypes.RoleCreateSuccess: {

            if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
                console.error('malformed action: eventId is missing');
                return state;
            }

            return Object.assign({}, state, {
                successEventId: action.payload.meta.eventId,
                successRoleId: action.payload.roleId,
                errorEventId: null
            });

        }

        case RoleModuleActions.ActionTypes.RoleCreateError: {

            if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
                console.error('malformed action: eventId is missing');
                return state;
            }

            const eventId = action.payload.meta.eventId;
            return Object.assign({}, state, {
                successEventId: null,
                successRoleId: null,
                errorEventId: eventId
            });

        }

        default: {
            return state;
        }

    }
}

export function roleDeleteReducer(
    state = initialRoleOperationState,
    action: RoleModuleActions.ActionsUnion
): RoleOperationState {
    switch (action.type) {

        case RoleModuleActions.ActionTypes.RoleDeleteSuccess: {

            if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
                console.error('malformed action: eventId is missing');
                return state;
            }

            return Object.assign({}, state, {
                successEventId: action.payload.meta.eventId,
                successRoleId: action.payload.roleId,
                errorEventId: null
            });

        }

        case RoleModuleActions.ActionTypes.RoleDeleteError: {

          if (!action.payload || !action.payload.meta || !action.payload.meta.eventId) {
            console.error('malformed action: eventId is missing');
            return state;
          }

          const eventId = action.payload.meta.eventId;
          return Object.assign({}, state, {
            successEventId: null,
            successRoleId: null,
            errorEventId: eventId
          });

        }

        default: {
            return state;
        }

    }
}
