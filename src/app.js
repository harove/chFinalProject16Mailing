import express from 'express'
import { apiRouter } from './routers/api/api.router.js'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web/web.Router.js'
import {Server} from 'socket.io'
import connectMongo from 'connect-mongo'
import { messagesManager } from './dao/index.js'
import session from 'express-session'
import { MONGODB_CNX_STR  } from './config.js'
// import { sesiones } from './middlewares/sesiones.js'
import { passportInitialize } from './middlewares/autenticaciones.js'
import { cookies } from './middlewares/cookies.js'
import 'dotenv/config'
import { productsService } from './services/products.service.js'

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
// app.use(sesiones)


//Para saber en que puerto esta funcionando.
const server = app.listen(PORT, ()=> {
    console.log(`Server ON: ${PORT}`)
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