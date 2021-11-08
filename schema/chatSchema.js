const { Schema, model } = require('mongoose');

const ChatSchema = new Schema({
  name: { type: String, required: true },
  messages: [{type: String }]
  //add users
});

const ChatModel = model('StreamChat', ChatSchema);

module.exports = ChatModel;