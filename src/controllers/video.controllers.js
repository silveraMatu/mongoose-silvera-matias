import { matchedData } from "express-validator";
import VideoModel from "../models/video.model.js";
import videoModel from "../models/video.model.js";

export const submitVideo = async(req, res)=>{
    
    const validatedData = matchedData(req)
    
    try {
        const newVideo = new VideoModel(validatedData)

        await newVideo.channelExist(validatedData.author)

        await newVideo.save()

        res.status(201).json({ok: true, msg: "Video subido con éxito", data: newVideo})
    } catch (error) {
        res.status(error.statusCode||500).json({ok: false, msg: error.msg || "Erroor interno del servidor", data: null})
    }
}

export const getVideoById = async(req, res)=>{
    
    const {_id} = matchedData(req)

    try {
        const video = await VideoModel.findById(_id).populate("author", "name -_id")
        if(!video)
            return res.status(404).json({ok: false, msg: "el video no ha sido encontrado.", data: null})

        video.views++

       await video.save()

       res.status(200).json({ok: true, data: video})
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}

export const getAllVideos = async(req, res)=>{

    try {
        const videos = await VideoModel.find().populate("author", "name -_id")
        if(!videos.length)
            return res.status(404).json({ok: false, msg: "No hay ningun video.", data: null})

       res.status(200).json({ok: true, data: videos})
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}

export const updateVideo = async(req, res)=>{
    
    const {_id, title} = matchedData(req)

    try {
        const updatedVideo = await videoModel.findByIdAndUpdate({_id}, {title}, {new: true})

        if(!updatedVideo)
            return res.status(404).json({ok: false, msg: "el video no ha sido encontrado.", data: null})

        res.status(200).json({ok:true, msg: "video actualizado", data: updatedVideo})
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}

export const deleteVideo = async(req, res)=>{
    
    const {_id} = matchedData(req)
    
    try {
        const video = await VideoModel.findOne({_id: _id})

        if(!video)
            return res.status(404).json({ok: false, msg: "video no encontrado.", data: null})
    
        await video.deleteOne()

        res.status(204).end()
    
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}