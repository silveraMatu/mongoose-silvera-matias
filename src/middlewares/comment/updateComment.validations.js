import { body } from "express-validator";

export const updateCommentValidation = [
    body("content")
        .isString().withMessage("el contenido debe ser un string.")
        .trim()
        .notEmpty().withMessage("El comentario no puede estar vacío")
]