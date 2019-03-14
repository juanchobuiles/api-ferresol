const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");
const csv = require("fast-csv");
const db = admin.firestore();
async function getAllItems() {
  const itemsRef = await db.collection("items").get();
  const items = itemsRef.docs.map(item => item.data());
  return items;
}

async function insertUpdateItems(req, h) {
  const results = [];
  try {
    const stream = await fs.createReadStream(
      path.join(__dirname, "../uploads/items.csv")
    );
    const streamCsv = csv({
      headers: true
    })
      .on("data", data => results.push(data))
      .on("end", async () => await results.map(saveitems));
    stream.pipe(streamCsv);
  } catch (error) {
    return h.response(error).code(500);
  }
  return h.response("items actualizados").code(201);
}

async function saveitems(item) {
  await db.collection("items").add(item);
}

module.exports = {
  getAllItems,
  insertUpdateItems
};
