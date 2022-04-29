const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const socket = require("socket.io")

const userController = require("./Controllers/userController")
const messageController = require("./Controllers/messageController")

dotenv.config()
app.use(express.json())
app.use(cors())

app.use("/user", userController)
app.use("/message", messageController)


const connect = () => {
    mongoose.connect(process
        .env.MONGO_URL)
}
const server = app.listen(process.env.PORT, async () => {
    await connect()
    console.log(`connected successfully on port ${process.env.PORT}`)
})


const io = socket(server, {
    cors: {
        origin: "https://chattychatapp.netlify.app/login",
        credentials: true
    }
})

global.onlineUsers = new Map()

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message)
        }
    })
})