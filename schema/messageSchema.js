const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  messages: {type: String }
});

const MessageModel = model('StreamMessages', MessageSchema);

module.exports = MessageModel;