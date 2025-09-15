import mongoose from "mongoose";
import userModel from "./user.model.js";
import VideoModel from "./video.model.js";

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
},{
    versionKey: false
})


//hook para eliminación en cascada

channelSchema.pre(/^(deleteOne)/, async function(next){
    
    await VideoModel.deleteMany({channel: this._id})

    next()
})


//validacion para que los usuarios existan

channelSchema.methods.userExist = async(_id)=>{
    const exist = await userModel.findOne({deleted_at: null, _id: _id})

    if(!exist)
        throw{
            statusCode: 404,
            ok: false,
            msg: "El usuario no existe."
        }
    
    return
}

export default mongoose.model("Channel", channelSchema)