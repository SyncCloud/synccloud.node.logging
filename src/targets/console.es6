import {padRight} from 'lodash';
import {indent} from '../util';
import colors from 'colors';

const DATETIME_FORMAT = 'DD-MM HH:mm:ss.SSSSSSSSS';

export default class ConsoleTarget {
  //noinspection JSMethodCanBeStatic
  post(event) {
    const level = event.level;
    const timestamp = event.timestamp.format(DATETIME_FORMAT);
    const text = event.text;

    let color = null;
    let method = console.log.bind(console);

    switch (event.level) {
      case 'info':
        color = colors.green.bind(colors);
        break;
      case 'trace':
        color = colors.gray.bind(colors);
        break;
      case 'debug':
        color = colors.magenta.bind(colors);
        break;
      case 'error':
        color = colors.red.bind(colors);
        method = console.warn.bind(console);
        break;
      case 'warning':
        color = colors.yellow.bind(colors);
        method = console.warn.bind(console);
        break;
    }

    if (text) {
      if (color) {
        method(
          color(`${padRight(level.toUpperCase(), 10)} [${timestamp}]`)
          + `\n  ${indent(text, '  ')}\n`);
      }
      else {
        method(
          `${padRight(level.toUpperCase(), 10)} [${timestamp}]`
          + `\n  ${indent(text, '  ')}\n`);
      }
    }
  }
}
