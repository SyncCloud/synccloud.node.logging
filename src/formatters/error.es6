
export default class ErrorFormatter {
  canFormat(obj) {
    return obj instanceof Error;
  }

  format(err) {
    const lines = ['' + (err.stack || err)];

    if (err.cause) {
      if (err.cause instanceof Error) {
        lines.push('-> Caused by:');
        lines.push('    ' +
          this.format(err.cause)
            .replace(/\r/g, '')
            .replace(/\n/g, '\n    '));
        lines.push('<- /Caused by');
      }
    }
    if (err.inner && Array.isArray(err.inner) && err.inner.length > 0) {
      for (let i = 0, ii = err.inner.length; i < ii; ++i) {
        const inner = err.inner[i];
        lines.push(`-> Inner error #${i}:`);
        lines.push(this.format(inner)
          .replace(/\r/g, '')
          .replace('\n', '\n    '));
        lines.push(`<- /Inner error #${i}`);
      }
    }
    if (err.amqpStack) {
      lines.push('AMQP state stack:');
      lines.push(('' + err.amqpStack)
        .replace(/\r/g, '')
        .replace(/\n/g, '\n    '));
    }
    if (err.stackAtStateChange) {
      lines.push('AMQP state stack:');
      lines.push(('' + err.stackAtStateChange)
        .replace(/\r/g, '')
        .replace(/\n/g, '\n    '));
    }
    return lines.join('\n');
  }
}
