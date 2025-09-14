import { Router } from "express";
import { createChannelValidations } from "../middlewares/channel/channelCreate.validations.js";
import { applyValidations } from "../middlewares/applyvalidations.js";
import { createChannel, deleteChannel, getAllChannels, getChannelById, updateChannel } from "../controllers/channel.controllers.js";
import { validateMongoIdParam } from "../middlewares/params.validations.js";
import { updateChannelValidations } from "../middlewares/channel/channelUpdate.validations.js";

export const channelRouter = Router()

channelRouter.post("/channel", createChannelValidations, applyValidations, createChannel)
channelRouter.get("/channel", getAllChannels)
channelRouter.get("/channel/:_id", validateMongoIdParam, applyValidations, getChannelById)
channelRouter.put("/channel/:_id", validateMongoIdParam, updateChannelValidations, applyValidations, updateChannel)
channelRouter.delete("/channel/:_id", validateMongoIdParam, applyValidations, deleteChannel)