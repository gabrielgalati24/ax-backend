import express from 'express';

// const cors = require('cors');
import morgan from 'morgan';
import cors from 'cors';
import dbConexion from '../database/config.js';
// import {SocketServerPrueba} from './sockets/socket.js';

// import socket from 'socket.io';

//rutas import  

import authRoutes from './routes/auth.js';
const app = express();

const port = process.env.PORT || 5000;

//conect to DB
dbConexion();


app.use(cors());
app.options("*", cors());

app.get('/', (req, res) => {
    res.send('el poder de la amistad!!!');
})

//parse body
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/auth', authRoutes);
const  ServerSocket = app.listen(port,() => {
     console.log(`app is listening to port ${port}`);
})

// const io = socket(ServerSocket,{
//         cors: {
//         origin: '*',	
//         methods: ["GET", "POST"]
//       }
  
 
// });

// SocketServerPrueba(io);

