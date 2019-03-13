const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const db = admin.firestore();
async function getAllClient() {
  const clientesRef = await db.collection("clientes").get();
  const clientes = clientesRef.docs.map(cliente => cliente.data());
  console.log(clientes);

  return clientes;
}

async function insertUpdateClients(req, h) {
  const csv = await readCsv();
  console.log(csv);
  return csv;
  // console.log(results);
  // return results;
}

async function readCsv() {
  const results = [];
  fs.createReadStream("../api/uploads/terceros.csv")
    .pipe(csv(["NIT", "SUCURSAL", "NOMBRE"]))
    .on("data", data => results.push(data))
    .on("end", () => console.log(results));

  return results;
}

async function saveClientes(cliente) {
  console.log(cliente);
  await db.collection("clientes").add(cliente);
}

module.exports = {
  getAllClient,
  insertUpdateClients
};
