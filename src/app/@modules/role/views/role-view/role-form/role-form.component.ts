import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { IRole } from '../../../../../@core/role/role.model';

@Component({
    selector: 'app-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit, OnDestroy, OnChanges {

    @Input() role$: Observable<IRole>;
    @Input() revert$: Observable<void>;
    @Output() formChanges = new EventEmitter<any|false>();  // emits the form value
    @Output() formValidChanges = new EventEmitter<boolean>();
    @Output() formDirtyChanges = new EventEmitter<boolean>();

    role: IRole|null;
    roleForm: FormGroup|null;

    protected onDestroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder
    ) { }

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
                        this.roleForm = null;
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

    revertForm() {
        this.setupForm();
        this.formDirtyChanges.emit( false );
    }

    setupForm() {
        this.roleForm = this.buildForm(this.role);
        this.formChanges.emit(this.roleForm.value);
        this.setupOutputs();
    }

    setupOutputs() {
        this.roleForm.valueChanges.pipe(
            takeUntil( this.onDestroy$ ),
            tap( () => this.formValidChanges.emit( this.roleForm.valid ) ),
            tap( () => this.formDirtyChanges.emit( this.roleForm.dirty ) )
        ).subscribe(() => {
            if (this.roleForm.valid)
                this.formChanges.emit(this.roleForm.value);
            else
                this.formChanges.emit(false);
        });
    }

    buildForm(role: IRole): FormGroup {

        const group = this.formBuilder.group({
            name:            [ role.name,         [] ]
        });

        return group;

    }

}
