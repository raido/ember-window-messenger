import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import Service, { inject as service } from '@ember/service';
import WindowMessengerEventService, { ParsedTransmittedMessage as WindowMessengerEventsParsedTransmittedMessage, TransmittedMessageEvent } from './window-messenger-events';

export default class WindowMessengerServerService extends Service {
  @service('window-messenger-events')
  windowMessengerEvents!: WindowMessengerEventService;

  registeredResources: {
    [key: string]: OnEventCallback<unknown, unknown, unknown>;
  } = {};

  /**
   * Send response to back to client
   *
   * @param  {String}  uuid
   * @param  {Object}  payload
   * @param  {MessageEvent}  event
   * @param  {Boolean} hasError
   */
  _respond(
    uuid: string,
    payload: {} | undefined,
    event: TransmittedMessageEvent,
    hasError: boolean
  ) {
    let query = {
      id: uuid,
      type: 'ember-window-messenger-server',
      response: payload,
      error: hasError,
    };
    assert(
      "ember-window-messenger :: window-messenger-server :: cannot post respond, 'event.source' is null",
      event.source
    );
    // Not really sure why TS fails with method overload matching.
    // Related issues on Github - https://github.com/Microsoft/TypeScript/issues/30042
    //@ts-ignore
    event.source?.postMessage(JSON.stringify(query), event.origin);
  }

  /**
   * Handle message that we got from Messenger Events
   *
   * @param  {Object} message
   * @param  {Object} event
   */
  _onMessage = (
    message: WindowMessengerEventsParsedTransmittedMessage & ParsedTransmittedMessage,
    event: TransmittedMessageEvent
  ) => {
    this.trigger(
      message.name,
      (response) => {
        this._respond(message.id, response, event, false);
      },
      (response) => {
        this._respond(message.id, response, event, true);
      },
      message.query
    );
  };

  _lazyRegisterMessagesListener() {
    this.windowMessengerEvents.on(
      'from:ember-window-messenger-client',
      this._onMessage
    );
  }

  willDestroy() {
    super.willDestroy();
    this.windowMessengerEvents.off(
      'from:ember-window-messenger-client',
      this._onMessage
    );
  }

  on<Resolve, Reject, Query>(
    resourceName: string,
    callback: OnEventCallback<Resolve, Reject, Query>
  ) {
    this._lazyRegisterMessagesListener();
    this.registeredResources[resourceName] = callback;
  }

  off(
    resourceName: string,
    callback: OnEventCallback<unknown, unknown, unknown>
  ) {
    if (this.registeredResources[resourceName] === callback) {
      delete this.registeredResources[resourceName];
    }
  }

  trigger<Resolve, Reject, Q>(
    resourceName: string,
    resolve: ResolveMethod<Resolve>,
    reject: RejectMethod<Reject>,
    query: Query & Q
  ) {
    const cb = this.registeredResources[resourceName];
    if (cb) {
      cb(resolve, reject, query);
    }
  }
}

type ResolveMethod<ResolvedData> = (data?: {} & ResolvedData) => void;
type RejectMethod<RejectedData> = (data?: {} & RejectedData) => void;
type Query = {};

interface ParsedTransmittedMessage {
  id: ReturnType<typeof guidFor>;
  name: string;
  query: Query
}

export type OnEventCallback<Resolve, Reject, Q> = (
  resolve: ResolveMethod<Resolve>,
  reject: RejectMethod<Reject>,
  query: Query & Q
) => void;

declare module '@ember/service' {
  interface Registry {
    'window-messenger-server': WindowMessengerServerService;
  }
}
