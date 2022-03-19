import express from 'express';

// const cors = require('cors');
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import dbConexion from '../database/config.js';
import path,{dirname} from 'path';
// import {SocketServerPrueba} from './sockets/socket.js';

// import socket from 'socket.io';

//rutas import  

import authRoutes from './routes/auth.js';
import pagosRouters from './routes/pagos.js';
import inversoRouters from './routes/inversor.js';
const app = express();

const port = process.env.PORT || 5000;

//conect to DB
dbConexion();


app.use(cors());
app.options("*", cors());

// const storage = multer.diskStorage({
//     destination: path.join(dirname, 'public/img/uploads'),
//     filename: (req, file, cb, filename) => {
//         console.log(req.file, req.body)
//         cb(null, uuid.v4() + path.extname(file.originalname));
//     }
// })
// app.use(multer({ storage }).single('image'));

app.get('/', (req, res) => {
    res.send('el poder de la amistad!!!');
})

//parse body
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/auth', authRoutes);

// app.use('/api/pagos', pagosRouters);

app.use('/api/inversor', inversoRouters);
// app.use('/api/uploads', express.static(path.join(dirname, 'public/img/uploads')));
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

