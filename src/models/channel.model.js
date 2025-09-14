import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    }
})

export default mongoose.model("Channel", channelSchema)