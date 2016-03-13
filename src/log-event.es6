import moment from 'moment';
import stringify from 'json-stringify-safe';
import {decorate, enumerable, lazyInitialize, nonenumerable} from 'core-decorators';
import _, {memoize} from 'lodash';
import {DATETIME_FORMAT} from './constants';

const empty = () => '';

export default class LogEvent {
  timestamp = moment.utc();
  level;

  @enumerable //todo dont work
  get message() {
    return this._getMessage();
  }

  toJSON() {
    return {
      timestamp: this.timestamp.format(DATETIME_FORMAT),
      level: this.level,
      message: this.message
    }
  }

  @nonenumerable
  _messageFn = null;

  @nonenumerable
  _reprFn = null;

  @nonenumerable
  get text() {
    return this._getText();
  }

  @nonenumerable
  get json() {
    return this._stringify();
  }

  constructor(level, messageFn, reprFn) {
    this.level = level;
    this._messageFn = memoize(messageFn);
    this._reprFn = memoize(reprFn || empty);
  }

  //@decorate(memoize)
  _getMessage() {
    return this._messageFn();
  }

  //@decorate(memoize)
  _stringify() {
    try {
      return stringify(this);
    } catch (err) {
      console.error('Failed stringify event: ', err);
      console.error(err.stack);
      return '';
    }
  }

  //@decorate(memoize)
  _getText() {
    if (this._reprFn) {
      try {
        const m = this.message;
        return this._reprFn(this);
      } catch (err) {
        console.error('Failed to repr message: ', err);
        console.error(err.stack);
        return null;
      }
    } else {
      return this.json;
    }
  }
}
