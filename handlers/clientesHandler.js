const Joi = require("joi");
const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
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
        validate: {
          importedCsv: Joi.any()
            .meta({ swaggerType: "file" })
            .required()
            .allow("")
            .description("CSV file")
        },
        handler: clientAdd
      }
    ]);
  }
};

async function clietGetAll(req, h) {
  return "Hola mundo desde clientes";
}

async function clientAdd(req, reply) {
  csvFileName =
    "" +
    moment()
      .utc()
      .format("XXXX-XX-XX") +
    ".csv";
  csvFilePath = Path.resolve(".") + "/XXX/" + csvFileName;
  var file = fs.createWriteStream(csvFilePath);
  file.on("error", function(err) {
    console.log(err.message);
  });
  payload.importedCsv.pipe(file);
  payload.importedCsv.on("end", function(err) {
    if (err) {
      cb(ERROR);
    } else {
      cb(null);
    }
  });
  //   fs.createReadStream(req.payload.filename)
  //     .pipe(csv())
  //     .on("data", function(data) {
  //       console.log(data);
  //     })
  //     .on("end", function(data) {
  //       console.log("Read Finished");
  //     });
  const fileExtension = path.extname(req.payload);
  console.log(fileExtension);
  return req.payload;
}

module.exports = plugin;
