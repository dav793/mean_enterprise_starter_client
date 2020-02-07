/**
 * WARNING
 * any changes made to this file HAVE to also be made to its counterpart in the server in: 'src/shared/lib/socket.io/socket-types',
 * the two files should ALWAYS be identical (except for this doc).
 *
 * yes, this is an ugly solution.
 * but it is only a temporary solution, and a quick one at that
 *
 * this should eventually be imported remotely from the server
 */

export enum SocketMessageType {
	ASSIGN_CLIENT_ID                = 'assignClientId',
	REQUEST_AUTHENTICATION          = 'requestAuthentication',
	UPDATE_USERS                    = 'updateUsers',
	UPDATE_USER_GROUPS              = 'updateUserGroups',
	UPDATE_ROLES                    = 'updateRoles',
	UPDATE_CONTACTS        			= 'updateContacts'
}

// create an interface here for every type of payload that may be sent by a socket message type

export interface IAssignClientIdPayload {
	clientId: string;
}

export interface IRequestAuthenticationPayload {
	clientId: string;
	originatorId: string;
}

export interface IUpdateUsersPayload {
	originatorId: string;
}

export interface IUpdateUserGroupsPayload {
	originatorId: string;
}

export interface IUpdateRolesPayload {
	originatorId: string;
}

export interface IUpdateContactsPayload {
	originatorId: string;
}

export type SocketMessagePayloadType =  IAssignClientIdPayload |        // <- add individual payload types to union type
										IRequestAuthenticationPayload |
										IUpdateUsersPayload |
										IUpdateUserGroupsPayload |
										IUpdateRolesPayload |
										IUpdateContactsPayload |
										{};

export interface ISocketMessage {
	type: SocketMessageType;
	data?: SocketMessagePayloadType;
	clientId?: string;
}
