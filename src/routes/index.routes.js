import { Router } from "express";
import { userRouter } from "../../user.routes.js";

export const routes = Router()

routes.use(userRouter)