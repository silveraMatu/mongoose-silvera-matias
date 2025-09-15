import mongoose from "mongoose";
import UserModel from "./user.model.js";
import VideoModel from "./video.model.js";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
},{
    versionKey: false
})


//Para que un usuario no pueda dar mas de un like por video
likeSchema.index({user: 1, video: 1}, {unique: true})

likeSchema.methods.userExist = async function(){
    const exist = await UserModel.findOne({deleted_at: null, _id: this.user})

    if(!exist)
        throw{
            statusCode: 404,
            ok: false,
            msg: "Ese usuario no existe."
        }

    return
}

likeSchema.methods.videoExist = async function(){
    const exist = await VideoModel.findOne({_id: this.video})

    if(!exist)
        throw{
            statusCode: 404,
            ok: false,
            msg: "Ese video no existe."
        }
    
    return
}


export default mongoose.model("Like", likeSchema)