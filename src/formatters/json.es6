import stringify from 'json-stringify-safe';

export default class JSONFormatter {
  constructor(options) {
    this.options = options
  }

  canFormat(obj) {
    return typeof (obj) !== 'function' && !(obj instanceof Error);
  }

  format(obj) {
      return this.options.compact
        ? stringify(obj)
        : stringify(obj, null, 2);
  }
}
