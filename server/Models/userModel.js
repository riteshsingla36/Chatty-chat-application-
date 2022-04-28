const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    isImageSet: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: ""
    }
})

const User = mongoose.model("user", UserSchema)

module.exports = User