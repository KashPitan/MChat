const express = require("express");
const dotenv = require("dotenv");
const Socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const Chat = require("./schema/chatSchema");

const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

const URI = process.env.MONGO_URI;

const App = express();
let origin = "http://localhost:3000";

App.use(cors());
App.use(express.json());

if (process.env.NODE_ENV === "production") {
  origin = "https://mstream-chat.herokuapp.com";
  App.use(express.static("client/build"));

  App.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

const server = App.listen(process.env.PORT || 4000, () => {
  if (process.env.PORT) {
    console.log(process.env.PORT);
  } else {
    console.log("listening on port 4000");
  }
});

App.use("/chat", chatRoutes);

var IO = Socket(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

IO.on("connection", (socket) => {
  console.log(`socket connection made ${socket.id}`);

  IO.on("disconnect", () => {
    console.log(`disconnected ${socket.id}`);
  });
});

const MongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(URI, MongoOptions).catch((err) => console.log(err));

const connection = mongoose.connection;

connection.once("open", async () => {
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

  Chat.watch(filter, { fullDocument: "updateLookup" }).on("change", (data) => {
    const lengthOfMessageArray = data.fullDocument.messages.length;
    const messageArray = data.fullDocument.messages[lengthOfMessageArray - 1];
    console.log("data.fullDocument.messages ==> ", messageArray);
    console.log(new Date(), data.updateDescription.updatedFields);

    IO.emit("message", messageArray);
  });

  // Insert a doc, will trigger the change stream handler above
  // console.log(new Date(), 'Inserting doc');
  // await Chat.create({ name: 'Main' });
});

module.exports = App;
