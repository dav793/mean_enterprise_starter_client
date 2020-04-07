
import { IUser } from '../user/user.model';
import { IRole } from '../role/role.model';
import { IUserGroup } from '../user-group/user-group.model';
import { IContact } from '../contact/contact.model';
import { IRelationDefinition } from '../relation/relation-definition.model';
import { IRelationInstance } from '../relation/relation-instance.model';

export interface CoreState {
    users: UsersState;
    roles: RolesState;
    userGroups: UserGroupsState;
    contacts: ContactsState;
    relations: RelationsState;
    session: SessionState;
}


export interface UsersState {
    all: { [key: string]: IUser };
}

export const initialUsersState = {
    all: {}
};


export interface RolesState {
    all: { [key: string]: IRole };
}

export const initialRolesState = {
    all: {}
};


export interface UserGroupsState {
    all: { [key: string]: IUserGroup };
}

export const initialUserGroupsState = {
    all: {}
};

export interface ContactsState {
	all: { [key: string]: IContact };
}

export const initialContactsState = {
	all: {}
};

export interface RelationsState {
	definitions: {
		all: { [key: string]: IRelationDefinition }
	};
	instances: {
		all: { [key: string]: IRelationInstance }
	};
}

export const initialRelationsState = {
	definitions: {
		all: {}
	},
	instances: {
		all: {}
	}
};


export interface SessionState {
    user: IUser|null;
    clientId: string|null;
}

export const initialSessionState = {
    user: null,
    clientId: null
};
