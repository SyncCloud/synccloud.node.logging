export default class FunctionFormatter {
  canFormat(obj) {
    return typeof (obj) === 'function';
  }

  format(obj) {
    return 'Function' + (obj.name ? ' ' + obj.name : '');
  }
}
