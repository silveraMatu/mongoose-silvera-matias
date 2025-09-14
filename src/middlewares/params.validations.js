import { param } from 'express-validator';

export const validateMongoIdParam = [
    param('_id')
        .isMongoId()
        .withMessage('El parámetro id debe ser un MongoId válido'),
];