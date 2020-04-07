import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';

import { ServerEventStreamService } from '../../@shared/services/server-event-stream.service';
import { ISocketMessage, SocketMessageType } from '../../@shared/lib/socket-io/socket-types';

import { CoreState } from './core-state';
import { IActionMetadata, storeActionMetadataSingleton as ActionMetadataFactory } from '../../@shared/helpers/utils/store-action-metadata-factory';
import * as UsersActions from './actions/users.actions';
import * as RolesActions from './actions/roles.actions';
import * as UserGroupsActions from './actions/user-groups.actions';
import * as ContactsActions from './actions/contacts.actions';
import * as RelationsActions from './actions/relations.actions';
import * as SessionActions from './actions/session.actions';

import {IUser} from '../user/user.model';
import {IUserRegisterBody, IUserUpdateBody} from '../user/user-api.service';

import {IRole} from '../role/role.model';
import {IRoleCreateBody, IRoleUpdateBody} from '../role/role-api.service';

import {IUserGroup} from '../user-group/user-group.model';
import {IUserGroupCreateBody, IUserGroupUpdateBody} from '../user-group/user-group-api.service';

import {IContact} from '../contact/contact.model';

import {IRelationDefinition} from '../relation/relation-definition.model';
import {IRelationInstance} from '../relation/relation-instance.model';

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

	selectUser(userId: string): Observable<IUser|null> {
		return this.selectAllUsers().pipe(
			switchMap((allUsers: { [key: string]: IUser }) => {
				if (userId && userId in allUsers)
					return of(allUsers[userId]);
				return of(null);
			})
		);
	}

    selectSessionUser(): Observable<IUser> {
        return this.store.select(state => state.session.user);
    }

    selectAllRoles(): Observable<{ [key: string]: IRole }> {
        return this.store.select(state => state.roles.all);
    }

	selectRole(roleId: string): Observable<IRole> {
		return this.selectAllRoles().pipe(
			switchMap((allRoles: { [key: string]: IRole }) => {
				if (roleId && roleId in allRoles)
					return of(allRoles[roleId]);
				return of(null);
			})
		);
	}

    selectAllUserGroups(): Observable<{ [key: string]: IUserGroup }> {
      	return this.store.select(state => state.userGroups.all);
    }

	selectUserGroup(userGroupId: string): Observable<IUserGroup> {
		return this.selectAllUserGroups().pipe(
			switchMap((allUserGroups: { [key: string]: IUserGroup }) => {
				if (userGroupId && userGroupId in allUserGroups)
					return of(allUserGroups[userGroupId]);
				return of(null);
			})
		);
	}

	selectAllContacts(): Observable<{ [key: string]: IContact }> {
		return this.store.select(state => state.contacts.all);
	}

	selectContact(contactId: string): Observable<IContact> {
		return this.selectAllContacts().pipe(
			switchMap((allContacts: { [key: string]: IContact }) => {
				if (contactId && contactId in allContacts)
					return of(allContacts[contactId]);
				return of(null);
			})
		);
	}

	selectAllRelationDefinitions(): Observable<{ [key: string]: IRelationDefinition }> {
		return this.store.select(state => state.relations.definitions.all);
	}

	selectRelationDefinition(relationId: string): Observable<IRelationDefinition> {
		return this.selectAllRelationDefinitions().pipe(
			switchMap((allRelations: { [key: string]: IRelationDefinition }) => {
				if (relationId && relationId in allRelations)
					return of(allRelations[relationId]);
				return of(null);
			})
		);
	}

	selectAllRelationInstances(): Observable<{ [key: string]: IRelationInstance }> {
		return this.store.select(state => state.relations.instances.all);
	}

	selectRelationInstances(relationId: string): Observable<IRelationInstance> {
		return this.selectAllRelationInstances().pipe(
			switchMap((allRelations: { [key: string]: IRelationInstance }) => {
				if (relationId && relationId in allRelations)
					return of(allRelations[relationId]);
				return of(null);
			})
		);
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

	loadAllRelationDefinitions(): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RelationsActions.LoadAllRelationDefinitions({ meta }) );
		return meta;
	}

	createRelationDefinition(relationDefinition: any): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RelationsActions.CreateRelationDefinition({ relationDefinition, meta }) );
		return meta;
	}

	updateRelationDefinition(relationDefinitionId: string, relationDefinition: any): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RelationsActions.UpdateRelationDefinition({ relationDefinitionId, relationDefinition, meta }) );
		return meta;
	}

	deleteRelationDefinition(relationDefinitionId: string): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RelationsActions.DeleteRelationDefinition({ relationDefinitionId, meta }) );
		return meta;
	}

	loadAllRelationInstances(): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RelationsActions.LoadAllRelationInstances({ meta }) );
		return meta;
	}

	createRelationInstance(relationInstance: any): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RelationsActions.CreateRelationInstance({ relationInstance, meta }) );
		return meta;
	}

	updateRelationInstance(relationInstanceId: string, relationInstance: any): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RelationsActions.UpdateRelationInstance({ relationInstanceId, relationInstance, meta }) );
		return meta;
	}

	deleteRelationInstance(relationInstanceId: string): IActionMetadata {
		const meta = ActionMetadataFactory.create(this.clientId);
		this.store.dispatch( new RelationsActions.DeleteRelationInstance({ relationInstanceId, meta }) );
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

		this.serverEventService.stream$.pipe(
			filter(msg => msg.type === SocketMessageType.UPDATE_CONTACTS)
		).subscribe((message: ISocketMessage) => {
			this.store.dispatch( new ContactsActions.ServerEventUpdateContacts({ message }) );
		});

    }

}
