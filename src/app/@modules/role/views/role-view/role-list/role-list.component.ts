import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {IRole, Role} from '../../../../../@core/role/role.model';

import Utils from '../../../../../@shared/helpers/utils/utils';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit, OnDestroy, OnChanges {

    @Input() roles$: Observable<{ [key: string]: IRole }>;
    @Output() selectRole = new EventEmitter<IRole>();
    @Output() addRole = new EventEmitter<void>();

    roles: IRole[];

    protected onDestroy$ = new Subject<void>();

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.roles$ && this.roles$) {
            this.loadData();
        }
    }

    loadData() {
        this.roles$.pipe(
            takeUntil(this.onDestroy$)
        ).subscribe((roles) => this.roles = Utils.objectToArray(roles));
    }

    clickRole(role: IRole) {
        this.selectRole.emit(role);
    }

    addRoleButtonClick() {
        this.addRole.emit();
    }

}
