const Message = require("../Models/messageModel")
const router = require("express").Router()

router.post("/all-messages", async (req, res) => {
    try {
        const { from, to } = req.body
        const messages = await Message.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 })

        const projectedMessages = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
       

        return res.json(projectedMessages)
    }
    catch (err) {
        return res.json({ msg: err.messagae })
    }
})

router.post("/add-message", async (req, res) => {

    try {
        const { from, to, message } = req.body
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })

        if (data) {
            return res.json({ msg: "Message added successfully" })
        }
        return res.json({ msg: "Failed to add message to database" })
    }
    catch (err) {
        return res.json({ msg: err.messagae })
    }
})

module.exports = router