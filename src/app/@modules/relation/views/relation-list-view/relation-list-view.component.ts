import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of, ReplaySubject, Subject, BehaviorSubject,  throwError} from 'rxjs';
import { distinctUntilChanged, filter, first, mergeMap, switchMap, takeUntil, tap, map, startWith } from 'rxjs/operators';
import { excludeFalsy } from '../../../../@shared/helpers/operators/exclude-falsy';

import {
	IRelationDefinition,
	RelationDefinition
} from '../../../../@core/relation/relation-definition.model';
import { IRelationForView } from './relation-for-view.model';

import {
	IToolbarConfig, IToolbarEvent,
	ToolbarItemAlignment,
	ToolbarItemType
} from '../../../../@shared/components/toolbar/toolbar.interface';

import { ISearchPropertyMetadata } from '../../../../@shared/components/search/search.interface';
import { ISortPropertyMetadata } from '../../../../@shared/helpers/utils/sort-utils';

import { CoreStoreService } from '../../../../@core/store/core-store';
import { RelationStoreService, IRelationStoreEventInfo } from '../../store/relation-store';
import { IActionMetadata } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

import { ErrorCode } from '../../../../@shared/enums/errors';
import { ViewStatus } from '../../../../@shared/types/view-status';

import SortUtils from '../../../../@shared/helpers/utils/sort-utils';
import Utils from '../../../../@shared/helpers/utils/utils';

@Component({
	selector: 'app-relation-list-view',
	templateUrl: './relation-list-view.component.html',
	styleUrls: ['./relation-list-view.component.scss']
})
export class RelationListViewComponent implements OnInit, OnDestroy {

	relations$: Observable<IRelationDefinition[]>;
	allRelations$ = new BehaviorSubject<IRelationForView[]>([]);
    sortedRelations$ = new BehaviorSubject<IRelationForView[]>([]);
    filteredRelations$ = new BehaviorSubject<IRelationForView[]>([]);
	pageRelations$ = new BehaviorSubject<IRelationForView[]>([]);
	
	resetSearch$ = new Subject<void>();

	sortParams: ISortPropertyMetadata;

    searchSorters: { [key: string]: ISearchPropertyMetadata } = {
		_label_description: { propType: 'string' },
		_label_entityTypeA: { propType: 'string' },
		_label_entityTypeB: { propType: 'string' },
	};

	toolbarConfig: IToolbarConfig = {
		label: 'Relaciones',
		itemAlignment: ToolbarItemAlignment.RIGHT,
		items: {
			// create: {
			// 	type: ToolbarItemType.BUTTON,
			// 	label: 'nuevo',
			// 	classes: ['success', 'size-sm'],
			// 	isHidden: true
			// }
		}
	};

	protected onDestroy$ = new Subject<void>();
	protected viewStatus: ViewStatus = 'loading';
	protected errorCode: ErrorCode;
    protected errorSig: string;

	constructor(
		private coreStore: CoreStoreService,
		private relationStore: RelationStoreService,
		private router: Router
	) { }

	ngOnInit() {
		this.loadData().pipe(
            takeUntil(this.onDestroy$)
        ).subscribe(
        	result => {
				if (result)
					this.viewStatus = 'ready';
				
				this.allRelations$.pipe(
					takeUntil(this.onDestroy$)
				).subscribe(relations => {

					this.resetSearch$.next();

					this.sortedRelations$.next(
					  this.sortParams ? [...this.sortRelations()] : [...relations]
					);
					
				});
			},
			error => {
				console.error(error);
			}
		);
	}

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	loadData(): Observable<boolean> {
		this.relations$ = this.getRelations();
		return combineLatest(this.relations$).pipe(
			mergeMap(v => this.relations$.pipe(
				map(relations => v && true))
			),
			distinctUntilChanged()
		);
	}
	
  	getRelations(): Observable<IRelationDefinition[]> {
		const meta: IActionMetadata = this.coreStore.loadAllRelationDefinitions();

		this.relationStore.selectRelationDefinitionLoadAll().pipe(
			takeUntil(this.onDestroy$),
			filter(state => state.errorEventId === meta.eventId),
			first(),
			mergeMap(state => {
				const err = new Error();
				err.name = meta.errorCode;
				return throwError(err);
			})
		).subscribe(
			() => {},
			err => {
				this.viewStatus = 'failed';
				this.errorCode = err.name;
			}
		);

		return this.coreStore.selectAllRelationDefinitions().pipe(
			distinctUntilChanged(),
			map(relations => this.addExtrasOnRelations(Utils.objectToArray(relations))),
			tap(relations => this.allRelations$.next([...relations as IRelationForView[]]))
		);
	}

	addExtrasOnRelations(relations: IRelationDefinition[]): IRelationForView[] {
        if (!relations)
            return relations as IRelationForView[];

        // add on relations the extra properties needed for this view and its children
        let relationsArray = Utils.objectToArray(relations);
		relationsArray = this.addDescriptionsOnRelations(relationsArray); 
		relationsArray = this.addAEntitiesTypeAOnRelations(relationsArray);
		relationsArray = this.addEntitiesTypeBRelations(relationsArray);
        return relationsArray;
    }

	addDescriptionsOnRelations(relations: IRelationDefinition[]): any[] {
		return relations.map(relation => {
			const currentRelation = new RelationDefinition(relation);
            return Object.assign(relation, {_label_description: currentRelation.description}); 
		});
	} 
	
	addAEntitiesTypeAOnRelations(relations: IRelationDefinition[]): any[] {
        return relations.map(relation => {
			const currentRelation = new RelationDefinition(relation);
			return Object.assign(relation, {_label_entityTypeA: currentRelation.entityTypeA });           
        });
	}

	addEntitiesTypeBRelations(relations: IRelationDefinition[]): any[] {
        return relations.map(relation => {
			const currentRelation = new RelationDefinition(relation);
			return Object.assign(relation, {_label_entityTypeB: currentRelation.entityTypeB });           
        });
	}

	onPageItemsChange(items: IRelationForView[]) {
        this.pageRelations$.next([...items]);
    }

    onSearchItemsChange(items: IRelationForView[]) {
        this.filteredRelations$.next([...items]);
    }

    navigateToRelationView(relation: IRelationForView) {
        this.router.navigate(['relations', 'view', relation._id]);
	}
	
	setActiveSort(propertyName: string) {
        if (this.sortParams && this.sortParams.property === propertyName) {
            if (this.sortParams.direction === 'desc')
                this.sortParams.direction = 'asc';
            else if (this.sortParams.direction === 'asc')
                this.unsetActiveSort(true);
        }
        else
            this.sortParams = {type: 'string', property: propertyName, direction: 'desc'};

        if (this.sortParams)
            this.sortedRelations$.next(this.sortRelations());

        this.resetSearch$.next();
    }

    unsetActiveSort(updateSortedRelations = false) {
        delete this.sortParams;
        if (updateSortedRelations)
            this.sortedRelations$.next([...this.allRelations$.value]);
    }

    sortRelations() {
        return SortUtils.sortByParams(this.sortParams, this.sortedRelations$.value);
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
