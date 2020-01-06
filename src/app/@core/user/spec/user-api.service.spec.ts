import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';

import { UserApiService } from '../user-api.service';
import { RoleApiService } from '../../role/role-api.service';
import { LocalStorageService } from '../../../@shared/services/local-storage.service';
import { HttpOptionsFactoryService } from '../../../@shared/services/http-options-factory.service';
import { UserSessionProviderService } from '../user-session-provider.service';
import { CoreStoreService } from '../../store/core-store';
import { ServerEventStreamService } from '../../../@shared/services/server-event-stream.service';

import {usersReducer} from '../../store/reducers/users.reducer';
import {UsersEffects} from '../../store/effects/users.effects';
import {rolesReducer} from '../../store/reducers/roles.reducer';
import {RolesEffects} from '../../store/effects/roles.effects';
import {sessionReducer} from '../../store/reducers/session.reducer';
import {ToasterService} from '../../../@shared/lib/ngx-toastr/toaster.service';

describe('UserApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            ToastrModule.forRoot(),
            StoreModule.forRoot({}),
            EffectsModule.forRoot([]),
            StoreModule.forFeature('users', usersReducer),
            EffectsModule.forFeature([UsersEffects]),
            StoreModule.forFeature('roles', rolesReducer),
            EffectsModule.forFeature([RolesEffects]),
            StoreModule.forFeature('session', sessionReducer)
        ],
        providers: [
            UserApiService,
            RoleApiService,
            HttpOptionsFactoryService,
            UserSessionProviderService,
            LocalStorageService,
            CoreStoreService,
            ServerEventStreamService,
            ToasterService
        ]
    }));

    it('should be created', () => {
        const service: UserApiService = TestBed.get(UserApiService);
        expect(service).toBeTruthy();
    });
});
