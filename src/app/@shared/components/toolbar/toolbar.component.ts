import {Component, Input, Output, OnInit, OnDestroy, OnChanges, SimpleChanges, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Subject} from 'rxjs';

import {IToolbarConfig, IToolbarEvent, IToolbarItem, ToolbarEventType} from './toolbar.interface';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy, OnChanges {

    @Input() config: IToolbarConfig;
    @Output() events$ = new EventEmitter<IToolbarEvent>();

    itemList: IToolbarItem[] = [];

    protected _destroy$ = new Subject<void>();

    constructor() {}

    ngOnInit() {}

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.config && this.config)
            this.setup();
    }

    setup() {
        this.itemList = this.getItemList();
    }

    get hasLabel(): boolean {
        if (this.config && this.config.label)
            return true;
        return false;
    }

    get hasItems(): boolean {
        if (this.config && this.config.items && Object.keys(this.config.items).length > 0)
            return true;
        return false;
    }

    getItemList(): IToolbarItem[] {
        if (!this.hasItems)
            return [];

        return Object.keys(this.config.items)
            .map(k => this.config.items[k]);
    }

    getItemNameByIndex(index: number): string {
        if (!this.hasItems)
            return null;

        if (index < 0 || index >= Object.keys(this.config.items).length)    // index is out of bounds
            return null;

        return Object.keys(this.config.items)[index];
    }

    getClassesObj(cssClasses: string[]): { [key: string]: boolean } {
        const result = {};
        if (cssClasses && cssClasses.length > 0) {
            cssClasses.forEach(c => {
                result[c] = true;
            });
        }
        return result;
    }

    onButtonClick(itemIndex: number) {

        const event = {
            type: ToolbarEventType.BUTTON_CLICK,
            itemName: this.getItemNameByIndex(itemIndex)
        };

        this.emitEvent(event);
    }

    emitEvent(e: IToolbarEvent) {
        this.events$.emit(e);
    }

}
