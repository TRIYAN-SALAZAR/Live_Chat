const { app, httpServer, appWS } = require('./app');
const mongodb = require('./databases/conectToMongoDB');
const colors = require('colors');

mongodb();

function startServer() {
    console.clear();
    console.log(colors.cyan('Starting server...'));

    httpServer.listen(app.get('port'), () => {
        console.log(colors.cyan(`Server running on port ${app.get('port')}`));
    });

}

startServer();