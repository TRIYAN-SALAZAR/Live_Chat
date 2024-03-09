const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
  _id: {
    type: String,
  },
  expires: {
    type: Date,
  },
  session: {
    type: String,
  },
});

module.exports = model("Session", sessionSchema);
