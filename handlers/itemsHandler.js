const Joi = require("joi");
const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const itemsController = require("../controllers/itemsController");
const plugin = {
  name: "itemsHandler",
  version: "1.0.0",
  register: (server, options) => {
    server.route([
      {
        method: "GET",
        path: "/items",
        handler: itemsGetAll
      },
      {
        method: ["PUT", "POST"],
        path: "/items",
        config: {
          payload: {
            maxBytes: 209715200,
            output: "stream",
            parse: false,
            allow: "multipart/form-data"
          }
        },
        handler: itemsInsertUpdate
      }
    ]);
  }
};

async function itemsGetAll(req, h) {
  const clients = await itemsController.getAllItems();
  return clients;
}

async function itemsInsertUpdate(req, h) {
  return await itemsController.insertUpdateItems(req, h);
}

module.exports = plugin;
