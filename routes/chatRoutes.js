const Express = require("express");
const Router = Express.Router();

const Chat = require('../schema/chatSchema');
const Message = require('../schema/messageSchema');

//route to send message
Router.post('/message', async (req, res, next) => {

  const {message} = req.body;
  console.log('message ==> ', message);

    try {
      const chat = await Chat.find({name: 'Main'});
      // if(chat) chat.messages.push(req.body);
      if(chat) await Chat.updateOne({name: 'Main'}, {$push: {messages : message}});
      if(chat)console.log(chat);

      //PersonModel.update(
      // { _id: person._id }, 
      // { $push: { friends: friend } },
      // done
      // );

    } catch (error) {
      console.log('error ==> ', error);
    }
  
    res.end();

});
module.exports = Router;
//route to get a few old messages