const mongoose = require("mongoose");

function test() {
  mongoose
    .connect(`mongodb://localhost:27017`, {})
    .then(() => console.log("MongoDB connection established."))
    .catch((error) =>
      console.error("MongoDB connection failed:", error.message)
    );
}
test();
