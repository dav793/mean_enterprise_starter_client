import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {IUserGroup, UserGroup} from '../../../../../@core/user-group/user-group.model';

import Utils from '../../../../../@shared/helpers/utils/utils';

@Component({
	selector: 'app-user-group-list',
	templateUrl: './user-group-list.component.html',
	styleUrls: ['./user-group-list.component.scss']
})
export class UserGroupListComponent implements OnInit, OnDestroy, OnChanges {

	@Input() userGroups$: Observable<{ [key: string]: IUserGroup }>;
	@Output() selectUserGroup = new EventEmitter<IUserGroup>();
	@Output() addUserGroup = new EventEmitter<void>();

	userGroups: IUserGroup[];

	protected onDestroy$ = new Subject<void>();
	protected loaderSub: any;

	constructor() { }

	ngOnInit() { }

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.userGroups$ && this.userGroups$) {
			this.loadData();
		}
	}

	loadData() {
		if (this.loaderSub)
			this.loaderSub.unsubscribe();

		this.loaderSub = this.userGroups$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe((userGroups) => this.userGroups = Utils.objectToArray(userGroups));
	}

	clickUserGroup(userGroup: IUserGroup) {
		this.selectUserGroup.emit(userGroup);
	}

	addUserGroupButtonClick() {
		this.addUserGroup.emit();
	}

}
