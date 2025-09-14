import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { channelRouter } from "./channel.routes.js";

export const routes = Router()

routes.use(userRouter)
routes.use(channelRouter)