import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/user.controllers.js';
import { validateMongoIdParam } from '../middlewares/params.validations.js';
import { applyValidations } from '../middlewares/applyvalidations.js';
import { createUserValidations } from '../middlewares/user/userCreate.validations.js';
import { updateUserValidations } from '../middlewares/user/userUpdate.validations.js';

export const userRouter = Router();

userRouter.get('/users', getAllUsers)
userRouter.get('/users/:_id', validateMongoIdParam, applyValidations, getUserById);
userRouter.post('/users', createUserValidations, applyValidations, createUser);
userRouter.put('/users/:_id', validateMongoIdParam, updateUserValidations, applyValidations, updateUser);
userRouter.delete('/users/:_id', validateMongoIdParam, applyValidations, deleteUser);