import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';

import { ServerEventStreamService } from '../../@shared/services/server-event-stream.service';
import { ISocketMessage, SocketMessageType } from '../../@shared/lib/socket-io/socket-types';

import { CoreState } from './core-state';
import { IActionMetadata, storeActionMetadataSingleton as ActionMetadataFactory } from '../../@shared/helpers/utils/store-action-metadata-factory';
import * as UsersActions from './actions/users.actions';
import * as RolesActions from './actions/roles.actions';
import * as UserGroupsActions from './actions/user-groups.actions';
import * as ContactsActions from './actions/contacts.actions';
import * as SessionActions from './actions/session.actions';

import {IUser} from '../user/user.model';
import {IUserRegisterBody, IUserUpdateBody} from '../user/user-api.service';

import {IRole} from '../role/role.model';
import {IRoleCreateBody, IRoleUpdateBody} from '../role/role-api.service';

import {IUserGroup} from '../user-group/user-group.model';
import {IUserGroupCreateBody, IUserGroupUpdateBody} from '../user-group/user-group-api.service';

import {IContact} from '../contact/contact.model';

import {excludeFalsy} from '../../@shared/helpers/operators/exclude-falsy';

@Injectable()
export class CoreStoreService {

    protected clientId: string;

	constructor(
        private serverEventService: ServerEventStreamService,
        private store: Store<CoreState>
    ) {
        this.loadClientId();
        this.listenServerEvents();
    }

    selectAllUsers(): Observable<{ [key: string]: IUser }> {
        return this.store.select(state => state.users.all);
    }

    selectUser(userId: string): Observable<IUser> {
        return this.store.select(state => state.users.all[userId]);
    }

    selectSessionUser(): Observable<IUser> {
        return this.store.select(state => state.session.user);
    }

    selectAllRoles(): Observable<{ [key: string]: IRole }> {
        return this.store.select(state => state.roles.all);
    }

    selectRole(roleId: string): Observable<IRole> {
      	return this.store.select(state => state.roles.all[roleId]);
    }

    selectAllUserGroups(): Observable<{ [key: string]: IUserGroup }> {
      	return this.store.select(state => state.userGroups.all);
    }

    selectUserGroup(userGroupId: string): Observable<IUserGroup> {
      	return this.store.select(state => state.userGroups.all[userGroupId]);
    }

	selectAllContacts(): Observable<{ [key: string]: IContact }> {
		return this.store.select(state => state.contacts.all);
	}

	selectContact(contactId: string): Observable<IContact> {
		return this.store.select(state => state.contacts.all[contactId]);
	}

    selectClientId(): Observable<string> {
        return this.store.select(state => state.session.clientId);
    }

    loadAllUsers(): IActionMetadata {
        const meta = ActionMetadataFactory.create(this.clientId);
        this.store.dispatch( new UsersActions.LoadAllUsers({ meta }) );
        return meta;
    }

	registerUser(user: IUserRegisterBody): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new UsersActions.RegisterUser({ user, meta }) );
		return meta;
	}

    createUser(user: IUserRegisterBody): IActionMetadata {
        const meta = ActionMetadataFactory.create(this.clientId);
        this.store.dispatch( new UsersActions.CreateUser({ user, meta }) );
        return meta;
    }

    updateUser(userId: string, user: IUserUpdateBody): IActionMetadata {
        const meta = ActionMetadataFactory.create(this.clientId);
        this.store.dispatch( new UsersActions.UpdateUser({ userId, user, meta }) );
        return meta;
    }

    deleteUser(userId: string): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new UsersActions.DeleteUser({ userId, meta }) );
		return meta;
    }

    loadAllRoles(): IActionMetadata {
        const meta = ActionMetadataFactory.create(this.clientId);
        this.store.dispatch( new RolesActions.LoadAllRoles({ meta }) );
        return meta;
    }

    createRole(role: IRoleCreateBody): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RolesActions.CreateRole({ role, meta }) );
		return meta;
    }

    updateRole(roleId: string, role: IRoleUpdateBody): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RolesActions.UpdateRole({ roleId, role, meta }) );
		return meta;
    }

    deleteRole(roleId: string): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RolesActions.DeleteRole({ roleId, meta }) );
		return meta;
    }

    loadAllUserGroups(): IActionMetadata {
        const meta = ActionMetadataFactory.create(this.clientId);
        this.store.dispatch( new UserGroupsActions.LoadAllUserGroups({ meta }) );
        return meta;
    }

    createUserGroup(userGroup: IUserGroupCreateBody): IActionMetadata {
        const meta = ActionMetadataFactory.create(this.clientId);
        this.store.dispatch( new UserGroupsActions.CreateUserGroup({ userGroup, meta }) );
        return meta;
    }

    updateUserGroup(userGroupId: string, userGroup: IUserGroupUpdateBody): IActionMetadata {
        const meta = ActionMetadataFactory.create(this.clientId);
        this.store.dispatch( new UserGroupsActions.UpdateUserGroup({ userGroupId, userGroup, meta }) );
        return meta;
    }

    deleteUserGroup(userGroupId: string): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new UserGroupsActions.DeleteUserGroup({ userGroupId, meta }) );
		return meta;
    }

	loadAllContacts(): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new ContactsActions.LoadAllContacts({ meta }) );
		return meta;
	}

	createContact(contact: any): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new ContactsActions.CreateContact({ contact, meta }) );
		return meta;
	}

	updateContact(contactId: string, contact: any): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new ContactsActions.UpdateContact({ contactId, contact, meta }) );
		return meta;
	}

	deleteContact(contactId: string): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new ContactsActions.DeleteContact({ contactId, meta }) );
		return meta;
	}

    setSession(user: IUser): void {
        this.store.dispatch( new SessionActions.SetSession({ user }) );
    }

    unsetSession(): void {
        this.store.dispatch( new SessionActions.UnsetSession() );
    }

    setClientId(clientId: string): void {
        this.store.dispatch( new SessionActions.SetClientId({ clientId }) );
    }

    protected loadClientId() {

        this.selectClientId().pipe(
            excludeFalsy
        ).subscribe(clientId => {
            this.clientId = clientId;
        });

    }

    protected listenServerEvents() {

        this.serverEventService.stream$.pipe(
            filter(msg => msg.type === SocketMessageType.UPDATE_USERS)
        ).subscribe((message: ISocketMessage) => {
            this.store.dispatch( new UsersActions.ServerEventUpdateUsers({ message }) );
        });

        this.serverEventService.stream$.pipe(
            filter(msg => msg.type === SocketMessageType.UPDATE_ROLES)
        ).subscribe((message: ISocketMessage) => {
            this.store.dispatch( new RolesActions.ServerEventUpdateRoles({ message }) );
        });

		this.serverEventService.stream$.pipe(
			filter(msg => msg.type === SocketMessageType.UPDATE_USER_GROUPS)
		).subscribe((message: ISocketMessage) => {
			this.store.dispatch( new UserGroupsActions.ServerEventUpdateUserGroups({ message }) );
		});

    }

}
