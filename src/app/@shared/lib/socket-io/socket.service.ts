import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as io from 'socket.io-client';

import { ISocketMessage, SocketMessageType, IAssignClientIdPayload } from './socket-types';
import { CoreStoreService } from '../../../@core/store/core-store';
import { ServerEventStreamService } from '../../services/server-event-stream.service';

import {environment} from '../../../../environments/environment';

@Injectable()
export class SocketService {

  protected socket: SocketIOClient.Socket;
  protected clientId: string;

  constructor(
      private coreStore: CoreStoreService,
      private serverEventService: ServerEventStreamService
  ) {
      this.socket = io(environment.socket_url);
      this.listenAssignClientIdMessage();

      this.serverEventService.stream$ = this.getServerEventStream();

      // @todo: log incoming socket messages
      this.getServerEventStream().subscribe((event: ISocketMessage) => {
          console.log(event);
      });
  }

  send(type: SocketMessageType, data: any): void {
      const socketMessage = this.createMessageObject(type, data);
      this.socket.emit('clientEvent', socketMessage);
      // @todo: log outgoing socket messages
  }

  getServerEventStream(): Observable<ISocketMessage> {
      return new Observable(subscriber => {
          this.socket.on('serverEvent', message => subscriber.next(message));
      });
  }

  /**
   * listen for incoming socket messages of type ASSIGN_CLIENT_ID,
   * when message arrives, set client id in store
   */
  protected listenAssignClientIdMessage() {
      this.getServerEventStream().pipe(

          filter((event: ISocketMessage) => event.type === SocketMessageType.ASSIGN_CLIENT_ID)

      ).subscribe((event: ISocketMessage) => {

          this.clientId = (event.data as IAssignClientIdPayload).clientId;
          this.coreStore.setClientId(this.clientId);

      });
  }

  protected createMessageObject(type: SocketMessageType, data: any): ISocketMessage {
      const msg: ISocketMessage = {
          type,
          data
      };

      if (this.clientId)
          msg.clientId = this.clientId;

      return msg;
  }

}
