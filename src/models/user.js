// import {Schema,model} from 'mongoose'
import mongoose from 'mongoose';
const { Schema , model} = mongoose;
const userSchema =  new Schema({
    name:{
        type:String,
        required:true,
        unique:true
      
    },

    password:{
        type:String,
        required:true

    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
  
    },
    phone:{
        type:String,
        required:true,
    },
    roninID:{
        type:String,
        required:true,
    },
    cedula:{
        type:String,
        required:true,
    },
});
//   const Blog = mongoose.model('Blog', blogSchema);
export default model('User', userSchema);