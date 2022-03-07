// import {Schema,model} from 'mongoose'
import mongoose from 'mongoose';
const { Schema , model} = mongoose;
const coachSchema =  new Schema({
    name:{
        type:String,
        required:true,
        unique:true
      
    },
    becados:{
        type:Array,
    },

    password:{
        type:String,
        required:true

    }
});
//   const Blog = mongoose.model('Blog', blogSchema);
export default model('Coach', coachSchema);