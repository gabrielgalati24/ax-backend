import { response, Router } from "express";
import bcrypt from "bcryptjs";
//models
import Coach from "../models/coach.js";
import Becados from "../models/becado.js";
import User from "../models/user.js";
import {generateToken} from "../helpers/jwt.js";

export const getAllCoach = async (req, res) => {
    try {
        const coachs = await Coach.find();
        res.json({ coachs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

// const addBecados = async (req, res = response) => {
//     const { id } = req.params;
//     const { becados } = req.body;
//     try {
//         const coach = await Coach.findById(id);
//         if (!coach) {
//             return res.status(404).json({ msg: "Coach not found" });
//         }
//         coach.becados = becados;
//         await coach.save();
//         res.json({ coach });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: "Server Error" });
//     }
// }
export const createCoach = async (req, res = response) => {
  try{
    const { name, password } = req.body;

    const user = new Coach({
      name,
      password,
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
  }catch{
    res.json({
      ok: false,
      message: "ya existe un usuario con ese nombre",
     
    });
  }
};


export const addBecados = async ( req, res = response ) => {

  const { coach, becado } = req.body;
const coach1 = "620a5fe1b707d019d1275da1"
  try {
      
      const usuarioDB = await Coach.findById(coach1 );
      if ( !usuarioDB ) {
          return res.status(404).json({
              ok: false,
              message: 'no encontrado'
          });
      }else{
        console.log(usuarioDB);
      }

      usuarioDB.becados.push( becado );
      await usuarioDB.save();


    //   try {
    //     const coachs = await Coach.find();
    //     // res.json({ coachs });
    //     console.log(coachs);
    // } catch (error) {
    //     console.log(error);
    //     // res.status(500).json({ msg: "Server Error" });
    // }

  //   try {
  //     const coachs = await User.find();
  //     console.log(coachs);
  // } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ msg: "Server Error" });
  // }
      
      res.json({
          ok: true,

      });


  } catch (error) {
      console.log(error);
      return res.status(500).json({
          ok: false,
          msg: 'algo salio mal :C '
      })
  }

}
// const 

// export const renewToken = async( req, res = response) => {

//   const uid = req.uid;

//   // generar un nuevo JWT, generarJWT... uid...
//   const token = await generateToken( uid );

//   // Obtener el usuario por el UID, Usuario.findById... 
//   const usuario = await User.findById( uid );

//   res.json({
//       ok: true,
//       usuario,
//       token
//   });

// }

export const deleteBecados = async (req, res = response) => {
  const { coach, becado } = req.body;
  try {
    const usuarioDB = await Coach.findById(coach);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        message: "Coach not found",
      });
    }
    const index = usuarioDB.becados.indexOf(becado);
    usuarioDB.becados.splice(index, 1);
    await usuarioDB.save();
    res.json({
      ok: true,
      usuarioDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }

}

export const getCoachById= async (req, res = response) => {
 
  const { id } = req.body;
  console.log(id);
  try {
    const coach = await Coach.findById(id);
    if (!coach) {
      return res.status(404).json({
        ok: false,
        message: "Coach not found",
      });
    }
    res.json({
      ok: true,
      coach,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

export const getAllBecados = async (req, res = response) => {
 
  try {
    const becados = await User.find();
    res.json({becados});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}