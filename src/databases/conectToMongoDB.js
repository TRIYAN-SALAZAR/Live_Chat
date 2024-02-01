const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();
mongoose.set('strictQuery', true);
async function connectToDatabase() {
    try {
        const {
            DATABASE_MONGO
        } = process.env;

        console.log(colors.yellow('Estableciendo conexion a la base de datos'));
        const connect = await mongoose.connect('mongodb://localhost:27017/' + DATABASE_MONGO);

        if (!connect) {
            throw new Error('No se pudo conectar a la base de datos');
        }
        
        console.log(colors.cyan('MongoDB connected'))
    } catch (error) {
        console.error(colors.red('Unable to connect to the database:'), error);
    }
}

module.exports = connectToDatabase;