import { response, Router } from "express";
import bcrypt from "bcryptjs";
//models
import Coach from "../models/coach.js";
import Becados from "../models/becado.js";
import Inversor from "../models/inversor.js";
import User from "../models/user.js";
import {generateToken} from "../helpers/jwt.js";

export const getAllInversores = async (req, res) => {
    try {
        const inversores = await Inversor.find();
        res.json({ inversores });
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
export const createInversor = async (req, res = response) => {
  try{
    const { name, initial_money } = req.body;

    const user = new Inversor({
      name,
      initial_money
    });
    //encrypt password

  
    await user.save();
  
  //generate token

  
    res.json({
      ok: true,
      message: "inversor created",
      user,

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

export const getInversorById = async (req, res = response) => {
 console.log("/////////////");
  const { id } = req.body;
  console.log(id);
  try {
    const inversor = await Inversor.findById(id);
    if (!inversor) {
      return res.status(404).json({
        ok: false,
        message: "Coach not found",
      });
    }
    res.json({
      ok: true,
      inversor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

export const pagarInversor = async (req, res = response) => {
 
  console.log("/////////////");
  const { id, pago } = req.body;
  console.log(id);
  try {
    const inversor = await Inversor.findById(id);
    if (!inversor) {
      return res.status(404).json({
        ok: false,
        message: "Coach not found",
      });
    }else{
      inversor.initial_money =  inversor.initial_money - pago;
      inversor.lista_pagos.push(pago);
      await inversor.save();

      res.json({
        ok: true,
        inversor,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}