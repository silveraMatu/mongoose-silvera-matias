import { Router } from "express";
import { createCommentValidation } from "../middlewares/comment/createComment.validations.js";
import { applyValidations } from "../middlewares/applyvalidations.js";
import { createComment, deleteComment, getAllComments, getCommentById, updateComment } from "../controllers/comment.controllers.js";
import { validateMongoIdParam } from "../middlewares/params.validations.js";
import { updateCommentValidation } from "../middlewares/comment/updateComment.validations.js";

export const commentRouter = Router()

commentRouter.post("/comments", createCommentValidation, applyValidations, createComment)
commentRouter.get("/comments", getAllComments)
commentRouter.get("/comments/:_id", validateMongoIdParam, applyValidations, getCommentById)
commentRouter.put("/comments/:_id", validateMongoIdParam, updateCommentValidation, applyValidations, updateComment)
commentRouter.delete("/comments/:_id", validateMongoIdParam, applyValidations, deleteComment)