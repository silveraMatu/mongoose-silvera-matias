import { body } from "express-validator";

export const updateUserValidations = [
    body("username")
        .optional()
        .trim()
        .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres"),
    body("email")
        .optional()
        .trim()
        .isEmail().withMessage("Debe ser un email válido"),
    body("password")
        .optional()
        .trim()
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("profile").optional(),
    body("profile.bio")
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage("La biografía no puede superar los 200 caracteres"),
    body("profile.avatar_url")
        .optional()
        .trim()
        .isURL().withMessage("El avatar debe ser una URL válida"),
];