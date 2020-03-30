import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './lib/material/material.module';
import { PrimengModule } from './lib/primeng/primeng.module';
import { FormElementsModule } from './components/form-elements/form-elements.module';
import { ToastrModule } from 'ngx-toastr';
import { DialogModule } from './components/dialogs/dialog.module';
import { TreeModule } from './components/tree/tree.module';

import { ToasterService } from './lib/ngx-toastr/toaster.service';
import { DialogService } from './services/dialog.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoggerService } from './services/logger.service';
import { SocketService } from './lib/socket-io/socket.service';
import { HttpOptionsFactoryService } from './services/http-options-factory.service';
import { ServerEventStreamService } from './services/server-event-stream.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchComponent } from './components/search/search.component';
import { TreeComponent } from './components/tree/tree.component';
import { ErrorComponent } from './components/error/error.component';
import { TruncateStringPipe } from './pipes/truncate-string.pipe';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule.forRoot(),
      PrimengModule,
      FormElementsModule,
      DialogModule.forRoot(),
      ToastrModule.forRoot(),
	  TreeModule
  ],
  exports: [
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      FormElementsModule,
      ToolbarComponent,
      PaginatorComponent,
      SearchComponent,
	  TreeComponent,
	  ErrorComponent,
      TruncateStringPipe
  ],
  declarations: [
      ToolbarComponent,
      PaginatorComponent,
      SearchComponent,
	  ErrorComponent,
	  TruncateStringPipe
  ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                LocalStorageService,
                LoggerService,
                ToasterService,
                DialogService,
                HttpOptionsFactoryService,
                SocketService,
                ServerEventStreamService
            ]
        };
    }
}
