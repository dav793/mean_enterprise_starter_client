import { Component } from '@angular/core';

import { UserSessionService } from './@core/user/user-session.service';
import { SocketService } from './@shared/lib/socket-io/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    // inject services here to init even if never injected by other components
    private userSessionService: UserSessionService,
    private socketService: SocketService
  ) {}

}
