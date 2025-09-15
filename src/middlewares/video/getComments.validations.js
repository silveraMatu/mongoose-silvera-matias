import { query } from "express-validator";

export const getCommentsValidations = [
    query("video")
        .isMongoId().withMessage("video debe ser un id valido de mongoDB")
]