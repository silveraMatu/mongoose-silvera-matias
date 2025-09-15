import mongoose from "mongoose";
import VideoModel from "./video.model.js";
import UserModel from "./user.model.js";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
},{
    versionKey: false
})


commentSchema.methods.userExist = async function(){
    const exist = await UserModel.findOne({deleted_at: null, _id: this.user})

    if(!exist)
        throw{
            statusCode: 404,
            ok: false,
            msg: "El usuario no existe."
        }
    
    return
}
commentSchema.methods.videoExist = async function(){
    const exist = await VideoModel.findOne({_id: this.video})

    if(!exist)
        throw{
            statusCode: 404,
            ok: false,
            msg: "El video no existe."
        }
    
    return
}

export default mongoose.model("Comment", commentSchema)