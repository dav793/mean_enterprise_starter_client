import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// @ts-ignore
import {
  IToolbarConfig, IToolbarEvent,
  ToolbarItemAlignment,
  ToolbarItemType
} from '../../../../@shared/components/toolbar/toolbar.interface';

@Component({
  selector: 'app-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.css']
})
export class RoleViewComponent implements OnInit, OnDestroy {

  protected onDestroy$ = new Subject<void>();
  protected isLoading = true;

  toolbarConfig: IToolbarConfig = {
    label: 'Roles',
    itemAlignment: ToolbarItemAlignment.RIGHT,
    items: {
      save: {
        type: ToolbarItemType.BUTTON,
        label: 'guardar',
        classes: ['primary', 'size-sm']
      },
      revert: {
        type: ToolbarItemType.BUTTON,
        label: 'revertir',
        classes: ['warn', 'size-sm']
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onToolbarEvent(e: IToolbarEvent) {
    switch (e.itemName) {
      case 'save':
        this.onToolbarSubmit();
        break;
      case 'revert':
        this.onToolbarRevert();
        break;
    }

  }

  onToolbarSubmit() {
    console.log('toolbar submit event caught');
  }

  onToolbarRevert() {
    console.log('toolbar revert event caught');
  }

}
