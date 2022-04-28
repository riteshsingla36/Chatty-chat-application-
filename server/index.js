const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()

const userController = require("./Controllers/userController")

dotenv.config()
app.use(express.json())
app.use(cors())

app.use("/user", userController)


const connect = () => {
    mongoose.connect(process
        .env.MONGO_URL)
}
app.listen(process.env.PORT, async () => {
    await connect()
    console.log(`connected successfully on port ${process.env.PORT}`)
})