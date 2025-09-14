import { body } from "express-validator";

export const createUserValidations = [
    body("username")
        .trim()
        .notEmpty().withMessage("El nombre de usuario es obligatorio")
        .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres"),
    body("email")
        .trim()
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email válido"),
    body("password")
        .trim()
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("profile").notEmpty().withMessage("El perfil es obligatorio"),
    body("profile.bio")
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage("La biografía no puede superar los 200 caracteres"),
    body("profile.avatar_url")
        .optional()
        .trim()
        .isURL().withMessage("El avatar debe ser una URL válida"),
];