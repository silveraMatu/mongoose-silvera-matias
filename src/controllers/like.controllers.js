import { matchedData } from "express-validator";
import LikeModel from "../models/like.model.js";

export const darLike = async(req, res)=>{
    
    const {user, video} = matchedData(req)
    
    try {
        const like = new LikeModel({user: user, video: video})

        await like.userExist()

        await like.videoExist()

        await like.save()

        res.status(201).json({ok: true, msg: "Diste like a un video", data: like})
    } catch (error) {
        if(error.code == 11000)
            return res.status(400).json({ok: false, msg: "No podes darle like al mismo video dos veces man."})

        res.status(error.statusCode || 500).json({ok: false, msg: error.msg || "Error interno del servidor", data: null})
    }
}

export const deslikearVideo = async(req, res)=>{
    
    const {user, video} = matchedData(req)
    
    try {
        const deleted = await LikeModel.findOneAndDelete({user: user, video: video})

        if(!deleted)
            return res.status(404).json({ok: false, msg: "el user o el video no existe", data: null})

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ok: false, msg:"Error interno del servidor", data: null})        
    }
}

//controller de relleno
export const getAllLikes = async(req, res)=>{
    try {
        const likes = await LikeModel.find().populate("user", "username -_id").populate("video", "title")

        if(!likes.length)
            return res.status(404).json({ok: false, msg: "No hay likes guardados en al db.", data: null})

        res.status(200).json({ok: true, data: likes})
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}