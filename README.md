# NodeJs.Logging


## Example
```js
import {Logger, Log, ConsoleTarget} from '@synccloud/logging';

const logger = new Logger();
logger.targets.add(new ConsoleTarget());
Log.setup(logger);

// log any event
Log.info(() => ({
    msg: 'Hey there',
    foo: {
        bar: 1
    }
}), (x) => `${x.message.msg} ${x.foo.bar}`)
```

## Formatting
```js
logger.formatters.add(new JsonFormatter());

// log formatted event
Log.info(() => ({
    msg: 'Hey there',
    foo: {
        bar: 1
    }
}), (x) => `${x.message.msg} ${Log.format(x.foo)}`)
```

## Trace decorator
```js
import {trace, Logger, JsonFormatter, StreamTarget} from '@synccloud/logging';
import fs from 'fs';

const traceLogger = new Logger();
traceLogger.targets.add(new StreamTarget(fs.createWriteStream('./trace.log')));
traceLogger.formatters.append(new JsonFormatter());
trace.setup(traceLogger);

class Foo {
    @trace
    bar() {
    }
}
```
