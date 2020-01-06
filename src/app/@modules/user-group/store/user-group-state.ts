
export interface State {
	userGroupModule: UserGroupModuleState;
}

export interface UserGroupModuleState {
	userGroupUpdate: UserGroupOperationState;
	userGroupCreate: UserGroupOperationState;
	userGroupDelete: UserGroupOperationState;
}

export interface UserGroupOperationState {
	successEventId: string;
	successUserGroupId: string;
	errorEventId: string;
}

export const initialUserGroupOperationState = {
	successEventId: null,
	successUserGroupId: null,
	errorEventId: null
};

export const initialUserGroupModuleState = {
	userGroupUpdate: initialUserGroupOperationState,
	userGroupCreate: initialUserGroupOperationState,
	userGroupDelete: initialUserGroupOperationState
};
