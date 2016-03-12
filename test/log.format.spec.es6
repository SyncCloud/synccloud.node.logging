import _ from 'lodash';
import LogEvent from '../src/log-event';
import Logger from '../src/logger';
import Log from '../src/log';
import ConsoleTarget from '../src/targets/console';

describe('format logs', function() {

  const logger = new Logger();
  logger.targets.add(new ConsoleTarget());
  Log.setup(logger);

  it('should format', async () => {
    console.log(Log.format({a: {b: 1}}));
  });
});
