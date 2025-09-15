import { query } from "express-validator";

export const LikeValidations = [
    query("video")
        .isMongoId().withMessage("video debe un id valido de mongo."),
    query("user")
        .isMongoId().withMessage("user debe un id valido de mongo.")
]