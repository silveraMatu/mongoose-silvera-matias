import { Router } from "express";
import { LikeValidations } from "../middlewares/like/Like.validations.js";
import { applyValidations } from "../middlewares/applyvalidations.js";
import { darLike, deslikearVideo, getAllLikes } from "../controllers/like.controllers.js";

export const likeRouter = Router()

//Los endpoint para postear y eliminar el like requieren query strings 
//ejemplo de uso /api/like?video=<objectId>&user=<objectId> 

likeRouter.post("/like/", LikeValidations, applyValidations, darLike)
likeRouter.delete("/like/", LikeValidations, applyValidations, deslikearVideo)
likeRouter.get("/like/", getAllLikes)