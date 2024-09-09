export class MessageBroker<I, O> {
  private listeners: {[key: string]: Array<(data?: I) => O>} = {};
  on(event: string, callback: (data?: I) => O) {
    const events = Object.keys(this.listeners);
    if(!events.includes(event)) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  send(event: string, data?: I) {
    if(!this.listeners[event]) return
    this.listeners[event].forEach(callback => callback(data));
  }
}