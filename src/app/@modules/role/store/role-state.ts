
export interface State {
  roleModule: RoleModuleState;
}

export interface RoleModuleState {
  roleUpdate: RoleOperationState;
  roleCreate: RoleOperationState;
  roleDelete: RoleOperationState;
}

export interface RoleOperationState {
  successEventId: string;
  successRoleId: string;
  errorEventId: string;
}

export const initialRoleOperationState = {
  successEventId: null,
  successRoleId: null,
  errorEventId: null
};

export const initialRoleModuleState = {
  roleUpdate: initialRoleOperationState,
  roleCreate: initialRoleOperationState,
  roleDelete: initialRoleOperationState
};
