// import {Schema,model} from 'mongoose'
import mongoose from 'mongoose';
const { Schema , model} = mongoose;
const inversorSchema =  new Schema({
    name:{
        type:String,
        required:true,
        unique:true
      
    },

    initial_money:{
        type:Number,
        required:true

    },

    lista_pagos:{
        type:Array,
    },
});
//   const Blog = mongoose.model('Blog', blogSchema);
export default model('Inversor', inversorSchema);