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
