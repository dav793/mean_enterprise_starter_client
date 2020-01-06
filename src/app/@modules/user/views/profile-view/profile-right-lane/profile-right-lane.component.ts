import {Component, OnInit, Input, Output, OnDestroy, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject, combineLatest, of} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';

import {IUser} from '../../../../../@core/user/user.model';
import {IUserGroup} from '../../../../../@core/user-group/user-group.model';
import {IRole} from '../../../../../@core/role/role.model';
import {IOptionType} from '../../../../../@shared/components/form-elements/option-type';

import {DialogService} from '../../../../../@shared/services/dialog.service';

@Component({
	selector: 'app-user-profile-right-lane',
	templateUrl: './profile-right-lane.component.html',
	styleUrls: ['./profile-right-lane.component.css']
})
export class ProfileRightLaneComponent implements OnInit, OnDestroy, OnChanges {

	@Input() user$: Observable<IUser>;
	@Input() userGroups$: Observable<{ [key: string]: IUserGroup }>;
	@Input() roles$: Observable<{ [key: string]: IRole }>;
	@Input() revert$: Observable<void>;
	@Output() formChanges = new EventEmitter<any | false>();  // emits the user form value
	@Output() formValidChanges = new EventEmitter<boolean>();
	@Output() formDirtyChanges = new EventEmitter<boolean>();
	@Output() groupFormChanges = new EventEmitter<any | false>();  // emits the user groups form value
	@Output() groupFormValidChanges = new EventEmitter<boolean>();
	@Output() groupFormDirtyChanges = new EventEmitter<boolean>();

	user: IUser;
	userGroups: IUserGroup[];
	roles: IRole[];

	userGroupOptions: IOptionType[];
	roleOptions: IOptionType[];

	userForm: FormGroup;
	groupsForm: FormGroup;

	errorMessages = {
		firstName: {
			required: 'Campo obligatorio'
		}
	};

	protected onDestroy$ = new Subject<void>();
	protected loaderSub: any;

	constructor(
		private dialogService: DialogService,
		private formBuilder: FormBuilder
	) {
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	ngOnChanges(changes: SimpleChanges) {

		// when users and roles are defined, handle form setup
		if ((changes.user$ || changes.roles$ || changes.userGroups$) && this.user$ && this.roles$ && this.userGroups$) {

			let combineChanges$ = of(true);

			if (this.userForm && this.userForm.dirty) {
				combineChanges$ = this.dialogService.openYesNoDialog({
					title: 'Confirmar',
					body: 'Los datos cargados han sido modificados. ¿Desea cargar los nuevos datos?'
				}).pipe(
					filter(result => result)
				);
			}

			combineChanges$.subscribe(() => {

				if (this.loaderSub)
					this.loaderSub.unsubscribe();

				this.loaderSub = combineLatest(this.user$, this.roles$, this.userGroups$)
					.pipe(takeUntil(this.onDestroy$))
					.subscribe(([user, roles, userGroups]) => {

						this.user = user;

						this.userGroups = Object.keys(userGroups).map(k => userGroups[k]);
						this.userGroupOptions = this.userGroups.map(g => ({key: g._id, label: g.label}));

						this.roles = Object.keys(roles).map(k => roles[k]);
						this.roleOptions = this.roles.map(r => ({key: r._id, label: r.name}));

						this.setupForm();

					});

			});

		}

		// when revert is defined, handle form reversion
		if (this.revert$)
			this.revert$
				.pipe(takeUntil(this.onDestroy$))
				.subscribe(() => this.revertForm());

	}

	revertForm() {
		this.setupForm();
		this.formDirtyChanges.emit(false);
	}

	setupForm() {
		this.userForm = this.buildForm(this.user);
		this.groupsForm = this.buildGroupForm(this.user);
		this.setupOutputs();
	}

	setupOutputs() {

		this.userForm.valueChanges.pipe(
			takeUntil(this.onDestroy$),
			tap(() => this.formValidChanges.emit(this.userForm.valid)),
			tap(() => this.formDirtyChanges.emit(this.userForm.dirty))
		).subscribe(() => {
			if (this.userForm.valid)
				this.formChanges.emit(this.userForm.value);
			else
				this.formChanges.emit(false);
		});

		this.groupsForm.valueChanges.pipe(
			takeUntil(this.onDestroy$),
			tap(() => this.groupFormValidChanges.emit(this.groupsForm.valid)),
			tap(() => this.groupFormDirtyChanges.emit(this.groupsForm.dirty))
		).subscribe(() => {
			if (this.groupsForm.valid)
				this.groupFormChanges.emit(this.groupsForm.value);
			else
				this.groupFormChanges.emit(false);
		});

	}

	buildForm(user: IUser): FormGroup {

		const group = this.formBuilder.group({
			firstName: [user.firstName, [Validators.required]],
			lastName: [user.lastName, []],
			secondLastName: [user.secondLastName, []],
			email: [user.email, []],
			roleIds: [user.roleIds, []]
		});

		return group;

	}

	buildGroupForm(user: IUser): FormGroup {

		const group = this.formBuilder.group({
			groupIds: [[], []]
		});

		return group;

	}

}
