
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Form } from '@angular/forms';
import {Observable, Subject, BehaviorSubject, combineLatest} from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { IOptionType } from '../form-elements/option-type';

import Paginator from './paginator';
import Utils from '../../helpers/utils/utils';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy, OnChanges {

    @Input() pageNumber = 0;
    @Input() pageSize = 10;
    @Input() allItems$;
    @Output() pageItems = new EventEmitter<any[]>();

    protected pageSizeOptions: IOptionType[] = [
      { key: '5',   label: '5'  },
      { key: '10',  label: '10' },
      { key: '25',  label: '25' }
    ];

    protected form: FormGroup;

    protected pageNumber$ = new BehaviorSubject<number>(this.pageNumber);
    protected pageSize$ = new BehaviorSubject<number>(this.pageSize);

    protected onDestroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {

        this.form = this.buildForm();
        this.watchPageNumberFormChanges();
        this.watchPageSizeFormChanges();

        combineLatest(this.pageNumber$, this.pageSize$, this.allItems$)
            .pipe( takeUntil( this.onDestroy$ ) )
            .subscribe(([pNum, pSize, items]) => {

                if (this.currentPageExists) {
                  const page = Paginator.filterPageItems(items, pNum, pSize);
                  this.pageItems.emit(page);
                }

            });

    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes['pageNumber'])
            this.pageNumber$.next(this.pageNumber);

        if (changes['pageSize'])
            this.pageSize$.next(this.pageSize);

    }

    buildForm(): FormGroup {
        const group = this.formBuilder.group({
            pageNumber:     [ this.pageNumber.toString(10),       [] ],
            pageSize:       [ this.pageSize.toString(10),         [] ]
        });

        return group;
    }

    watchPageNumberFormChanges() {
        this.form.controls.pageNumber.valueChanges.pipe(
            takeUntil( this.onDestroy$),
            filter(x => Utils.isPositiveIntegerOrZero(x))
        ).subscribe(x => {

            if (typeof x === 'number')
                this.pageNumber = x;
            else
                this.pageNumber = parseInt(x, 10);

            this.pageNumber$.next(this.pageNumber);

        });
    }

    watchPageSizeFormChanges() {
        this.form.controls.pageSize.valueChanges.pipe(
            takeUntil( this.onDestroy$ ),
            filter(x => Utils.isPositiveIntegerOrZero(x))
        ).subscribe(x => {

            if (typeof x === 'number')
                this.pageSize = x;
            else
                this.pageSize = parseInt(x, 10);

            this.pageSize$.next(this.pageSize);

        });
    }

    onPrevPageButtonClick() {
        this.pageNumber--;
        this.form.controls.pageNumber.setValue(this.pageNumber.toString(10), { emitEvent: true });
    }

    onNextPageButtonClick() {
        this.pageNumber++;
        this.form.controls.pageNumber.setValue(this.pageNumber.toString(10), { emitEvent: true });
    }

    get prevPageExists(): boolean {
        if (this.pageNumber <= 0)
            return false;
        return true;
    }

    get nextPageExists(): boolean {
        if (!this.allItems$ || !this.allItems$.value || this.allItems$.value.length === 0)
            return false;

        const nextPageStart = Paginator.getPageStartIndex(this.allItems$.value, this.pageNumber + 1, this.pageSize);
        if (nextPageStart < this.allItems$.value.length)
            return true;

        return false;
    }

    get currentPageExists(): boolean {
        if (!this.allItems$ || !this.allItems$.value || this.allItems$.value.length === 0)
            return false;

        const currentPageStart = Paginator.getPageStartIndex(this.allItems$.value, this.pageNumber, this.pageSize);
        if (currentPageStart < this.allItems$.value.length)
            return true;
        return false;
    }

    get currentPageStart(): number {
        if (!this.allItems$ || !this.allItems$.value || this.allItems$.value.length === 0)
            return 0;

        return Paginator.getPageStartIndex(this.allItems$.value, this.pageNumber, this.pageSize);
    }

    get currentPageEnd(): number {
        if (!this.allItems$ || !this.allItems$.value || this.allItems$.value.length === 0)
            return 0;

        return Paginator.getPageEndIndex(this.allItems$.value, this.pageNumber, this.pageSize);
    }

}
