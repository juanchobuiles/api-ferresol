"use strict";
const Hapi = require("hapi");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodesjs-8b7c8.firebaseio.com"
});
const server = Hapi.server({
  host: "0.0.0.0",
  port: process.env.PORT || 8080
});

const init = async () => {
  try {
    await server.register(require("./handlers/clientesHandler"));
    await server.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server runnig at: ${server.info.uri}`);
};

init();
