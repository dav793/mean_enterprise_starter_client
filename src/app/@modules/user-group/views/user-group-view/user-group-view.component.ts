import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, mergeMap, switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { excludeFalsy } from '../../../../@shared/helpers/operators/exclude-falsy';

import {IRole} from '../../../../@core/role/role.model';
import {IUser} from '../../../../@core/user/user.model';
import {IUserGroup, UserGroup} from '../../../../@core/user-group/user-group.model';
import {
	IToolbarConfig, IToolbarEvent,
	ToolbarItemAlignment,
	ToolbarItemType
} from '../../../../@shared/components/toolbar/toolbar.interface';

import { CoreStoreService } from '../../../../@core/store/core-store';
import { UserGroupStoreService } from '../../store/user-group-store';
import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

@Component({
	selector: 'app-user-group-view',
	templateUrl: './user-group-view.component.html',
	styleUrls: ['./user-group-view.component.css']
})
export class UserGroupViewComponent implements OnInit, OnDestroy {

	roles$: Observable<{ [key: string]: IRole }>;
	users$: Observable<{ [key: string]: IUser }>;
	userGroups$: Observable<{ [key: string]: IUserGroup }>;
	userGroups: { [key: string]: IUserGroup };

	protected selectedUserGroup$ = new ReplaySubject<IUserGroup|null>(1);
	protected selectedUserGroupId: string;

	protected userGroupFormValue: any;
	protected userGroupFormValidChanges$ = new Subject<boolean>();
	protected userGroupFormDirtyChanges$ = new Subject<boolean>();

	protected revertForm$ = new Subject<void>();

	protected onDestroy$ = new Subject<void>();
	protected isLoading = true;

	toolbarConfig: IToolbarConfig = {
		label: 'User Groups',
		itemAlignment: ToolbarItemAlignment.RIGHT,
		items: {
			save: {
				type: ToolbarItemType.BUTTON,
				label: 'guardar',
				classes: ['success', 'size-sm'],
				isHidden: true
			},
			revert: {
				type: ToolbarItemType.BUTTON,
				label: 'revertir',
				classes: ['warn', 'size-sm'],
				isHidden: true
			},
			delete: {
				type: ToolbarItemType.BUTTON,
				label: 'eliminar',
				classes: ['error', 'size-sm'],
				isHidden: true
			}
		}
	};

	constructor(
		private coreStore: CoreStoreService,
		private userGroupStore: UserGroupStoreService
	) { }

	ngOnInit() {
		this.loadData().pipe(
			takeUntil(this.onDestroy$)
		).subscribe(() => {
			this.listenChanges();
			this.isLoading = false;
		});
	}

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	loadData(): Observable<boolean> {

		this.coreStore.loadAllRoles();
		this.roles$ = this.coreStore.selectAllRoles().pipe(
			distinctUntilChanged()
		);

		this.coreStore.loadAllUsers();
		this.users$ = this.coreStore.selectAllUsers().pipe(
			distinctUntilChanged()
		);

		this.coreStore.loadAllUserGroups();
		this.userGroups$ = this.coreStore.selectAllUserGroups().pipe(
			distinctUntilChanged()
		);

		return this.userGroups$.pipe(
			tap(userGroups => this.userGroups = userGroups),
			tap(() => this.onUserGroupFormDirtyChange(false)),    // set dirty: false
			switchMap(() => {

				// reselect selected user group
				if (this.selectedUserGroupId) {
					const userGroup = this.userGroups[this.selectedUserGroupId];
					if (userGroup)
						this.selectUserGroup(userGroup);
				}

				return of(true);

			})
		);

	}

	deleteUserGroup(selectedUserGroupId: string) {
		if (!selectedUserGroupId)
			return;

		const actionMetadata: IActionMetadata = this.coreStore.deleteUserGroup(selectedUserGroupId);
	}

	saveUserGroup(selectedUserGroupId: string, userGroupFormValue: any) {
		if (!userGroupFormValue)
			return;

		let actionMetadata: IActionMetadata;
		if (selectedUserGroupId)
			actionMetadata = this.coreStore.updateUserGroup(selectedUserGroupId, userGroupFormValue);
		else
			actionMetadata = this.coreStore.createUserGroup(userGroupFormValue);

		this.handleCreateResponse(actionMetadata);

	}

	handleCreateResponse(actionMetadata: IActionMetadata) {

		// al capturar la respuesta de creacion del nuevo grupo de usuarios..
		this.userGroupStore.selectUserGroupCreate().pipe(
			filter(state => state.successEventId === actionMetadata.eventId),
			takeUntil(this.onDestroy$),
			first(),
			mergeMap(state => this.userGroups$.pipe(   // ..espere hasta recibir los nuevos grupos de usuarios..
				filter(userGroups => state.successUserGroupId in userGroups),
				first(),
				map(() => state)
			))
		).subscribe(state => {

			// ..y luego seleccione el grupo de usuario recien creado
			const userGroup = this.userGroups[state.successUserGroupId];
			this.selectUserGroup(userGroup);

		});

	}

	selectUserGroup(userGroup: IUserGroup) {
		this.selectedUserGroupId = userGroup._id;
		this.selectedUserGroup$.next(userGroup);
	}

	deselectUserGroup() {
		this.selectedUserGroupId = null;
		this.selectedUserGroup$.next(null);
	}

	addUserGroup() {
		const newUserGroup = new UserGroup({} as any).asInterface();
		this.selectedUserGroupId = null;
		this.selectedUserGroup$.next(newUserGroup);
	}

	onUserGroupFormChange(value: any) {
		if (!value)
			this.userGroupFormValue = null;
		else
			this.userGroupFormValue = value;
	}

	onUserGroupFormValidChange(valid: boolean) {
		this.userGroupFormValidChanges$.next(valid);
	}

	onUserGroupFormDirtyChange(dirty: boolean) {
		this.userGroupFormDirtyChanges$.next(dirty);
	}

	listenChanges() {
		this.listenFormValidStatusChanges();
		this.listenFormDirtyStatusChanges();
		this.listenSelectedUserGroupChanges();
	}

	listenFormValidStatusChanges() {
		this.userGroupFormValidChanges$
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe(isValid => {

				this.updateToolbarConfigItem('save', {
					isDisabled: !isValid
				});

			});
	}

	listenFormDirtyStatusChanges() {
		this.userGroupFormDirtyChanges$
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe(isDirty => {

				this.updateToolbarConfigItem('revert', {
					isHidden: !isDirty
				});

				this.updateToolbarConfigItem('save', {
					isHidden: !isDirty
				});

			});
	}

	listenSelectedUserGroupChanges() {
		this.selectedUserGroup$
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe((userGroup: IUserGroup|null) => {
				if (userGroup && userGroup._id)
					this.updateToolbarConfigItem('delete', {
						isHidden: false
					});
				else
					this.updateToolbarConfigItem('delete', {
						isHidden: true
					});
			});
	}

	onToolbarEvent(e: IToolbarEvent) {
		switch (e.itemName) {
			case 'save':
				this.onToolbarSubmit();
				break;
			case 'revert':
				this.onToolbarRevert();
				break;
			case 'delete':
				this.onToolbarDelete();
				break;
		}
	}

	onToolbarSubmit() {
		if (this.userGroupFormValue)
			this.saveUserGroup(this.selectedUserGroupId, this.userGroupFormValue);
	}

	onToolbarRevert() {
		this.revertForm$.next();

		this.updateToolbarConfigItem('revert', {
			isHidden: true
		});
	}

	onToolbarDelete() {
		if (!this.selectedUserGroupId)
			return;

		this.deleteUserGroup(this.selectedUserGroupId);
		this.deselectUserGroup();
	}

	/**
	 * reemplazar la referencia inmutable del toolbar config con otra que contenga las modificaciones
	 * en el item con nombre <itemName> de acuerdo a los pares propiedad-valor en <itemChanges>
	 *
	 * IMPORTANTE: cuando se vaya a modificar los items en el toolbar config, debe hacerse mediante esta función
	 * de forma que el componente toolbar detecte los cambios
	 */
	updateToolbarConfigItem(itemName: string, itemChanges: { [key: string]: any }) {
		Object.assign(this.toolbarConfig.items[itemName], itemChanges);
		this.toolbarConfig = Object.assign({}, this.toolbarConfig);
	}

}
