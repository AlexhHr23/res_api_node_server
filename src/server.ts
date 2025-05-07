import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOpionts} from './config/swagger'

//Conectar a base de datos
export const connectDB = async () => {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue('Conexión exitosa a la base de datos'));
    } catch (error) {
        // console.log(error);
        console.log(colors.bgRed.white('Hubo un error al conectar a la base de datos'));
    }
}

connectDB()



const server = express()

//CORS
const corsOptions : CorsOptions = {
    origin: (origin, callback) => {
        if(origin === process.env.FRONTED_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de cors'))
        }
    }
}

server.use(cors(corsOptions))

//Leer datos
server.use(express.json())

server.use('/api/products', router)

// server.get('/api', (req, res) => {
//     res.json({msg: 'Desde API'})
// })

//Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOpionts))


export default server