import { Router } from "express";
import { createVideoValidations } from "../middlewares/video/createVideo.validations.js";
import { applyValidations } from "../middlewares/applyvalidations.js";
import { deleteVideo, getAllVideos, getVideoById, submitVideo, updateVideo } from "../controllers/video.controllers.js";
import { validateMongoIdParam } from "../middlewares/params.validations.js";
import { updateVideoValidations } from "../middlewares/video/updateVideo.validations.js";

export const videoRouter = Router()

videoRouter.post("/video", createVideoValidations, applyValidations, submitVideo)
videoRouter.get("/video/:_id", validateMongoIdParam, applyValidations, getVideoById)
videoRouter.get("/video", getAllVideos)
videoRouter.put("/video/:_id",validateMongoIdParam, updateVideoValidations, applyValidations, updateVideo)
videoRouter.delete("/video/:_id",validateMongoIdParam, applyValidations, deleteVideo)