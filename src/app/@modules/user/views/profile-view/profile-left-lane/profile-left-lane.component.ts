import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { IUser } from '../../../../../@core/user/user.model';

@Component({
  selector: 'app-user-profile-left-lane',
  templateUrl: './profile-left-lane.component.html',
  styleUrls: ['./profile-left-lane.component.scss']
})
export class ProfileLeftLaneComponent implements OnInit, OnChanges, OnDestroy {

  @Input() user$: Observable<IUser>;

  onDestroy$: ReplaySubject<void> = new ReplaySubject(1);

  constructor() { }

  ngOnInit() {}

  ngOnDestroy() {
      this.onDestroy$.next();
  }

  ngOnChanges(changes: SimpleChanges) {}

}
