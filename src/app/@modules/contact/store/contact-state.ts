
export interface State {
	contactModule: ContactModuleState;
}

export interface ContactModuleState {
	contactUpdate: ContactOperationState;
	contactCreate: ContactOperationState;
	contactDelete: ContactOperationState;
}

export interface ContactOperationState {
	successEventId: string;
	successContactId: string;
	errorEventId: string;
}

export const initialContactOperationState = {
	successEventId: null,
	successContactId: null,
	errorEventId: null
};

export const initialContactModuleState = {
	contactUpdate: initialContactOperationState,
	contactCreate: initialContactOperationState,
	contactDelete: initialContactOperationState
};
