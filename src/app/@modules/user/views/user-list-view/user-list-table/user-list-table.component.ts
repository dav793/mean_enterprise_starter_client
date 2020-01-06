import {Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {ISortPropertyMetadata} from '../../../../../@shared/helpers/utils/sort-utils';
import {IUserForView} from '../user-for-view.model';

@Component({
    selector: 'app-user-list-table',
    templateUrl: './user-list-table.component.html',
    styleUrls: ['./user-list-table.component.css']
})
export class UserListTableComponent implements OnInit, OnDestroy, OnChanges {

    @Input() users$: Observable<IUserForView[]>;
    @Input() sortParams: ISortPropertyMetadata;
    @Output() userClicked = new EventEmitter<IUserForView>();
    @Output() columnClicked = new EventEmitter<string>();
    users: IUserForView[];

    protected onDestroy$ = new Subject<void>();
    protected isReady = false;

    constructor() { }

    ngOnInit() {}

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.users$ && this.users$) {

            this.setup().subscribe(result => {
                if (result)
                    this.isReady = true;
            });

        }
    }

    setup(): Observable<boolean> {
        return this.users$.pipe(
            map(users => {
                this.users = users.map(user => Object.assign(user));
                return true;
            })
        );
    }

    clickUser(user: IUserForView) {
        this.userClicked.emit(user);
    }

    clickColumnHeader(columnName: string) {
        this.columnClicked.emit(columnName);
    }

    isSortingByProperty(property: string, direction: 'asc'|'desc') {
        if (this.sortParams && this.sortParams.property === property && this.sortParams.direction === direction)
            return true;
        return false;
    }

}
