"use strict";
const Hapi = require("hapi");

const server = Hapi.server({
  host: "0.0.0.0",
  port: process.env.PORT || 8080
});

const init = async () => {
  try {
    await server.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server runnig at: ${server.info.uri}`);
};

server.route({
  method: "GET",
  path: "/",
  handler: (req, h) => {
    return "Hello world!";
  }
});

init();
