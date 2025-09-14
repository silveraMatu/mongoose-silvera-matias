import { matchedData } from "express-validator";
import UserModel from "../models/user.model.js";

export const createUser = async(req, res)=>{
    const validatedData = matchedData(req)
    try {
        const newUser = new UserModel(validatedData)

        await newUser.save()

        const secureUser = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profile: newUser.profile
        }

        res.status(201).json({ok: true, msg: "Usuario creado exitosamente", data: secureUser})
    } catch (error) {
        
        if(error.code = 11000)
            return res.status(400).json({ok: false, msg: `ese ${Object.keys(error.keyValue)} ya se encuentra en uso.`})
        
        res.status(500).json({ok: false, data: null, msg: "Error interno del servidor."})
    }
}

export const getAllUsers = async(req, res)=>{
    try {
        const users = await UserModel.find({deleted_at: null})

        if(!users.length) 
            return res.status(404).json({ok: false, msg: "la db no tiene ningún usuario.", data: null})

        const secureUsers = []

        for(const user of users){

          const {...safeUser} = user._doc

          console.log(safeUser);

           safeUser.password = "*".repeat(safeUser.password.length)

          secureUsers.push(safeUser)
        }

        res.status(200).json({ok: true, data: secureUsers})
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}

export const getUserById = async(req, res)=>{
    
    const {_id} = matchedData(req)
    
    try {
        const user = await UserModel.findOne({_id, deleted_at: null})

        if(!user) 
            return res.status(404).json({ok: false, msg: `El usuario con el ${_id} no existe.`, data: null})

        const secureUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profile: user.profile
        }


        res.status(200).json({ok: true, data: secureUser})
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}

export const updateUser = async(req, res)=>{
    
    const validatedData = matchedData(req)
    const {_id} = validatedData
    
    try {
        const user = await UserModel.findOne({deleted_at: null, _id})

        if(!user)
            return res.status(404).json({ok: false, msg: "el usuario no existe", data: null})

        Object.keys(validatedData).forEach(key=>{
            user[key] = validatedData[key]
        })
        
        await user.save()

        const secureUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profile: user.profile
        }

        res.status(200).json({ok: true, data: secureUser})

    } catch (error) {

        if(error.code = 11000)
            return res.status(400).json({ok: false, msg: `ese ${Object.keys(error.keyValue)} ya se encuentra en uso.`})

        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null })
    }
}

export const deleteUser = async(req, res)=>{
    
    const {_id} = matchedData(req)
    
    try {
        const softDeletedUser = await UserModel.findOneAndUpdate(
            {
                _id, 
                deleted_at: null
            }, 
            {
                deleted_at: new Date()
            })

        if(!softDeletedUser)
            return res.status(404).json({ok: false, msg: "usuario no encontrado", data: null})

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}