import { body } from "express-validator";

export const LikeValidations = [
    body("video")
        .isMongoId().withMessage("video debe un id valido de mongo."),
    body("user")
        .isMongoId().withMessage("user debe un id valido de mongo.")
]