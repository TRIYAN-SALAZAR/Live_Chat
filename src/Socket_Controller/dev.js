const colors = require("colors");

function socketDev(socket, appWS, app) {
  console.log(colors.cyan("User Dev connected"));

  socket.on("show-data", () => {
    console.log(appWS.engine);
  });

  socket.on("session", async (data) => {});

  socket.on("disconnect", () => {
    console.log(colors.cyan("User disconnected"));
    socket.disconnect();
  });
}

module.exports = socketDev;
