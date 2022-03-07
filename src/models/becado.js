// import {Schema,model} from 'mongoose'
import mongoose from 'mongoose';
const { Schema , model} = mongoose;
const becadoSchema =  new Schema({
    name:{
        type:String,
        required:true,
        unique:true
      
    },

    password:{
        type:String,
        required:true

    }
});
//   const Blog = mongoose.model('Blog', blogSchema);
export default model('Becado', becadoSchema);