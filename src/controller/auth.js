import { response, Router } from "express";
import bcrypt from "bcryptjs";
//models
import User from "../models/user.js";
import {generateToken} from "../helpers/jwt.js";

export const getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}
export const getUser = async (req, res) => {
  console.log(req.params.id);
  console.log("232323");
    const { id } = req.body;
      try {
          const user = await User.findById(id);
          res.json(user );
      } catch (error) {
          console.log(error);
          res.status(500).json({ msg: "Server Error" });
      }
}

export const updateUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}
export const createUser = async (req, res = response) => {
  console.log(req.body);
  try{
    const { name, password,            lastName,
      email,
      phone,
      roninID,
      cedula } = req.body;

    const user = new User({
      name,
      password,
      lastName,
      email,
      phone,
      roninID,
      cedula
    });
    //encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
  
    await user.save();
  
  //generate token
      const token = await generateToken(user._id);
  
    res.json({
      ok: true,
      message: "User created",
      user,
      token,
    });
  }catch (error){
    console.log(error);
    res.json({
      ok: false,
      message: "ya existe un usuario con ese nombre",
     
    });
  }
};


export const login = async ( req, res = response ) => {

  const { name, password } = req.body;

  try {
      
      const usuarioDB = await User.findOne({ name });
      if ( !usuarioDB ) {
          return res.status(404).json({
              ok: false,
              message: 'no encontrado'
          });
      }

      // Validate password
      const validPassword = bcrypt.compareSync( password, usuarioDB.password );
      if ( !validPassword ) {
          return res.status(400).json({
              ok: false,
              message: 'La contraseña no es valida'
          });
      }


      // Generar el JWT
      const token = await generateToken( usuarioDB._id );
      
      res.json({
          ok: true,
          usuario: usuarioDB,
          user:usuarioDB,
          token
      });


  } catch (error) {
      console.log(error);
      return res.status(500).json({
          ok: false,
          msg: 'algo salio mal :C '
      })
  }

}


export const renewToken = async( req, res = response) => {

  const uid = req.uid;

  // generar un nuevo JWT, generarJWT... uid...
  const token = await generateToken( uid );

  // Obtener el usuario por el UID, Usuario.findById... 
  const usuario = await User.findById( uid );

  res.json({
      ok: true,
      usuario,
      token
  });

}