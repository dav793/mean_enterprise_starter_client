import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { IUserGroup } from '../../../../../@core/user-group/user-group.model';
import { IUser, User } from '../../../../../@core/user/user.model';
import { IRole } from '../../../../../@core/role/role.model';
import { IOptionType } from '../../../../../@shared/components/form-elements/option-type';
import Utils from "../../../../../@shared/helpers/utils/utils";

@Component({
	selector: 'app-user-group-form',
	templateUrl: './user-group-form.component.html',
	styleUrls: ['./user-group-form.component.css']
})
export class UserGroupFormComponent implements OnInit, OnDestroy, OnChanges {

	@Input() userGroup$: Observable<IUserGroup>;
	@Input() users$: Observable<{ [key: string]: IUser }>;
	@Input() roles$: Observable<{ [key: string]: IRole }>;
	@Input() revert$: Observable<void>;
	@Output() formChanges = new EventEmitter<any|false>();  // emits the form value
	@Output() formValidChanges = new EventEmitter<boolean>();
	@Output() formDirtyChanges = new EventEmitter<boolean>();

	userGroup: IUserGroup|null;
	userGroupForm: FormGroup|null;

	users: IUser[];
	userOptions: IOptionType[];

	roles: IRole[];
	roleOptions: IOptionType[];

	protected onDestroy$ = new Subject<void>();
	protected loaderSub: any;

	constructor(
		private formBuilder: FormBuilder
	) { }

	ngOnInit() { }

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if ((changes.userGroup$ || changes.users$ || changes.roles$) && this.userGroup$ && this.users$ && this.roles$)
			this.loadData();

		// when revert is defined, handle form reversion
		if (this.revert$)
			this.revert$
				.pipe( takeUntil(this.onDestroy$) )
				.subscribe(() => this.revertForm());
	}

	loadData() {
		if (this.loaderSub)
			this.loaderSub.unsubscribe();

		this.loaderSub = combineLatest([this.userGroup$, this.users$, this.roles$])
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe(([userGroup, users, roles]) => {

				this.users = Utils.objectToArray(users);
				this.userOptions = this.users.map(u => ({ key: u._id, label: new User(u).fullName }));

				this.roles = Utils.objectToArray(roles);
				this.roleOptions = this.roles.map(r => ({ key: r._id, label: r.name }));

				if (userGroup) {
					this.userGroup = userGroup;
					this.setupForm();
					this.formDirtyChanges.emit(false);
				}
				else {
					this.userGroup = null;
					this.userGroupForm = null;
					this.formDirtyChanges.emit(false);
				}

			});
	}

	revertForm() {
		this.setupForm();
		this.formDirtyChanges.emit( false );
	}

	setupForm() {
		this.userGroupForm = this.buildForm(this.userGroup);
		this.formChanges.emit(this.userGroupForm.value);
		this.setupOutputs();
	}

	setupOutputs() {
		this.userGroupForm.valueChanges.pipe(
			takeUntil( this.onDestroy$ ),
			tap( () => this.formValidChanges.emit( this.userGroupForm.valid ) ),
			tap( () => this.formDirtyChanges.emit( this.userGroupForm.dirty ) )
		).subscribe(() => {
			if (this.userGroupForm.valid)
				this.formChanges.emit(this.userGroupForm.value);
			else
				this.formChanges.emit(false);
		});
	}

	buildForm(userGroup: IUserGroup): FormGroup {

		const group = this.formBuilder.group({
			label:          [ userGroup.label,         [] ],
			roleIds:		[ userGroup.roleIds,	   [] ],
			userIds:		[ userGroup.userIds,	   [] ]
		});

		return group;

	}

}
