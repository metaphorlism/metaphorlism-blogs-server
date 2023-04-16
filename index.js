const app = require("./app");
const mongoose = require("mongoose");
const { DATABASE_URL, PORT } = require("./src/configs");

// connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to database . . ."))
  .catch((err) => console.log(err));

// starting up app
app.listen(PORT, () => {
  console.log(`Server is running on port: `, PORT);
});
