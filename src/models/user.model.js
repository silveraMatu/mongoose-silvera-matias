import mongoose from "mongoose";

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

export default mongoose.model("User", userSchema)