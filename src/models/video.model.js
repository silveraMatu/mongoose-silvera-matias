import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Untitled"
    },
    views: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
    }
},{
    versionKey: false
})

export default mongoose.model("Video", videoSchema)