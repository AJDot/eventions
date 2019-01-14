export default class AppConfig {
  environment: string;

  constructor() {
    this.environment = window.environment;
  }

  saveTimeout() {
    switch (this.environment) {
      case 'development':
        return 1000;
      case 'production':
        return 1000;
      case 'test':
        return 100;
    }
  }

  debounce(func, delay, context) {
    let timeout;
    return function (...args) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    }
  }

  mergeJson(...args): any {
    if (arguments.length == 0) {
      return {};
    }
    let first = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      let other = arguments[i];
      let propertyNames = Object.getOwnPropertyNames(other);
      for (var j = 0; j < propertyNames.length; j++) {
        let propertyName = propertyNames[j];
        if (propertyName === "__ob__") continue;
        let property = other[propertyName];
        if (Array.isArray(property)) {
          if (!first[propertyName]) {
            first[propertyName] = [];
          }
          first[propertyName] = first[propertyName].concat(property);
        } else if (property && typeof property == 'object') {
          if (!first[propertyName]) {
            first[propertyName] = {};
          }
          this.mergeJson(first[propertyName], property);
        } else {
          first[propertyName] = property;
        }
      }
    }
    return first;
  }
}
