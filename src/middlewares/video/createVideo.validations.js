import { body } from "express-validator";

export const createVideoValidations = [
    body("title")
        .isString().withMessage("El título debe ser un string")
        .trim()
        .notEmpty().withMessage("El título es requerido")
        .isLength({max: 100}).withMessage("El título permite hasta 100 carácteres"),
    body("author")
        .isMongoId().withMessage("author debe ser un id de mongoDB válido.")
        .trim()
        .notEmpty().withMessage("author es requerido")
        
]