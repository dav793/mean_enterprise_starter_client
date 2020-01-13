import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ISearchPropertyMetadata } from './search.interface';
import Search from './search';

/* tslint:disable */

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy, OnChanges {

    @Input() sorters: { [key: string]: ISearchPropertyMetadata } = {};
    @Input() allItems$;
    @Input() reset$;
    @Output() searchItems = new EventEmitter<any[]>();

    protected form: FormGroup;

    protected sorters$ = new BehaviorSubject<{ [key: string]: ISearchPropertyMetadata }>(this.sorters);
    protected onDestroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {

        this.form = this.buildForm();
        this.watchFormChanges();

        combineLatest(this.sorters$, this.allItems$)
            .pipe( takeUntil(this.onDestroy$) )
            .subscribe(([sorters, items]) => {
                this.doSearch('', items, sorters);
            });

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['sorters'])
            this.sorters$.next(this.sorters);

        if (changes['reset$'])
            this.reset$.pipe(
                takeUntil(this.onDestroy$)
            ).subscribe(() => this.reset());
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    buildForm(): FormGroup {
        const group = this.formBuilder.group({
            text:     [ '',       [] ]
        });

        return group;
    }

    watchFormChanges() {
        this.form.controls.text.valueChanges.pipe(
            takeUntil( this.onDestroy$)
        ).subscribe(searchStr => this.doSearch(searchStr, this.allItems$.value, this.sorters));
    }

    doSearch(searchStr: string, items: any[], sorters: { [key: string]: ISearchPropertyMetadata }): void {
        const result = Search.doWeightedSearchByString(searchStr, items, sorters);
        this.searchItems.emit(result);
    }

    reset() {
        this.form.controls.text.setValue('', { emitEvent: true });
    }

}
