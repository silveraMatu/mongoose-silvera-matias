import { body } from "express-validator";

export const createCommentValidation = [
    body("content")
        .isString().withMessage("el contenido debe ser un string.")
        .trim()
        .notEmpty().withMessage("El comentario no puede estar vacío"),
    body("user")
        .isMongoId().withMessage("user debe ser un id de mongoDB"),
    body("video")
        .isMongoId().withMessage("video debe ser un id de mongoDB"),
]