import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
	map
} from 'rxjs/operators';

import * as RelationModuleActions from '../actions/relation.actions';
import * as RelationActions from '../../../../@core/store/actions/relations.actions';
import { setActionMetadataErrorCode } from '../../../../@shared/helpers/utils/store-action-metadata-factory';

@Injectable()
export class RelationModuleEffects {

	constructor(
		private actions$: Actions
	) { }
	
	// --- RELATION DEFINITION ---
	
	@Effect()
	relationDefinitionUpdateSuccess$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APIUpdateRelationDefinitionSuccess),
		map((a: RelationActions.APIUpdateRelationDefinitionSuccess) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationDefinitionUpdateSuccess,
				payload: {
					relationDefinitionId: a.payload.relationDefinition._id,
					meta: a.payload.meta
				}
			};

		})
	);
	
	@Effect()
	relationDefinitionUpdateError$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APIUpdateRelationDefinitionError),
		map((a: RelationActions.APIUpdateRelationDefinitionError) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationDefinitionUpdateError,
				payload: { meta: a.payload.meta }
			};

		})
	);
	
	@Effect()
	relationDefinitionCreateSuccess$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APICreateRelationDefinitionSuccess),
		map((a: RelationActions.APIUpdateRelationDefinitionSuccess) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationDefinitionCreateSuccess,
				payload: {
					relationDefinitionId: a.payload.relationDefinition._id,
					meta: a.payload.meta
				}
			};

		})
	);
	
	@Effect()
	relationDefinitionCreateError$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APICreateRelationDefinitionError),
		map((a: RelationActions.APICreateRelationDefinitionError) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationDefinitionCreateError,
				payload: { meta: a.payload.meta }
			};

		})
	);
	
	@Effect()
	relationDefinitionDeleteSuccess$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APIDeleteRelationDefinitionSuccess),
		map((a: RelationActions.APIDeleteRelationDefinitionSuccess) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationDefinitionDeleteSuccess,
				payload: {
					relationDefinitionId: a.payload.id,
					meta: a.payload.meta
				}
			};

		})
	);
	
	@Effect()
	relationDefinitionDeleteError$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APIDeleteRelationDefinitionError),
		map((a: RelationActions.APIDeleteRelationDefinitionError) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationDefinitionDeleteError,
				payload: { meta: a.payload.meta }
			};

		})
	);
	
	@Effect()
	relationDefinitionLoadAllSuccess$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APILoadAllRelationDefinitionsSuccess),
		map((a: RelationActions.APILoadAllRelationDefinitionsSuccess) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationDefinitionLoadAllSuccess,
				payload: { meta: a.payload.meta }
			};

		})
	);
	
	@Effect()
	relationDefinitionLoadAllError$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APILoadAllRelationDefinitionsError),
		map((a: RelationActions.APILoadAllRelationDefinitionsError) => {

			const meta = setActionMetadataErrorCode(a.payload.error, a.payload.meta);
			return {
				type: RelationModuleActions.ActionTypes.RelationDefinitionLoadAllError,
				payload: { meta }
			};

		})
	);
	
	// --- RELATION INSTANCE ---

	@Effect()
	relationInstanceUpdateSuccess$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APIUpdateRelationInstanceSuccess),
		map((a: RelationActions.APIUpdateRelationInstanceSuccess) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationInstanceUpdateSuccess,
				payload: {
					relationInstanceId: a.payload.relationInstance._id,
					meta: a.payload.meta
				}
			};

		})
	);

	@Effect()
	relationInstanceUpdateError$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APIUpdateRelationInstanceError),
		map((a: RelationActions.APIUpdateRelationInstanceError) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationInstanceUpdateError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	@Effect()
	relationInstanceCreateSuccess$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APICreateRelationInstanceSuccess),
		map((a: RelationActions.APIUpdateRelationInstanceSuccess) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationInstanceCreateSuccess,
				payload: {
					relationInstanceId: a.payload.relationInstance._id,
					meta: a.payload.meta
				}
			};

		})
	);

	@Effect()
	relationInstanceCreateError$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APICreateRelationInstanceError),
		map((a: RelationActions.APICreateRelationInstanceError) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationInstanceCreateError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	@Effect()
	relationInstanceDeleteSuccess$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APIDeleteRelationInstanceSuccess),
		map((a: RelationActions.APIDeleteRelationInstanceSuccess) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationInstanceDeleteSuccess,
				payload: {
					relationInstanceId: a.payload.id,
					meta: a.payload.meta
				}
			};

		})
	);

	@Effect()
	relationInstanceDeleteError$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APIDeleteRelationInstanceError),
		map((a: RelationActions.APIDeleteRelationInstanceError) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationInstanceDeleteError,
				payload: { meta: a.payload.meta }
			};

		})
	);

	@Effect()
	relationInstanceLoadAllSuccess$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APILoadAllRelationInstancesSuccess),
		map((a: RelationActions.APILoadAllRelationInstancesSuccess) => {

			return {
				type: RelationModuleActions.ActionTypes.RelationInstanceLoadAllSuccess,
				payload: { meta: a.payload.meta }
			};

		})
	);

	@Effect()
	relationInstanceLoadAllError$ = this.actions$.pipe(
		ofType(RelationActions.ActionTypes.APILoadAllRelationInstancesError),
		map((a: RelationActions.APILoadAllRelationInstancesError) => {

			const meta = setActionMetadataErrorCode(a.payload.error, a.payload.meta);
			return {
				type: RelationModuleActions.ActionTypes.RelationInstanceLoadAllError,
				payload: { meta }
			};

		})
	);

}
