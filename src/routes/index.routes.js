import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { channelRouter } from "./channel.routes.js";
import { videoRouter } from "./video.routes.js";
import { commentRouter } from "./comment.routes.js";
import { likeRouter } from "./like.routes.js";

export const routes = Router()

routes.use(userRouter)
routes.use(channelRouter)
routes.use(videoRouter)
routes.use(commentRouter)
routes.use(likeRouter)