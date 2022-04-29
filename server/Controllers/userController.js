const bcrypt = require("bcrypt")

const User = require("../Models/userModel")
const router = require("express").Router()

router.get("/allusers/:id", async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "image",
            "_id",
        ])
        return res.json(users)
    }
    catch (error) {
        return res.json({ msg: error.message })
    }
})

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "username already exist", status: false })
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: "email already exists", status: false })

        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        return res.json({ status: true, user })
    }
    catch (error) {
        res.json({ error: "error occured" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ msg: "email or password is incorrect", status: false })

        }

        const passwordCheck = await bcrypt.compare(password, user.password)

        if (!passwordCheck) {
            return res.json({ msg: "email or password is incorrect", status: false })
        }

        return res.json({ status: true, user })
    }
    catch (error) {
        return res.json({ error: "error occured" })
    }
})

router.patch("/setimage/:id", async (req, res) => {
    const { avatar } = req.body
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isImageSet: true, image: avatar }, { new: true })
        return res.json({ isSet: user.isImageSet, user })


    }
    catch (error) {
        return res.json({ msg: error.message })
    }
})

module.exports = router