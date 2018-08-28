export default class Observer {
  constructor() {
    this._messages = {};
  }

  on = (key, func) => {
    if (!this._messages[key]) {
      this._messages[key] = [func];
    } else {
      this._messages[key].push(func);
    }
  };

  emit = (key, args) => {
    if (this._messages[key]) {
      this._messages[key].forEach(func => func(args));
    }
  };

  off = (type, func) => {
    const listeners = this._messages[type];
    if (Array.isArray(listeners) && listeners.length) {
      listeners.splice(listeners.indexOf(func), 1);
    }
  };
}