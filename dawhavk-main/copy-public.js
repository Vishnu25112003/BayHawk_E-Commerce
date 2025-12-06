const fs = require("fs-extra");
const path = require("path");

const source = path.join(__dirname, "public");
const destination = path.join(__dirname, "out", "public");

fs.copy(source, destination)
  .then(() => console.log("Public folder copied to the build output."))
  .catch((err) => console.error("Error copying public folder:", err));