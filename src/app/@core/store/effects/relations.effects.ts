
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {of} from 'rxjs';
import {
	map,
	tap,
	mergeMap,
	catchError, first
} from 'rxjs/operators';

import { ofTypes } from '../../../@shared/helpers/operators/of-types';
import {loadAll} from '../../../@shared/helpers/operators/load-all';
import {updateOne} from '../../../@shared/helpers/operators/update-one';
import {createOne} from '../../../@shared/helpers/operators/create-one';
import {deleteOne} from '../../../@shared/helpers/operators/delete-one';

import { ToasterService } from '../../../@shared/lib/ngx-toastr/toaster.service';

import { RelationApiService } from '../../relation/relation-api.service';
import { IRelationDefinition } from '../../relation/relation-definition.model';
import { IRelationInstance } from '../../relation/relation-instance.model';

import * as RelationsActions from '../actions/relations.actions';
import { storeActionMetadataSingleton as ActionMetadataFactory } from '../../../@shared/helpers/utils/store-action-metadata-factory';

import { CoreStoreService } from '../core-store';

import { ErrorCode } from '../../../@shared/enums/errors';
import Util from '../../../@shared/helpers/utils/utils';

@Injectable()
export class RelationsEffects {

	constructor(
		private actions$: Actions,
		private relationApiService: RelationApiService,
		private toaster: ToasterService,
		private storeService: CoreStoreService
	) {}

	@Effect()
	serverEventUpdateRelationDefinitions = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.ServerEventUpdateRelationDefinitions),
		mergeMap((a: RelationsActions.ServerEventUpdateRelationDefinitions) => {

			let clientId = null;
			if (a.payload && a.payload.message && a.payload.message.clientId)
				clientId = a.payload.message.clientId;

			const meta = ActionMetadataFactory.create(clientId);
			meta.forceFetch = true;

			return of({
				type: RelationsActions.ActionTypes.LoadAllRelationDefinitions,
				payload: { meta }
			});

		})
	);

	@Effect()
	serverEventUpdateRelationInstances = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.ServerEventUpdateRelationInstances),
		mergeMap((a: RelationsActions.ServerEventUpdateRelationInstances) => {

			let clientId = null;
			if (a.payload && a.payload.message && a.payload.message.clientId)
				clientId = a.payload.message.clientId;

			const meta = ActionMetadataFactory.create(clientId);
			meta.forceFetch = true;

			return of({
				type: RelationsActions.ActionTypes.LoadAllRelationInstances,
				payload: { meta }
			});

		})
	);

	// --- RELATION DEFINITION ---

	@Effect()
	loadAllRelationDefinitions = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.LoadAllRelationDefinitions),
		loadAll({
			outActionSuccess: RelationsActions.ActionTypes.APILoadAllRelationDefinitionsSuccess,
			outActionError: RelationsActions.ActionTypes.APILoadAllRelationDefinitionsError,
			outActionNoOp: RelationsActions.ActionTypes.NoOp,
			storeSelector: this.storeService.selectAllRelationDefinitions.bind(this.storeService),
			apiRequest: this.relationApiService.getRelationDefinitions.bind(this.relationApiService)
		})
	);

	@Effect()
	updateRelationDefinition = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.UpdateRelationDefinition),
		mergeMap((a: RelationsActions.UpdateRelationDefinition) => {

			const toast = this.toaster.showSaving();

			return of(a).pipe(
				updateOne({
					outActionSuccess: RelationsActions.ActionTypes.APIUpdateRelationDefinitionSuccess,
					outActionError: RelationsActions.ActionTypes.APIUpdateRelationDefinitionError,
					apiRequest: this.relationApiService.putRelationDefinition.bind(this.relationApiService),
					toastId: toast.toastId
				})
			);

		})
	);

	@Effect()
	createRelationDefinition = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.CreateRelationDefinition),
		mergeMap((a: RelationsActions.CreateRelationDefinition) => {

			const toast = this.toaster.showSaving();

			return of(a).pipe(
				createOne({
					outActionSuccess: RelationsActions.ActionTypes.APICreateRelationDefinitionSuccess,
					outActionError: RelationsActions.ActionTypes.APICreateRelationDefinitionError,
					apiRequest: this.relationApiService.postRelationDefinition.bind(this.relationApiService),
					toastId: toast.toastId
				})
			);

		})
	);

	@Effect()
	deleteRelationDefinition = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.DeleteRelationDefinition),
		mergeMap((a: RelationsActions.DeleteRelationDefinition) => {

			const toast = this.toaster.showSaving();

			return of(a).pipe(
				deleteOne({
					outActionSuccess: RelationsActions.ActionTypes.APIDeleteRelationDefinitionSuccess,
					outActionError: RelationsActions.ActionTypes.APIDeleteRelationDefinitionError,
					apiRequest: this.relationApiService.deleteRelationDefinition.bind(this.relationApiService),
					toastId: toast.toastId
				})
			);

		})
	);

	// --- RELATION INSTANCE ---

	@Effect()
	loadAllRelationInstances = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.LoadAllRelationInstances),
		loadAll({
			outActionSuccess: RelationsActions.ActionTypes.APILoadAllRelationInstancesSuccess,
			outActionError: RelationsActions.ActionTypes.APILoadAllRelationInstancesError,
			outActionNoOp: RelationsActions.ActionTypes.NoOp,
			storeSelector: this.storeService.selectAllRelationInstances.bind(this.storeService),
			apiRequest: this.relationApiService.getRelationInstances.bind(this.relationApiService)
		})
	);

	@Effect()
	updateRelationInstance = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.UpdateRelationInstance),
		mergeMap((a: RelationsActions.UpdateRelationInstance) => {

			const toast = this.toaster.showSaving();

			return of(a).pipe(
				updateOne({
					outActionSuccess: RelationsActions.ActionTypes.APIUpdateRelationInstanceSuccess,
					outActionError: RelationsActions.ActionTypes.APIUpdateRelationInstanceError,
					apiRequest: this.relationApiService.putRelationInstance.bind(this.relationApiService),
					toastId: toast.toastId
				})
			);

		})
	);

	@Effect()
	createRelationInstance = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.CreateRelationInstance),
		mergeMap((a: RelationsActions.CreateRelationInstance) => {

			const toast = this.toaster.showSaving();

			return of(a).pipe(
				createOne({
					outActionSuccess: RelationsActions.ActionTypes.APICreateRelationInstanceSuccess,
					outActionError: RelationsActions.ActionTypes.APICreateRelationInstanceError,
					apiRequest: this.relationApiService.postRelationInstance.bind(this.relationApiService),
					toastId: toast.toastId
				})
			);

		})
	);

	@Effect()
	deleteRelationInstance = this.actions$.pipe(
		ofType(RelationsActions.ActionTypes.DeleteRelationInstance),
		mergeMap((a: RelationsActions.DeleteRelationInstance) => {

			const toast = this.toaster.showSaving();

			return of(a).pipe(
				deleteOne({
					outActionSuccess: RelationsActions.ActionTypes.APIDeleteRelationInstanceSuccess,
					outActionError: RelationsActions.ActionTypes.APIDeleteRelationInstanceError,
					apiRequest: this.relationApiService.deleteRelationInstance.bind(this.relationApiService),
					toastId: toast.toastId
				})
			);

		})
	);
	
	
	/**
	 * when any modification server api success event occurs,
	 * show toast message
	 */
	@Effect({dispatch: false})
	saveSuccess$ = this.actions$.pipe(
		ofTypes([
			RelationsActions.ActionTypes.APICreateRelationDefinitionSuccess,
			RelationsActions.ActionTypes.APIUpdateRelationDefinitionSuccess,
			RelationsActions.ActionTypes.APIDeleteRelationDefinitionSuccess,
			RelationsActions.ActionTypes.APICreateRelationInstanceSuccess,
			RelationsActions.ActionTypes.APIUpdateRelationInstanceSuccess,
			RelationsActions.ActionTypes.APIDeleteRelationInstanceSuccess
		]),
		tap((a: any) => {

			if (a.payload && a.payload.overrideToastId)
				this.toaster.clearById(a.payload.overrideToastId);

			this.toaster.showSaved();

		})
	);

	/**
	 * when any server api error event occurs,
	 * log error and show toast message
	 */
	@Effect({dispatch: false})
	logError$ = this.actions$.pipe(
		ofTypes([
			RelationsActions.ActionTypes.APICreateRelationDefinitionError,
			RelationsActions.ActionTypes.APIUpdateRelationDefinitionError,
			RelationsActions.ActionTypes.APIDeleteRelationDefinitionError,
			RelationsActions.ActionTypes.APILoadAllRelationDefinitionsError,
			RelationsActions.ActionTypes.APICreateRelationInstanceError,
			RelationsActions.ActionTypes.APIUpdateRelationInstanceError,
			RelationsActions.ActionTypes.APIDeleteRelationInstanceError,
			RelationsActions.ActionTypes.APILoadAllRelationInstancesError
		]),
		tap((a: any) => {

			console.error(a.payload.error);

			// @todo: log error

			if (a.payload && a.payload.overrideToastId)
				this.toaster.clearById(a.payload.overrideToastId);

			this.toaster.chooseToast(a.payload.error);

		})
	);

}
