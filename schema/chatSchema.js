const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  message: { type: String, required: true },
  sender: { type: String, required: true },
});

const MessageModel = model("StreamMessages", MessageSchema);

const ChatSchema = new Schema({
  name: { type: String, required: true },
  messages: [MessageSchema],
});

const ChatModel = model("StreamChat", ChatSchema);

module.exports = { ChatModel, MessageModel };
