import {Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {ISortPropertyMetadata} from '../../../../../@shared/helpers/utils/sort-utils';
import {IContactForView} from '../contact-for-view.model';

@Component({
    selector: 'app-contact-list-table',
    templateUrl: './contact-list-table.component.html',
    styleUrls: ['./contact-list-table.component.scss']
})
export class ContactListTableComponent implements OnInit, OnDestroy, OnChanges {

    @Input() contacts$: Observable<IContactForView[]>;
    @Input() sortParams: ISortPropertyMetadata;
    @Output() contactClicked = new EventEmitter<IContactForView>();
    @Output() columnClicked = new EventEmitter<string>();
    contacts: IContactForView[];

    protected onDestroy$ = new Subject<void>();
    protected isReady = false;

    constructor() { }

    ngOnInit() {}

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.contacts$ && this.contacts$) {

            this.setup().subscribe(result => {
                if (result)
                    this.isReady = true;
            });

        }
    }

    setup(): Observable<boolean> {
        return this.contacts$.pipe(
            map(contacts => {
                this.contacts = contacts.map(contact => Object.assign(contact));
                return true;
            })
        );
    }

    clickContact(contact: IContactForView) {
        this.contactClicked.emit(contact);
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
