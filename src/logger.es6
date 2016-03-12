import FunctionFormatter from './formatters/function';
import MomentFormatter from './formatters/moment';
import ErrorFormatter from './formatters/error';
import LogEvent from './log-event';

export default class Logger {
  get targets() {
    return this._targets;
  }

  get formatters() {
    return this._formatters;
  }

  constructor() {
    this._targets = new TargetCollection();
    this._formatters = new FormatterCollection();
  }

  format(obj) {
    if (obj === void 0) {
      return '<VOID 0>';
    }
    if (obj === null) {
      return '<NULL>';
    }

    const formatter = this.formatters
      .firstOrDefault(x => x.canFormat(obj));

    if (formatter) {
      return formatter.format(obj);
    }

    return obj.toString();
  }

  info(messageFn, reprFn) {
    return this.post('info', messageFn, reprFn);
  }

  trace(messageFn, reprFn) {
    return this.post('trace', messageFn, reprFn);
  }

  debug(messageFn, reprFn) {
    return this.post('debug', messageFn, reprFn);
  }

  error(messageFn, reprFn) {
    return this.post('error', messageFn, reprFn);
  }

  warning(messageFn, reprFn) {
    return this.post('warning', messageFn, reprFn);
  }

  post(level, messageFn, reprFn) {
    const event = new LogEvent(level, messageFn, reprFn);

    try {
      this._postMulti(event);
    }
    catch (exc) {
      console.warn('Failed to log an event:');
      console.error(exc.stack || exc);
    }
  }

  _postMulti(event) {
    this.targets.forEach((target) => {
      target.post(event);
    });
  }
}

class TargetCollection {
  get targets() {
    return this._targets;
  }

  constructor() {
    this._targets = [];
  }

  add(target) {
    this._targets.push(target);
  }

  forEach(action) {
    this.targets.forEach(action);
  }
}

class FormatterCollection {
  get formatters() {
    return this._formatters;
  }

  constructor() {
    this._formatters = [
      new ErrorFormatter,
      new MomentFormatter,
      new FunctionFormatter
    ];
  }

  prepend(formatter) {
    this._formatters.unshift(formatter);
  }

  append(formatter) {
    this._formatters.push(formatter);
  }

  firstOrDefault(predicateFn) {
    const formatters = this.formatters;
    for (let i = 0, ii = formatters.length; i < ii; ++i) {
      const formatter = formatters[i];
      if (predicateFn(formatter)) {
        return formatter;
      }
    }
    return null;
  }
}

