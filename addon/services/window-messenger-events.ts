import { A } from '@ember/array';
import Service from '@ember/service';

export default class WindowMessengerEventService extends Service {
  registeredEvents: { [key: string]: OnEventCallback<unknown> } = {};

  targetOriginMap: { [key: string]: string } = {}; // This is set from environment config automatically

  get allowedOrigins() {
    const map = this.targetOriginMap;
    return A(
      Object.keys(map).map((key) => {
        return map[key];
      })
    );
  }

  constructor() {
    super();
    window.addEventListener('message', this._onMessage);
  }

  on<Payload>(eventName: string, callback: OnEventCallback<Payload>) {
    if (eventName in this.registeredEvents) {
      return;
    }
    this.registeredEvents[eventName] = callback;
  }

  off(eventName: string, callback: OnEventCallback<unknown>) {
    if (this.registeredEvents[eventName] === callback) {
      delete this.registeredEvents[eventName];
    }
  }

  trigger(
    eventName: string,
    message: ParsedTransmittedMessage,
    event: TransmittedMessageEvent
  ) {
    const cb = this.registeredEvents[eventName];
    if (cb) {
      cb(message, event);
    }
  }

  /**
   * Check if message origin is allowed
   *
   * @param  {String}  origin
   * @private
   * @return {Boolean}
   */

  _isOriginAllowed(origin: string) {
    return this.allowedOrigins.includes(origin);
  }

  _parseMessage(data: TransmittedMessage): ParsedTransmittedMessage | null {
    let message = null;
    if (typeof data === 'string') {
      try {
        message = JSON.parse(data);
      } catch (e) {
        /* Ignored */
      }
    }
    return message;
  }

  _onMessage = (event: TransmittedMessageEvent) => {
    if (this._isOriginAllowed(event.origin)) {
      const message = this._parseMessage(event.data);
      if (message !== null) {
        this.trigger(`from:${message.type}`, message, event);
      }
    }
    return null;
  };

  willDestroy() {
    super.willDestroy();
    // Remove event listener when this service is getting destroyed
    window.removeEventListener('message', this._onMessage);
  }
}

type TransmittedMessage = string;
export type TransmittedMessageEvent = MessageEvent<TransmittedMessage>;

export type OnEventCallback<P> = (
  message: ParsedTransmittedMessage & P,
  event: MessageEvent
) => void;

export interface ParsedTransmittedMessage {
  type: string;
}

declare module '@ember/service' {
  interface Registry {
    'window-messenger-events': WindowMessengerEventService;
  }
}
