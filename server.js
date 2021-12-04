const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const socket = require("./socket");
const database = require("./database");

const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

const App = express();
let origin =
  process.env.NODE_ENV === "production"
    ? "https://mstream-chat.herokuapp.com"
    : "http://localhost:3000";

App.use(cors({ origin: origin, credentials: true }));
App.use(express.json());

App.use("/chat", chatRoutes);

App.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  console.log("im in production mode");
  App.use(express.static("client/build"));

  App.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

const server = App.listen(process.env.PORT || 4000, () => {
  console.log(server.address().address);
});

const IO = socket.initialiseSocket(server, origin);
const mongoDatabase = new database(process.env.MONGO_URI);
mongoDatabase.connect();
mongoDatabase.openStreamListener(IO);

module.exports = App;
