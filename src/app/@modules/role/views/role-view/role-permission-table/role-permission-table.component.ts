import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

import {IRole} from '../../../../../@core/role/role.model';
import {ResourceName} from '../../../../../@shared/enums/resources';
import {PermissionAction, PermissionLevel} from '../../../../../@shared/enums/permissions';
import {IOptionType} from '../../../../../@shared/components/form-elements/option-type';

import Utils from '../../../../../@shared/helpers/utils/utils';

@Component({
  selector: 'app-role-permission-table',
  templateUrl: './role-permission-table.component.html',
  styleUrls: ['./role-permission-table.component.css']
})
export class RolePermissionTableComponent implements OnInit, OnDestroy, OnChanges {

    @Input() role$: Observable<IRole>;
    @Input() revert$: Observable<void>;
    @Output() formChanges = new EventEmitter<any|false>();  // emits the form value
    @Output() formValidChanges = new EventEmitter<boolean>();
    @Output() formDirtyChanges = new EventEmitter<boolean>();

    role: IRole|null;
    permForm: FormGroup|null;
    levelOptions: IOptionType[] = [];

    protected resourceNames: ResourceName[] = Utils.enumToArray(ResourceName);
    protected actionTypes: PermissionAction[] = Utils.enumToArray(PermissionAction);
    protected permissionLevels: PermissionLevel[] = Utils.enumToArray(PermissionLevel);

    protected onDestroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.setupLevelOptions();
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.role$ && this.role$) {

            this.role$
                .pipe( takeUntil(this.onDestroy$) )
                .subscribe(role => {
                    if (role) {
                        this.role = role;
                        this.setupForm();
                        this.formDirtyChanges.emit(false);
                    }
                    else {
                        this.role = null;
                        this.permForm = null;
                        this.formDirtyChanges.emit(false);
                    }

                });

        }

        // when revert is defined, handle form reversion
        if (this.revert$)
            this.revert$
                .pipe( takeUntil(this.onDestroy$) )
                .subscribe(() => this.revertForm());
    }

    setupLevelOptions() {
        this.levelOptions = this.permissionLevels.map(level => ({ key: PermissionLevel[level], label: level as any }));
    }

    revertForm() {
        this.setupForm();
        this.formDirtyChanges.emit( false );
    }

    setupForm() {
        this.permForm = this.buildForm(this.role);
        this.formChanges.emit(this.permForm.value);
        this.setupOutputs();
    }

    setupOutputs() {
        this.permForm.valueChanges.pipe(
            takeUntil( this.onDestroy$ ),
            tap( () => this.formValidChanges.emit( this.permForm.valid ) ),
            tap( () => this.formDirtyChanges.emit( this.permForm.dirty ) )
        ).subscribe(() => {
            if (this.permForm.valid)
                this.formChanges.emit(this.permForm.value);
            else
                this.formChanges.emit(false);
        });
    }

    buildForm(role: IRole): FormGroup {

        const formDef = {};
        for (const resource of this.resourceNames) {

            const actions = {};
            for (const actionType of this.actionTypes) {

                let modelResource;
                if (role.resources)
                    modelResource = role.resources.find(r => r.name === resource);

                let modelPermission;
                if (modelResource)
                    modelPermission = modelResource.permissions.find(p => p.action === actionType);

                if (modelPermission)
                    actions[actionType] = [ modelPermission.level, [] ];
                else
                    actions[actionType] = [ PermissionLevel.DENY, [] ];

            }

            formDef[resource] = this.formBuilder.group(actions);

        }

        const group = this.formBuilder.group(formDef);
        return group;

    }

    getResourceForm(resource: ResourceName): FormGroup|null {
        const group = this.permForm.controls[resource] as FormGroup;
        if (group)
            return group;
        return null;
    }

	onClickAction(action: PermissionAction) {

    	let numDenied = 0;
		const operations = this.resourceNames.map(resource => {

			const group = this.getResourceForm(resource);
			if (!group)
				return;

			if (group.controls[action].value === PermissionLevel.DENY)
				numDenied++;

			return (perm: PermissionLevel) => {
				return group.controls[action].setValue(perm, {emitEvent: true});
			};

		});

		for (const operation of operations) {
			let newPerm = PermissionLevel.DENY;
			if (numDenied > this.actionTypes.length / 2)
				newPerm = PermissionLevel.ALLOW;

			operation(newPerm);
		}

		this.permForm.markAsDirty();

		this.formValidChanges.emit(this.permForm.valid);
		this.formDirtyChanges.emit(this.permForm.dirty);
		if (this.permForm.valid)
			this.formChanges.emit(this.permForm.value);

	}

	onClickResource(resource: ResourceName) {

		const group = this.getResourceForm(resource);
		if (!group)
			return;

		let numDenied = 0;
		const operations = this.actionTypes.map(actionType => {

			if (group.controls[actionType].value === PermissionLevel.DENY)
				numDenied++;

			return (perm: PermissionLevel) => {
				return group.controls[actionType].setValue(perm, {emitEvent: true});
			};

		});

		for (const operation of operations) {
			let newPerm = PermissionLevel.DENY;
			if (numDenied > this.actionTypes.length / 2)
				newPerm = PermissionLevel.ALLOW;

			operation(newPerm);
		}

		this.permForm.markAsDirty();

		this.formValidChanges.emit(this.permForm.valid);
		this.formDirtyChanges.emit(this.permForm.dirty);
		if (this.permForm.valid)
			this.formChanges.emit(this.permForm.value);

	}

}
