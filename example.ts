import {FastifySSEPlugin} from "./src";
import fastify from "fastify";

const server = fastify();
server.register(FastifySSEPlugin);

server.get("/", async function (req, res) {
  res.sse({id: "1", data: "Some message"});
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.sse({id: "2", data: "Some message"});
    await new Promise((resolve) => setTimeout(resolve, 1000));

  res.sse({id: "3", data: "Some message"});
    await new Promise((resolve) => setTimeout(resolve, 1000));

  res.sse({id: "4", data: "Some message"});
  throw new Error("Some error after sending SSE");
});

server.listen(4000, "127.0.0.1");
