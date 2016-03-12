import stringify from 'json-stringify-safe';

export default class JSONFormatter {
  canFormat(obj) {
    return typeof (obj) !== 'function' && !(obj instanceof Error);
  }

  format(obj) {
    return stringify(obj, null, 2);
  }
}
