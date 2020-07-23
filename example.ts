import {FastifySSEPlugin} from "./src";
import fastify from "fastify";

const server = fastify();
server.register(FastifySSEPlugin);

server.get("/", async function (req, res) {
  res.sse((async function * source () {
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      yield {id: String(i), data: "Some message"};
    }
  })());
});

server.listen(4000, "127.0.0.1");
