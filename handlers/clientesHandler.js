const Joi = require("joi");
const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const clientsController = require("../controllers/clientesController");
const plugin = {
  name: "clientesHandler",
  version: "1.0.0",
  register: (server, options) => {
    server.route([
      {
        method: "GET",
        path: "/clients",
        handler: clietGetAll
      },
      {
        method: ["PUT", "POST"],
        path: "/clients",
        config: {
          payload: {
            maxBytes: 209715200,
            output: "stream",
            parse: false,
            allow: "multipart/form-data"
          }
        },
        handler: clientAdd
      }
    ]);
  }
};

async function clietGetAll(req, h) {
  const clients = await clientsController.getAllClient();
  return clients;
}

async function clientAdd(req, h) {
  return await clientsController.insertUpdateClients(req, h);
}

module.exports = plugin;
