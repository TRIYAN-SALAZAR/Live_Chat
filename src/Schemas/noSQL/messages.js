const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  messages: {
    type: [Object],
    default: [Object],
  },
  refChat: {
    type: String,
  },
});

module.exports = model("Message", messageSchema);
