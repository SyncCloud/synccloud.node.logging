import Log from './log';
import JsonFormatter from './formatters/json';
import SyslogTarget from './targets/syslog';
import ConsoleTarget from './targets/console';
import StreamTarget from './targets/stream';
import Logger from './logger';
import trace from './trace';

export default {
  Log,
  Logger,
  trace,
  SyslogTarget,
  ConsoleTarget,
  StreamTarget,
  JsonFormatter
};
