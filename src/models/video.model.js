import mongoose from "mongoose";
import ChannelModel from "./channel.model.js";
import CommentModel from "./comment.model.js";
import LikeModel from "./like.model.js";

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
    versionKey: false,
    toJSON:{virtuals: true}, //sirve para poder incluir los virtual en el res.json()
})

/*virtual de comentarios para satisfacer el punto de 
realizar populate desde colecciones sin referencias directas*/
videoSchema.virtual("comment", {
    ref: "Comment",
    localField: "_id",
    foreignField: "video"
})


//hooks para eliminacion en cascada

videoSchema.pre("deleteOne", { document: true }, async function (next) {
  await CommentModel.deleteMany({ video: this._id });
  await LikeModel.deleteMany({ video: this._id });
  next();
});



videoSchema.methods.channelExist = async(_id)=>{
    const exist = await ChannelModel.findById(_id)

    if(!exist)
        throw{
            statusCode: 404,
            ok: false,
            msg: "el canal no existe"
        }
    return
}

export default mongoose.model("Video", videoSchema)