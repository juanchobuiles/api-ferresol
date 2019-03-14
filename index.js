"use strict";
const Hapi = require("hapi");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ferresol-ea8f6.firebaseio.com"
});
const server = Hapi.server({
  host: "0.0.0.0",
  port: process.env.PORT || 8080
});

const checkOrigin = origin => {
  if (origin === "http://localhost:3000") {
    return true;
  } else {
    return false;
  }
};

const init = async () => {
  try {
    await server.register(require("./handlers/clientesHandler"));
    await server.register(require("./handlers/itemsHandler"));
    await server.register({
      plugin: require("hapi-cors"),
      options: {
        checkOrigin: checkOrigin
      }
    });
    await server.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server runnig at: ${server.info.uri}`);
};

init();
