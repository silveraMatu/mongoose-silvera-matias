import { body } from "express-validator";
import UserModel from "../../models/user.model.js";

export const createChannelValidations = [
    body("name")
        .isString().withMessage("el name debe ser un string.")
        .trim()
        .notEmpty().withMessage("el name es requerido."),
    body("description")
        .optional()
        .isString().withMessage("la descripción debe ser un string.")
        .trim()
        .notEmpty().withMessage("la descripcion es requerida.")
        .isLength({max: 255}).withMessage("La descripción permite hasta 255 carácteres."),
    body("user")
        .isMongoId().withMessage("user debe ser un id de mongoDB válido.")
]