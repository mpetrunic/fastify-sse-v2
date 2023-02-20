# Fastify SSE Plugin
![CI check](https://github.com/NodeFactoryIo/fastify-sse-v2/workflows/CI%20check/badge.svg?branch=master)
[![npm version](https://badge.fury.io/js/fastify-sse-v2.svg)](https://badge.fury.io/js/fastify-sse-v2)

Fastify plugin for sending [Server-sent events](https://en.wikipedia.org/wiki/Server-sent_events).

For `fastify@2.x` use [fastify-sse-v2@1.x](https://github.com/NodeFactoryIo/fastify-sse-v2/tree/1.x)!

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
    res.sse((async function * source () {
          for (let i = 0; i < 10; i++) {
            sleep(2000);
            yield {id: String(i), data: "Some message"};
          }
    })());
});
```
#### Sending individual events

```javascript
import {FastifySSEPlugin} from "fastify-sse-v2";

const server = fastify();
server.register(FastifySSEPlugin);

server.get("/", async function (req, res) {
    for (let i = 0; i < 10; i++) {
      await sleep(2000);
      res.sse({id: String(i), data: "Some message"});
    }
});

fastify.get('/listenForChanges', {}, (request, reply) => {
    const listenStream = fastify.db.watch('doc-uuid')
        .on('data', (data)=>reply.sse({ data: JSON.stringify(data) }))
        .on('delete', () => reply.sse({ event: 'close' }))
    request.socket.on('close', ()=>listenStream.end())
})
```

##### Sending events from EventEmmiters

* [not supported in all nodejs versions](https://nodejs.org/api/events.html#events_events_on_emitter_eventname_options)

```javascript
import {FastifySSEPlugin} from "fastify-sse-v2";
import {on} from "events";

const server = fastify();
server.register(FastifySSEPlugin);

server.get("/", function (req, res) {
    res.sse(
  (async function* () {
    for await (const [event] of on(eventEmmitter, "update")) {
      yield {
        event: event.name,
        data: JSON.stringify(event),
      };
    }
  })()
);
});
```


##### Note
- to remove event listeners (or some other cleanup) when client closes connection,
 you can listen on connection closing event: `request.socket.on('close', () => abortController.abort());
`

