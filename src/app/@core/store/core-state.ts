
import { IUser } from '../user/user.model';
import { IRole } from '../role/role.model';
import { IUserGroup } from '../user-group/user-group.model';
import { IContact } from '../contact/contact.model';

export interface CoreState {
    users: UsersState;
    roles: RolesState;
    userGroups: UserGroupsState;
    contacts: ContactsState;
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


export interface SessionState {
    user: IUser|null;
    clientId: string|null;
}

export const initialSessionState = {
    user: null,
    clientId: null
};
