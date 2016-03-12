import Log from './log';
import JsonFormatter from './formatters/json';
import SyslogTarget from './targets/syslog';
import ConsoleTarget from './targets/console';
import StreamTarget from './targets/stream';
import Logger from './logger';

export default {
  Log,
  Logger,
  SyslogTarget,
  ConsoleTarget,
  StreamTarget,
  JsonFormatter
};
