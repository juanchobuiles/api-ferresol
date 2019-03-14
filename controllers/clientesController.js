const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");
const csv = require("fast-csv");
const db = admin.firestore();
async function getAllClient() {
  const clientesRef = await db.collection("clientes").get();
  const clientes = clientesRef.docs.map(cliente => cliente.data());
  return clientes;
}

async function insertUpdateClients(req, h) {
  const results = [];
  try {
    const stream = await fs.createReadStream(path.join(__dirname, '../uploads/terceros.csv'))
    const streamCsv = csv(
      {
        headers: true
      }
    )
      .on("data", data => results.push(data))
      .on('end', async () => await results.map(saveClientes))
    stream.pipe(streamCsv);
  } catch (error) {
    return h.response(error).code(500);
  }
  return h.response('Clientes actualizados').code(201);
}

async function saveClientes(cliente) {
  await db.collection("clientes").add(cliente);
}

module.exports = {
  getAllClient,
  insertUpdateClients
};
