const { app, httpServer } = require("./app");
const mongodb = require("./databases/conectToMongoDB");
const colors = require("colors");

mongodb();

function startServer() {
  try {
    console.clear();
    console.log(colors.yellow("Starting server..."));

    httpServer.listen(app.get("port"), () => {
      console.clear();
      console.log(colors.cyan("Server started ヾ(•ω•`)o\n"));
      console.log(colors.cyan(`Server running on port ${app.get("port")}`));
    });
  } catch (err) {
    console.log(colors.red("Error to start server :c\n"));
    console.log(err);
  }
}

startServer();
