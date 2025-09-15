import mongoose from "mongoose";
import ChannelModel from "./channel.model.js";
import CommentModel from "./comment.model.js";
import LikeModel from "./like.model.js";

const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
        default: null
    },

    avatar_url: {
        type: String,
        default: null
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profile: profileSchema,

    deleted_at: {
        type: Date,
        default: null
    }
},{
    versionKey: false
})


userSchema.pre(/^(findOneAndUpdate)/, async function(next){

    const updated = this.getUpdate()

    if(updated && updated.deleted_at !== null){
        const userId = this.getQuery()._id
        await ChannelModel.deleteOne({user: userId})
        await CommentModel.deleteMany({user: userId})
        await LikeModel.deleteMany({user: userId})
    }
    
    next()
})

export default mongoose.model("User", userSchema)