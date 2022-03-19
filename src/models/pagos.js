// import {Schema,model} from 'mongoose'
import mongoose from 'mongoose';
const { Schema , model} = mongoose;
const pagoSchema =  new Schema({
    url:{
        type:String,
        required:true,
        unique:true
      
    },

});
//   const Blog = mongoose.model('Blog', blogSchema);
export default model('Pegado', pagoSchema);