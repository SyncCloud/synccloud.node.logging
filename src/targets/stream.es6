import {padRight} from 'lodash';
import {indent} from '../util';

export default class StreamTarget {
  get stream() {
    return this._stream;
  }

  constructor(stream) {
    this._stream = stream;
  }

  /**
   *
   * @param event {LogEvent}
   */
  post(event) {
    const level = event.level;
    const timestamp = event.timestamp.format(DATETIME_FORMAT);
    const text = event.text;

    if (text) {
      this.stream.write(
        `${padRight(level.toUpperCase(), 10)} [${timestamp}]` +
        `\n  ${indent(text, '  ')}\n\n`);
    }
  }
}
