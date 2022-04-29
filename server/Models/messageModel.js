const mongoose = require('mongoose')


const messageSchema = mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true
        }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})

const Message = mongoose.model("message", messageSchema)

module.exports = Message