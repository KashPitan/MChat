const Express = require("express");
const Router = Express.Router();

const Chat = require("../schema/chatSchema").ChatModel;
const Message = require("../schema/chatSchema").MessageModel;

//route to send message
Router.post("/message", async (req, res, next) => {
  const { message, username } = req.body;

  try {
    const chat = await Chat.find({ name: "Main" });
    if (chat) {
      const newMessageDocument = await Message.create({
        message,
        sender: username,
      });
      await Chat.updateOne(
        { name: "Main" },
        { $push: { messages: newMessageDocument } }
      );
    }
    if (chat) console.log(chat);
  } catch (error) {
    console.log("error ==> ", error);
  }

  res.end();
});
module.exports = Router;

//route to get a few old messages upon loading app?
