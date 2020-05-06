const mongoose = require("mongoose");
const dbURL = require("./properties");

let openConnection = () => {
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);
    mongoose.connect(dbURL.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`Conexión a mongodb activa ${dbURL.DB}`);
    }).catch((err) => {
        console.log(`La conexión tiene un error ${err}`)
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`Mongo se ha desconectado`);
            process.exit(0);
        });
    });
}

module.exports = {
    openConnection: openConnection
};