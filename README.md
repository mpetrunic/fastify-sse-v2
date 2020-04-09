# Fastify SSE Plugin
![CI check](https://github.com/NodeFactoryIo/fastify-sse-v2/workflows/CI%20check/badge.svg?branch=master)

Fastify plugin for sending [Server-sent events](https://en.wikipedia.org/wiki/Server-sent_events).

### How to use?

```terminal
yarn add fastify-sse-v2
```
Register fastify-sse-v2 plugin into your fastify instance:
```javascript
import {FastifySSEPlugin} from "fastify-sse-v2";

const server = fastify();
server.register(FastifySSEPlugin);
```

#### Sending events from AsyncIterable source

```javascript
import {FastifySSEPlugin} from "fastify-sse-v2";

const server = fastify();
server.register(FastifySSEPlugin);

server.get("/", function (req, res) {
    res.sse(async function * source () {
          for (let i = 0; i < 10; i++) {
            sleep(2000);
            yield {id: String(i), data: "Some message"};
          }
    });
});
```

##### Sending events from EventEmmiters

```javascript
import {FastifySSEPlugin} from "fastify-sse-v2";
import EventIterator from "event-iterator";

const server = fastify();
server.register(FastifySSEPlugin);

server.get("/", function (req, res) {
    res.sse(new EventIterator(
                ({ push }) => {
                  this.addEventListener("some_event", push)
                  return () => this.removeEventListener("some_event", push)
                }
        )
    );
});
```