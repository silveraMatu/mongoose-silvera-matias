import { matchedData } from "express-validator";
import ChannelModel from "../models/channel.model.js";
import channelModel from "../models/channel.model.js";

export const createChannel = async(req, res)=>{
    
    const validatedData = matchedData(req)
    
    try {
        const channel = new ChannelModel(validatedData)

        await channel.userExist(validatedData.user)

        await channel.save()

        res.status(201).json({ok: true, msg: "canal creado exitosamente", data: channel})
    } catch (error) {
        if(error.code == 11000){

            if(Object.keys(error.keyValue)=="user")
                return res.status(400).json({ok: false, msg: "Este usuario ya tiene un canal asignado."})
           
            return res.status(400).json({ok: false, msg: `Ese ${Object.keys(error.keyValue)} ya está en uso.`})
        }

        res.status(error.statusCode || 500).json({ok: false, msg: error.msg || "Error interno del servidor", data: null})
    }
}

export const getAllChannels = async(req, res)=>{
    try {
        const channels = await ChannelModel.find()
            .populate({
                path: "user",
                select:"username profile -_id"
            })

        if(!channels.length)
            return res.status(404).json({ok: false, msg: "No hay ningún canal dentro de la db.", data: null})
    
        res.status(200).json({ok: true, data: channels})
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno de la db.", data: null})
    }
}

export const getChannelById = async(req, res)=>{
   
    const {_id} = matchedData(req)
   
    try {
        const channel = await ChannelModel.findOne()
            .populate({
                path: "user",
                select:"username profile -_id"
            })

        if(!channel)
            return res.status(404).json({ok: false, msg: `no existe un canal con el id ${_id}`, data: null})
    
        res.status(200).json({ok: true, data: channel})
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: "Error interno de la db.", data: null})
    }
}

export const updateChannel = async(req, res)=>{
    
    const validatedData = matchedData(req)
    const {_id} = validatedData
    
    try {
        const channel = await ChannelModel.findOne({_id})
        
        if(!channel)
            return res.status(404).json({ok: false, msg: "el canal no existe", data: null})
        
        Object.keys(validatedData).forEach(key=>{
            channel[key] = validatedData[key]
        })

        if(validatedData.user)
            await channel.userExist(validatedData.user)
                
        await channel.save()

        res.status(200).json({ok: true, msg: "canal actualizado", data: channel})
    } catch (error) {

        console.log(error);

        if(error.code == 11000){

            if(Object.keys(error.keyValue)=="user")
                return res.status(400).json({ok: false, msg: "Este usuario ya tiene un canal asignado."})
           
            return res.status(400).json({ok: false, msg: `Ese ${Object.keys(error.keyValue)} ya está en uso.`})
        }

        res.status(error.statusCode || 500).json({ok: false, msg: error.msg || "Error interno del servidor", data: null})
    }
}

export const deleteChannel = async(req, res)=>{
    
    const {_id} = matchedData(req)
    
    try {
        const deleted = (await channelModel.deleteOne({_id: _id}))

        if(!deleted.deletedCount)
            return res.status(404).json({ok: false, msg: "El canal no ha sido encontrado"})
    
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}