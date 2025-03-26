import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String,
        default: null
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
type UserType = mongoose.InferSchemaType<typeof userSchema>

export {UserType, User}
