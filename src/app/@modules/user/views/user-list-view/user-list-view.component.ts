import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subject, combineLatest, BehaviorSubject, throwError} from 'rxjs';
import {
	distinctUntilChanged,
	takeUntil,
	map,
	tap,
	mergeMap,
	filter,
	first
} from 'rxjs/operators';

import { excludeFalsy } from '../../../../@shared/helpers/operators/exclude-falsy';

import { IUser, User } from '../../../../@core/user/user.model';
import { IRole, Role } from '../../../../@core/role/role.model';
import { IUserGroup, UserGroup } from '../../../../@core/user-group/user-group.model';
import { IUserForView } from './user-for-view.model';

import { ToasterService } from '../../../../@shared/lib/ngx-toastr/toaster.service';
import { CoreStoreService } from '../../../../@core/store/core-store';
import { UserStoreService, IUserStoreEventInfo } from '../../store/user-store';

import {
  IToolbarConfig,
  ToolbarItemAlignment
} from '../../../../@shared/components/toolbar/toolbar.interface';

import { ISearchPropertyMetadata } from '../../../../@shared/components/search/search.interface';
import { ISortPropertyMetadata } from '../../../../@shared/helpers/utils/sort-utils';

import { ErrorCode } from '../../../../@shared/enums/errors';
import { ViewStatus } from '../../../../@shared/types/view-status';
import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';
import SortUtils from '../../../../@shared/helpers/utils/sort-utils';
import Utils from '../../../../@shared/helpers/utils/utils';


@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit, OnDestroy {

    users$: Observable<IUser[]>;
    userGroups$: Observable<IUserGroup[]>;
    roles$: Observable<IRole[]>;

    allGroups: IUserGroup[] = [];
    allRoles: IRole[] = [];

    allUsers$ = new BehaviorSubject<IUserForView[]>([]);
    sortedUsers$ = new BehaviorSubject<IUserForView[]>([]);
    filteredUsers$ = new BehaviorSubject<IUserForView[]>([]);
    pageUsers$ = new BehaviorSubject<IUserForView[]>([]);

    resetSearch$ = new Subject<void>();

    sortParams: ISortPropertyMetadata;

    searchSorters: { [key: string]: ISearchPropertyMetadata } = {
        _label_fullName:    { propType: 'string' },
        username:           { propType: 'string' },
        email:              { propType: 'string' },
        _label_groupNames:  { propType: 'string' },
        _label_roleNames:   { propType: 'string' }
    };

    toolbarConfig: IToolbarConfig = {
        label: 'Usuarios',
        itemAlignment: ToolbarItemAlignment.RIGHT,
        items: {}
    };

    protected onDestroy$ = new Subject<void>();
    protected viewStatus: ViewStatus = 'loading';
    protected errorCode: ErrorCode;

    constructor(
        private toaster: ToasterService,
        private coreStore: CoreStoreService,
        private userStore: UserStoreService,
        private router: Router
    ) { }

    ngOnInit() {

        this.loadData().pipe(
            takeUntil(this.onDestroy$)
        ).subscribe(
        	result => {
				if (result)
					this.viewStatus = 'ready';

				this.allUsers$.pipe(
					takeUntil(this.onDestroy$)
				).subscribe(users => {

					this.resetSearch$.next();

					this.sortedUsers$.next(
					  this.sortParams ? [...this.sortUsers()] : [...users]
					);

				});
			},
			error => {
        		console.error(error);
			}
		);

    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    loadData(): Observable<boolean> {

        this.userGroups$ = this.getUserGroups();
        this.roles$ = this.getRoles();
        this.users$ = this.getUsers();

        return combineLatest(this.userGroups$, this.roles$).pipe(
            map(([userGroups, roles]) => true),
            mergeMap(v => this.users$
                .pipe( map(users => v && true) )
            ),
            distinctUntilChanged()
        );

    }

    getUsers(): Observable<IUser[]> {
		const meta: IActionMetadata = this.coreStore.loadAllUsers();

		this.userStore.selectUserLoadAll().pipe(
			takeUntil(this.onDestroy$),
			filter(state => state.errorEventId === meta.eventId),
			first(),
			mergeMap(state => {
				const err = new Error();
				err.name = meta.errorCode;
				return throwError(err);
			})
		).subscribe(
			() => {},
			err => {
				this.viewStatus = 'failed';
				this.errorCode = err.name;
			}
		);

		return this.coreStore.selectAllUsers().pipe(
			excludeFalsy,
			distinctUntilChanged(),
			map(users => this.addExtrasOnUsers(users, this.allGroups, this.allRoles)),
			tap(users => this.allUsers$.next([...users as IUserForView[]]))
		);
	}

	getUserGroups(): Observable<IUserGroup[]> {
		this.coreStore.loadAllUserGroups();

		return this.coreStore.selectAllUserGroups().pipe(
			distinctUntilChanged(),
			map(userGroups => Utils.objectToArray(userGroups)),
			tap(userGroups => this.allGroups = userGroups)
		);
	}

	getRoles(): Observable<IRole[]> {
		this.coreStore.loadAllRoles();

		return this.coreStore.selectAllRoles().pipe(
			excludeFalsy,
			distinctUntilChanged(),
			map(roles => Utils.objectToArray(roles)),
			tap(roles => this.allRoles = roles)
		);
	}

    onPageItemsChange(items: IUserForView[]) {
        this.pageUsers$.next([...items]);
    }

    onSearchItemsChange(items: IUserForView[]) {
        this.filteredUsers$.next([...items]);
    }

    navigateToUserProfile(user: IUserForView) {
        this.router.navigate(['users', 'profile', user._id]);
    }

    addExtrasOnUsers(users: IUser[], groups: IUserGroup[], roles: IRole[]): IUserForView[] {
        if (!users)
            return users as IUserForView[];

        // add on users the extra properties needed for this view and its children
        let usersArray = Utils.objectToArray(users);
        usersArray = this.addFullNameOnUsers(usersArray);
        usersArray = this.addGroupsOnUsers(usersArray, this.allGroups);
        usersArray = this.addRolesOnUsers(usersArray, this.allGroups, this.allRoles);
        return usersArray;
    }

    addFullNameOnUsers(users: IUser[]): any[] {
        return users.map(user => {
            return Object.assign(user, { _label_fullName: new User(user).fullName });
        });
    }

    addGroupsOnUsers(users: IUser[], groups: IUserGroup[]): any[] {
        return users.map(user => {
            const userGroups = UserGroup.FilterByUser(user, groups);
            return Object.assign(user, {
                _groups: userGroups,
                _label_groupNames: Utils.createListLabel(userGroups.map(g => g.label))
            });
        });
    }

    addRolesOnUsers(users: IUser[], groups: IUserGroup[], roles: IRole[]): any[] {
        return users.map(user => {
            const userRoles = Role.FilterByUserWithGroups(user, roles, groups);
            return Object.assign(user, {
                _roles: userRoles,
                _label_roleNames: Utils.createListLabel(userRoles.map(r => r.name))
            });
        });
    }

    setActiveSort(propertyName: string) {
        if (this.sortParams && this.sortParams.property === propertyName) {
            if (this.sortParams.direction === 'desc')
                this.sortParams.direction = 'asc';
            else if (this.sortParams.direction === 'asc')
                this.unsetActiveSort(true);
        }
        else
            this.sortParams = {type: 'string', property: propertyName, direction: 'desc'};

        if (this.sortParams)
            this.sortedUsers$.next(this.sortUsers());

        this.resetSearch$.next();
    }

    unsetActiveSort(updateSortedUsers = false) {
        delete this.sortParams;
        if (updateSortedUsers)
            this.sortedUsers$.next([...this.allUsers$.value]);
    }

    sortUsers() {
        return SortUtils.sortByParams(this.sortParams, this.sortedUsers$.value);
    }

}
