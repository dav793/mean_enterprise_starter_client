import {Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {ISortPropertyMetadata} from '../../../../../@shared/helpers/utils/sort-utils';
import {IRelationForView} from '../relation-for-view.model';

@Component({
    selector: 'app-relation-list-table',
    templateUrl: './relation-list-table.component.html',
    styleUrls: ['./relation-list-table.component.scss']
})
export class RelationDefinitionListTableComponent implements OnInit, OnDestroy, OnChanges {

    @Input() relations$: Observable<IRelationForView[]>;
    @Input() sortParams: ISortPropertyMetadata;
    @Output() relationsClicked = new EventEmitter<IRelationForView>();
    @Output() columnClicked = new EventEmitter<string>();
    relations: IRelationForView[];

    protected onDestroy$ = new Subject<void>();
    protected isReady = false;

    constructor() { }

    ngOnInit() {}

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.relations$ && this.relations$) {

            this.setup().subscribe(result => {
                if (result)
                    this.isReady = true;
            });

        }
    }

    setup(): Observable<boolean> {
        return this.relations$.pipe(
            map(relations => {
                this.relations = relations.map(relationsDef => Object.assign(relationsDef));
                return true;
            })
        );
    }

    clickRelationDefinition(relations: IRelationForView) {
        this.relationsClicked.emit(relations);
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
