import { matchedData } from "express-validator";
import CommentModel from "../models/comment.model.js";

export const createComment = async(req, res)=>{
    
    const validatedData = matchedData(req)
    
    try {
        const newComment = new CommentModel(validatedData)

        await newComment.userExist()
        
        await newComment.videoExist()

        await newComment.save()

        res.status(201).json({ok: true, msg: "Comentario creado", data: newComment})
    } catch (error) {
        res.status(error.statusCode || 500).json({ok: false, msg: error.msg || "Error interno del servidor", data: null})
    }
}

export const getAllComments = async(req, res)=>{
    try {
       const comments = await CommentModel.find().populate("user", "username").populate("video", "title")

       if(!comments.length)
           return res.status(404).json({ok: false, msg: "No hay ningún comentario en la db.", data: null})
    
       res.status(200).json({ok: true, data: comments})
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}

export const getCommentById = async(req, res)=>{
    
    const {_id} = matchedData(req)
    
    try {
       const comment = await CommentModel.findById(_id).populate("user", "username").populate("video", "title") 

       if(!comment)
           return res.status(404).json({ok: false, msg: "No existe ese comentario.", data: null})
    
       res.status(200).json({ok: true, data: comment})
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}

export const updateComment = async(req, res)=>{
    
    const {_id, content} = matchedData(req)
    
    try {
        const updateComment = await CommentModel.findByIdAndUpdate(_id, {content}, {new: true})

        if(!updateComment)
            return res.status(404).json({ok: false, msg: "El comentario no se encontró", data: null})

        res.status(200).json({ok: true, msg: "comentario actualizado", data: updateComment})
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})
    }
}

export const deleteComment = async(req, res)=>{
    
    const {_id} = matchedData(req)
    
    try {
        const deletedComment = await CommentModel.deleteOne({_id})

        if(!deletedComment.deletedCount)
            return res.status(404).json({ok: false, msg: "El comentario no se encontró", data: null})

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error interno del servidor", data: null})        
    }
}