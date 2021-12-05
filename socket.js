const Socket = require("socket.io");

const initialiseSocket = (server, origin) => {
  const IO = Socket(server, {
    cors: {
      origin: origin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  IO.on("error", (err) => {
    console.log(err);
  });

  //listeners for only when the user is connected
  IO.on("connection", (socket) => {
    console.log(`socket connection made ${socket.id}`);

    const queryParams = socket.handshake.query;
    const { username } = queryParams;
    socket.data.username = username;
    console.log(username);

    IO.on("disconnect", () => {
      console.log(`disconnected ${socket.id}`);
    });
  });

  return IO;
};

module.exports = { initialiseSocket };
