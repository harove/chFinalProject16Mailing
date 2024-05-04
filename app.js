import express from 'express'
import { apiRouter } from './src/routers/api/api.router.js'
import handlebars from 'express-handlebars'
import { webRouter } from './src/routers/web/web.Router.js'
import {Server} from 'socket.io'
import connectMongo from 'connect-mongo'
import { messagesManager } from './src/dao/index.js'
import session from 'express-session'
// import { sesiones } from './middlewares/sesiones.js'
import { passportInitialize } from './src/middlewares/autenticaciones.js'
import { cookies } from './src/middlewares/cookies.js'
import 'dotenv/config'
import { productsService } from './src/services/products.service.js'
import { manejoDeErrores } from './src/middlewares/manejoDeErrores.js'
import { MONGODB_CNX_STR } from './src/config/config.js'
import { logger } from './src/utils/logger2.js'
import path from 'path';

// import {  } from './midlewares/midlewares.js'

const PORT = process.env.PORT

const store = connectMongo.create({
    mongoUrl: MONGODB_CNX_STR,
    ttl:60
})

const app = express()


app.use(cookies)
app.use(passportInitialize)
//motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './views')

app.use(express.static('./public'))
app.use(express.static('./views'))
app.use('/static', express.static('./static'))
app.use(express.static('./client/build'))

// app.use(sesiones)


// Route handler for the root path or any other desired path
app.get('/', (req, res) => {
    // Read the React app's entry point HTML file
    const indexPath = './client/build/index.html';
    res.sendFile('./client/build/index.html');
  });


//Para saber en que puerto esta funcionando.
const server = app.listen(PORT, ()=> {
    logger.info(`Server ON: ${PORT}`)
})

const webSocketServer = new Server(server)

app.use((req,res,next)=>{
    res['newProduct'] = async()=>{
        const products = await productsService.find({})
        webSocketServer.emit('newProduct', {products} )
    }
    next()
})



//Routers
app.use('/api',apiRouter)
app.use('/',webRouter)



app.use(manejoDeErrores)


app.use((req, res, next) => {
    res.status(404).send('Not Found');
});


webSocketServer.on('connection', async (socket) => {
    socket.broadcast.emit('nuevoUsuario', socket.handshake.auth.username)

    socket.emit('mensajes', await messagesManager.find().lean())

    socket.on('mensaje', async mensaje => {
    try {
        await messagesManager.create({ 
            user: socket.handshake.auth.username, 
            message: mensaje.mensaje 
        })
    } catch (error) {
        console.error('Error creating message:', error.message);
    }

        webSocketServer.emit('mensajes', await messagesManager.find().lean())
    })


    socket.on('disconnecting', () => {
        socket.broadcast.emit('usuarioDesconectado', socket.handshake.auth.username)
    })
})