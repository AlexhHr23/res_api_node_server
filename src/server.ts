import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'

//Conectar a base de datos
const connectDB = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue('Conexión exitosa a la base de datos'));
    } catch (error) {
        // console.log(error);
        console.log(colors.bgRed.white('Hubo un error al conectar a la base de datos'));
    }
}

connectDB()



const server = express()

//Leer datos
server.use(express.json())

server.use('/api/products', router)


export default server