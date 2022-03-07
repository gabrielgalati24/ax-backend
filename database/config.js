import mongoose from 'mongoose';
var db = process.env.MONGO_URI || 'mongodb+srv://roll21foxy:roll21foxy-1hjsa@cluster0.b7pzy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbConexion = async () => {

    try {
        await mongoose.connect(db, {

        });
        console.log('DB conectada');
    }catch (error) { 
        console.log(error);
        console.log('Error al conectar con la DB');
    }
}


export default dbConexion;