import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../../environments/environment';

import { SharedModule } from '../@shared/shared.module';

import { HttpOptionsFactoryService } from '../@shared/services/http-options-factory.service';

import { UserSessionService } from './user/user-session.service';
import { UserSessionProviderService } from './user/user-session-provider.service';
import { UserApiService } from './user/user-api.service';
import { UserApiServiceStub } from './user/spec/user-api.service.stub';
import { RoleApiService } from './role/role-api.service';
import { UserGroupApiService } from './user-group/user-group-api.service';
import { ContactApiService } from './contact/contact-api.service';
import { RelationApiService } from './relation/relation-api.service';

import { CoreStoreService } from './store/core-store';
import { usersReducer } from './store/reducers/users.reducer';
import { UsersEffects } from './store/effects/users.effects';
import { rolesReducer } from './store/reducers/roles.reducer';
import { RolesEffects } from './store/effects/roles.effects';
import { userGroupsReducer } from './store/reducers/user-groups.reducer';
import { UserGroupsEffects} from './store/effects/user-groups.effects';
import { contactsReducer } from './store/reducers/contacts.reducer';
import { ContactsEffects} from './store/effects/contacts.effects';
import { relationsReducer } from './store/reducers/relations.reducer';
import { RelationsEffects } from './store/effects/relations.effects';
import { sessionReducer } from './store/reducers/session.reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([UsersEffects]),
        StoreModule.forFeature('roles', rolesReducer),
        EffectsModule.forFeature([RolesEffects]),
        StoreModule.forFeature('userGroups', userGroupsReducer),
        EffectsModule.forFeature([UserGroupsEffects]),
		StoreModule.forFeature('contacts', contactsReducer),
		EffectsModule.forFeature([ContactsEffects]),
		StoreModule.forFeature('relations', relationsReducer),
		EffectsModule.forFeature([RelationsEffects]),
        StoreModule.forFeature('session', sessionReducer),
        SharedModule
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                CoreStoreService,
                UserSessionService,
                UserSessionProviderService,
                UserApiService,
                RoleApiService,
				ContactApiService,
                UserGroupApiService,
				RelationApiService
            ]
        };
    }
}
