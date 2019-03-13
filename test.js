const fs = require("fs");
const csv = require("csv-parser");
const results = [];
fs.createReadStream("./uploads/terceros.csv")
  .pipe(csv({ separator: ";" }))
  .on("data", data => results.push(data))
  .on("end", function() {
    console.log(results);
  });
