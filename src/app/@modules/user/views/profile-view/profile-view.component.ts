import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subject, of, combineLatest, merge, throwError} from 'rxjs';
import {
	switchMap,
	startWith,
	distinctUntilChanged,
	tap,
	takeUntil,
	map,
	filter,
	first, mergeMap
} from 'rxjs/operators';

import { excludeFalsy } from '../../../../@shared/helpers/operators/exclude-falsy';

import { IUser } from '../../../../@core/user/user.model';
import { IUserGroup } from '../../../../@core/user-group/user-group.model';
import { IRole } from '../../../../@core/role/role.model';

import { CoreStoreService } from '../../../../@core/store/core-store';
import { UserStoreService } from '../../store/user-store';

import {
  IToolbarConfig,
  IToolbarEvent,
  ToolbarItemAlignment,
  ToolbarItemType
} from '../../../../@shared/components/toolbar/toolbar.interface';
import {IActionMetadata} from '../../../../@shared/helpers/utils/store-action-metadata-factory';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit, OnDestroy {

    userId$: Observable<string|null>;
    user$: Observable<IUser>;
    userGroups$: Observable<{ [key: string]: IUserGroup }>;
    roles$: Observable<{ [key: string]: IRole }>;

    userId: string;
    user: IUser;

    protected userFormValue: any;
    protected revert$ = new Subject<void>();

    protected onDestroy$ = new Subject<void>();
    protected isLoading = true;

    toolbarConfig: IToolbarConfig = {
        label: 'Perfil de Usuario',
        itemAlignment: ToolbarItemAlignment.RIGHT,
        items: {
            save: {
                type: ToolbarItemType.BUTTON,
                label: 'guardar',
                classes: ['primary', 'size-sm'],
                isHidden: true
            },
            revert: {
                type: ToolbarItemType.BUTTON,
                label: 'revertir',
                classes: ['warn', 'size-sm'],
                isHidden: true
            }
        }
    };

    constructor(
        private coreStore: CoreStoreService,
        private userStore: UserStoreService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.preloadData().pipe(
            takeUntil(this.onDestroy$),
            switchMap(() => this.loadUser())
        ).subscribe(() => this.isLoading = false);
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    preloadData(): Observable<boolean> {

		this.coreStore.loadAllUserGroups();
		this.userGroups$ = this.coreStore.selectAllUserGroups().pipe(
			distinctUntilChanged()
		);

        this.coreStore.loadAllRoles();
        this.roles$ = this.coreStore.selectAllRoles().pipe(
            distinctUntilChanged()
        );

        return this.roles$.pipe(
            switchMap(roles => of(true))
        );

    }

    /**
     *  this method should be the only responsible for setting the following class properties:
     *    - userId$
     *    - userId
     *    - user$
     *    - user
     */
    loadUser(): Observable<IUser> {

        this.userId$ = this.getUserIdFromRouteOrSession();

        return this.userId$.pipe(

            takeUntil(this.onDestroy$),

            tap(() => this.coreStore.loadAllUsers()),
            tap(uid => {
                this.userId = uid;
                this.user$ = this.coreStore.selectUser(uid)
                    .pipe(excludeFalsy);
            }),

            switchMap(() => this.user$.pipe(
                tap((user) => this.user = user),
                tap(() => this.onUserFormDirtyChange(false))    // set dirty: false
            ))

        );

    }

    saveUser(userId: string, userFormValue: any) {
        if (!userFormValue)
          return;

        const actionMetadata: IActionMetadata = this.coreStore.updateUser(userId, userFormValue);

        // si servidor responde con exito
        const successHandler = this.userStore.selectUserUpdate().pipe(
            filter(state => state.successEventId === actionMetadata.eventId),
            takeUntil(this.onDestroy$),
            first()
        );

        // si servidor responde con error
        const errorHandler = this.userStore.selectUserUpdate().pipe(
            filter(state => state.errorEventId === actionMetadata.eventId),
            takeUntil(this.onDestroy$),
            first(),
			mergeMap(state => {
				const err = new Error();
				err.name = actionMetadata.errorCode;
				return throwError(err);
			}),
        );

        merge([successHandler, errorHandler]).pipe(
			takeUntil(this.onDestroy$),
			first()
		).subscribe(
			() => {},		// manejar exito
			err => {}		// manejar error
		);
    }

    onToolbarEvent(e: IToolbarEvent) {
        switch (e.itemName) {
            case 'save':
                this.onToolbarSubmit();
                break;
            case 'revert':
                this.onToolbarRevert();
                break;
        }

    }

    onToolbarSubmit() {
        if (this.userFormValue)
            this.saveUser(this.userId, this.userFormValue);
    }

    onToolbarRevert() {

        this.revert$.next();

        this.updateToolbarConfigItem('revert', {
            isHidden: true
        });

    }

    onUserFormChange(value: any) {
        if (!value)
            this.userFormValue = null;
        else
            this.userFormValue = value;
    }

    onUserFormValidChange(valid: boolean) {
        this.updateToolbarConfigItem('save', {
            isDisabled: !valid
        });
    }

    onUserFormDirtyChange(dirty: boolean) {
        this.updateToolbarConfigItem('revert', {
            isHidden: !dirty
        });

        this.updateToolbarConfigItem('save', {
            isHidden: !dirty
        });
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

    /**
     *  create an observable which emits the latest value merged from the router param 'id' and the session state in store
     *
     *  the router param has priority; that is if router param is present, always emits the router param.
     */
    getUserIdFromRouteOrSession(): Observable<string> {

        const sessionUid$ = this.coreStore.selectSessionUser().pipe(
            map(user => user ? user._id : null),
            startWith(null)
        );

        const routerUid$ = this.route.params.pipe(
            map(params => params.id),
            startWith(null)
        );

        return combineLatest(sessionUid$, routerUid$).pipe(
            map(([sessionUid, routerUid]) => {
                if (routerUid)
                    return routerUid;
                else if (sessionUid)
                    return sessionUid;
                else
                    return null;
            }),
            excludeFalsy,
            distinctUntilChanged()
        );

    }

}
