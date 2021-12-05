const mongoose = require("mongoose");
const Chat = require("./schema/chatSchema").ChatModel;
const dotenv = require("dotenv");

dotenv.config();

const URI = process.env.MONGO_URI;

const MongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

module.exports = class database {
  constructor(URI) {
    this.URI = URI;
    this.connection = null;
  }
  connect = async () => {
    try {
      mongoose.connect(this.URI, MongoOptions);
      this.connection = mongoose.connection;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  openStreamListener = (socket) => {
    if (this.connection === null) return;

    this.connection.once("open", async () => {
      console.log("connected to db");

      const filter = [
        {
          $match: {
            $and: [
              { "updateDescription.updatedFields": { $exists: true } },
              { operationType: "update" },
            ],
          },
        },
      ];

      Chat.watch(filter, { fullDocument: "updateLookup" }).on(
        "change",
        (data) => {
          const lengthOfMessageArray = data.fullDocument.messages.length;
          const messageAddedToArray =
            data.fullDocument.messages[lengthOfMessageArray - 1];
          // console.log("data.fullDocument.messages ==> ", messageAddedToArray);

          const messageToEmit = {
            message: messageAddedToArray.message,
            sender: messageAddedToArray.sender,
          };
          console.log(messageToEmit);
          // console.log(new Date(), data.updateDescription.updatedFields);

          socket.emit("message", messageToEmit);
        }
      );

      // await Chat.create({ name: "Main" });
    });
  };
};
