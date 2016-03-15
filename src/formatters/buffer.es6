export default class BufferFormatter {
  canFormat(obj) {
    return obj instanceof Buffer;
  }

  format(b) {
    return `Buffer[${b.length}]`;
  }
}
