import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './src/controllers/user.controllers.js';
import { validateMongoIdParam } from './src/middlewares/params.validations.js';
import { applyValidations } from './src/middlewares/applyvalidations.js';
import { createUserValidations } from './src/middlewares/user/userCreate.validations.js';
import { updateUserValidations } from './src/middlewares/user/userUpdate.validations.js';

export const userRouter = Router();

userRouter.get('/users', getAllUsers)
userRouter.get('/users/:_id', validateMongoIdParam, applyValidations, getUserById);
userRouter.post('/user', createUserValidations, applyValidations, createUser);
userRouter.put('/users/:_id', validateMongoIdParam, updateUserValidations, applyValidations, updateUser);
userRouter.delete('/users/:_id', validateMongoIdParam, applyValidations, deleteUser);