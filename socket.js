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

  IO.on("connection", (socket) => {
    console.log(`socket connection made ${socket.id}`);

    IO.on("disconnect", () => {
      console.log(`disconnected ${socket.id}`);
    });
  });

  return IO;
};

module.exports = { initialiseSocket };
