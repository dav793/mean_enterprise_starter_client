import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, mergeMap, switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { excludeFalsy } from '../../../../@shared/helpers/operators/exclude-falsy';

import {IPermission, IResourcePermissions, IRole, Role} from '../../../../@core/role/role.model';
import {
  IToolbarConfig, IToolbarEvent,
  ToolbarItemAlignment,
  ToolbarItemType
} from '../../../../@shared/components/toolbar/toolbar.interface';

import { CoreStoreService } from '../../../../@core/store/core-store';
import { RoleStoreService } from '../../store/role-store';
import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

@Component({
  selector: 'app-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.css']
})
export class RoleViewComponent implements OnInit, OnDestroy {

    roles$: Observable<{ [key: string]: IRole }>;
    roles: { [key: string]: IRole };

    protected selectedRole$ = new ReplaySubject<IRole|null>(1);
    protected selectedRoleId: string;

    protected roleFormValue: any;
    protected roleFormValidChanges$ = new Subject<boolean>();
    protected roleFormDirtyChanges$ = new Subject<boolean>();

    protected permFormValue: any;
    protected permFormValidChanges$ = new Subject<boolean>();
    protected permFormDirtyChanges$ = new Subject<boolean>();

    protected formsValidChanges$ = new Subject<boolean>();
    protected formsDirtyChanges$ = new Subject<boolean>();

    protected revertForms$ = new Subject<void>();

    protected onDestroy$ = new Subject<void>();
    protected isLoading = true;

    toolbarConfig: IToolbarConfig = {
        label: 'Roles',
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
        private roleStore: RoleStoreService
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

        return this.roles$.pipe(
            tap(roles => this.roles = roles),
            tap(() => this.onRoleFormDirtyChange(false)),    // set dirty: false
            switchMap(() => {

                // reselect selected role
                if (this.selectedRoleId) {
                    const role = this.roles[this.selectedRoleId];
                    if (role)
                        this.selectRole(role);
                }

                return of(true);

            })
        );

    }

    deleteRole(selectedRoleId: string) {
        if (!selectedRoleId)
            return;

        const actionMetadata: IActionMetadata = this.coreStore.deleteRole(selectedRoleId);
    }

    saveRole(selectedRoleId: string, roleFormValue: any, permFormValue: any) {
        if (!roleFormValue || !permFormValue)
            return;

        const formValue = this.mergeFormValues(roleFormValue, permFormValue);

        let actionMetadata: IActionMetadata;
        if (selectedRoleId)
            actionMetadata = this.coreStore.updateRole(selectedRoleId, formValue);
        else
            actionMetadata = this.coreStore.createRole(formValue);

        this.handleCreateResponse(actionMetadata);

    }

    handleCreateResponse(actionMetadata: IActionMetadata) {

        // al capturar la respuesta de creacion del nuevo rol..
        this.roleStore.selectRoleCreate().pipe(
            filter(state => state.successEventId === actionMetadata.eventId),
            takeUntil(this.onDestroy$),
            first(),
            mergeMap(state => this.roles$.pipe(   // ..espere hasta recibir los nuevos roles..
                filter(roles => state.successRoleId in roles),
                first(),
                map(() => state)
            ))
        ).subscribe(state => {

            // ..y luego seleccione el rol recien creado
            const role = this.roles[state.successRoleId];
            this.selectRole(role);

        });

    }

    mergeFormValues(roleFormValue: any, permFormValue: any): any {
        const resources = this.permFormValueToResourceArray(permFormValue);
        return Object.assign({}, roleFormValue, { resources });
    }

    permFormValueToResourceArray(permissionFormValue: any): IResourcePermissions[] {

        const result = Object.keys(permissionFormValue).map(resource => {

            const perms: IPermission[] = Object.keys(permissionFormValue[resource])
                .map(action => ({
                    action,
                    level: permissionFormValue[resource][action]
                }));

            return { name: resource, permissions: perms };

        });

        return result;

    }

    selectRole(role: IRole) {
        this.selectedRoleId = role._id;
        this.selectedRole$.next(role);
    }

    deselectRole() {
        this.selectedRoleId = null;
        this.selectedRole$.next(null);
    }

    addRole() {
        const newRole = new Role({} as any).asInterface();
        this.selectedRoleId = null;
        this.selectedRole$.next(newRole);
    }

    onRoleFormChange(value: any) {
        if (!value)
            this.roleFormValue = null;
        else
            this.roleFormValue = value;
    }

    onPermFormChange(value: any) {
        if (!value)
            this.permFormValue = null;
        else
            this.permFormValue = value;
    }

    onRoleFormValidChange(valid: boolean) {
        this.roleFormValidChanges$.next(valid);
    }

    onRoleFormDirtyChange(dirty: boolean) {
        this.roleFormDirtyChanges$.next(dirty);
    }

    onPermFormValidChange(valid: boolean) {
        this.permFormValidChanges$.next(valid);
    }

    onPermFormDirtyChange(dirty: boolean) {
        this.permFormDirtyChanges$.next(dirty);
    }

    listenChanges() {
        this.listenFormValidStatusChanges();
        this.listenFormDirtyStatusChanges();
        this.listenSelectedRoleChanges();
    }

    listenFormValidStatusChanges() {
        combineLatest(this.roleFormValidChanges$, this.permFormValidChanges$)
            .pipe( takeUntil(this.onDestroy$) )
            .subscribe(([roleFormIsValid, permFormIsValid]) => {
                this.formsValidChanges$.next(roleFormIsValid && permFormIsValid);
            });

        this.formsValidChanges$
            .pipe( takeUntil(this.onDestroy$) )
            .subscribe(isValid => {

                this.updateToolbarConfigItem('save', {
                    isDisabled: !isValid
                });

            });
    }

    listenFormDirtyStatusChanges() {
        combineLatest(this.roleFormDirtyChanges$, this.permFormDirtyChanges$)
            .pipe( takeUntil( this.onDestroy$ ) )
            .subscribe(([roleFormIsDirty, permFormIsDirty]) => {
                this.formsDirtyChanges$.next(roleFormIsDirty || permFormIsDirty);
            });

        this.formsDirtyChanges$
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

    listenSelectedRoleChanges() {
        this.selectedRole$
            .pipe( takeUntil(this.onDestroy$) )
            .subscribe((role: IRole|null) => {
                if (role && role._id)
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
        if (this.roleFormValue && this.permFormValue)
            this.saveRole(this.selectedRoleId, this.roleFormValue, this.permFormValue);
    }

    onToolbarRevert() {
        this.revertForms$.next();

        this.updateToolbarConfigItem('revert', {
            isHidden: true
        });
    }

    onToolbarDelete() {
        if (!this.selectedRoleId)
            return;

        this.deleteRole(this.selectedRoleId);
        this.deselectRole();
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
