export function indent(str, prefix) {
  return str.replace(/\r/g, '').replace(/\n/g, '\n' + prefix);
}
