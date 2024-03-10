const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", true);

async function connectToDatabase() {
  try {
    console.log(colors.yellow("Establishing connection to the database"));
    await mongoose.connect(
      "mongodb://localhost:27017/" + "chats-messages",
    )

    console.log(colors.cyan("MongoDB connected"));

  } catch (error) {
    console.error(colors.red("Message Error: ") + error.message + "\n", error);
  }
}

module.exports = connectToDatabase;
